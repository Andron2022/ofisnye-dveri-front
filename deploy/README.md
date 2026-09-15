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

Next.js ISR/Data Cache uses the native Next.js filesystem cache for build-time
prerendering. In immutable standalone runtime, `NEXT_IMMUTABLE_RELEASE_RUNTIME=true`
is injected via `.release.env`; the cache handler then keeps ISR/Data Cache runtime
writes in memory instead of mutating `.next/server/app`. The existing writable
`shared/cache` symlink remains available for runtime caches such as `next/image`.
Do not put `NEXT_IMMUTABLE_RELEASE_RUNTIME=true` in `/etc/ofisnye-dveri/*.env`,
because the build phase must keep normal disk prerender output enabled.

Application releases now contain two Git-managed runtime components: the Next.js storefront and `wordpress/mu-plugins`. Use `deploy-environment.sh` for a combined release so both are deployed from the same Git SHA. The WordPress component is tracked by `/var/lib/ofisnye-dveri/wordpress-code/<environment>.manifest`; DB, uploads and environment secrets are not part of this code deploy.

Navigation must keep `/mezhkomnatnye-dveri`; `/catalog` must remain absent.
## Current application release

After the original environment bootstrap, use:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh staging origin/main
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh production origin/main
```

The orchestrator deploys project-managed WordPress MU-code first, verifies the WP REST code contract, deploys the Next.js standalone release from the same Git SHA, runs smoke checks and records SHA parity. Deployment shell scripts are invoked explicitly through `bash`; the Unix executable bit is not part of the deployment contract, which keeps the workflow stable when changed files pass through Windows/ZIP. Closed staging/production-prelaunch environments prompt interactively for Basic Auth credentials before the external storefront smoke.

Detailed current runbooks:

- `docs/local-to-staging-no-db.md`;
- `docs/local-to-production-with-staging-db.md`.
