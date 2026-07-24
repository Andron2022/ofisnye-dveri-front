#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ENV_FILE="${1:-/etc/ofisnye-dveri/wordpress-backup.env}"
[[ -f "$ENV_FILE" ]] || { echo "Backup env not found: $ENV_FILE" >&2; exit 1; }
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${BACKUP_NAME:?BACKUP_NAME is required}"
: "${WP_ROOT:?WP_ROOT is required}"
: "${BACKUP_ROOT:?BACKUP_ROOT is required}"
: "${DB_NAME:?DB_NAME is required}"
: "${MYSQL_BACKUP_DEFAULTS_FILE:?MYSQL_BACKUP_DEFAULTS_FILE is required}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
OFFSITE_ENABLED="${OFFSITE_ENABLED:-false}"

for command in mysqldump tar gzip sha256sum flock find; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done
[[ -d "$WP_ROOT/wp-content" ]] || { echo "wp-content not found under $WP_ROOT" >&2; exit 1; }
[[ -f "$MYSQL_BACKUP_DEFAULTS_FILE" ]] || { echo "MySQL defaults file not found" >&2; exit 1; }

mkdir -p "$BACKUP_ROOT"
exec 9>"$BACKUP_ROOT/.backup.lock"
flock -n 9 || { echo "Another WordPress backup is running" >&2; exit 1; }

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
TARGET="$BACKUP_ROOT/$STAMP"
mkdir -p "$TARGET"

mysqldump --defaults-extra-file="$MYSQL_BACKUP_DEFAULTS_FILE" \
  --single-transaction \
  --quick \
  --no-tablespaces \
  --hex-blob \
  --set-gtid-purged=OFF \
  --default-character-set=utf8mb4 \
  "$DB_NAME" | gzip -9 > "$TARGET/database.sql.gz"

tar -C "$WP_ROOT" -czf "$TARGET/wp-content.tar.gz" wp-content
printf 'backup_name=%s\ncreated_at=%s\nwp_root=%s\ndatabase=%s\nhost=%s\n' \
  "$BACKUP_NAME" "$(date -u +%FT%TZ)" "$WP_ROOT" "$DB_NAME" "$(hostname -f)" > "$TARGET/manifest.txt"
(
  cd "$TARGET"
  sha256sum database.sql.gz wp-content.tar.gz manifest.txt > SHA256SUMS
  sha256sum -c SHA256SUMS
)

if [[ "$OFFSITE_ENABLED" == "true" ]]; then
  : "${RESTIC_ENV_FILE:?RESTIC_ENV_FILE is required when OFFSITE_ENABLED=true}"
  [[ -f "$RESTIC_ENV_FILE" ]] || { echo "Restic env not found: $RESTIC_ENV_FILE" >&2; exit 1; }
  command -v restic >/dev/null || { echo "restic is required for off-server backup" >&2; exit 1; }
  set -a
  # shellcheck disable=SC1090
  source "$RESTIC_ENV_FILE"
  set +a
  restic backup "$TARGET" --tag "$BACKUP_NAME" --tag wordpress --host "$(hostname -f)"
fi

find "$BACKUP_ROOT" -mindepth 1 -maxdepth 1 -type d -mtime "+$RETENTION_DAYS" -exec rm -rf {} +
echo "WordPress backup created: $TARGET"
