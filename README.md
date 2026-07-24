# ofisnye-dveri-front

Headless storefront for WordPress, WooCommerce and ACF.

## Local development

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

`npm run build` creates a ready-to-run standalone runtime and copies both
`public/` and `.next/static/` into `.next/standalone/`.

Run the production-like local preview after a successful build:

```bash
npm start
```

The default address is `http://127.0.0.1:3000`. Override `PORT` and `HOSTNAME`
through environment variables when needed.

## Deployment

Deployment templates, immutable release scripts, systemd, Nginx and WordPress
backup examples live in [`deploy/README.md`](deploy/README.md).

Before a staging or production build, validate the environment:

```bash
npm run check:deploy-env
```

Staging must keep `SITE_INDEXING_ENABLED=false`. Production must explicitly set
`SITE_INDEXING_ENABLED=true`. `NODE_TLS_REJECT_UNAUTHORIZED=0` is rejected for
both environments.
