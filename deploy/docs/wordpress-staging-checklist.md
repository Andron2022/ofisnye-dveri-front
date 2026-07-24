# WordPress/WooCommerce staging checklist

Staging WordPress должен быть отдельной средой, а не тем же экземпляром, который позже станет production.

1. Отдельные домен, база данных и `wp-content/uploads`.
2. HTTPS до подключения Next.js.
3. Установлены те же версии WordPress, WooCommerce, ACF и custom MU-плагинов.
4. Созданы две пары Woo REST keys: read-only для каталога и read/write для BFF.
5. Проверены постоянные ссылки и REST endpoints.
6. Публичный HTML WordPress остаётся `noindex`; индексируемым сайтом является только Next.js production.
7. Платёжные шлюзы не включаются на staging; заказы остаются в тестовом контуре.
8. Перед переносом данных сделана резервная копия БД и uploads.

## Важная проверка источника истины

`repomix-output-wp7.md` перечисляет `door-family-taxonomy.php`, `headless-seo-foundation.php`, `portfolio-project-cpt.php` и `public-article-no.php`, но ещё не содержит `storefront-order-idempotency.php`. Пользователь подтвердил работу anti-abuse шага, поэтому перед staging нужно проверить наличие этого MU-плагина в реальном WordPress и пересобрать следующий `repomix-output-wpN.md`.
