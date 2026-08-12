#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-/etc/ofisnye-dveri/production-inventory.env}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-production-inventory.sh" "$INVENTORY_FILE"

set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

BASE_URL="https://$WORDPRESS_DOMAIN"
curl_common=(--silent --show-error --max-time 20)
if [[ -n "${CURL_RESOLVE:-}" ]]; then curl_common+=(--resolve "$CURL_RESOLVE"); fi

status_code() {
  curl "${curl_common[@]}" --output /dev/null --write-out '%{http_code}' "$1"
}

expect_status() {
  local url="$1"
  local expected="$2"
  local actual
  actual="$(status_code "$url")"
  [[ "$actual" == "$expected" ]] || {
    echo "Unexpected HTTP status for $url: got $actual, expected $expected" >&2
    exit 1
  }
}

headers="$(curl "${curl_common[@]}" --head "$BASE_URL/wp-json/")"
grep -qi '^x-robots-tag:.*noindex' <<<"$headers" || {
  echo "WordPress origin REST does not send X-Robots-Tag noindex" >&2
  exit 1
}

rest_root="$(curl "${curl_common[@]}" --fail "$BASE_URL/wp-json/")"
REST_RESPONSE="$rest_root" node <<'NODE'
const value = JSON.parse(process.env.REST_RESPONSE || "{}");
if (!Array.isArray(value.namespaces) || !value.namespaces.includes("wp/v2")) {
  throw new Error("wp/v2 REST namespace is missing");
}
NODE

robots="$(curl "${curl_common[@]}" --fail "$BASE_URL/robots.txt")"
grep -q 'Disallow: /' <<<"$robots" || {
  echo "WordPress robots.txt is not closed" >&2
  exit 1
}

expect_status "$BASE_URL/" 404
expect_status "$BASE_URL/index.php" 404
expect_status "$BASE_URL/xmlrpc.php" 403
expect_status "$BASE_URL/wp-cron.php" 403
expect_status "$BASE_URL/wp-login.php" 401
expect_status "$BASE_URL/wp-content/uploads/ofisnye-dveri-security-probe.php" 403

admin_status="$(status_code "$BASE_URL/wp-admin/")"
[[ "$admin_status" == "401" ]] || {
  echo "WordPress admin must require outer Basic Auth; got $admin_status" >&2
  exit 1
}

if [[ -n "${WP_ADMIN_CURL_USER:-}" ]]; then
  authenticated_admin_status="$(curl "${curl_common[@]}" --user "$WP_ADMIN_CURL_USER" --output /dev/null --write-out '%{http_code}' --location "$BASE_URL/wp-admin/")"
  [[ "$authenticated_admin_status" =~ ^(200|302)$ ]] || {
    echo "Authenticated WordPress admin check failed: $authenticated_admin_status" >&2
    exit 1
  }
fi

echo "WordPress production origin hardening verification passed"
