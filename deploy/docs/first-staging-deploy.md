# First real staging deploy

This runbook fixes one canonical layout and deliberately avoids the duplicate
legacy `/var/www/storefront` / `storefront.service` scheme.

## Selected MVP topology

One Ubuntu 24.04 LTS VDS hosts staging Nginx, the Next.js standalone process,
WordPress/PHP-FPM and MySQL. Storefront and WordPress use separate HTTPS
subdomains, database credentials and paths. Frontend releases are immutable;
WordPress state is backed up separately. Off-server copies use encrypted restic
snapshots in an S3-compatible bucket.

This is the fastest topology that still gives clean separation boundaries.
Production can later move to another VDS or managed database without changing
the storefront deployment contract.

## 1. Fix inventory and DNS

Copy and fill the non-secret inventory:

```bash
sudo install -d -m 0750 /etc/ofisnye-dveri
sudo install -m 0640 deploy/inventory/staging.env.example \
  /etc/ofisnye-dveri/staging-inventory.env
sudo editor /etc/ofisnye-dveri/staging-inventory.env
bash deploy/scripts/check-staging-inventory.sh /etc/ofisnye-dveri/staging-inventory.env
```

Create DNS records with a temporary low TTL:

- `A` storefront staging domain -> VDS IPv4;
- `A` WordPress staging domain -> VDS IPv4;
- create `AAAA` only when IPv6 is configured and the firewall accepts it.

Do not request TLS until both names resolve to the VDS.

## 2. Base host and accounts

Recommended packages on Ubuntu 24.04 LTS:

```bash
sudo apt update
sudo apt full-upgrade -y
sudo apt install -y nginx mysql-server php8.3-fpm php8.3-cli php8.3-mysql \
  php8.3-curl php8.3-gd php8.3-intl php8.3-mbstring php8.3-xml php8.3-zip \
  git curl tar unzip rsync certbot apache2-utils mysql-client restic ufw
```

Install Node 24 LTS from the official binary distribution into `/opt/nodejs`:

```bash
sudo bash deploy/scripts/install-node24.sh
```

The installer verifies SHA-256 and exposes the fixed runtime path
`/usr/local/bin/node`. Record the exact patch version in the final deployment
record. To reproduce an exact patch later, pass it explicitly, for example
`sudo bash deploy/scripts/install-node24.sh v24.x.y`.

Create separate deployment and runtime accounts:

```bash
sudo adduser --disabled-password --gecos '' deploy
sudo adduser --system --group --home /nonexistent --no-create-home storefront
sudo usermod -aG storefront deploy
```

Open only SSH, HTTP and HTTPS in UFW. Confirm SSH access before enabling it.
MySQL and the Next.js port stay loopback-only.

## 3. Canonical directories

```bash
sudo install -d -o deploy -g storefront -m 2750 /srv/ofisnye-dveri/repository
sudo install -d -o deploy -g storefront -m 2750 /srv/ofisnye-dveri/staging/{builds,releases,shared}
sudo install -d -o storefront -g storefront -m 2770 /srv/ofisnye-dveri/staging/shared/cache
sudo install -d -o www-data -g www-data -m 0750 /srv/wordpress/staging/public
sudo install -d -o root -g root -m 0700 /var/backups/ofisnye-dveri/wordpress-staging
sudo install -d -o root -g root -m 0700 /var/cache/ofisnye-dveri/restic
sudo install -d -o root -g root -m 0755 /var/www/letsencrypt
```

Clone the Git repository as `deploy`, using a read-only GitHub deploy key:

```bash
sudo -u deploy git clone GIT_REPOSITORY_URL /srv/ofisnye-dveri/repository
```

## 4. WordPress migration

Install WordPress files under `/srv/wordpress/staging/public`, import the source
DB and complete `wordpress-staging-checklist.md`. Use WP-CLI search-replace so
serialized ACF and Navigation values are handled safely. Never do a raw SQL
string replacement.

## 5. HTTP bootstrap and TLS

1. Copy the rate-limit file to `/etc/nginx/conf.d/`.
2. Copy the HTTP bootstrap site, replace both names and enable it.
3. Run `nginx -t`, reload Nginx and verify both DNS names over port 80.
4. Request separate certificates with Certbot webroot:

```bash
sudo certbot certonly --webroot -w /var/www/letsencrypt -d STOREFRONT_DOMAIN
sudo certbot certonly --webroot -w /var/www/letsencrypt -d WORDPRESS_DOMAIN
```

5. Replace placeholders in the final storefront and WordPress Nginx sites.
6. Create Basic Auth only for the storefront staging domain:

```bash
sudo htpasswd -c /etc/nginx/.htpasswd-ofisnye-dveri-staging staging
```

7. Disable the bootstrap site, enable both final sites, run `nginx -t`, reload.
8. Run `certbot renew --dry-run`.

Do not put Basic Auth in front of the WordPress origin: Next.js must read public
WP REST and media. WordPress HTML is instead blocked from indexing by Nginx and
the headless SEO MU-plugin.

## 6. Secrets, systemd and sudoers

Copy staging env and backup templates to `/etc/ofisnye-dveri`, fill real values,
and set root-only or narrowly grouped permissions. Never copy local `.env.local`.

```bash
sudo install -m 0640 deploy/env/staging.env.example /etc/ofisnye-dveri/staging.env
sudo chown root:deploy /etc/ofisnye-dveri/staging.env
sudo editor /etc/ofisnye-dveri/staging.env

sudo cp deploy/systemd/ofisnye-dveri@.service /etc/systemd/system/
sudo cp deploy/sudoers/ofisnye-dveri-deploy.example /etc/sudoers.d/ofisnye-dveri-deploy
sudo chmod 0440 /etc/sudoers.d/ofisnye-dveri-deploy
sudo visudo -cf /etc/sudoers.d/ofisnye-dveri-deploy
sudo systemctl daemon-reload
sudo systemctl enable ofisnye-dveri@staging.service
```

Run host preflight before the first build:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/check-host.sh
```

## 7. First immutable release

Deploy the already pushed foundation branch first:

```bash
sudo -iu deploy
bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-release.sh \
  staging origin/chore/staging-vds-foundation
```

After GitHub merge, later staging deployments should use `origin/main`.

Verify internally and externally:

```bash
bash deploy/scripts/healthcheck.sh http://127.0.0.1:3001/api/health staging
CURL_USER='staging:password' bash deploy/scripts/smoke-test.sh \
  https://STOREFRONT_DOMAIN staging '' false
sudo bash deploy/scripts/verify-wordpress-staging.sh
```

## 8. Backup, off-server copy and restore test

Install the backup env, MySQL defaults files and restic env with mode `600`.
Initialize the off-server repository once with `restic init`. Then install and
enable the backup, maintenance and restore-test timers.

Before enabling timers, run all three manually:

```bash
sudo systemctl start wordpress-backup.service
sudo bash deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-backup.env local
sudo bash deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-backup.env offsite
```

A successful archive upload is not enough. The step closes only after an
isolated database import and `wp-content` extraction both pass.

## 9. Fix the resulting state

Generate a non-secret record containing domains, resolved DNS, TLS metadata,
actual package versions, paths, active services, release ID and backup state:

```bash
sudo bash deploy/scripts/record-staging-state.sh
```

Commit a redacted copy of that generated record only when it contains no IP or
repository information you consider private. Keep the authoritative record in
server operations storage.
