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
[[ "$EXPECTED_ENVIRONMENT" == "staging" || "$EXPECTED_ENVIRONMENT" == "production" ]] || {
  echo "Expected environment must be staging or production" >&2
  exit 2
}
[[ "$EXPECTED_INDEXING" == "true" || "$EXPECTED_INDEXING" == "false" ]] || {
  echo "Expected indexing must be true or false" >&2
  exit 2
}

curl_opts=(--fail --silent --show-error --location --max-time 20)
if [[ -n "${CURL_USER:-}" ]]; then curl_opts+=(--user "$CURL_USER"); fi
if [[ -n "${CURL_RESOLVE:-}" ]]; then curl_opts+=(--resolve "$CURL_RESOLVE"); fi

health="$(curl "${curl_opts[@]}" "$BASE_URL/api/health")"
HEALTH_RESPONSE="$health" \
EXPECTED_ENVIRONMENT="$EXPECTED_ENVIRONMENT" \
EXPECTED_DEPLOYMENT_ID="$EXPECTED_DEPLOYMENT_ID" \
EXPECTED_INDEXING="$EXPECTED_INDEXING" \
node <<'NODE'
const value = JSON.parse(process.env.HEALTH_RESPONSE || "{}");
const expectedIndexing = process.env.EXPECTED_INDEXING === "true";
if (value.status !== "ok") throw new Error("health status is not ok");
if (value.appEnvironment !== process.env.EXPECTED_ENVIRONMENT) throw new Error("wrong appEnvironment");
if (process.env.EXPECTED_DEPLOYMENT_ID && value.deploymentId !== process.env.EXPECTED_DEPLOYMENT_ID) throw new Error("wrong deploymentId");
if (value.indexingEnabled !== expectedIndexing) throw new Error("wrong indexingEnabled state");
console.log(`${value.appEnvironment} ${value.deploymentId || "no-id"} indexing=${value.indexingEnabled}`);
NODE

headers="$(curl "${curl_opts[@]}" --head "$BASE_URL/")"
curl "${curl_opts[@]}" "$BASE_URL/" >/dev/null
robots="$(curl "${curl_opts[@]}" "$BASE_URL/robots.txt")"
sitemap="$(curl "${curl_opts[@]}" "$BASE_URL/sitemap.xml")"

if [[ "$EXPECTED_INDEXING" == "true" ]]; then
  grep -q "Sitemap:" <<<"$robots" || { echo "Indexable robots.txt has no sitemap" >&2; exit 1; }
  ! grep -qi '^x-robots-tag:.*noindex' <<<"$headers" || { echo "Indexable storefront still sends X-Robots-Tag noindex" >&2; exit 1; }
else
  grep -qi '^x-robots-tag:.*noindex' <<<"$headers" || { echo "Closed storefront has no X-Robots-Tag noindex header" >&2; exit 1; }
  grep -q "Disallow: /" <<<"$robots" || { echo "Closed robots.txt is not blocking crawlers" >&2; exit 1; }
  ! grep -q '<url>' <<<"$sitemap" || { echo "Closed sitemap contains URLs" >&2; exit 1; }
fi

echo "Storefront smoke test passed"
