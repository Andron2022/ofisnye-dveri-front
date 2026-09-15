#!/usr/bin/env bash
set -Eeuo pipefail
umask 0027

ENVIRONMENT="${1:-}"
INVENTORY_FILE="${2:-/etc/ofisnye-dveri/${ENVIRONMENT}-inventory.env}"
[[ "$ENVIRONMENT" == "staging" || "$ENVIRONMENT" == "production" ]] || {
  echo "Usage: $0 <staging|production> [inventory-file]" >&2
  exit 2
}
[[ "$EUID" -eq 0 ]] || { echo "WordPress code rollback must run as root" >&2; exit 1; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-environment-inventory.sh" "$INVENTORY_FILE"
set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

STATE_ROOT="${WORDPRESS_CODE_STATE_ROOT:-/var/lib/ofisnye-dveri/wordpress-code}"
MANIFEST_FILE="$STATE_ROOT/${ENVIRONMENT}.manifest"
STATE_FILE="$STATE_ROOT/${ENVIRONMENT}.state"
TARGET_DIR="$WORDPRESS_ROOT/wp-content/mu-plugins"
WORDPRESS_CODE_OWNER="${WORDPRESS_CODE_OWNER:-$DEPLOY_USER}"
WORDPRESS_CODE_GROUP="${WORDPRESS_CODE_GROUP:-www-data}"
[[ -f "$STATE_FILE" ]] || { echo "WordPress code state not found: $STATE_FILE" >&2; exit 1; }
# shellcheck disable=SC1090
source "$STATE_FILE"
SNAPSHOT_DIR="${WORDPRESS_CODE_ROLLBACK_SNAPSHOT:-}"
[[ -n "$SNAPSHOT_DIR" && -d "$SNAPSHOT_DIR" ]] || { echo "Rollback snapshot not found" >&2; exit 1; }

exec 9>"$STATE_ROOT/${ENVIRONMENT}.lock"
flock -n 9 || { echo "Another WordPress code deployment is running for $ENVIRONMENT" >&2; exit 1; }

if [[ -f "$MANIFEST_FILE" ]]; then
  while read -r sum file; do
    [[ "$sum" =~ ^[0-9a-f]{64}$ && "$file" =~ ^[A-Za-z0-9._-]+\.php$ ]] || continue
    rm -f "$TARGET_DIR/$file"
  done < <(grep -E '^[0-9a-f]{64}  [A-Za-z0-9._-]+\.php$' "$MANIFEST_FILE" || true)
fi

for previous in "$SNAPSHOT_DIR"/files/*.php; do
  [[ -e "$previous" ]] || continue
  install -o "$WORDPRESS_CODE_OWNER" -g "$WORDPRESS_CODE_GROUP" -m 0640 "$previous" "$TARGET_DIR/$(basename "$previous")"
done

if [[ -f "$SNAPSHOT_DIR/manifest.before" ]]; then
  install -o root -g root -m 0640 "$SNAPSHOT_DIR/manifest.before" "$MANIFEST_FILE"
else
  rm -f "$MANIFEST_FILE"
fi
if [[ -f "$SNAPSHOT_DIR/state.before" ]]; then
  install -o root -g root -m 0640 "$SNAPSHOT_DIR/state.before" "$STATE_FILE"
else
  rm -f "$STATE_FILE"
fi

echo "WordPress managed code rolled back for $ENVIRONMENT from $SNAPSHOT_DIR"
