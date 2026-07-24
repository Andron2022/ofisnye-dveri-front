# Staging/VDS deployment foundation

This directory contains templates only. It does not configure a real VDS,
DNS, TLS certificates or WordPress paths automatically. The first real staging
deploy must replace every `example.com` value and confirm the server layout.

## Target layout

```text
/var/www/storefront/
├── repository/            # Git clone used only as a source of commits
├── builds/                # temporary build workspaces
├── releases/              # immutable standalone releases
├── current -> releases/...# active release symlink
└── shared/
    └── storefront.env     # secrets and environment, mode 600
```

The systemd service runs only `/var/www/storefront/current/server.js`. Source
files and the build-time `node_modules` are not required by the running service.
`npm run build` prepares `.next/standalone` with `public` and `.next/static`.

## What must be fixed during the first staging deploy

Record these values before changing the server:

- storefront staging domain;
- WordPress staging domain;
- VDS public IPv4/IPv6;
- Linux distribution/version;
- SSH deployment user;
- Node binary path and tested Node 24 version;
- WordPress document root;
- MySQL database name and backup user;
- backup directory and off-server copy destination;
- GitHub repository URL and deploy branch/ref.

## Environment

Copy `deploy/env/storefront.env.example` to:

```text
/var/www/storefront/shared/storefront.env
```

Set mode `600` and owner `storefront`. Staging requirements:

- `APP_ENV=staging`;
- `SITE_INDEXING_ENABLED=false`;
- storefront and WordPress URLs use HTTPS;
- `BFF_REQUIRE_ORIGIN=true`;
- `BFF_ALLOWED_ORIGINS` includes the storefront origin;
- `NODE_TLS_REJECT_UNAUTHORIZED=0` is absent.

Validate before building:

```bash
set -a
source /var/www/storefront/shared/storefront.env
set +a
npm run check:deploy-env
```

## Nginx and TLS

1. Install the rate-limit zones from
   `deploy/nginx/storefront-bff-hardening.conf.example` into `/etc/nginx/conf.d/`.
2. Replace domains in `deploy/nginx/storefront-staging.conf.example`.
3. Obtain a Let's Encrypt certificate only after DNS resolves to the VDS.
4. Run `nginx -t` before every reload.

The staging site must stay `noindex` at both metadata and `robots.txt` levels.

## systemd

Install `deploy/systemd/storefront.service.example` as
`/etc/systemd/system/storefront.service`, verify `/usr/bin/node`, then run:

```bash
systemctl daemon-reload
systemctl enable --now storefront.service
```

The service account must own `/var/www/storefront` but must not receive broad
sudo rights. The deployment user only needs the commands listed in the sudoers
template.

## Deploy and rollback

Run the host preflight after installing Node, npm, Git and Nginx:

```bash
bash /var/www/storefront/repository/deploy/scripts/check-host.sh
```

From the deployment user:

```bash
bash /var/www/storefront/repository/deploy/scripts/deploy-release.sh origin/main
```

The script resolves one commit, builds it in a temporary directory, validates
the environment, creates an immutable release, switches `current`, restarts
systemd and checks `/api/health`. On restart or health-check failure it restores
the previous release automatically.

Manual rollback:

```bash
bash /var/www/storefront/repository/deploy/scripts/rollback-release.sh
```

or pass a release directory name explicitly.

## WordPress migration and backups

Before the first staging migration create and verify:

- a database dump;
- an archive of `wp-content`;
- a copy stored outside the VDS;
- checksums;
- a documented restore test.

The included backup script reads
`/etc/ofisnye-dveri/wordpress-backup.env`, dumps MySQL with a transaction,
archives all `wp-content`, writes SHA-256 checksums and applies retention.
A backup stored only on the same VDS is not a disaster-recovery backup; add an
off-server copy after the first successful run.

Do not overwrite the staging WordPress database on every frontend deploy.
Frontend commits move through Git and immutable releases. WordPress content,
media, menus and WooCommerce data live in MySQL/`wp-content` and require a
separate migration/backup process.

## WordPress data checks after migration

- REST and Woo endpoints answer over the staging WordPress HTTPS domain;
- the Navigation Editor contains `/mezhkomnatnye-dveri`, not legacy `/catalog`;
- ACF settings and media URLs point to the staging WordPress domain;
- the order idempotency MU-plugin is present;
- test checkout and wall-panel requests create no duplicate orders;
- production keys are not used on staging unless deliberately isolated.
