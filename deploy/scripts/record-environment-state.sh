#!/usr/bin/env bash
set -Eeuo pipefail

INVENTORY_FILE="${1:-}"
[[ -n "$INVENTORY_FILE" ]] || {
  echo "Usage: $0 /etc/ofisnye-dveri/<environment>-inventory.env [output-file]" >&2
  exit 2
}
OUTPUT_FILE="${2:-}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-environment-inventory.sh" "$INVENTORY_FILE"
set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

if [[ -z "$OUTPUT_FILE" ]]; then
  OUTPUT_DIR="/var/lib/ofisnye-dveri/deployment-records"
  mkdir -p "$OUTPUT_DIR"
  OUTPUT_FILE="$OUTPUT_DIR/${ENVIRONMENT}-$(date -u +%Y%m%dT%H%M%SZ).md"
fi

cert_info() {
  local domain="$1"
  timeout 15 openssl s_client -connect "$domain:443" -servername "$domain" </dev/null 2>/dev/null \
    | openssl x509 -noout -subject -issuer -serial -dates -fingerprint -sha256 2>/dev/null || true
}

resolve_ipv4() { getent ahostsv4 "$1" 2>/dev/null | awk '{print $1}' | sort -u | paste -sd, -; }
resolve_ipv6() { getent ahostsv6 "$1" 2>/dev/null | awk '{print $1}' | sort -u | paste -sd, -; }

current_release="$(readlink -f "$APP_ROOT/current" 2>/dev/null || true)"
current_commit=""
current_deployment=""
if [[ -f "$current_release/.release.env" ]]; then
  current_commit="$(sed -n 's/^GIT_COMMIT=//p' "$current_release/.release.env" | head -1)"
  current_deployment="$(sed -n 's/^DEPLOYMENT_ID=//p' "$current_release/.release.env" | head -1)"
fi

backup_timer="wordpress-backup.timer"
if [[ "$ENVIRONMENT" == "production" ]]; then
  backup_timer="wordpress-production-backup.timer"
fi

# shellcheck disable=SC1091
source /etc/os-release
{
  echo "# ${ENVIRONMENT^} deployment record"
  echo
  echo "- Recorded UTC: $(date -u +%FT%TZ)"
  echo "- Storefront: https://$STOREFRONT_DOMAIN"
  echo "- WordPress: https://$WORDPRESS_DOMAIN"
  echo "- VDS IPv4 (fixed): $VDS_IPV4"
  echo "- VDS IPv6 (fixed): ${VDS_IPV6:-not configured}"
  echo "- DNS provider / TTL: $DNS_PROVIDER / $DNS_TTL"
  echo "- Storefront DNS A: $(resolve_ipv4 "$STOREFRONT_DOMAIN")"
  echo "- WordPress DNS A: $(resolve_ipv4 "$WORDPRESS_DOMAIN")"
  echo "- Storefront DNS AAAA: $(resolve_ipv6 "$STOREFRONT_DOMAIN")"
  echo "- WordPress DNS AAAA: $(resolve_ipv6 "$WORDPRESS_DOMAIN")"
  echo
  echo "## Host"
  echo
  echo "- OS: $PRETTY_NAME"
  echo "- Kernel: $(uname -srmo)"
  echo "- Node: $(node --version 2>/dev/null || true)"
  echo "- npm: $(npm --version 2>/dev/null || true)"
  echo "- Nginx: $(nginx -v 2>&1 || true)"
  echo "- PHP: $(php -r 'echo PHP_VERSION;' 2>/dev/null || true)"
  echo "- MySQL client: $(mysql --version 2>/dev/null || true)"
  echo "- MySQL server: $(mysql --batch --skip-column-names -e 'SELECT VERSION();' 2>/dev/null || true)"
  echo
  echo "## Paths and release"
  echo
  echo "- Repository: $REPOSITORY_DIR"
  echo "- App root: $APP_ROOT"
  echo "- WordPress root: $WORDPRESS_ROOT"
  echo "- Current release: $current_release"
  echo "- Deployment ID: $current_deployment"
  echo "- Git commit: $current_commit"
  echo "- Git remote: $(git -C "$REPOSITORY_DIR" remote get-url origin 2>/dev/null || true)"
  echo "- Deploy ref fixed for first deploy: $GIT_DEPLOY_REF"
  echo
  echo "## Services"
  echo
  echo "- Storefront active/enabled: $(systemctl is-active "ofisnye-dveri@$ENVIRONMENT.service" 2>/dev/null || true) / $(systemctl is-enabled "ofisnye-dveri@$ENVIRONMENT.service" 2>/dev/null || true)"
  echo "- Nginx active: $(systemctl is-active nginx 2>/dev/null || true)"
  echo "- PHP-FPM active: $(systemctl is-active "$PHP_FPM_SERVICE" 2>/dev/null || true)"
  echo "- MySQL active: $(systemctl is-active "$MYSQL_SERVICE" 2>/dev/null || true)"
  echo "- Backup timer active/enabled: $(systemctl is-active "$backup_timer" 2>/dev/null || true) / $(systemctl is-enabled "$backup_timer" 2>/dev/null || true)"
  echo
  echo "## TLS storefront"
  echo '```text'
  cert_info "$STOREFRONT_DOMAIN"
  echo '```'
  echo
  echo "## TLS WordPress"
  echo '```text'
  cert_info "$WORDPRESS_DOMAIN"
  echo '```'
  echo
  echo "## Backup"
  echo
  echo "- Local backup root: $LOCAL_BACKUP_ROOT"
  echo "- Latest local backup: $(find "$LOCAL_BACKUP_ROOT" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' 2>/dev/null | sort -r | head -1)"
} > "$OUTPUT_FILE"

chmod 0640 "$OUTPUT_FILE"
echo "${ENVIRONMENT^} state recorded: $OUTPUT_FILE"
