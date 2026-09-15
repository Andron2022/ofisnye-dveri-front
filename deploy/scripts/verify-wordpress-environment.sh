#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-}"
[[ -n "$INVENTORY_FILE" ]] || {
  echo "Usage: $0 /etc/ofisnye-dveri/<environment>-inventory.env" >&2
  exit 2
}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

bash "$SCRIPT_DIR/check-environment-inventory.sh" "$INVENTORY_FILE"

set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
# shellcheck disable=SC1090
source "$STOREFRONT_ENV_FILE"
set +a

# Потенциально большие JSON-ответы храним во временных файлах.
# Это исключает ошибку "Argument list too long":
# большие JSON больше не передаются Node.js через переменные окружения.
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

WP_URL="https://$WORDPRESS_DOMAIN"

for command in curl node wp sha256sum; do
  command -v "$command" >/dev/null || {
    echo "Missing command: $command" >&2
    exit 1
  }
done

wp_cmd=(wp --path="$WORDPRESS_ROOT" --allow-root)

# WordPress установлен и доступен через WP-CLI.
"${wp_cmd[@]}" core is-installed

# WordPress must be bound to the origin fixed by this environment inventory.
home_url="$("${wp_cmd[@]}" option get home)"
site_url="$("${wp_cmd[@]}" option get siteurl)"

[[ "$home_url" == "$WP_URL" && "$site_url" == "$WP_URL" ]] || {
  echo "WordPress home/siteurl do not match $WP_URL" >&2
  exit 1
}

# Проверяем точный project-managed MU-code contract, развернутый из Git.
WORDPRESS_CODE_STATE_ROOT="${WORDPRESS_CODE_STATE_ROOT:-/var/lib/ofisnye-dveri/wordpress-code}"
WORDPRESS_CODE_MANIFEST_FILE="$WORDPRESS_CODE_STATE_ROOT/${ENVIRONMENT}.manifest"
WORDPRESS_CODE_STATE_FILE="$WORDPRESS_CODE_STATE_ROOT/${ENVIRONMENT}.state"
[[ -f "$WORDPRESS_CODE_MANIFEST_FILE" ]] || { echo "WordPress managed-code manifest is missing" >&2; exit 1; }
[[ -f "$WORDPRESS_CODE_STATE_FILE" ]] || { echo "WordPress managed-code state is missing" >&2; exit 1; }
managed_count=0
while read -r sum plugin; do
  [[ "$sum" =~ ^[0-9a-f]{64}$ && "$plugin" =~ ^[A-Za-z0-9._-]+\.php$ ]] || continue
  live="$WORDPRESS_ROOT/wp-content/mu-plugins/$plugin"
  [[ -f "$live" ]] || { echo "Missing managed MU-plugin: $plugin" >&2; exit 1; }
  actual="$(sha256sum "$live" | awk '{print $1}')"
  [[ "$actual" == "$sum" ]] || { echo "Managed MU-plugin checksum mismatch: $plugin" >&2; exit 1; }
  managed_count=$((managed_count + 1))
done < <(grep -E '^[0-9a-f]{64}  [A-Za-z0-9._-]+\.php$' "$WORDPRESS_CODE_MANIFEST_FILE" || true)
(( managed_count > 0 )) || { echo "WordPress managed-code manifest has no PHP files" >&2; exit 1; }

manifest_commit="$(sed -n 's/^GIT_COMMIT=//p' "$WORDPRESS_CODE_MANIFEST_FILE" | head -1)"
# shellcheck disable=SC1090
source "$WORDPRESS_CODE_STATE_FILE"
[[ -n "$manifest_commit" && "${WORDPRESS_CODE_GIT_COMMIT:-}" == "$manifest_commit" ]] || {
  echo "WordPress managed-code state/manifest commit mismatch" >&2
  exit 1
}

# Проверяем WooCommerce и ACF.
"${wp_cmd[@]}" plugin list --format=json > "$tmpdir/plugins.json"

PLUGIN_FILE="$tmpdir/plugins.json" node <<'NODE'
const fs = require("node:fs");

const plugins = JSON.parse(
  fs.readFileSync(process.env.PLUGIN_FILE, "utf8") || "[]"
);

const active = plugins.filter(
  (plugin) =>
    plugin.status === "active" ||
    plugin.status === "must-use"
);

if (!active.some((plugin) => plugin.name === "woocommerce")) {
  throw new Error("WooCommerce is not active");
}

if (!active.some((plugin) =>
  /advanced-custom-fields/.test(plugin.name)
)) {
  throw new Error("ACF is not active");
}
NODE

curl_opts=(
  --fail
  --silent
  --show-error
  --max-time 20
)

# Проверяем базовый WordPress REST API.
curl "${curl_opts[@]}" \
  "$WP_URL/wp-json/" \
  > "$tmpdir/root.json"

ROOT_FILE="$tmpdir/root.json" node <<'NODE'
const fs = require("node:fs");

const root = JSON.parse(
  fs.readFileSync(process.env.ROOT_FILE, "utf8")
);

if (!root.namespaces?.includes("wp/v2")) {
  throw new Error("WordPress REST namespace wp/v2 is missing");
}

if (!root.namespaces?.includes("od/v1")) {
  throw new Error("Door SEO landing REST namespace od/v1 is missing");
}

if (!root.routes?.["/od/v1/door-catalog-products"]) {
  throw new Error("Door catalog products REST route is missing");
}

if (!root.routes?.["/od/v1/door-configuration/schema"]) {
  throw new Error("Door configuration schema REST route is missing");
}
NODE

# Проверяем code-health нового Door Product Schema contract. Это не readiness-check:
# fallback может быть включен, пока staging configuration ещё настраивается.
curl "${curl_opts[@]}" \
  "$WP_URL/wp-json/od/v1/door-configuration/schema" \
  > "$tmpdir/door-configuration-schema.json"

DOOR_CONFIGURATION_SCHEMA_FILE="$tmpdir/door-configuration-schema.json" node <<'NODE'
const fs = require("node:fs");
const schema = JSON.parse(
  fs.readFileSync(process.env.DOOR_CONFIGURATION_SCHEMA_FILE, "utf8") || "{}"
);
if (schema.schema_version !== 2) throw new Error("Door configuration schema_version must be 2");
for (const key of ["attributes", "catalog_filters", "option_groups", "accessory_groups"]) {
  if (!Array.isArray(schema[key])) throw new Error(`Door configuration ${key} must be an array`);
}
if (!schema.fallback_modes || typeof schema.fallback_modes !== "object") {
  throw new Error("Door configuration fallback_modes is missing");
}
for (const key of ["family", "variant_dimensions", "order_options", "accessories"]) {
  if (typeof schema.fallback_modes[key] !== "boolean") {
    throw new Error(`Door configuration fallback_modes.${key} must be boolean`);
  }
}
NODE

# Проверяем публичный headless-контракт SEO-посадочных и стабильных Woo terms.
curl "${curl_opts[@]}" \
  "$WP_URL/wp-json/od/v1/door-seo-landings" \
  > "$tmpdir/door-seo-landings.json"

curl "${curl_opts[@]}" \
  "$WP_URL/wp-json/od/v1/door-filter-terms" \
  > "$tmpdir/door-filter-terms.json"

root_category_id="$("${wp_cmd[@]}" term get product_cat mezhkomnatnye-dveri --by=slug --field=term_id)"
curl "${curl_opts[@]}" \
  "$WP_URL/wp-json/od/v1/door-catalog-products?base_category_id=$root_category_id" \
  > "$tmpdir/door-catalog-products.json"

DOOR_SEO_LANDINGS_FILE="$tmpdir/door-seo-landings.json" \
DOOR_FILTER_TERMS_FILE="$tmpdir/door-filter-terms.json" \
DOOR_CATALOG_PRODUCTS_FILE="$tmpdir/door-catalog-products.json" \
node <<'NODE'
const fs = require("node:fs");

const landings = JSON.parse(
  fs.readFileSync(process.env.DOOR_SEO_LANDINGS_FILE, "utf8") || "{}"
);
const filterTerms = JSON.parse(
  fs.readFileSync(process.env.DOOR_FILTER_TERMS_FILE, "utf8") || "{}"
);
const catalogProducts = JSON.parse(
  fs.readFileSync(process.env.DOOR_CATALOG_PRODUCTS_FILE, "utf8") || "{}"
);

if (!Array.isArray(landings.items)) {
  throw new Error("Door SEO landing REST collection is invalid");
}

if (!Array.isArray(filterTerms.groups)) {
  throw new Error("Door filter terms REST collection is invalid");
}

for (const landing of landings.items) {
  if (!Number.isInteger(landing?.navigation_priority)) {
    throw new Error("Door SEO landing navigation_priority contract is invalid");
  }

  if (typeof landing?.show_in_popular_collections !== "boolean") {
    throw new Error("Door SEO landing show_in_popular_collections contract is invalid");
  }

  if (!Array.isArray(landing?.rules)) {
    throw new Error("Door SEO landing rules contract is invalid");
  }

  for (const rule of landing.rules) {
    if (typeof rule?.filter_key !== "string" || typeof rule?.taxonomy !== "string" || !Array.isArray(rule?.terms)) {
      throw new Error("Door SEO landing rule contract is invalid");
    }
    if (rule.terms.some((term) => !Number.isInteger(term?.id) || typeof term?.slug !== "string")) {
      throw new Error(`Door SEO landing term contract is invalid for ${rule.filter_key}`);
    }
  }
}

if (!Number.isInteger(catalogProducts?.base_category_id) || !Array.isArray(catalogProducts?.ids)) {
  throw new Error("Door catalog products REST contract is invalid");
}
if (!Number.isInteger(catalogProducts?.count) || catalogProducts.count !== catalogProducts.ids.length) {
  throw new Error("Door catalog products count contract is invalid");
}
if (catalogProducts.ids.some((id) => !Number.isInteger(id))) {
  throw new Error("Door catalog products IDs contract is invalid");
}

for (const group of filterTerms.groups) {
  if (typeof group?.filter_key !== "string" || typeof group?.taxonomy !== "string") {
    throw new Error("Door filter term group contract is invalid");
  }

  if (!Array.isArray(group.terms)) {
    throw new Error(`Door filter terms are invalid for ${group.filter_key}`);
  }

  for (const term of group.terms) {
    if (!Number.isInteger(term?.id) || typeof term?.name !== "string" || typeof term?.slug !== "string") {
      throw new Error(`Door filter term contract is invalid for ${group.filter_key}`);
    }
  }
}
NODE

# Проверяем ACF-контракт главной страницы.
curl "${curl_opts[@]}" \
  "$WP_URL/wp-json/wp/v2/pages?slug=glavnaya&status=publish&_fields=id,slug,acf" \
  > "$tmpdir/homepage.json"

# Проверяем ACF-контракт глобальных настроек сайта.
curl "${curl_opts[@]}" \
  "$WP_URL/wp-json/wp/v2/pages?slug=$WP_SITE_CHROME_PAGE_SLUG&status=publish&_fields=id,slug,acf" \
  > "$tmpdir/chrome.json"

HOMEPAGE_FILE="$tmpdir/homepage.json" \
CHROME_FILE="$tmpdir/chrome.json" \
node <<'NODE'
const fs = require("node:fs");

const homepage = JSON.parse(
  fs.readFileSync(process.env.HOMEPAGE_FILE, "utf8") || "[]"
);

const chrome = JSON.parse(
  fs.readFileSync(process.env.CHROME_FILE, "utf8") || "[]"
);

if (
  !Array.isArray(homepage) ||
  homepage.length !== 1 ||
  typeof homepage[0].acf !== "object"
) {
  throw new Error("Homepage ACF response is invalid");
}

if (!("home_hero_slide_enabled" in homepage[0].acf)) {
  throw new Error("Homepage ACF contract is incomplete");
}

if (
  !Array.isArray(chrome) ||
  chrome.length !== 1 ||
  typeof chrome[0].acf !== "object"
) {
  throw new Error("Site chrome ACF response is invalid");
}
NODE

# Проверяем существование и REST-контракт header/footer Navigation.
# Содержимое конкретных ссылок здесь намеренно не проверяется:
# это управляемый из WordPress бизнес-контент.
for slug in \
  "$WP_HEADER_NAVIGATION_SLUG" \
  "$WP_FOOTER_NAVIGATION_SLUG"; do

  curl "${curl_opts[@]}" \
    "$WP_URL/wp-json/wp/v2/navigation?slug=$slug&status=publish&_fields=id,slug,title,content" \
    > "$tmpdir/navigation.json"

  NAVIGATION_FILE="$tmpdir/navigation.json" \
  EXPECTED_SLUG="$slug" \
  node <<'NODE'
const fs = require("node:fs");

const items = JSON.parse(
  fs.readFileSync(process.env.NAVIGATION_FILE, "utf8") || "[]"
);

if (
  !Array.isArray(items) ||
  items.length !== 1 ||
  items[0].slug !== process.env.EXPECTED_SLUG
) {
  throw new Error(
    `Navigation response is invalid for slug: ${process.env.EXPECTED_SLUG}`
  );
}

if (typeof items[0].content?.rendered !== "string") {
  throw new Error(
    `Navigation rendered content is missing for slug: ${process.env.EXPECTED_SLUG}`
  );
}
NODE

done

# Проверяем Woo REST и headless-поля на одном опубликованном товаре.
curl "${curl_opts[@]}" \
  --user "$WC_CONSUMER_KEY:$WC_CONSUMER_SECRET" \
  "$WP_URL/wp-json/wc/v3/products?status=publish&per_page=1" \
  > "$tmpdir/products.json"

PRODUCTS_FILE="$tmpdir/products.json" node <<'NODE'
const fs = require("node:fs");

const items = JSON.parse(
  fs.readFileSync(process.env.PRODUCTS_FILE, "utf8") || "[]"
);

if (!Array.isArray(items) || items.length < 1) {
  throw new Error("Woo products response is empty");
}

const item = items[0];

if (item.type !== "simple") {
  throw new Error("Sample Woo product is not simple");
}

if (!("public_article_no" in item)) {
  throw new Error("public_article_no REST field is missing");
}

if (!("headless_seo" in item)) {
  throw new Error("headless_seo REST field is missing");
}
NODE

echo "WordPress/Woo/ACF/Navigation $ENVIRONMENT verification passed"