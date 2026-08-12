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

The staging and production-prelaunch VDS contracts live in
[`deploy/README.md`](deploy/README.md). Before a staging or production build,
validate the loaded environment:

```bash
npm run check:deploy-env
```


## Safe clientN archives

Do not package the working directory directly because ignored local secrets such as
`.env.local` can be copied into ZIP files. After committing the intended source
state, create a tracked-source archive with:

```powershell
.\scripts\create-client-source-archive.ps1 `
  -ProjectRoot "E:\Practic\ofisnye-dveri-front" `
  -OutputPath "E:\Practic\clientN.zip"
```

The helper uses `git archive HEAD`, so ignored/untracked secrets are excluded.
