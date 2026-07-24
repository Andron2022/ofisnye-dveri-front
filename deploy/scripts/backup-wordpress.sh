#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ENV_FILE="${1:-/etc/ofisnye-dveri/wordpress-backup.env}"
[[ -f "$ENV_FILE" ]] || { echo "Backup env not found: $ENV_FILE" >&2; exit 1; }

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${WP_ROOT:?WP_ROOT is required}"
: "${BACKUP_ROOT:?BACKUP_ROOT is required}"
: "${DB_HOST:?DB_HOST is required}"
: "${DB_PORT:?DB_PORT is required}"
: "${DB_NAME:?DB_NAME is required}"
: "${DB_USER:?DB_USER is required}"
: "${DB_PASSWORD:?DB_PASSWORD is required}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"

command -v mysqldump >/dev/null
command -v tar >/dev/null
command -v gzip >/dev/null
command -v sha256sum >/dev/null
command -v flock >/dev/null

mkdir -p "$BACKUP_ROOT"
exec 9>"$BACKUP_ROOT/.backup.lock"
flock -n 9 || { echo "Another WordPress backup is running" >&2; exit 1; }

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
TARGET="$BACKUP_ROOT/$STAMP"
mkdir -p "$TARGET"

MYSQL_PWD="$DB_PASSWORD" mysqldump \
  --host="$DB_HOST" \
  --port="$DB_PORT" \
  --user="$DB_USER" \
  --single-transaction \
  --no-tablespaces \
  --quick \
  --routines \
  --triggers \
  --events \
  --default-character-set=utf8mb4 \
  "$DB_NAME" | gzip -9 > "$TARGET/database.sql.gz"

tar -C "$WP_ROOT" -czf "$TARGET/wp-content.tar.gz" wp-content

printf 'created_at=%s\nwp_root=%s\ndatabase=%s\n' \
  "$(date -u +%FT%TZ)" "$WP_ROOT" "$DB_NAME" > "$TARGET/manifest.txt"

(
  cd "$TARGET"
  sha256sum database.sql.gz wp-content.tar.gz manifest.txt > SHA256SUMS
)

find "$BACKUP_ROOT" -mindepth 1 -maxdepth 1 -type d -mtime "+$RETENTION_DAYS" -exec rm -rf {} +

echo "WordPress backup created: $TARGET"
