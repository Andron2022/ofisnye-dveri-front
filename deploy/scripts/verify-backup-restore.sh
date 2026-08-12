#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ENV_FILE="${1:-/etc/ofisnye-dveri/wordpress-backup.env}"
SOURCE="${2:-local}"
[[ "$SOURCE" == "local" || "$SOURCE" == "offsite" ]] || { echo "Source must be local or offsite" >&2; exit 2; }
[[ -f "$ENV_FILE" ]] || { echo "Backup env not found: $ENV_FILE" >&2; exit 1; }
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${BACKUP_NAME:?BACKUP_NAME is required}"
: "${BACKUP_ROOT:?BACKUP_ROOT is required}"
: "${MYSQL_RESTORE_DEFAULTS_FILE:?MYSQL_RESTORE_DEFAULTS_FILE is required}"
: "${RESTORE_TEST_DB_NAME:?RESTORE_TEST_DB_NAME is required}"
[[ "$RESTORE_TEST_DB_NAME" == *restore_test* ]] || { echo "RESTORE_TEST_DB_NAME must clearly be a restore-test database" >&2; exit 1; }
[[ "$RESTORE_TEST_DB_NAME" =~ ^[A-Za-z0-9_]+$ ]] || { echo "RESTORE_TEST_DB_NAME contains invalid characters" >&2; exit 1; }
[[ -f "$MYSQL_RESTORE_DEFAULTS_FILE" ]] || { echo "Restore MySQL defaults file not found" >&2; exit 1; }

for command in mysql gzip tar sha256sum mktemp; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done

WORK_DIR="$(mktemp -d /var/tmp/ofisnye-dveri-restore-test.XXXXXX)"
cleanup() {
  mysql --defaults-extra-file="$MYSQL_RESTORE_DEFAULTS_FILE" \
    -e "DROP DATABASE IF EXISTS \`$RESTORE_TEST_DB_NAME\`;" >/dev/null 2>&1 || true
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

if [[ "$SOURCE" == "local" ]]; then
  BACKUP_DIR="$(find "$BACKUP_ROOT" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | head -1 | cut -d' ' -f2-)"
  [[ -n "$BACKUP_DIR" ]] || { echo "No local backup found" >&2; exit 1; }
  mkdir -p "$WORK_DIR/backup"
  cp -a "$BACKUP_DIR/." "$WORK_DIR/backup/"
else
  : "${RESTIC_ENV_FILE:?RESTIC_ENV_FILE is required for offsite restore test}"
  [[ -f "$RESTIC_ENV_FILE" ]] || { echo "Restic env not found" >&2; exit 1; }
  command -v restic >/dev/null || { echo "restic is not installed" >&2; exit 1; }
  set -a
  # shellcheck disable=SC1090
  source "$RESTIC_ENV_FILE"
  set +a
  mkdir -p "$WORK_DIR/restored"
  restic restore latest --tag "$BACKUP_NAME" --target "$WORK_DIR/restored"
  BACKUP_DIR="$(find "$WORK_DIR/restored" -type f -name SHA256SUMS -printf '%h\n' | head -1)"
  [[ -n "$BACKUP_DIR" ]] || { echo "Restic snapshot has no backup set" >&2; exit 1; }
  mkdir -p "$WORK_DIR/backup"
  cp -a "$BACKUP_DIR/." "$WORK_DIR/backup/"
fi

(
  cd "$WORK_DIR/backup"
  sha256sum -c SHA256SUMS
)
mkdir -p "$WORK_DIR/wp-content-restore"
tar -C "$WORK_DIR/wp-content-restore" -xzf "$WORK_DIR/backup/wp-content.tar.gz"
[[ -d "$WORK_DIR/wp-content-restore/wp-content/uploads" ]] || { echo "Restored uploads directory is missing" >&2; exit 1; }
for plugin in door-family-taxonomy.php headless-seo-foundation.php portfolio-project-cpt.php public-article-no.php storefront-order-idempotency.php; do
  [[ -f "$WORK_DIR/wp-content-restore/wp-content/mu-plugins/$plugin" ]] || { echo "Missing restored MU-plugin: $plugin" >&2; exit 1; }
done

mysql --defaults-extra-file="$MYSQL_RESTORE_DEFAULTS_FILE" \
  -e "DROP DATABASE IF EXISTS \`$RESTORE_TEST_DB_NAME\`; CREATE DATABASE \`$RESTORE_TEST_DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
gzip -dc "$WORK_DIR/backup/database.sql.gz" | \
  mysql --defaults-extra-file="$MYSQL_RESTORE_DEFAULTS_FILE" "$RESTORE_TEST_DB_NAME"
table_count="$(mysql --defaults-extra-file="$MYSQL_RESTORE_DEFAULTS_FILE" --batch --skip-column-names \
  -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='$RESTORE_TEST_DB_NAME';")"
(( table_count > 10 )) || { echo "Restore test imported too few tables: $table_count" >&2; exit 1; }

echo "Restore test passed from $SOURCE backup: $table_count tables and wp-content verified"
