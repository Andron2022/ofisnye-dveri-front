# Ofisnye Dveri storefront

Headless storefront built with Next.js, WordPress, WooCommerce and ACF.

## Local verification

```bash
npm ci
npm audit
npm run lint
npm run typecheck
npm run build
npm run start
```

The standalone build is prepared automatically and starts from
`.next/standalone/server.js`.

## Deployment

The staging/VDS foundation and first real staging runbook live in
[`deploy/README.md`](deploy/README.md). Before a staging or production build,
validate the loaded environment:

```bash
npm run check:deploy-env
```
