#!/usr/bin/env bash
set -Eeuo pipefail
umask 0027

ENVIRONMENT="${1:-}"
DEPLOY_REF="${2:-origin/main}"
INVENTORY_FILE="${3:-/etc/ofisnye-dveri/${ENVIRONMENT}-inventory.env}"
[[ "$ENVIRONMENT" == "staging" || "$ENVIRONMENT" == "production" ]] || {
  echo "Usage: $0 <staging|production> [git-ref-or-sha] [inventory-file]" >&2
  exit 2
}
[[ "$EUID" -eq 0 ]] || { echo "WordPress code deployment must run as root" >&2; exit 1; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/check-environment-inventory.sh" "$INVENTORY_FILE"
set -a
# shellcheck disable=SC1090
source "$INVENTORY_FILE"
set +a

STATE_ROOT="${WORDPRESS_CODE_STATE_ROOT:-/var/lib/ofisnye-dveri/wordpress-code}"
MANIFEST_FILE="$STATE_ROOT/${ENVIRONMENT}.manifest"
STATE_FILE="$STATE_ROOT/${ENVIRONMENT}.state"
SNAPSHOT_ROOT="$STATE_ROOT/snapshots/$ENVIRONMENT"
TARGET_DIR="$WORDPRESS_ROOT/wp-content/mu-plugins"
WORDPRESS_CODE_OWNER="${WORDPRESS_CODE_OWNER:-$DEPLOY_USER}"
WORDPRESS_CODE_GROUP="${WORDPRESS_CODE_GROUP:-www-data}"
KEEP_SNAPSHOTS="${WORDPRESS_CODE_KEEP_SNAPSHOTS:-5}"

for command in git tar php sha256sum install flock find runuser awk grep cp rm date; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done
[[ -d "$REPOSITORY_DIR/.git" ]] || { echo "Git repository not found: $REPOSITORY_DIR" >&2; exit 1; }

install -d -o root -g root -m 0750 "$STATE_ROOT" "$SNAPSHOT_ROOT"
install -d -o "$WORDPRESS_CODE_OWNER" -g "$WORDPRESS_CODE_GROUP" -m 2750 "$TARGET_DIR"
exec 9>"$STATE_ROOT/${ENVIRONMENT}.lock"
flock -n 9 || { echo "Another WordPress code deployment is running for $ENVIRONMENT" >&2; exit 1; }

runuser -u "$DEPLOY_USER" -- git -C "$REPOSITORY_DIR" fetch --prune origin
COMMIT="$(runuser -u "$DEPLOY_USER" -- git -C "$REPOSITORY_DIR" rev-parse "${DEPLOY_REF}^{commit}")"
SHORT_COMMIT="${COMMIT:0:12}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
WORK_DIR="$(mktemp -d /var/tmp/ofisnye-dveri-wp-code.XXXXXX)"
SNAPSHOT_DIR="$SNAPSHOT_ROOT/${STAMP}-${SHORT_COMMIT}"
CHANGED=0
SUCCESS=0

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

runuser -u "$DEPLOY_USER" -- git -C "$REPOSITORY_DIR" archive "$COMMIT" wordpress/mu-plugins \
  | tar -x -C "$WORK_DIR"
SOURCE_DIR="$WORK_DIR/wordpress/mu-plugins"
[[ -d "$SOURCE_DIR" ]] || { echo "wordpress/mu-plugins is missing in $COMMIT" >&2; exit 1; }

mapfile -t SOURCE_FILES < <(find "$SOURCE_DIR" -maxdepth 1 -type f -name '*.php' -printf '%f\n' | LC_ALL=C sort)
((${#SOURCE_FILES[@]} > 0)) || { echo "No managed MU-plugin PHP files found in $COMMIT" >&2; exit 1; }

for file in "${SOURCE_FILES[@]}"; do
  [[ "$file" =~ ^[A-Za-z0-9._-]+\.php$ ]] || { echo "Unsafe MU-plugin filename: $file" >&2; exit 1; }
  php -l "$SOURCE_DIR/$file" >/dev/null
 done

NEW_MANIFEST="$WORK_DIR/new.manifest"
{
  echo '# ofisnye-dveri WordPress managed-code manifest v1'
  echo "GIT_COMMIT=$COMMIT"
  echo "CREATED_AT=$(date -u +%FT%TZ)"
  for file in "${SOURCE_FILES[@]}"; do
    sum="$(sha256sum "$SOURCE_DIR/$file" | awk '{print $1}')"
    printf '%s  %s\n' "$sum" "$file"
  done
} > "$NEW_MANIFEST"

install -d -o root -g root -m 0750 "$SNAPSHOT_DIR/files"
[[ -f "$MANIFEST_FILE" ]] && cp -a "$MANIFEST_FILE" "$SNAPSHOT_DIR/manifest.before"
[[ -f "$STATE_FILE" ]] && cp -a "$STATE_FILE" "$SNAPSHOT_DIR/state.before"

# Snapshot every live file that this release may overwrite, including the first
# managed deployment where project MU-plugins already exist from the old manual
# deployment procedure. With an existing manifest, refuse a newly introduced
# Git filename that collides with an unrelated unmanaged MU-plugin.
declare -A PREVIOUSLY_MANAGED=()
if [[ -f "$MANIFEST_FILE" ]]; then
  while read -r sum file; do
    [[ "$sum" =~ ^[0-9a-f]{64}$ && "$file" =~ ^[A-Za-z0-9._-]+\.php$ ]] || continue
    PREVIOUSLY_MANAGED["$file"]=1
    if [[ -f "$TARGET_DIR/$file" ]]; then
      cp -a "$TARGET_DIR/$file" "$SNAPSHOT_DIR/files/$file"
    fi
  done < <(grep -E '^[0-9a-f]{64}  [A-Za-z0-9._-]+\.php$' "$MANIFEST_FILE" || true)
fi

for file in "${SOURCE_FILES[@]}"; do
  if [[ -f "$TARGET_DIR/$file" && ! -f "$SNAPSHOT_DIR/files/$file" ]]; then
    if [[ -f "$MANIFEST_FILE" && -z "${PREVIOUSLY_MANAGED[$file]:-}" ]]; then
      echo "Refusing to overwrite unmanaged MU-plugin collision: $file" >&2
      exit 1
    fi
    cp -a "$TARGET_DIR/$file" "$SNAPSHOT_DIR/files/$file"
  fi
done

restore_snapshot() {
  local current_file
  while read -r sum current_file; do
    [[ "$sum" =~ ^[0-9a-f]{64}$ && "$current_file" =~ ^[A-Za-z0-9._-]+\.php$ ]] || continue
    rm -f "$TARGET_DIR/$current_file"
  done < <(grep -E '^[0-9a-f]{64}  [A-Za-z0-9._-]+\.php$' "$NEW_MANIFEST" || true)

  if [[ -d "$SNAPSHOT_DIR/files" ]]; then
    for previous in "$SNAPSHOT_DIR"/files/*.php; do
      [[ -e "$previous" ]] || continue
      install -o "$WORDPRESS_CODE_OWNER" -g "$WORDPRESS_CODE_GROUP" -m 0640 "$previous" "$TARGET_DIR/$(basename "$previous")"
    done
  fi
  if [[ -f "$SNAPSHOT_DIR/manifest.before" ]]; then
    install -o root -g root -m 0640 "$SNAPSHOT_DIR/manifest.before" "$MANIFEST_FILE"
  else
    rm -f "$MANIFEST_FILE"
  fi
  if [[ -f "$SNAPSHOT_DIR/state.before" ]]; then
    install -o root -g root -m 0640 "$SNAPSHOT_DIR/state.before" "$STATE_FILE"
  else
    rm -f "$STATE_FILE"
  fi
}

rollback_on_error() {
  status=$?
  if [[ "$status" -ne 0 && "$CHANGED" -eq 1 && "$SUCCESS" -ne 1 ]]; then
    echo "WordPress code deployment failed; restoring previous managed files" >&2
    restore_snapshot || true
  fi
  exit "$status"
}
trap rollback_on_error ERR

# Remove only files that were managed by the previous project manifest.
if [[ -f "$MANIFEST_FILE" ]]; then
  while read -r sum old_file; do
    [[ "$sum" =~ ^[0-9a-f]{64}$ && "$old_file" =~ ^[A-Za-z0-9._-]+\.php$ ]] || continue
    if ! printf '%s\n' "${SOURCE_FILES[@]}" | grep -Fxq "$old_file"; then
      rm -f "$TARGET_DIR/$old_file"
      CHANGED=1
    fi
  done < <(grep -E '^[0-9a-f]{64}  [A-Za-z0-9._-]+\.php$' "$MANIFEST_FILE" || true)
fi

for file in "${SOURCE_FILES[@]}"; do
  install -o "$WORDPRESS_CODE_OWNER" -g "$WORDPRESS_CODE_GROUP" -m 0640 "$SOURCE_DIR/$file" "$TARGET_DIR/$file"
  CHANGED=1
done

# Verify live files against the exact Git-derived manifest before committing state.
while read -r sum file; do
  [[ "$sum" =~ ^[0-9a-f]{64}$ && "$file" =~ ^[A-Za-z0-9._-]+\.php$ ]] || continue
  actual="$(sha256sum "$TARGET_DIR/$file" | awk '{print $1}')"
  [[ "$actual" == "$sum" ]] || { echo "Checksum mismatch after deploy: $file" >&2; false; }
done < <(grep -E '^[0-9a-f]{64}  [A-Za-z0-9._-]+\.php$' "$NEW_MANIFEST")

install -o root -g root -m 0640 "$NEW_MANIFEST" "$MANIFEST_FILE"
MANIFEST_SHA256="$(sha256sum "$MANIFEST_FILE" | awk '{print $1}')"
cat > "$WORK_DIR/new.state" <<EOF
WORDPRESS_CODE_GIT_COMMIT=$COMMIT
WORDPRESS_CODE_MANIFEST_SHA256=$MANIFEST_SHA256
WORDPRESS_CODE_DEPLOYED_AT=$(date -u +%FT%TZ)
WORDPRESS_CODE_ROLLBACK_SNAPSHOT=$SNAPSHOT_DIR
EOF
install -o root -g root -m 0640 "$WORK_DIR/new.state" "$STATE_FILE"

# Keep a small rollback history.
mapfile -t OLD_SNAPSHOTS < <(find "$SNAPSHOT_ROOT" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +$((KEEP_SNAPSHOTS + 1)) | cut -d' ' -f2-)
for old_snapshot in "${OLD_SNAPSHOTS[@]:-}"; do
  [[ -n "$old_snapshot" && "$old_snapshot" != "$SNAPSHOT_DIR" ]] && rm -rf "$old_snapshot"
done

SUCCESS=1
trap - ERR
echo "WordPress managed code deployed: environment=$ENVIRONMENT commit=$COMMIT manifest=$MANIFEST_SHA256"
