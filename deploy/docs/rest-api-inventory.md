# REST API проекта — карта и смысл

Этот файл — краткий источник по назначению и связям API витрины. Проверенные запросы и полные ответы находятся в [rest-api-contracts.md](./rest-api-contracts.md); для обсуждения конкретных полей с ChatGPT передавайте именно его. Здесь перечислены шаблоны маршрутов: разные ID и комбинации параметров объединены.

**Снимок от 9 октября 2026 года:** 63 реальных GET к local WordPress/WooCommerce (61 × 200, один 401, один 409), четыре GET к локальному Next.js (200), два POST с заведомо неполным телом (422) и один GET к staging для товара 265 (200). Это состояние окружений на дату снимка.

**Расширение SEO от 16 октября 2026 года:** существующий `headless_seo` дополнен необязательными OG/Twitter-полями и контролируемым `canonical_url`. Старые поля совместимы, REST-маршруты и BFF не менялись. Карта полей, правила Canonical и локальные проверки: [wp-driven-seo-metadata.md](./wp-driven-seo-metadata.md). Исторический полный снимок от 9 октября не содержит этих новых полей.

## Границы системы

- WordPress по WORDPRESS_URL отдаёт контент через wp/v2 и правила дверного каталога через od/v1.
- WooCommerce по тому же URL отдаёт категории и товары через wc/v3. Ключи чтения и записи использует сервер Next.js; в документах их нет.
- Next.js отдаёт браузеру каталог и health, принимает заявки и перед созданием Woo-заказа заново проверяет товар, конфигурацию и цену.
- Списки стандартных wp/v2 и wc/v3 приходят как JSON-массивы с заголовками X-WP-Total и X-WP-TotalPages. Маршруты od/v1 имеют собственные объекты ответа. Клиенты Next.js преобразуют некоторые списки в объекты с items, total и totalPages; /api/catalog возвращает формат Next.js.

## WordPress: контент

| Маршрут | Назначение | Проверка local |
| --- | --- | --- |
| GET /wp-json/wp/v2/pages | Страницы по slug и общий список: главная, настройки, стеновые панели, информационные страницы. Используются ACF и SEO-поля. | 200. Для slug=novosti-i-stati и slug=portfolio ответ — пустой массив; код использует fallback архивов. |
| GET /wp-json/wp/v2/posts | Список статей, статья по slug, связанные записи по include; _embed добавляет изображения и термины. | 200 |
| GET /wp-json/wp/v2/portfolio_project | Список проектов, проект по slug, связанные проекты по include. | 200 |
| GET /wp-json/wp/v2/navigation | Опубликованные меню; Next.js выбирает меню по slug. | 200 |
| GET /wp-json/wp/v2/media и GET /wp-json/wp/v2/media/{id} | Изображения по include или ID: source_url, alt_text, title, media_details. | Оба варианта 200 |

## WooCommerce: каталог и заказ

| Маршрут | Назначение | Проверка local |
| --- | --- | --- |
| GET /wp-json/wc/v3/products/categories | Категории дверей, панелей и фурнитуры; parent задаёт дерево, slug — маршрутизацию. | 200, серверный ключ чтения |
| GET /wp-json/wc/v3/products | Опубликованные товары по category, slug или include, с пагинацией. Каталог, PDP, панели и фурнитура. | 200, серверный ключ чтения |
| GET /wp-json/wc/v3/products/{id} | Повторная загрузка товара перед заказом; клиентская цена не считается достоверной. | 200 для проверенных ID |
| POST /wp-json/wc/v3/orders | Next.js создаёт Woo-заказ после проверки заявки. Checkout и панели имеют разные payment_method, line_items и meta_data. | Успешный POST не выполнялся, потому что создаёт заказ. Примеры тела и используемых полей ответа — по коду. |

Для двери важны categories, images, attributes, meta_data, price, stock_status, public_article_no и headless_seo. Цена, наличие и контент зависят от окружения.

## WordPress od/v1: дверные правила

| Маршрут | Назначение | Проверка |
| --- | --- | --- |
| GET /wp-json/od/v1/door-configuration/schema | Общая схема атрибутов, фильтров, групп опций и фурнитуры. | local 200 |
| GET /wp-json/od/v1/door-product-configuration/{id} | Разрешённая конфигурация двери: семейство, canonical category, варианты, опции, фурнитура, valid и issues. Guard для PDP и заказа. | Local ID 265: 409 и valid=false; другие проверенные ID: 200. Staging ID 265: 200 и valid=true. |
| GET /wp-json/od/v1/door-filter-terms | Доступные группы фильтров и term ID для интерфейса. | local 200 |
| GET /wp-json/od/v1/door-catalog-products | По base_category_id и фильтрам возвращает ID подходящих дверей. | local 200; проверены несколько комбинаций |
| GET /wp-json/od/v1/door-seo-landings | SEO-подборки; возможны base_category_id и slug. | local 200 |
| GET /wp-json/od/v1/door-seo-landings/{id}/products | ID товаров подборки. | local 200 для проверенных ID |
| GET /wp-json/od/v1/door-configuration/manifest | Административная диагностика; фронтенд не вызывает. | local 401 без авторизации; успешный ответ с правом manage_woocommerce не проверялся |

**Связь каталога:** door-filter-terms задаёт допустимые фильтры; door-catalog-products возвращает совпавшие ID; WooCommerce отдаёт товары по этим ID. PDP получает конфигурацию из door-product-configuration/{id}, общую схему — из door-configuration/schema.

**Разница окружений:** 9 октября local вернул для товара 265 guard 409, потому что не определилась canonical configuration category внутри дерева дверей. В тот же день staging вернул 200 и valid=true. Оба полных ответа записаны в rest-api-contracts.md; смешивать их в один успешный ответ нельзя.

## Next.js API для браузера

| Маршрут | Назначение | Проверка |
| --- | --- | --- |
| GET /api/catalog | Каталог doors или panels; page, perPage (максимум 48), categorySlug и фильтры дверей. Возвращает нормализованные товары и пагинацию; для дверей также фильтры и данные категории. | Local 200 для дверей, дверей с фильтром и панелей |
| GET /api/health | Состояние приложения, окружение, deploymentId, время и uptime; Cache-Control: no-store. | local 200 |
| POST /api/checkout/order | Проверяет клиента и корзину, сверяет товары, конфигурации и цены, затем создаёт Woo-заказ. | Неполное тело: local 422. Успешные 201/идемпотентные 200 описаны по коду. |
| POST /api/wall-panels/request | Проверяет панель и заявку на расчёт, затем создаёт Woo-заказ. | Неполное тело: local 422. Успешные 201/идемпотентные 200 описаны по коду. |

Оба POST требуют JSON, Idempotency-Key и antiAbuse. Переданный Origin сверяется с разрешёнными; настройка BFF_REQUIRE_ORIGIN определяет, обязателен ли сам заголовок. Действуют ограничения частоты. Реальные успешные POST не выполнялись. Их успешные ответы и тело Woo-заказа в полном файле — синтетические примеры по реализации, а не снимок сервера.

## Поддержка документации

После изменения REST-ответа обновляйте полную пару в rest-api-contracts.md и затронутый смысл или статус здесь. [generate-rest-api-corpus.ps1](../../scripts/generate-rest-api-corpus.ps1) переснимает **только local GET WordPress/WooCommerce**. Ему нужны доступный local WordPress, ключи Woo в .env.local и существующий rest-api-contracts.md со списком запросов. Он считывает GET-запросы из заголовков полного файла и сохраняет разделы Next.js и staging без обновления; их надо проверять отдельно. Новую пару запроса и ответа добавляйте в полный файл, а новый шаблон маршрута — также сюда.

Снимок охватывает маршруты текущей витрины и репрезентативные параметры, а не все возможные ID и сочетания фильтров WP/Woo.
