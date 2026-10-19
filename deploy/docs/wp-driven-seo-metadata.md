# WordPress-driven SEO metadata

## PRE-FLIGHT — 16 октября 2026

Рабочая ветка: `feat/wp-driven-seo-metadata`; исходный HEAD: `a45a466`.
До реализации рабочее дерево содержало только пользовательский untracked `AGENTS.md`; он не изменялся.

Фактические зависимости: Next.js 15.5.21, React/React DOM 19.2.5, TypeScript 5.9.3.
LocalWP: WordPress 6.9.4, WooCommerce 10.6.1, ACF 6.7.1, PHP 8.2.29.
Локальные mu-плагины до изменений совпадали с `wordpress/mu-plugins`; их SEO-механизм совпадал с `repomix-output-wp14.md`.
Архив `client49.zip` в Downloads не найден; проверялось фактическое рабочее дерево и работающий LocalWP, а не предположения об архиве.
Каталог `wordpress/mu-plugins client44 SEO-page` — историческая копия; deploy-скрипт использует `wordpress/mu-plugins`.

Проверенные существующие механизмы:

- `OD_Headless_SEO_Foundation` регистрирует ACF-группу `group_od_headless_seo` в PHP и добавляет `headless_seo` к WP/Woo REST.
- OD REST посадочных вызывает публичный `get_post_seo()` Foundation; отдельный SEO endpoint не нужен.
- Адаптеры нормализуют `headless_seo`; metadata собирается в `buildSeoMetadata`.
- Sitemap уже фильтрует `noindex`; индексация дополнительно ограничена `SITE_INDEXING_ENABLED` и политикой маршрута.
- Layout содержит Title template; проверено поведение установленного Next.js: `title.absolute` обходит его.
- Технические metadata корзины, checkout и 404 заданы отдельно и сохраняются.
- Корневая категория без фильтров пропускала Woo SEO. Главная и панели сужали SEO-объект при передаче в metadata.

Read-only SELECT в транзакции READ ONLY подтвердил активные ACF, Cyr-To-Lat и WooCommerce; другого активного SEO-плагина нет.
Дублирующей DB-группы Foundation нет. Старые `home_meta_*` и `wall_panels_meta_*` зарегистрированы в ACF/БД, а не в PHP репозитория; они сохраняются как fallback.
Главная storefront выбирается существующим адаптером по slug `glavnaya`; настройки WordPress `show_on_front=posts` не используются для маршрута Next.js `/`.
Реальные GET подтвердили существующий контракт для страниц, статей, портфолио, товара, Woo-категории и OD-посадочных.
Блокирующих противоречий, необходимости менять модель дверей или мигрировать данные не выявлено.

## Контракт и приоритеты

Расширяется существующий `headless_seo`. Старые `title`, `description`, `image`, `noindex` сохраняют типы и места хранения.
Новые поля необязательны для потребителя; PHP отдаёт пустые текстовые/медийные значения как `null`.

| REST | ACF/meta key | Fallback |
| --- | --- | --- |
| `title` | `seo_title` | Существующая генерация заголовка |
| `description` | `seo_description` | Существующее описание |
| `image` | `seo_og_image` | Основное изображение контента |
| `noindex` | `seo_noindex` | `false`, с учётом технических запретов |
| `og_title` | `seo_og_title` | Общий SEO Title; при пустом SEO Title — прежний брендированный fallback |
| `og_description` | `seo_og_description` | Общий SEO Description |
| `twitter_title` | `seo_twitter_title` | OG Title |
| `twitter_description` | `seo_twitter_description` | OG Description |
| `twitter_image` | `seo_twitter_image` | OG image |
| `canonical_url` | `seo_canonical_url` | Автоматический Canonical |

Изображения имеют прежнюю форму `{ id, url, alt }`. Next.js выводит абсолютные HTTP(S) URL.
Явный `seo_title` выводится через `title.absolute`, без добавления бренда; контент H1 не меняется.
Для главной и панелей общий `headless_seo` имеет приоритет над специализированными legacy-полями. Их значения не удаляются.
Данные приходят в существующих запросах WP/Woo/OD; новые BFF-маршруты и SEO HTTP-запросы не добавлены.
Корневая категория использует существующий общий кеш загрузки Woo-категорий, который нужен и для рендера каталога.

## Canonical

Источник ручного Canonical ограничен кодом:

- информационные маршруты `/o-nas`, `/kontakty`, `/klientam/{zamery,oplata,dostavka,ustanovka}`, `/partneram/{podryadchikam,arkhitektoram}`, `/uhod-i-obsluzhivanie`, `/garantiya`;
- страницы статей `/novosti-i-stati/[slug]`;
- проекты `/portfolio/[slug]`.

ACF скрывает поле на других сущностях, PHP не передаёт их ручной Canonical, а Next.js дополнительно проверяет политику источника.
Главная, архивы, каталог панелей, категории, товары и SEO-посадочные сохраняют автоматический Canonical.

Значение — путь, начинающийся с одного `/`, без домена, query, fragment, обратных слешей, управляющих символов, `.`/`..`-сегментов и неоднозначного кодирования.
Технические цели `/api`, `/checkout`, `/shopping-cart`, `/feeds`, XML и TXT отклоняются.
Некорректное значение блокируется в ACF; при получении такого значения извне Next.js пишет `[SEO]` warning и использует автоматический путь.
Дополнительных запросов для проверки существования цели нет: редактор проверяет, что целевая страница существует и индексируема.

Если разрешённый Canonical указывает на другой URL, исходная страница исключается из Sitemap. Целевой URL искусственно не добавляется.
Пустой или отклонённый Canonical сохраняет прежнее поведение. Ручной Canonical не отменяет `noindex` и глобальный запрет индексации.

## Проверки

Автоматические проверки:

```powershell
npm run lint
npm run typecheck
npm run build
node --test tests/seo-metadata.test.cjs
php tests/headless-seo-foundation.test.php
```

PHP-тест изолирован от WordPress/БД. Node-тест использует установленный Next title resolver, проверяет старые payload, социальные fallback, абсолютные изображения, приоритеты robots, Canonical/Sitemap и правила категории/посадочной/товара.
Адаптеры главной и панелей проверяются с контролируемыми REST-ответами и запретом неожиданных HTTP-запросов.

Обратимый реальный сценарий запускается отдельно, только в данном LocalWP, при свободном порте 3000:

```powershell
& .\tests\verify-local-seo.ps1 `
  -WpRoot 'C:\Users\I\Local Sites\ofisne-dveri\app\public' `
  -Php 'C:\Users\I\AppData\Roaming\Local\lightning-services\php-8.2.29+0\bin\win64\php.exe' `
  -PhpIni 'C:\Users\I\AppData\Roaming\Local\run\LjX1katsB\conf\php\php.ini'
```

Скрипт устанавливает текущий Foundation только в LocalWP, сохраняет прежний PHP и SEO-значения во временном каталоге.
Он проверяет восемь сущностей через реальные WP/Woo/OD REST и серверный HTML: главную, панели, информационную страницу, статью, портфолио, товар, посадочную и корневую категорию.
Три фазы: явные SEO/OG/Twitter/image/Canonical, затем `noindex`, затем пустые значения/fallback.
Проверяются Sitemap, residual query, корзина и checkout. Next.js перезапускается между фазами для очистки существующего кеша категорий; HTML-запросы используют hard refresh (`Cache-Control: no-cache`) для обхода dev Data Cache.
В `finally` восстанавливаются все исходные SEO-значения и ACF reference meta; восстановление проверяется чтением. Новый PHP-плагин остаётся установленным локально.
Путь резервной копии и диагностических логов выводится в конце. Production/staging и `.env.local` не меняются.

### Результат локальной проверки 16.10.2026

- Финальные `npm run lint`, `npm run typecheck`, `npm run build`, восемь Node SEO-тестов, PHP contract-тест и PHP syntax checks прошли. Lint сохранил существующие предупреждения об `<img>`; ошибок нет. `git diff --check` прошёл.
- Прошли все три фазы реального WP → REST → HTML → Canonical/Robots/Sitemap для восьми сущностей. Проверены независимые OG/Twitter и два разных изображения.
- Категория с фильтром, посадочная с residual query, корзина и checkout сохранили `noindex` при глобально разрешённой индексации.
- Отдельный запуск с `SITE_INDEXING_ENABLED=false`: восемь маршрутов, включая 404, отдали `noindex`; Sitemap пуст; robots.txt содержит `Disallow: /`.
- Исходные SEO-значения и ACF reference meta восстановлены и проверены чтением. Контрольные GET подтвердили прежний SEO товара 106 и `noindex=true` у существующих посадочных 875/880.
- В Product JSON-LD сохранились реальные имя, SKU, productID 106, отдельный URL товара, цена 32000 RUB и InStock. Генераторы JSON-LD не изменялись.
- Реальные GET подтвердили, что WP pages `novosti-i-stati` и `portfolio` пока отсутствуют. Архивы продолжают использовать предусмотренный fallback; для редактирования их SEO потребуется создать обычные WP pages с этими slug.
- Итоговый review не выявил блокирующих дефектов. Модель дверей, preferred resolver, AND/OR-фильтры, universal route, Product JSON-LD и BFF не изменены.

Резервная копия успешного roundtrip и HTML/логи: `C:\Users\I\AppData\Local\Temp\od-seo-69fe9d81d33e40f4a5678e10a14d55e8`.

Сравнение повторного GET в локальном dev-сервере (мс; первый запрос с компиляцией исключён):

| Страница | До | После |
| --- | ---: | ---: |
| Главная | 1245 | 1239 |
| Корень дверей | 275 | 280 |
| Статья | 1048 | 1184 |

Для REST после изменения выполнено по пять последовательных GET: медианы категории 189 мс, товара 215 мс, статьи 206 мс; исходные контрольные GET — 211/242/221 мс соответственно.
Это небольшая dev-выборка, чувствительная к прогреву и параллельной нагрузке, а не нагрузочный benchmark. Существенного необъяснённого ухудшения не обнаружено.
Дополнительных SEO HTTP-запросов нет; реальный журнал главной сохраняет прежние пять WP GET и два Woo GET при первом рендере.

Актуальный фрагмент `headless_seo` после восстановления страницы 699 (`GET /wp-json/wp/v2/pages?slug=stenovye-paneli&_fields=id,slug,headless_seo`, HTTP 200):

```json
{
  "title": null,
  "description": null,
  "image": null,
  "noindex": false,
  "og_title": null,
  "og_description": null,
  "twitter_title": null,
  "twitter_description": null,
  "twitter_image": null,
  "canonical_url": null
}
```

Та же расширенная форма подтверждена в реальных `wc/v3/products/106`, `wc/v3/products/categories?slug=mezhkomnatnye-dveri`, `wp/v2/posts`, `wp/v2/portfolio_project` и `od/v1/door-seo-landings?slug=ofisnye`.

## Ручная приёмка и ограничения

1. Открыть ACF SEO-группу у страницы, статьи, проекта, товара, Woo-категории и SEO-посадочной. Проверить доступность социальных полей и видимость Canonical только у разрешённых источников.
2. Задать SEO Title с собственным брендом и проверить ровно один `<title>` без добавленного суффикса. Очистить поле и проверить прежний fallback; H1 должен сохраниться.
3. Задать разные SEO, OG и Twitter Title/Description, разные изображения. Проверить REST и исходный серверный HTML. Поочерёдно очищать Twitter и OG для проверки наследования.
4. Проверить главную и панели: общий SEO → legacy → прежний fallback. У корня дверей изменить SEO Woo-категории и проверить чистый URL.
5. Для информационной страницы/статьи/проекта задать `/kontakty`, проверить абсолютный Canonical и отсутствие исходного URL в Sitemap. Очистить поле и проверить возврат self-canonical/Sitemap.
6. Проверить отклонение внешнего URL, `//host`, query, fragment, `..`, технического пути. Для импортированного некорректного значения проверить `[SEO]` warning и автоматический Canonical.
7. Включить WP `noindex` для каждого типа: HTML должен содержать `noindex`, Sitemap — исключить URL. При `SITE_INDEXING_ENABLED=false` все страницы остаются закрыты, Sitemap пуст, robots.txt запрещает обход.
8. Проверить чистую категорию, чистую непустую посадочную, посадочную с residual query, отдельные SEO-URL товаров, корзину, checkout и 404. Фильтры, состав товаров, цены, наличие и JSON-LD должны сохраниться.
9. Восстановить исходные значения и повторить ключевые GET/HTML/Sitemap проверки.

Существующие кеши не менялись: контент обычно 300 секунд, Woo-категории 300 секунд, Sitemap 3600 секунд; итоговое обновление зависит также от кешей запросов/страниц Next.js. При приёмке дождаться revalidation или перезапустить локальный сервер.
Синтаксическая проверка Canonical не проверяет HTTP-статус и индексацию цели. Наличие подходящего целевого URL остаётся редакторской проверкой.
Архивы получают SEO из WP pages по соответствующим slug, когда такие страницы существуют; при их отсутствии сохраняется существующий fallback.
В LocalWP у части других товаров уже был guard 409 из-за данных конфигурации; SEO-изменения его не исправляют.
