# WordPress/WooCommerce staging checklist

Staging WordPress is a separate environment with its own domain, database and
`wp-content`. It is not the future production instance with a temporary URL.

## Before import

1. Create the staging database and database user.
2. Install the same WordPress, WooCommerce and ACF versions as the source.
3. Copy the complete `wp-content`, including uploads and all custom MU-plugins.
4. Import a database dump into the staging database.
5. Run a serialized-data-safe URL replacement with WP-CLI:

```bash
wp search-replace 'https://old-wordpress.example' 'https://staging-wp.example.com' \
  --path=/srv/wordpress/staging/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --dry-run

wp search-replace 'https://old-wordpress.example' 'https://staging-wp.example.com' \
  --path=/srv/wordpress/staging/public \
  --all-tables-with-prefix \
  --skip-columns=guid
```

6. Set both `home` and `siteurl` to the staging WordPress HTTPS origin.
7. Flush rewrite rules and regenerate thumbnails only when the imported media
   actually needs it.

## Required logic and data checks

- WooCommerce and ACF are active.
- MU-plugins present: `door-family-taxonomy.php`,
  `headless-seo-foundation.php`, `portfolio-project-cpt.php`,
  `public-article-no.php`, `storefront-order-idempotency.php`.
- Header and footer `wp_navigation` slugs match the storefront env.
- Navigation contains `/mezhkomnatnye-dveri` and contains no `/catalog`.
- Homepage `glavnaya` and site chrome page return an `acf` object in REST.
- Woo products return `public_article_no` and `headless_seo`.
- Separate Woo read-only and read/write REST keys are used on staging.
- Payment gateways and production webhooks are disabled.
- Public WordPress HTML remains `noindex`; media and REST stay reachable by Next.js.

Run the automated read checks after migration:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-wordpress-staging.sh
```

Then manually create one staging checkout order and one wall-panel request.
Repeat each request with the same idempotency key and confirm that WooCommerce
contains one order, not two.
