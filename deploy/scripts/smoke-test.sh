#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="${1:-}"
EXPECTED_ENVIRONMENT="${2:-staging}"
EXPECTED_DEPLOYMENT_ID="${3:-}"
EXPECTED_INDEXING="${4:-false}"
[[ -n "$BASE_URL" ]] || {
  echo "Usage: $0 https://domain.example <staging|production> [deployment-id] [true|false]" >&2
  exit 2
}

curl_opts=(--fail --silent --show-error --location --max-time 20)
if [[ -n "${CURL_USER:-}" ]]; then curl_opts+=(--user "$CURL_USER"); fi

health="$(curl "${curl_opts[@]}" "$BASE_URL/api/health")"
HEALTH_RESPONSE="$health" EXPECTED_ENVIRONMENT="$EXPECTED_ENVIRONMENT" EXPECTED_DEPLOYMENT_ID="$EXPECTED_DEPLOYMENT_ID" node <<'NODE'
const value = JSON.parse(process.env.HEALTH_RESPONSE || "{}");
if (value.status !== "ok") throw new Error("health status is not ok");
if (value.appEnvironment !== process.env.EXPECTED_ENVIRONMENT) throw new Error("wrong appEnvironment");
if (process.env.EXPECTED_DEPLOYMENT_ID && value.deploymentId !== process.env.EXPECTED_DEPLOYMENT_ID) throw new Error("wrong deploymentId");
console.log(`${value.appEnvironment} ${value.deploymentId || "no-id"}`);
NODE

headers="$(curl "${curl_opts[@]}" --head "$BASE_URL/")"
curl "${curl_opts[@]}" "$BASE_URL/" >/dev/null
robots="$(curl "${curl_opts[@]}" "$BASE_URL/robots.txt")"
sitemap="$(curl "${curl_opts[@]}" "$BASE_URL/sitemap.xml")"

if [[ "$EXPECTED_INDEXING" == "true" ]]; then
  grep -q "Sitemap:" <<<"$robots" || { echo "Production robots.txt has no sitemap" >&2; exit 1; }
else
  grep -qi '^x-robots-tag:.*noindex' <<<"$headers" || { echo "Staging has no X-Robots-Tag noindex header" >&2; exit 1; }
  grep -q "Disallow: /" <<<"$robots" || { echo "Staging robots.txt is not closed" >&2; exit 1; }
  ! grep -q '<url>' <<<"$sitemap" || { echo "Staging sitemap contains URLs" >&2; exit 1; }
fi

echo "Storefront smoke test passed"
