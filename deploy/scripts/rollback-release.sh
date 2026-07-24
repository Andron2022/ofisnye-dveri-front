#!/usr/bin/env bash
set -Eeuo pipefail

ENVIRONMENT="${1:-}"
TARGET_RELEASE="${2:-}"
[[ "$ENVIRONMENT" == "staging" || "$ENVIRONMENT" == "production" ]] || {
  echo "Usage: $0 <staging|production> [release-directory-name]" >&2
  exit 2
}

APP_BASE="${APP_BASE:-/srv/ofisnye-dveri}"
APP_ROOT="${APP_ROOT:-$APP_BASE/$ENVIRONMENT}"
RELEASES_DIR="${RELEASES_DIR:-$APP_ROOT/releases}"
CURRENT_LINK="${CURRENT_LINK:-$APP_ROOT/current}"
SERVICE_NAME="${SERVICE_NAME:-ofisnye-dveri@$ENVIRONMENT.service}"
PORT="${PORT_OVERRIDE:-$([[ "$ENVIRONMENT" == "staging" ]] && echo 3001 || echo 3000)}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:$PORT/api/health}"

for command in find readlink sudo systemctl flock; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done

exec 9>"$APP_ROOT/.deploy.lock"
flock -n 9 || { echo "Another $ENVIRONMENT deployment or rollback is running" >&2; exit 1; }

ORIGINAL_TARGET="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"
[[ -f "$ORIGINAL_TARGET/server.js" ]] || { echo "Current release is invalid" >&2; exit 1; }
ORIGINAL_ID="$(sed -n 's/^DEPLOYMENT_ID=//p' "$ORIGINAL_TARGET/.release.env" | head -1)"

if [[ -z "$TARGET_RELEASE" ]]; then
  mapfile -t releases < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %f\n' | sort -nr | cut -d' ' -f2-)
  current_name="$(basename "$ORIGINAL_TARGET")"
  for release in "${releases[@]}"; do
    if [[ "$release" != "$current_name" ]]; then TARGET_RELEASE="$release"; break; fi
  done
fi

[[ -n "$TARGET_RELEASE" ]] || { echo "No previous release found" >&2; exit 1; }
TARGET_PATH="$RELEASES_DIR/$TARGET_RELEASE"
[[ -f "$TARGET_PATH/server.js" ]] || { echo "Invalid release: $TARGET_PATH" >&2; exit 1; }
TARGET_ID="$(sed -n 's/^DEPLOYMENT_ID=//p' "$TARGET_PATH/.release.env" | head -1)"

ln -s "$TARGET_PATH" "$CURRENT_LINK.rollback"
mv -Tf "$CURRENT_LINK.rollback" "$CURRENT_LINK"

if sudo systemctl restart "$SERVICE_NAME" && \
   bash "$(dirname "$0")/healthcheck.sh" "$HEALTHCHECK_URL" "$ENVIRONMENT" "$TARGET_ID"; then
  echo "Rolled back $ENVIRONMENT to $TARGET_RELEASE"
  exit 0
fi

echo "Rollback target failed health check; restoring original release" >&2
ln -s "$ORIGINAL_TARGET" "$CURRENT_LINK.restore"
mv -Tf "$CURRENT_LINK.restore" "$CURRENT_LINK"
sudo systemctl restart "$SERVICE_NAME" || true
bash "$(dirname "$0")/healthcheck.sh" "$HEALTHCHECK_URL" "$ENVIRONMENT" "$ORIGINAL_ID" || true
exit 1
