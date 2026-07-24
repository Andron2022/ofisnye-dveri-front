#!/usr/bin/env bash
set -Eeuo pipefail

[[ "$EUID" -eq 0 ]] || { echo "Run as root" >&2; exit 1; }
for command in curl tar sha256sum awk grep ln; do
  command -v "$command" >/dev/null || { echo "Missing command: $command" >&2; exit 1; }
done

case "$(uname -m)" in
  x86_64) NODE_ARCH=x64 ;;
  aarch64|arm64) NODE_ARCH=arm64 ;;
  *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

REQUESTED_VERSION="${1:-latest-v24.x}"
if [[ "$REQUESTED_VERSION" == latest-v24.x ]]; then
  BASE_URL="https://nodejs.org/dist/latest-v24.x"
else
  [[ "$REQUESTED_VERSION" =~ ^v24\.[0-9]+\.[0-9]+$ ]] || { echo "Version must look like v24.x.y" >&2; exit 2; }
  BASE_URL="https://nodejs.org/dist/$REQUESTED_VERSION"
fi

WORK_DIR="$(mktemp -d /var/tmp/node24-install.XXXXXX)"
trap 'rm -rf "$WORK_DIR"' EXIT
curl --fail --silent --show-error --location "$BASE_URL/SHASUMS256.txt" -o "$WORK_DIR/SHASUMS256.txt"
FILENAME="$(awk -v arch="$NODE_ARCH" '$2 ~ ("node-v24\\.[0-9]+\\.[0-9]+-linux-" arch "\\.tar\\.xz$") {print $2; exit}' "$WORK_DIR/SHASUMS256.txt")"
[[ -n "$FILENAME" ]] || { echo "Node 24 archive not found in SHASUMS256.txt" >&2; exit 1; }
VERSION="${FILENAME%%-linux-*}"
VERSION="${VERSION#node-}"
curl --fail --silent --show-error --location "$BASE_URL/$FILENAME" -o "$WORK_DIR/$FILENAME"
(
  cd "$WORK_DIR"
  grep "  $FILENAME$" SHASUMS256.txt | sha256sum -c -
)

install -d -m 0755 /opt/nodejs
tar -xJf "$WORK_DIR/$FILENAME" -C /opt/nodejs
ln -sfn "/opt/nodejs/node-$VERSION-linux-$NODE_ARCH" /opt/nodejs/current
for binary in node npm npx corepack; do
  ln -sfn "/opt/nodejs/current/bin/$binary" "/usr/local/bin/$binary"
done

/usr/local/bin/node --version
/usr/local/bin/npm --version
echo "Installed Node $VERSION for $NODE_ARCH"
