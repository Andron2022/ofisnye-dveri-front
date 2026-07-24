#!/usr/bin/env bash
set -Eeuo pipefail
umask 0027

ENVIRONMENT="${1:-}"
DEPLOY_REF="${2:-}"
[[ "$ENVIRONMENT" == "staging" || "$ENVIRONMENT" == "production" ]] || {
  echo "Usage: $0 <staging|production> [git-ref]" >&2
  exit 2
}

APP_BASE="${APP_BASE:-/srv/ofisnye-dveri}"
REPOSITORY_DIR="${REPOSITORY_DIR:-$APP_BASE/repository}"
APP_ROOT="${APP_ROOT:-$APP_BASE/$ENVIRONMENT}"
RELEASES_DIR="${RELEASES_DIR:-$APP_ROOT/releases}"
BUILDS_DIR="${BUILDS_DIR:-$APP_ROOT/builds}"
SHARED_DIR="${SHARED_DIR:-$APP_ROOT/shared}"
SHARED_CACHE="${SHARED_CACHE:-$SHARED_DIR/cache}"
ENV_FILE="${ENV_FILE:-/etc/ofisnye-dveri/$ENVIRONMENT.env}"
CURRENT_LINK="${CURRENT_LINK:-$APP_ROOT/current}"
SERVICE_NAME="${SERVICE_NAME:-ofisnye-dveri@$ENVIRONMENT.service}"
EXPECTED_PORT="${PORT_OVERRIDE:-$([[ "$ENVIRONMENT" == "staging" ]] && echo 3001 || echo 3000)}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:$EXPECTED_PORT/api/health}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
DEPLOY_REF="${DEPLOY_REF:-origin/main}"
RELEASE_SUCCEEDED=0
SWITCHED_CURRENT=0

for command in git tar npm node curl sudo flock; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done
[[ -d "$REPOSITORY_DIR/.git" ]] || { echo "Git repository not found: $REPOSITORY_DIR" >&2; exit 1; }
[[ -f "$ENV_FILE" ]] || { echo "Environment file not found: $ENV_FILE" >&2; exit 1; }

mkdir -p "$RELEASES_DIR" "$BUILDS_DIR" "$SHARED_CACHE"
exec 9>"$APP_ROOT/.deploy.lock"
flock -n 9 || { echo "Another $ENVIRONMENT deployment is running" >&2; exit 1; }

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a
[[ "${APP_ENV:-}" == "$ENVIRONMENT" ]] || { echo "APP_ENV in $ENV_FILE must be $ENVIRONMENT" >&2; exit 1; }
[[ "${PORT:-}" == "$EXPECTED_PORT" ]] || { echo "PORT in $ENV_FILE must be $EXPECTED_PORT" >&2; exit 1; }

git -C "$REPOSITORY_DIR" fetch --prune origin
COMMIT="$(git -C "$REPOSITORY_DIR" rev-parse "${DEPLOY_REF}^{commit}")"
SHORT_COMMIT="$(git -C "$REPOSITORY_DIR" rev-parse --short=12 "$COMMIT")"
RELEASE_ID="$(date -u +%Y%m%dT%H%M%SZ)-${SHORT_COMMIT}"
BUILD_DIR="$BUILDS_DIR/$RELEASE_ID"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
PREVIOUS_TARGET="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"
PREVIOUS_ID=""
if [[ -f "$PREVIOUS_TARGET/.release.env" ]]; then
  PREVIOUS_ID="$(sed -n 's/^DEPLOYMENT_ID=//p' "$PREVIOUS_TARGET/.release.env" | head -1)"
fi

restore_previous() {
  if [[ -n "$PREVIOUS_TARGET" && -f "$PREVIOUS_TARGET/server.js" ]]; then
    ln -s "$PREVIOUS_TARGET" "$CURRENT_LINK.rollback"
    mv -Tf "$CURRENT_LINK.rollback" "$CURRENT_LINK"
    sudo systemctl restart "$SERVICE_NAME" || true
    bash "$REPOSITORY_DIR/deploy/scripts/healthcheck.sh" \
      "$HEALTHCHECK_URL" "$ENVIRONMENT" "$PREVIOUS_ID" || true
  else
    rm -f "$CURRENT_LINK"
    sudo systemctl stop "$SERVICE_NAME" || true
  fi
  SWITCHED_CURRENT=0
}

cleanup() {
  cd /
  rm -rf "$BUILD_DIR"
  rm -f "$CURRENT_LINK.new" "$CURRENT_LINK.rollback"
  if [[ "$RELEASE_SUCCEEDED" -ne 1 ]]; then
    if [[ "$SWITCHED_CURRENT" -eq 1 ]]; then restore_previous; fi
    rm -rf "$RELEASE_DIR"
  fi
}
trap cleanup EXIT

mkdir -p "$BUILD_DIR" "$RELEASE_DIR"
git -C "$REPOSITORY_DIR" archive "$COMMIT" | tar -x -C "$BUILD_DIR"
export DEPLOYMENT_ID="$RELEASE_ID"

cd "$BUILD_DIR"
npm ci --include=dev --include=optional
npm run check:deploy-env
npm run lint
npm run typecheck
npm run build

[[ -f .next/standalone/server.js ]] || { echo "Standalone server was not generated" >&2; exit 1; }
[[ -d .next/standalone/.next/static ]] || { echo "Standalone static assets are missing" >&2; exit 1; }
[[ -d .next/standalone/public ]] || { echo "Standalone public assets are missing" >&2; exit 1; }

cp -a .next/standalone/. "$RELEASE_DIR/"
rm -rf "$RELEASE_DIR/.next/cache"
ln -s "$SHARED_CACHE" "$RELEASE_DIR/.next/cache"
printf 'DEPLOYMENT_ID=%s\nGIT_COMMIT=%s\nBUILT_AT=%s\n' \
  "$RELEASE_ID" "$COMMIT" "$(date -u +%FT%TZ)" > "$RELEASE_DIR/.release-meta"
printf 'DEPLOYMENT_ID=%s\nGIT_COMMIT=%s\n' \
  "$RELEASE_ID" "$COMMIT" > "$RELEASE_DIR/.release.env"

ln -s "$RELEASE_DIR" "$CURRENT_LINK.new"
mv -Tf "$CURRENT_LINK.new" "$CURRENT_LINK"
SWITCHED_CURRENT=1

sudo systemctl restart "$SERVICE_NAME"
bash "$REPOSITORY_DIR/deploy/scripts/healthcheck.sh" \
  "$HEALTHCHECK_URL" "$ENVIRONMENT" "$RELEASE_ID"

current_target="$(readlink -f "$CURRENT_LINK")"
mapfile -t old_releases < <(
  find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
    | sort -nr \
    | tail -n +$((KEEP_RELEASES + 1)) \
    | cut -d' ' -f2-
)
for release in "${old_releases[@]:-}"; do
  [[ -n "$release" && "$release" != "$current_target" ]] && rm -rf "$release"
done

RELEASE_SUCCEEDED=1
SWITCHED_CURRENT=0
echo "Deployed $COMMIT as $RELEASE_ID to $ENVIRONMENT"
