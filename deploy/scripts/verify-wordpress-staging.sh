#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-/etc/ofisnye-dveri/staging-inventory.env}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-staging-inventory.sh" "$INVENTORY_FILE"
set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
# shellcheck disable=SC1090
source "$STOREFRONT_ENV_FILE"
set +a

# Создаем временную директорию для хранения больших JSON-ответов,
# чтобы избежать ошибки "Argument list too long" при передаче через env
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT

WP_URL="https://$WORDPRESS_DOMAIN"
for command in curl node wp php; do command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }; done

wp_cmd=(wp --path="$WORDPRESS_ROOT" --allow-root)
"${wp_cmd[@]}" core is-installed
home_url="$("${wp_cmd[@]}" option get home)"
site_url="$("${wp_cmd[@]}" option get siteurl)"
[[ "$home_url" == "$WP_URL" && "$site_url" == "$WP_URL" ]] || {
  echo "WordPress home/siteurl do not match $WP_URL" >&2; exit 1;
}

for plugin in door-family-taxonomy.php headless-seo-foundation.php portfolio-project-cpt.php public-article-no.php storefront-order-idempotency.php; do
  [[ -f "$WORDPRESS_ROOT/wp-content/mu-plugins/$plugin" ]] || { echo "Missing MU-plugin: $plugin" >&2; exit 1; }
done

"${wp_cmd[@]}" plugin list --format=json > "$tmpdir/plugins.json"
PLUGIN_FILE="$tmpdir/plugins.json" node <<'NODE'
const fs = require('fs');
const plugins = JSON.parse(fs.readFileSync(process.env.PLUGIN_FILE, 'utf-8') || "[]");
const active = plugins.filter((p) => p.status === "active" || p.status === "must-use");
if (!active.some((p) => p.name === "woocommerce")) throw new Error("WooCommerce is not active");
if (!active.some((p) => /advanced-custom-fields/.test(p.name))) throw new Error("ACF is not active");
NODE

curl_opts=(--fail --silent --show-error --max-time 20)
curl "${curl_opts[@]}" "$WP_URL/wp-json/" > "$tmpdir/root.json"
ROOT_FILE="$tmpdir/root.json" node <<'NODE'
const fs = require('fs');
const v = JSON.parse(fs.readFileSync(process.env.ROOT_FILE, 'utf-8'));
if(!v.namespaces?.includes("wp/v2")) process.exit(1);
NODE

curl "${curl_opts[@]}" "$WP_URL/wp-json/wp/v2/pages?slug=glavnaya&status=publish&_fields=id,slug,acf" > "$tmpdir/homepage.json"
curl "${curl_opts[@]}" "$WP_URL/wp-json/wp/v2/pages?slug=$WP_SITE_CHROME_PAGE_SLUG&status=publish&_fields=id,slug,acf" > "$tmpdir/chrome.json"
HOMEPAGE_FILE="$tmpdir/homepage.json" CHROME_FILE="$tmpdir/chrome.json" node <<'NODE'
const fs = require('fs');
const homepage = JSON.parse(fs.readFileSync(process.env.HOMEPAGE_FILE, 'utf-8') || "[]");
const chrome = JSON.parse(fs.readFileSync(process.env.CHROME_FILE, 'utf-8') || "[]");
if (!Array.isArray(homepage) || homepage.length !== 1 || typeof homepage[0].acf !== "object") throw new Error("Homepage ACF response is invalid");
if (!("home_hero_slide_enabled" in homepage[0].acf)) throw new Error("Homepage ACF contract is incomplete");
if (!Array.isArray(chrome) || chrome.length !== 1 || typeof chrome[0].acf !== "object") throw new Error("Site chrome ACF response is invalid");
NODE

for slug in "$WP_HEADER_NAVIGATION_SLUG" "$WP_FOOTER_NAVIGATION_SLUG"; do
  curl "${curl_opts[@]}" "$WP_URL/wp-json/wp/v2/navigation?slug=$slug&status=publish&_fields=id,slug,title,content" > "$tmpdir/navigation.json"
  NAVIGATION_FILE="$tmpdir/navigation.json" EXPECTED_SLUG="$slug" node <<'NODE'
const fs = require('fs');
const items = JSON.parse(fs.readFileSync(process.env.NAVIGATION_FILE, 'utf-8') || "[]");
if (!Array.isArray(items) || items.length !== 1 || items[0].slug !== process.env.EXPECTED_SLUG) throw new Error("Navigation response is invalid");
const html = items[0].content?.rendered || "";
if (!html.includes("/mezhkomnatnye-dveri")) throw new Error("Navigation has no /mezhkomnatnye-dveri link");
if (html.includes("/catalog")) throw new Error("Legacy /catalog link is still present");
NODE
done

curl "${curl_opts[@]}" --user "$WC_CONSUMER_KEY:$WC_CONSUMER_SECRET" \
  "$WP_URL/wp-json/wc/v3/products?status=publish&per_page=1" > "$tmpdir/products.json"
PRODUCTS_FILE="$tmpdir/products.json" node <<'NODE'
const fs = require('fs');
const items = JSON.parse(fs.readFileSync(process.env.PRODUCTS_FILE, 'utf-8') || "[]");
if (!Array.isArray(items) || items.length < 1) throw new Error("Woo products response is empty");
const item = items[0];
if (item.type !== "simple") throw new Error("Sample Woo product is not simple");
if (!("public_article_no" in item)) throw new Error("public_article_no REST field is missing");
if (!("headless_seo" in item)) throw new Error("headless_seo REST field is missing");
NODE

echo "WordPress/Woo/ACF/Navigation staging verification passed"
