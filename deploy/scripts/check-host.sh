#!/usr/bin/env bash
set -Eeuo pipefail

APP_ROOT="${APP_ROOT:-/var/www/storefront}"
NODE_BIN="${NODE_BIN:-/usr/bin/node}"

for command in git npm curl tar systemctl nginx; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done

[[ -x "$NODE_BIN" ]] || { echo "Node binary is not executable: $NODE_BIN" >&2; exit 1; }

node_version="$($NODE_BIN -p 'process.versions.node')"
node_major="${node_version%%.*}"
if (( node_major < 22 || node_major >= 25 )); then
  echo "Unsupported Node version: $node_version (expected >=22.14 and <25)" >&2
  exit 1
fi

for directory in "$APP_ROOT" "$APP_ROOT/repository" "$APP_ROOT/shared"; do
  [[ -e "$directory" ]] || echo "Pending path: $directory"
done

printf 'Host preflight passed. Node %s, npm %s, nginx %s\n' \
  "$node_version" "$(npm --version)" "$(nginx -v 2>&1)"
