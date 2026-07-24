# Staging/VDS deployment

The canonical deployment contract is now environment-scoped:

```text
/srv/ofisnye-dveri/
├── repository/                  # one read-only-source Git clone
├── staging/
│   ├── builds/                  # temporary build workspaces
│   ├── releases/                # immutable standalone releases
│   ├── current -> releases/...  # atomic active symlink
│   └── shared/cache/            # persistent Next.js runtime cache
└── production/                  # same contract, added later

/etc/ofisnye-dveri/
├── staging.env                  # storefront secrets/build env
├── staging-inventory.env        # non-secret fixed deployment facts
├── wordpress-backup.env
├── mysql-backup.cnf
├── mysql-restore-admin.cnf
└── restic-staging.env

/srv/wordpress/staging/public/   # separate WordPress document root
/var/backups/ofisnye-dveri/wordpress-staging/
```

Do not mix this with the removed legacy `/var/www/storefront` and
`storefront.service` templates.

Start with [`docs/first-staging-deploy.md`](docs/first-staging-deploy.md).
The first deploy is not complete until these checks pass:

1. inventory validator;
2. host preflight;
3. immutable release health check matching its deployment ID;
4. external staging noindex smoke test;
5. WP/Woo/ACF/Navigation verification;
6. local backup;
7. off-server restic snapshot;
8. isolated restore test;
9. generated staging deployment record.

`repomix-output-wp8.md` now includes the order-idempotency MU-plugin. The
Navigation Editor must contain `/mezhkomnatnye-dveri`; `/catalog` must remain
absent.
