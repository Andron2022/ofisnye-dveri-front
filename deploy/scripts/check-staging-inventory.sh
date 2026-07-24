#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-/etc/ofisnye-dveri/staging-inventory.env}"
[[ -f "$INVENTORY_FILE" ]] || { echo "Inventory not found: $INVENTORY_FILE" >&2; exit 1; }

set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

required=(
  ENVIRONMENT PROJECT_NAME STOREFRONT_DOMAIN WORDPRESS_DOMAIN VDS_IPV4 DNS_PROVIDER
  EXPECTED_OS_ID EXPECTED_OS_VERSION_ID EXPECTED_NODE_MAJOR NODE_BIN STOREFRONT_PORT
  PHP_FPM_SERVICE PHP_FPM_SOCKET MYSQL_SERVICE APP_BASE REPOSITORY_DIR APP_ROOT
  WORDPRESS_ROOT LOCAL_BACKUP_ROOT GIT_REPOSITORY_URL GIT_DEPLOY_REF DEPLOY_USER
  RUNTIME_USER RUNTIME_GROUP STOREFRONT_NGINX_SITE WORDPRESS_NGINX_SITE
  STOREFRONT_CERT_NAME WORDPRESS_CERT_NAME STOREFRONT_BASIC_AUTH_FILE
  STOREFRONT_ENV_FILE WORDPRESS_BACKUP_ENV_FILE RESTIC_ENV_FILE
)

errors=()
for name in "${required[@]}"; do
  value="${!name:-}"
  [[ -n "$value" ]] || errors+=("$name is required")
  if [[ "$value" == *example.com* || "$value" == *replace-me* || "$value" == *replace-owner* || "$value" == *replace-repository* ]]; then
    errors+=("$name still contains an example value")
  fi
done

[[ "${ENVIRONMENT:-}" == "staging" ]] || errors+=("ENVIRONMENT must be staging")
[[ "${STOREFRONT_DOMAIN:-}" != "${WORDPRESS_DOMAIN:-}" ]] || errors+=("Storefront and WordPress domains must differ")
[[ "${STOREFRONT_DOMAIN:-}" =~ ^[A-Za-z0-9.-]+$ ]] || errors+=("Invalid STOREFRONT_DOMAIN")
[[ "${WORDPRESS_DOMAIN:-}" =~ ^[A-Za-z0-9.-]+$ ]] || errors+=("Invalid WORDPRESS_DOMAIN")
[[ "${VDS_IPV4:-}" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || errors+=("Invalid VDS_IPV4")
[[ "${EXPECTED_NODE_MAJOR:-}" =~ ^[0-9]+$ ]] || errors+=("EXPECTED_NODE_MAJOR must be numeric")
[[ "${STOREFRONT_PORT:-}" =~ ^[0-9]+$ ]] || errors+=("STOREFRONT_PORT must be numeric")
if [[ "${STOREFRONT_PORT:-0}" -lt 1024 || "${STOREFRONT_PORT:-0}" -gt 65535 ]]; then
  errors+=("STOREFRONT_PORT must be between 1024 and 65535")
fi
[[ "${APP_ROOT:-}" == "${APP_BASE:-}/staging" ]] || errors+=("APP_ROOT must be APP_BASE/staging")
[[ "${REPOSITORY_DIR:-}" == "${APP_BASE:-}/repository" ]] || errors+=("REPOSITORY_DIR must be APP_BASE/repository")

if ((${#errors[@]})); then
  printf 'Staging inventory validation failed:\n' >&2
  printf -- '- %s\n' "${errors[@]}" >&2
  exit 1
fi

printf 'Staging inventory is valid: storefront=%s wordpress=%s vds=%s\n' \
  "$STOREFRONT_DOMAIN" "$WORDPRESS_DOMAIN" "$VDS_IPV4"
