#!/usr/bin/env bash
set -Eeuo pipefail

URL="${1:-http://127.0.0.1:3000/api/health}"
ATTEMPTS="${HEALTHCHECK_ATTEMPTS:-20}"
DELAY_SECONDS="${HEALTHCHECK_DELAY_SECONDS:-2}"

for ((attempt = 1; attempt <= ATTEMPTS; attempt++)); do
  if response="$(curl --fail --silent --show-error --max-time 5 "$URL" 2>/dev/null)"; then
    if grep -q '"status":"ok"' <<<"$response"; then
      printf 'Health check passed on attempt %s: %s\n' "$attempt" "$URL"
      exit 0
    fi
  fi

  sleep "$DELAY_SECONDS"
done

echo "Health check failed after ${ATTEMPTS} attempts: ${URL}" >&2
exit 1
