# VDS deployment contract

The canonical deployment layout is environment-scoped:

```text
/srv/ofisnye-dveri/
├── repository/                    # one canonical Git clone
├── staging/
│   ├── builds/
│   ├── releases/
│   ├── current -> releases/...
│   └── shared/cache/
└── production/
    ├── builds/
    ├── releases/
    ├── current -> releases/...
    └── shared/cache/

/srv/wordpress/staging/public/
/srv/wordpress/production/public/
```

Do not mix this with the removed legacy `/var/www/storefront` and
`storefront.service` scheme.

## Staging

The first real staging deployment is documented in
[`docs/first-staging-deploy.md`](docs/first-staging-deploy.md).

Staging remains closed and uses:

- `APP_ENV=staging`;
- `SITE_INDEXING_ENABLED=false`;
- storefront port `3001`;
- its own WordPress root/database/REST keys/backups.

## Production prelaunch

The next environment layer is documented in
[`docs/production-prelaunch.md`](docs/production-prelaunch.md).

Production prelaunch deliberately uses:

- `APP_ENV=production`;
- `SITE_INDEXING_ENABLED=false`;
- storefront port `3000`;
- Nginx Basic Auth + `X-Robots-Tag` on the storefront;
- a separate production WordPress root/database/keys/backups;
- a hardened WP origin without a public WordPress theme/frontend;
- `origin/main` as the only production deploy ref.

The public `ofisnye-dveri-production.conf` template is a later cutover asset.
Do not enable it and do not switch indexing on during the prelaunch step.

## Shared scripts

The inventory, host, WordPress contract and deployment-state checks are now
environment-aware. Staging wrappers remain for compatibility with the already
running staging setup.

A deployment is not considered healthy until its immutable release health check
matches the expected environment/deployment ID. For closed environments the
smoke test also verifies `indexingEnabled=false`, `robots.txt`, an empty sitemap
and the external `X-Robots-Tag` barrier.

`repomix-output-wp8.md` contains the current headless SEO and order-idempotency
MU-plugins. Navigation must keep `/mezhkomnatnye-dveri`; `/catalog` must remain
absent.
