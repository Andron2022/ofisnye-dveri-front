#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-}"
REQUIRE_FALLBACKS_OFF="${2:-true}"
[[ -n "$INVENTORY_FILE" ]] || {
  echo "Usage: $0 /etc/ofisnye-dveri/<environment>-inventory.env [true|false]" >&2
  exit 2
}
[[ "$REQUIRE_FALLBACKS_OFF" == "true" || "$REQUIRE_FALLBACKS_OFF" == "false" ]] || {
  echo "Second argument must be true or false" >&2
  exit 2
}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-environment-inventory.sh" "$INVENTORY_FILE"
set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

WP_URL="https://$WORDPRESS_DOMAIN"
wp_cmd=(wp --path="$WORDPRESS_ROOT" --allow-root)
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
curl_opts=(--fail --silent --show-error --max-time 30)

curl "${curl_opts[@]}" "$WP_URL/wp-json/od/v1/door-configuration/schema" > "$tmpdir/schema.json"
SCHEMA_FILE="$tmpdir/schema.json" REQUIRE_FALLBACKS_OFF="$REQUIRE_FALLBACKS_OFF" node <<'NODE'
const fs = require("node:fs");
const schema = JSON.parse(fs.readFileSync(process.env.SCHEMA_FILE, "utf8") || "{}");
if (schema.schema_version !== 2) throw new Error("Door configuration schema_version must be 2");
for (const key of ["attributes", "catalog_filters", "option_groups", "accessory_groups"]) {
  if (!Array.isArray(schema[key])) throw new Error(`Door configuration ${key} must be an array`);
}
const modes = schema.fallback_modes;
if (!modes || typeof modes !== "object") throw new Error("fallback_modes is missing");
for (const key of ["family", "variant_dimensions", "order_options", "accessories"]) {
  if (typeof modes[key] !== "boolean") throw new Error(`fallback_modes.${key} must be boolean`);
  if (process.env.REQUIRE_FALLBACKS_OFF === "true" && modes[key]) {
    throw new Error(`fallback_modes.${key} must be false for readiness acceptance`);
  }
}
NODE

root_category_id="$("${wp_cmd[@]}" term get product_cat mezhkomnatnye-dveri --by=slug --field=term_id)"
curl "${curl_opts[@]}" "$WP_URL/wp-json/od/v1/door-catalog-products?base_category_id=$root_category_id" > "$tmpdir/products.json"
mapfile -t product_ids < <(PRODUCTS_FILE="$tmpdir/products.json" node <<'NODE'
const fs = require("node:fs");
const payload = JSON.parse(fs.readFileSync(process.env.PRODUCTS_FILE, "utf8") || "{}");
if (!Array.isArray(payload.ids)) throw new Error("door-catalog-products ids are missing");
for (const id of payload.ids) {
  if (!Number.isInteger(id)) throw new Error("door-catalog-products contains non-integer ID");
  console.log(id);
}
NODE
)

((${#product_ids[@]} > 0)) || { echo "No published door products found for readiness check" >&2; exit 1; }
invalid=()
for product_id in "${product_ids[@]}"; do
  if ! curl "${curl_opts[@]}" "$WP_URL/wp-json/od/v1/door-product-configuration/$product_id" > "$tmpdir/product-$product_id.json"; then
    invalid+=("$product_id")
    continue
  fi
  if ! PRODUCT_FILE="$tmpdir/product-$product_id.json" node <<'NODE'
const fs = require("node:fs");
const payload = JSON.parse(fs.readFileSync(process.env.PRODUCT_FILE, "utf8") || "{}");
if (payload.schema_version !== 2 || payload.valid !== true) process.exit(1);
if (!Array.isArray(payload.variant_dimensions) || !Array.isArray(payload.option_groups) || !Array.isArray(payload.accessory_groups)) process.exit(1);
NODE
  then
    invalid+=("$product_id")
  fi
done

if ((${#invalid[@]})); then
  printf 'Door configuration readiness failed for product IDs: %s\n' "${invalid[*]}" >&2
  exit 1
fi

echo "Door configuration readiness passed: ${#product_ids[@]} products, fallbacks_off_required=$REQUIRE_FALLBACKS_OFF"
