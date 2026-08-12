#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-/etc/ofisnye-dveri/production-inventory.env}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-production-inventory.sh" "$INVENTORY_FILE"
bash "$SCRIPT_DIR/verify-wordpress-environment.sh" "$INVENTORY_FILE"
