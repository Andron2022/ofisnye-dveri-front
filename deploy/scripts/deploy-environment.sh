#!/usr/bin/env bash
set -Eeuo pipefail
umask 0027

ENVIRONMENT="${1:-}"
DEPLOY_REF="${2:-origin/main}"
INVENTORY_FILE="${3:-/etc/ofisnye-dveri/${ENVIRONMENT}-inventory.env}"
[[ "$ENVIRONMENT" == "staging" || "$ENVIRONMENT" == "production" ]] || {
  echo "Usage: $0 <staging|production> [git-ref] [inventory-file]" >&2
  exit 2
}
[[ "$EUID" -eq 0 ]] || { echo "Environment orchestration must run as root" >&2; exit 1; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-environment-inventory.sh" "$INVENTORY_FILE"
set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
# shellcheck disable=SC1090
source "$STOREFRONT_ENV_FILE"
set +a

for command in git runuser readlink basename; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done

runuser -u "$DEPLOY_USER" -- git -C "$REPOSITORY_DIR" fetch --prune origin
COMMIT="$(runuser -u "$DEPLOY_USER" -- git -C "$REPOSITORY_DIR" rev-parse "${DEPLOY_REF}^{commit}")"
PREVIOUS_STOREFRONT_TARGET="$(readlink -f "$APP_ROOT/current" 2>/dev/null || true)"
WORDPRESS_DEPLOYED=0
STOREFRONT_DEPLOYED=0
SUCCESS=0

rollback_combined() {
  local status=$?
  if [[ "$status" -ne 0 && "$SUCCESS" -ne 1 ]]; then
    echo "Combined deployment failed; attempting component rollback" >&2
    if [[ "$STOREFRONT_DEPLOYED" -eq 1 && -n "$PREVIOUS_STOREFRONT_TARGET" ]]; then
      runuser -u "$DEPLOY_USER" -- bash "$SCRIPT_DIR/rollback-release.sh" \
        "$ENVIRONMENT" "$(basename "$PREVIOUS_STOREFRONT_TARGET")" || true
    fi
    if [[ "$WORDPRESS_DEPLOYED" -eq 1 ]]; then
      bash "$SCRIPT_DIR/rollback-wordpress-code.sh" "$ENVIRONMENT" "$INVENTORY_FILE" || true
    fi
  fi
  exit "$status"
}
trap rollback_combined ERR

bash "$SCRIPT_DIR/deploy-wordpress-code.sh" "$ENVIRONMENT" "$COMMIT" "$INVENTORY_FILE"
WORDPRESS_DEPLOYED=1
bash "$SCRIPT_DIR/verify-wordpress-environment.sh" "$INVENTORY_FILE"

runuser -u "$DEPLOY_USER" -- bash "$SCRIPT_DIR/deploy-release.sh" "$ENVIRONMENT" "$COMMIT"
STOREFRONT_DEPLOYED=1

CURRENT_RELEASE="$(readlink -f "$APP_ROOT/current")"
STOREFRONT_COMMIT="$(sed -n 's/^GIT_COMMIT=//p' "$CURRENT_RELEASE/.release.env" | head -1)"
DEPLOYMENT_ID="$(sed -n 's/^DEPLOYMENT_ID=//p' "$CURRENT_RELEASE/.release.env" | head -1)"
WP_STATE_FILE="/var/lib/ofisnye-dveri/wordpress-code/${ENVIRONMENT}.state"
[[ -f "$WP_STATE_FILE" ]] || { echo "WordPress code state is missing" >&2; false; }
# shellcheck disable=SC1090
source "$WP_STATE_FILE"
[[ "$STOREFRONT_COMMIT" == "$COMMIT" ]] || { echo "Storefront Git SHA mismatch" >&2; false; }
[[ "${WORDPRESS_CODE_GIT_COMMIT:-}" == "$COMMIT" ]] || { echo "WordPress code Git SHA mismatch" >&2; false; }

EXPECTED_INDEXING="${SITE_INDEXING_ENABLED:-false}"
if [[ "${SKIP_EXTERNAL_SMOKE:-false}" == "true" ]]; then
  echo "WARNING: external storefront smoke explicitly skipped" >&2
else
  if [[ "$EXPECTED_INDEXING" == "false" && -z "${CURL_USER:-}" ]]; then
    if [[ -t 0 ]]; then
      read -r -s -p "Basic Auth user:password for $STOREFRONT_DOMAIN: " CURL_USER
      echo
    fi
    [[ -n "${CURL_USER:-}" ]] || {
      echo "Basic Auth credentials are required for the closed storefront smoke; set SKIP_EXTERNAL_SMOKE=true only for an intentional exception" >&2
      false
    }
  fi
  export CURL_USER
  bash "$SCRIPT_DIR/smoke-test.sh" "https://$STOREFRONT_DOMAIN" "$ENVIRONMENT" "$DEPLOYMENT_ID" "$EXPECTED_INDEXING"
fi

bash "$SCRIPT_DIR/record-environment-state.sh" "$INVENTORY_FILE"
SUCCESS=1
trap - ERR
echo "Combined application release passed: environment=$ENVIRONMENT commit=$COMMIT deployment=$DEPLOYMENT_ID"
