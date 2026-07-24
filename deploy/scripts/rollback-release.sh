#!/usr/bin/env bash
set -Eeuo pipefail

APP_ROOT="${APP_ROOT:-/var/www/storefront}"
RELEASES_DIR="${RELEASES_DIR:-$APP_ROOT/releases}"
CURRENT_LINK="${CURRENT_LINK:-$APP_ROOT/current}"
SERVICE_NAME="${SERVICE_NAME:-storefront.service}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:3000/api/health}"
TARGET_RELEASE="${1:-}"

if [[ -z "$TARGET_RELEASE" ]]; then
  mapfile -t releases < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %f\n' | sort -nr | cut -d' ' -f2-)
  current_name="$(basename "$(readlink -f "$CURRENT_LINK")")"
  for release in "${releases[@]}"; do
    if [[ "$release" != "$current_name" ]]; then TARGET_RELEASE="$release"; break; fi
  done
fi

[[ -n "$TARGET_RELEASE" ]] || { echo "No previous release found" >&2; exit 1; }
TARGET_PATH="$RELEASES_DIR/$TARGET_RELEASE"
[[ -f "$TARGET_PATH/server.js" ]] || { echo "Invalid release: $TARGET_PATH" >&2; exit 1; }

ln -s "$TARGET_PATH" "$CURRENT_LINK.rollback"
mv -Tf "$CURRENT_LINK.rollback" "$CURRENT_LINK"
sudo systemctl restart "$SERVICE_NAME"
bash "$(dirname "$0")/healthcheck.sh" "$HEALTHCHECK_URL"
echo "Rolled back to $TARGET_RELEASE"
