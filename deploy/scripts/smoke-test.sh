#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="${1:-}"
EXPECTED_INDEXING="${2:-false}"
[[ -n "$BASE_URL" ]] || { echo "Usage: $0 https://domain.example [true|false]" >&2; exit 2; }

curl_opts=(--fail --silent --show-error --location --max-time 15)
if [[ -n "${CURL_USER:-}" ]]; then
  curl_opts+=(--user "$CURL_USER")
fi

echo "Health"
curl "${curl_opts[@]}" "$BASE_URL/api/health" | node -e '
let data=""; process.stdin.on("data", c => data += c); process.stdin.on("end", () => {
  const value=JSON.parse(data); if(value.status!=="ok") process.exit(1);
  console.log(`${value.environment} ${value.release}`);
});'

echo "Homepage"
curl "${curl_opts[@]}" "$BASE_URL/" >/dev/null

echo "Robots"
robots="$(curl "${curl_opts[@]}" "$BASE_URL/robots.txt")"
if [[ "$EXPECTED_INDEXING" == "true" ]]; then
  grep -q "Sitemap:" <<<"$robots" || { echo "Production robots.txt has no sitemap" >&2; exit 1; }
else
  grep -q "Disallow: /" <<<"$robots" || { echo "Staging robots.txt is not closed" >&2; exit 1; }
fi

echo "Smoke test passed"
