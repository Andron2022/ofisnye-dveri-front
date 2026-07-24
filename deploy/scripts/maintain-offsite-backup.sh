#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ENV_FILE="${1:-/etc/ofisnye-dveri/wordpress-backup.env}"
[[ -f "$ENV_FILE" ]] || { echo "Backup env not found: $ENV_FILE" >&2; exit 1; }
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

[[ "${OFFSITE_ENABLED:-false}" == "true" ]] || { echo "Off-server backup is disabled"; exit 0; }
: "${BACKUP_NAME:?BACKUP_NAME is required}"
: "${RESTIC_ENV_FILE:?RESTIC_ENV_FILE is required}"
[[ -f "$RESTIC_ENV_FILE" ]] || { echo "Restic env not found: $RESTIC_ENV_FILE" >&2; exit 1; }
command -v restic >/dev/null || { echo "restic is not installed" >&2; exit 1; }

set -a
# shellcheck disable=SC1090
source "$RESTIC_ENV_FILE"
set +a

restic forget --tag "$BACKUP_NAME" \
  --keep-daily "${RESTIC_KEEP_DAILY:-14}" \
  --keep-weekly "${RESTIC_KEEP_WEEKLY:-8}" \
  --keep-monthly "${RESTIC_KEEP_MONTHLY:-6}" \
  --prune
restic check --read-data-subset=5%
echo "Off-server backup retention and repository check passed"
