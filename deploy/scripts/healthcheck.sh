#!/usr/bin/env bash
set -Eeuo pipefail

URL="${1:-http://127.0.0.1:3001/api/health}"
EXPECTED_ENVIRONMENT="${2:-staging}"
EXPECTED_DEPLOYMENT_ID="${3:-}"
ATTEMPTS="${HEALTHCHECK_ATTEMPTS:-30}"
DELAY_SECONDS="${HEALTHCHECK_DELAY_SECONDS:-2}"

for ((attempt = 1; attempt <= ATTEMPTS; attempt++)); do
  if response="$(curl --fail --silent --show-error --max-time 5 "$URL" 2>/dev/null)"; then
    if HEALTH_RESPONSE="$response" EXPECTED_ENVIRONMENT="$EXPECTED_ENVIRONMENT" EXPECTED_DEPLOYMENT_ID="$EXPECTED_DEPLOYMENT_ID" node <<'NODE'
const data = JSON.parse(process.env.HEALTH_RESPONSE || "{}");
if (data.status !== "ok") process.exit(1);
if (data.appEnvironment !== process.env.EXPECTED_ENVIRONMENT) process.exit(1);
const expectedId = process.env.EXPECTED_DEPLOYMENT_ID || "";
if (expectedId && data.deploymentId !== expectedId) process.exit(1);
NODE
    then
      printf 'Health check passed on attempt %s: %s (%s)\n' \
        "$attempt" "$URL" "${EXPECTED_DEPLOYMENT_ID:-any deployment}"
      exit 0
    fi
  fi
  sleep "$DELAY_SECONDS"
done

echo "Health check failed after ${ATTEMPTS} attempts: $URL" >&2
exit 1
