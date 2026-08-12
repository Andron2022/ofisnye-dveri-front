#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-/etc/ofisnye-dveri/production-inventory.env}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

bash "$SCRIPT_DIR/check-environment-inventory.sh" "$INVENTORY_FILE"

set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

[[ "$ENVIRONMENT" == "production" ]] || {
  echo "Expected a production inventory, got: $ENVIRONMENT" >&2
  exit 1
}
