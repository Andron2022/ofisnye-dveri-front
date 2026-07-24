#!/usr/bin/env bash
set -Eeuo pipefail

APP_ROOT="${APP_ROOT:-/var/www/storefront}"
REPOSITORY_DIR="${REPOSITORY_DIR:-$APP_ROOT/repository}"
RELEASES_DIR="${RELEASES_DIR:-$APP_ROOT/releases}"
BUILDS_DIR="${BUILDS_DIR:-$APP_ROOT/builds}"
SHARED_ENV="${SHARED_ENV:-$APP_ROOT/shared/storefront.env}"
CURRENT_LINK="${CURRENT_LINK:-$APP_ROOT/current}"
SERVICE_NAME="${SERVICE_NAME:-storefront.service}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:3000/api/health}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
DEPLOY_REF="${1:-origin/main}"
RELEASE_SUCCEEDED=0

for command in git tar npm node curl sudo; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done

[[ -d "$REPOSITORY_DIR/.git" ]] || { echo "Git repository not found: $REPOSITORY_DIR" >&2; exit 1; }
[[ -f "$SHARED_ENV" ]] || { echo "Environment file not found: $SHARED_ENV" >&2; exit 1; }

mkdir -p "$RELEASES_DIR" "$BUILDS_DIR"

git -C "$REPOSITORY_DIR" fetch --prune origin
COMMIT="$(git -C "$REPOSITORY_DIR" rev-parse "${DEPLOY_REF}^{commit}")"
SHORT_COMMIT="$(git -C "$REPOSITORY_DIR" rev-parse --short=12 "$COMMIT")"
RELEASE_ID="$(date -u +%Y%m%dT%H%M%SZ)-${SHORT_COMMIT}"
BUILD_DIR="$BUILDS_DIR/$RELEASE_ID"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
PREVIOUS_TARGET="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"

cleanup() {
  rm -rf "$BUILD_DIR"
  if [[ "$RELEASE_SUCCEEDED" -ne 1 ]]; then
    rm -rf "$RELEASE_DIR"
  fi
  rm -f "$CURRENT_LINK.new" "$CURRENT_LINK.rollback"
}
trap cleanup EXIT

rm -f "$CURRENT_LINK.new" "$CURRENT_LINK.rollback"
mkdir -p "$BUILD_DIR" "$RELEASE_DIR"
git -C "$REPOSITORY_DIR" archive "$COMMIT" | tar -x -C "$BUILD_DIR"

set -a
# shellcheck disable=SC1090
source "$SHARED_ENV"
set +a
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
printf 'DEPLOYMENT_ID=%s\nGIT_COMMIT=%s\nBUILT_AT=%s\n' \
  "$RELEASE_ID" "$COMMIT" "$(date -u +%FT%TZ)" > "$RELEASE_DIR/.release-meta"
printf 'DEPLOYMENT_ID=%s\nGIT_COMMIT=%s\n' \
  "$RELEASE_ID" "$COMMIT" > "$RELEASE_DIR/.release.env"

ln -s "$RELEASE_DIR" "$CURRENT_LINK.new"
mv -Tf "$CURRENT_LINK.new" "$CURRENT_LINK"

if ! sudo systemctl restart "$SERVICE_NAME"; then
  echo "systemd restart failed; restoring previous release" >&2
  if [[ -n "$PREVIOUS_TARGET" && -d "$PREVIOUS_TARGET" ]]; then
    ln -s "$PREVIOUS_TARGET" "$CURRENT_LINK.rollback"
    mv -Tf "$CURRENT_LINK.rollback" "$CURRENT_LINK"
    sudo systemctl restart "$SERVICE_NAME" || true
  fi
  exit 1
fi

if ! bash "$BUILD_DIR/deploy/scripts/healthcheck.sh" "$HEALTHCHECK_URL"; then
  echo "Health check failed; restoring previous release" >&2
  if [[ -n "$PREVIOUS_TARGET" && -d "$PREVIOUS_TARGET" ]]; then
    ln -s "$PREVIOUS_TARGET" "$CURRENT_LINK.rollback"
    mv -Tf "$CURRENT_LINK.rollback" "$CURRENT_LINK"
    sudo systemctl restart "$SERVICE_NAME" || true
    bash "$BUILD_DIR/deploy/scripts/healthcheck.sh" "$HEALTHCHECK_URL" || true
  fi
  exit 1
fi

mapfile -t old_releases < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +$((KEEP_RELEASES + 1)) | cut -d' ' -f2-)
for release in "${old_releases[@]:-}"; do
  [[ -n "$release" && "$release" != "$(readlink -f "$CURRENT_LINK")" ]] && rm -rf "$release"
done

RELEASE_SUCCEEDED=1
echo "Deployed $COMMIT as $RELEASE_ID"
