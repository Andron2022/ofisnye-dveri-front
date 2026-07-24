#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-/etc/ofisnye-dveri/staging-inventory.env}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-staging-inventory.sh" "$INVENTORY_FILE"

set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

required_commands=(git npm curl tar systemctl nginx openssl php mysql mysqldump wp flock ss)
for command in "${required_commands[@]}"; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done

[[ -x "$NODE_BIN" ]] || { echo "Node binary is not executable: $NODE_BIN" >&2; exit 1; }

# shellcheck disable=SC1091
source /etc/os-release
[[ "$ID" == "$EXPECTED_OS_ID" ]] || { echo "Unexpected OS: $ID (expected $EXPECTED_OS_ID)" >&2; exit 1; }
[[ "$VERSION_ID" == "$EXPECTED_OS_VERSION_ID" ]] || { echo "Unexpected OS version: $VERSION_ID (expected $EXPECTED_OS_VERSION_ID)" >&2; exit 1; }

node_version="$("$NODE_BIN" -p 'process.versions.node')"
IFS=. read -r node_major node_minor node_patch <<<"$node_version"
if (( node_major != EXPECTED_NODE_MAJOR || node_major < 22 || node_major >= 25 )); then
  echo "Unsupported Node version: $node_version (expected major $EXPECTED_NODE_MAJOR and project range >=22.14 <25)" >&2
  exit 1
fi
if (( node_major == 22 && node_minor < 14 )); then
  echo "Unsupported Node version: $node_version (expected >=22.14)" >&2
  exit 1
fi

for directory in "$APP_BASE" "$REPOSITORY_DIR" "$APP_ROOT" "$APP_ROOT/releases" "$APP_ROOT/builds" "$APP_ROOT/shared/cache" "$WORDPRESS_ROOT"; do
  [[ -e "$directory" ]] || { echo "Missing path: $directory" >&2; exit 1; }
done
[[ -f "$STOREFRONT_ENV_FILE" ]] || { echo "Missing storefront env: $STOREFRONT_ENV_FILE" >&2; exit 1; }
[[ -f "$WORDPRESS_BACKUP_ENV_FILE" ]] || { echo "Missing backup env: $WORDPRESS_BACKUP_ENV_FILE" >&2; exit 1; }
[[ -S "$PHP_FPM_SOCKET" ]] || { echo "PHP-FPM socket not found: $PHP_FPM_SOCKET" >&2; exit 1; }

memory_mb="$(awk '/MemTotal/ {print int($2/1024)}' /proc/meminfo)"
free_kb="$(df -Pk "$APP_BASE" | awk 'NR==2 {print $4}')"
free_gb=$((free_kb / 1024 / 1024))
(( memory_mb >= 2048 )) || { echo "At least 2 GB RAM is required for an on-host Next.js build" >&2; exit 1; }
(( free_gb >= 5 )) || { echo "At least 5 GB free disk is required under $APP_BASE" >&2; exit 1; }
if (( memory_mb < 4096 )); then
  echo "Warning: less than 4 GB RAM; configure swap before the first production build" >&2
fi

if ss -ltn "sport = :$STOREFRONT_PORT" | grep -q LISTEN; then
  echo "Port $STOREFRONT_PORT is already listening (expected only after service start)"
fi

systemctl is-active --quiet "$PHP_FPM_SERVICE" || { echo "$PHP_FPM_SERVICE is not active" >&2; exit 1; }
systemctl is-active --quiet "$MYSQL_SERVICE" || { echo "$MYSQL_SERVICE is not active" >&2; exit 1; }
nginx -t

printf 'Host preflight passed: %s %s, Node %s, npm %s, nginx=%s, php=%s, mysql=%s, RAM=%sMB, free=%sGB\n' \
  "$ID" "$VERSION_ID" "$node_version" "$(npm --version)" \
  "$(nginx -v 2>&1 | sed 's#nginx version: ##')" "$(php -r 'echo PHP_VERSION;')" \
  "$(mysql --version | head -1)" "$memory_mb" "$free_gb"
