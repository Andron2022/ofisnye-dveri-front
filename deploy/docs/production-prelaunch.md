# MVP Production Prelaunch & WP Origin Hardening

This runbook creates a real production contour without performing the public
launch. The storefront runs with `APP_ENV=production` and
`SITE_INDEXING_ENABLED=false`; Nginx adds a second prelaunch barrier with Basic
Auth and `X-Robots-Tag`. The public production Nginx template is kept disabled
until the later cutover step.

## Selected MVP topology

Production shares the current VDS with staging for the MVP, but uses separate
runtime paths, WordPress root, MySQL database/users, Woo REST keys, application
secret, Nginx sites, backups and restic namespace:

```text
/srv/ofisnye-dveri/production/
├── builds/
├── releases/
├── current -> releases/<release>
└── shared/cache/

/srv/wordpress/production/public/
/var/backups/ofisnye-dveri/wordpress-production/
```

This keeps the first launch operationally simple while preserving boundaries
that can later move WordPress, MySQL or the storefront to separate hosts.

## 0. Safety gates before touching production

- Merge the intended release into `main`. Production deploys only `origin/main`.
- Keep staging healthy and do not delete its DB/files/backups.
- Do not copy `.env.local` to the VDS and do not reuse staging Woo keys or
  `BFF_SECURITY_SECRET`.
- Keep `SITE_INDEXING_ENABLED=false` throughout this runbook.
- Keep `ofisnye-dveri-production.conf` disabled. Use only the prelaunch site.
- If `ofisnye-dveri.ru` currently serves another site, do not change its public
  A/AAAA records in this step. Use DNS-01 TLS and `curl --resolve`/a local hosts
  override for prelaunch testing.

## 1. Fix production inventory

```bash
sudo install -d -m 0750 /etc/ofisnye-dveri
sudo install -m 0640 deploy/inventory/production.env.example \
  /etc/ofisnye-dveri/production-inventory.env
sudo editor /etc/ofisnye-dveri/production-inventory.env
bash deploy/scripts/check-production-inventory.sh \
  /etc/ofisnye-dveri/production-inventory.env
```

The supplied template already reflects the current project defaults:

- storefront: `ofisnye-dveri.ru`;
- www redirect: `www.ofisnye-dveri.ru`;
- suggested production WP origin: `wp.ofisnye-dveri.ru`;
- current VDS IPv4: `153.80.184.15`;
- storefront port: `3000`;
- production Git ref: `origin/main`.

Change the suggested WP hostname before deployment if another production origin
is preferred.

## 2. Choose the DNS/TLS prelaunch path

### Path A — preferred when the current root domain must not move yet

Leave public storefront A/AAAA records unchanged. Create only the production WP
DNS record when safe, and obtain the storefront certificate with your DNS
provider's Certbot DNS plugin/API (DNS-01 challenge). This permits a valid
certificate before traffic cutover.

Test the future storefront against this VDS without public DNS cutover:

```bash
CURL_RESOLVE='ofisnye-dveri.ru:443:153.80.184.15' \
CURL_USER='prelaunch:password' \
  bash deploy/scripts/smoke-test.sh \
  https://ofisnye-dveri.ru production '' false
```

A workstation can use a temporary hosts-file override for browser QA.

### Path B — only when the root domain is currently unused

Create/replace these A records with a low TTL:

- `@` -> `153.80.184.15`;
- `www` -> `153.80.184.15`;
- `wp` -> `153.80.184.15`.

The prelaunch storefront will still be protected by Basic Auth and noindex.

Do not create AAAA records unless IPv6 is configured and verified on the VDS.

## 3. Create production directories

```bash
sudo install -d -o deploy -g storefront -m 2750 \
  /srv/ofisnye-dveri/production/{builds,releases,shared}
sudo install -d -o storefront -g storefront -m 2770 \
  /srv/ofisnye-dveri/production/shared/cache
sudo install -d -o www-data -g www-data -m 0750 \
  /srv/wordpress/production/public
sudo install -d -o root -g root -m 0700 \
  /var/backups/ofisnye-dveri/wordpress-production
sudo install -d -o root -g root -m 0700 \
  /var/cache/ofisnye-dveri/restic-production
```

Reuse the existing canonical Git clone at `/srv/ofisnye-dveri/repository`.
Do not create a second production clone.

## 4. Create a separate production MySQL boundary

Create a separate production DB and DB user. Do not point production WordPress
at the staging database.

Recommended boundaries from the templates:

```text
Database:          wordpress_production
Runtime DB user:   wordpress_production
Backup DB user:    wordpress_production_backup
Restore-test user: wordpress_production_restore_test
Restore-test DB:   wordpress_production_restore_test
```

The WordPress runtime DB user should only have the permissions needed for its
own production database. Backup and restore-test accounts use the dedicated
client files from `deploy/backup/`.

## 5. Clone the authoritative WordPress state into production

For this MVP, clone the complete verified staging WordPress state instead of
rebuilding WP content object-by-object. This preserves product/media/ACF/
Navigation IDs and therefore minimizes migration risk.

1. Take and verify a fresh staging backup first.
2. Restore the staging database into the new `wordpress_production` DB.
3. Copy staging WordPress files to `/srv/wordpress/production/public` with
   ownership `www-data:www-data`.
4. Use WP-CLI `search-replace` for the WP origin change; never raw SQL string
   replacement because ACF/Navigation may contain serialized values.

Dry run first:

```bash
wp search-replace \
  'https://wp-staging.ofisnye-dveri.ru' \
  'https://wp.ofisnye-dveri.ru' \
  --path=/srv/wordpress/production/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --dry-run \
  --allow-root
```

Then run the same command without `--dry-run` and fix `home`/`siteurl`:

```bash
wp option update home 'https://wp.ofisnye-dveri.ru' \
  --path=/srv/wordpress/production/public --allow-root
wp option update siteurl 'https://wp.ofisnye-dveri.ru' \
  --path=/srv/wordpress/production/public --allow-root
```

If production is seeded from another source, replace the old URL above with
that source origin.

Before public launch, remove staging-only/test orders from the production clone
and confirm the remaining Woo data is intended for the real shop.

## 6. Harden production wp-config.php

Keep `wp-config.php` outside Git/archives. Production must use its own DB
credentials and fresh WordPress salts. Add/confirm:

```php
define('WP_ENVIRONMENT_TYPE', 'production');
define('FORCE_SSL_ADMIN', true);
define('DISALLOW_FILE_EDIT', true);
define('DISABLE_WP_CRON', true);
```

Public `wp-cron.php` will be blocked by Nginx; the systemd timer added in this
step runs due cron events every five minutes instead.

## 7. Create production-only Woo/BFF credentials

In WooCommerce create:

1. one **Read** key pair for catalog/server rendering;
2. a different **Read/Write** key pair used by the BFF for order creation.

Generate a fresh production application secret:

```bash
openssl rand -hex 32
```

Do not reuse values that appeared in local `.env.local`, staging, old archives,
shell history or chat/log output.

Install the production env:

```bash
sudo install -m 0640 deploy/env/production.env.example \
  /etc/ofisnye-dveri/production.env
sudo chown root:deploy /etc/ofisnye-dveri/production.env
sudo editor /etc/ofisnye-dveri/production.env

set -a
source /etc/ofisnye-dveri/production.env
set +a
npm run check:deploy-env
```

The validator now deliberately accepts production with indexing disabled and
requires a dedicated Woo write pair.

## 8. Bootstrap TLS and install Nginx sites

Copy/update the shared rate-limit file first:

```bash
sudo cp deploy/nginx/conf.d/storefront-rate-limits.conf.example \
  /etc/nginx/conf.d/ofisnye-dveri-rate-limits.conf
```

If using HTTP-01, install the bootstrap site before certificates exist. If
using DNS-01, request certificates using the provider plugin/API and skip the
HTTP dependency.

The expected certificate names are:

```text
/etc/letsencrypt/live/ofisnye-dveri.ru/
/etc/letsencrypt/live/wp.ofisnye-dveri.ru/
```

The storefront certificate should cover both `ofisnye-dveri.ru` and
`www.ofisnye-dveri.ru`.

Install the two active prelaunch sites:

```text
ofisnye-dveri-production-prelaunch
ofisnye-dveri-wp-production
```

Create separate outer credentials:

```bash
sudo htpasswd -c \
  /etc/nginx/.htpasswd-ofisnye-dveri-production-prelaunch prelaunch
sudo htpasswd -c \
  /etc/nginx/.htpasswd-ofisnye-dveri-wp-production-admin wpadmin
```

The first protects the whole production storefront during prelaunch. The
second protects only `/wp-login.php` and `/wp-admin/`; WP REST and media remain
reachable because Next.js and the WordPress editor depend on them.

Run:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

Keep `ofisnye-dveri-production.conf` disabled until the separate production
cutover step.

## 9. Verify the hardened WordPress origin before deploying Next

```bash
sudo bash deploy/scripts/verify-wordpress-production.sh \
  /etc/ofisnye-dveri/production-inventory.env

sudo bash deploy/scripts/verify-wordpress-origin.sh \
  /etc/ofisnye-dveri/production-inventory.env
```

When public DNS still points elsewhere, add:

```bash
CURL_RESOLVE='wp.ofisnye-dveri.ru:443:153.80.184.15' \
  sudo -E bash deploy/scripts/verify-wordpress-origin.sh \
  /etc/ofisnye-dveri/production-inventory.env
```

Expected origin surface:

- `/wp-json/` works and is noindex;
- `/wp-content/uploads/...` media is public;
- `/wp-login.php` and `/wp-admin/` require outer Basic Auth;
- `/xmlrpc.php` is forbidden;
- public `/wp-cron.php` is forbidden;
- arbitrary PHP and the WP theme frontend are not public.

## 10. Install production WordPress cron timer

Copy the production cron service/timer into `/etc/systemd/system`, then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now wordpress-production-cron.timer
sudo systemctl start wordpress-production-cron.service
sudo systemctl status wordpress-production-cron.timer --no-pager
```

Check WooCommerce Scheduled Actions after this to confirm due jobs continue to
run with `DISABLE_WP_CRON=true`.

## 11. Install/enable the production storefront service

The canonical `ofisnye-dveri@.service` already supports production and binds to
`127.0.0.1:3000` through `/etc/ofisnye-dveri/production.env`.

```bash
sudo cp deploy/systemd/ofisnye-dveri@.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable ofisnye-dveri@production.service
```

Run the environment-aware host preflight:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/check-host.sh \
  /etc/ofisnye-dveri/production-inventory.env
```

## 12. First immutable production-prelaunch release

Production only deploys committed `main`:

```bash
sudo -iu deploy
bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-release.sh \
  production origin/main
```

Internal health must report:

```text
appEnvironment=production
indexingEnabled=false
```

Check it:

```bash
bash deploy/scripts/healthcheck.sh \
  http://127.0.0.1:3000/api/health production
```

Then run the external prelaunch smoke test. With normal production DNS:

```bash
CURL_USER='prelaunch:password' \
  bash deploy/scripts/smoke-test.sh \
  https://ofisnye-dveri.ru production '' false
```

Without DNS cutover:

```bash
CURL_RESOLVE='ofisnye-dveri.ru:443:153.80.184.15' \
CURL_USER='prelaunch:password' \
  bash deploy/scripts/smoke-test.sh \
  https://ofisnye-dveri.ru production '' false
```

## 13. Verify the real user write scenarios

Still behind prelaunch protection, manually verify at least:

- one normal door order;
- the same checkout request replayed with the same idempotency key creates no
  duplicate order;
- one wall-panel project request;
- its same-key replay creates no duplicate order;
- order line meta/options/hardware are correct in Woo admin;
- production orders are created only through the production write REST key.

These writes are intentionally not automated in this infrastructure step.

## 14. Install production backups and isolated restore tests

Install production-specific files from `deploy/backup/` as root-only files:

```text
/etc/ofisnye-dveri/wordpress-production-backup.env
/etc/ofisnye-dveri/mysql-production-backup.cnf
/etc/ofisnye-dveri/mysql-production-restore-admin.cnf
/etc/ofisnye-dveri/restic-production.env
/etc/ofisnye-dveri/restic-production.password
```

Production uses a separate restic repository/path from staging. Initialize it
once, then install these units:

```text
wordpress-production-backup.service/.timer
wordpress-production-backup-maintenance.service/.timer
wordpress-production-restore-test.service/.timer
```

Run all recovery paths manually before enabling timers:

```bash
sudo systemctl start wordpress-production-backup.service
sudo bash deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env local
sudo bash deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env offsite
sudo bash deploy/scripts/maintain-offsite-backup.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env
```

Only after all commands pass:

```bash
sudo systemctl enable --now wordpress-production-backup.timer
sudo systemctl enable --now wordpress-production-backup-maintenance.timer
sudo systemctl enable --now wordpress-production-restore-test.timer
```

## 15. Record the prelaunch production state

```bash
sudo bash deploy/scripts/record-production-state.sh \
  /etc/ofisnye-dveri/production-inventory.env
```

The production-prelaunch step is complete only when all of these are true:

1. production WordPress is separate from staging DB/files;
2. production Woo/BFF secrets are separate;
3. production storefront release is immutable and rollback-capable;
4. health reports `production` + `indexingEnabled=false`;
5. external smoke test passes behind Basic Auth;
6. WordPress origin hardening verification passes;
7. real checkout and wall-panel request scenarios pass;
8. local + off-server backup restore tests pass;
9. production state record exists;
10. public production Nginx config is still disabled.

Do **not** set `SITE_INDEXING_ENABLED=true` here. Do **not** enable the public
production Nginx template here. Those are explicit later launch/cutover actions.
