# MVP Color & Texture Swatches Foundation

Область UI: только PDP дверей. Источник значений — существующие Woo terms; визуальные данные — существующая ACF-группа «ПОЛЯ ДЛЯ ЦВЕТА». Группа ACF и её `show_in_rest` не изменяются.

## REST

`GET /wp-json/od/v1/attribute-term-swatches?taxonomy=pa_tsvet-dveri`

- Публичный GET без Woo credentials. Allowlist: `pa_tsvet-dveri`, `pa_tsvet-paneli`.
- Ответ: `{ schema_version: 1, taxonomy, items, products }`.
- `items`: `term_id`, `taxonomy`, `name`, `slug`, `type: color | image`, `color`, `thumbnail_url`, `preview_url`, `order`, `issues`.
- `product_ids=241,261` — необязательный CSV из максимум 100 положительных ID. `products` содержит `{ product_id, term_ids }` только для опубликованных Woo products. Без параметра возвращается пустой массив.
- Привязки нужны потому, что стандартный Woo product REST отдаёт attribute options строками. BFF получает настоящие term ID одним пакетным вызовом, сопоставляет metadata по taxonomy + ID и только затем связывает результат с прежними строковыми значениями presentation. Названия не используются для угадывания идентичности; несовпадение при переименовании даёт fallback.
- Все terms возвращаются независимо от `catalog_filter_enabled`, включая значения без товаров. Это представление существующего справочника Woo, а не новый реестр.
- Неизвестная/неразрешённая taxonomy и некорректные product IDs → HTTP 400. Административные ACF-поля, draft products и Woo keys не публикуются.

PHP читает только четыре известных `swatch_*` term meta. ACF Image с return format URL хранит в raw meta attachment ID; форматированное URL-значение для поиска attachment не требуется. Term meta и attachment metadata загружаются пакетно. Используются стандартные WordPress `thumbnail` и `medium`, с ограниченным fallback на другие штатные размеры. Большой оригинал при отсутствии производных не возвращается: предел максимального измерения — 320 px для thumbnail и 800 px для preview. Удалённый attachment/отсутствующие размеры → null URLs и диагностический `issues`.

## BFF и PDP

- `wpNamespaceGet` переиспользует существующие transport, memory cache и Next fetch cache. TTL — 60 секунд; ключ включает taxonomy и отсортированный уникальный список ID всей family. Переходы внутри family используют тот же ключ. Промах кеша означает один дополнительный пакетный запрос; hover/focus запросов REST не выполняет.
- BFF проверяет версию, структуру ответа, term IDs, assignments, HEX, тип, неотрицательный целый порядок и URL. Разрешены HTTP(S) media URL того же WP host, внутри `/wp-content/uploads/`, без URL credentials. Список источников Next.js не расширяется: используются штатные миниатюры через `<img>`, как в существующем storefront.
- `presentation.colorSwatches` сериализуется как plain object для React Server Components. Он не участвует в variant coordinate, exact sibling, URL resolution, configuration policy, цене и корзине.
- Цвет: круг 32 px с точным HEX и различимой границей. Текстура: 56 × 32 px, `object-fit: cover`, центрирование. Область нажатия минимум 44 px по высоте.
- Активность обозначают рамка, галочка и доступное имя. Доступный вариант остаётся ссылкой; недоступный — элемент без href с `aria-disabled` и перечёркиванием.
- Превью до 200 px: portal в `document.body`, fixed positioning с ограничением viewport, пересчёт при scroll/resize/изменении размеров. Keyboard focus открывает его, Escape закрывает. Превью не перехватывает клики. После первого открытия DOM изображения сохраняется до ухода с PDP.
- Touch не требует hover: первое касание ссылки выполняет переход. Изображение текстуры видно постоянно.
- Сортировка только PDP: `swatch_order`, имя через ru collator, term ID, окончательный стабильный строковый tie-break. Каталожный Woo `menu_order` не меняется.

## Деградация и диагностика

- Ошибка REST/невалидный корневой контракт → пустая visual model, рабочие прежние variant links.
- Отсутствующие metadata или невалидный HEX → прежний визуальный fallback по названию.
- `image` без валидных media URL или с ошибкой загрузки thumbnail → нейтральный прямоугольник с названием. Ошибка preview скрывает только превью. Сломанная картинка не остаётся в интерфейсе.
- Неполные metadata и ошибки контракта диагностируются на сервере; сетевые ошибки media — в browser console. Это отдельный визуальный fallback, не legacy fallback configuration policy.
- Обновления ACF/assignments могут быть видны с задержкой кеша до 60 секунд. Новый PHP-код нужно доставлять вместе с frontend; пока endpoint отсутствует, PDP работает с fallback.
- Загружать рекомендуется образец материала около 600 × 400 px. `thumbnail` может быть квадратной штатной обрезкой WordPress; превью использует `medium` с естественными пропорциями. Никаких изменений исходного файла или генерации собственных текстур нет.

## Проверки

```text
npm run lint
npm run typecheck
npm run build
php -l wordpress/mu-plugins/attribute-term-swatches.php
node scripts/verify-color-swatches.cjs
node scripts/verify-color-swatches.cjs --live
```

Последняя команда рассчитана на текущие реальные LocalWP fixtures: HEX term 58, texture term 130, product 241. Проверяет оба media URL, canonical assignments, панели и запрет произвольных taxonomy/невалидных IDs. Offline-проверки охватывают ошибочные metadata, безопасные URL, дубликаты/неоднозначность, сортировку, plain-object сериализацию, один BFF batch call и ошибку REST.

Фактически проверено 13.11.2026:

- Lint, TypeScript, production build, PHP syntax и все 6 проверок скрипта прошли. Lint/build содержат предупреждения существующего проекта о `<img>`, Sass/Bootstrap; для новых swatches `<img>` сознательно использует готовые WP sizes без расширения Next image config.
- В браузере на собранном standalone: product 241 получил term 130, thumbnail загрузился, preview 300 × 200 загрузился при открытии. Рядом отрисован круг term 58 с `rgb(221, 153, 51)`, соответствующим `#dd9933`.
- Mouse preview и keyboard focus preview работают; Escape и уход указателя закрывают preview. У левого края узкого окна preview начинается с x=8 и остаётся в viewport. На узком и широком экранах горизонтального переполнения нет; высота обоих targets — 44 px.
- Проверен доступный переход в family DK01: «Древесина графит» → «Макассар мокка», открылся правильный sibling URL, размер 600х2000 сохранился.
- У DK02 (241/261) разные размеры. Цвет без exact sibling остаётся disabled, href отсутствует. Это существующее доменное ограничение, данные family не менялись.
- Реальный touch-device, изменение `swatch_order` в admin и сетевой отказ media в браузере остаются ручными проверками ниже. Невалидные metadata/URL и отказ REST покрыты проверками адаптера; производственные данные не менялись.

Ручные acceptance-проверки:

1. Открыть PDP товара 241: активная текстура «Бетон светло серый» и круг «Дуб Канзас коричневый» должны сосуществовать. У дуба HEX `#dd9933`.
2. Навести на текстуру и перейти к ней клавиатурой: проверить preview, Escape, закрытие при уходе курсора/фокуса, отсутствие смещения страницы.
3. Проверить swatches у края viewport и при прокрутке: preview должен оставаться внутри окна, поверх контейнеров.
4. На узком экране проверить перенос элементов, видимую текстуру и переход первым касанием по доступной ссылке.
5. Проверить доступную точную комбинацию цвета + остальных dimensions: ссылка должна открывать прежний sibling URL. У family DK02 товары 241/261 имеют разные размеры; недоступный при текущем размере цвет должен оставаться без ссылки.
6. На других family проверить активность, недоступность, переключение размеров/других dimensions и неизменную комплектацию.
7. В локальной ACF временно изменить порядок цветов, проверить возрастание после TTL и стабильность при равных значениях; восстановить данные.
8. Без изменения production смоделировать ошибку media/REST: проверить нейтральную текстуру/прежний fallback, сохранность выбора и отсутствие сломанных изображений.
9. В Network проверить отсутствие REST при hover/focus и загрузку preview только при первом открытии; повторное открытие использует тот же DOM image.
10. Убедиться, что каталог, SEO landing, canonical, корзина и оформление заказа работают как прежде. Тестовый заказ не создаётся этой проверкой автоматически.

## Реальные ответы LocalWP

Снимок от 13.11.2026. Значения относятся только к LocalWP; production DB не изменялась.

### GET /wp-json/od/v1/attribute-term-swatches?taxonomy=pa_tsvet-dveri&product_ids=241,261

HTTP 200, без авторизации.

~~~json
{
  "schema_version": 1,
  "taxonomy": "pa_tsvet-dveri",
  "items": [
    {
      "term_id": 33,
      "taxonomy": "pa_tsvet-dveri",
      "name": "Макассар мокка",
      "slug": "makassar-mokka",
      "type": "color",
      "color": null,
      "thumbnail_url": null,
      "preview_url": null,
      "order": 0,
      "issues": [
        "missing_metadata",
        "invalid_color"
      ]
    },
    {
      "term_id": 58,
      "taxonomy": "pa_tsvet-dveri",
      "name": "Дуб Канзас коричневый",
      "slug": "dub-kanzas-korichnevyj",
      "type": "color",
      "color": "#dd9933",
      "thumbnail_url": null,
      "preview_url": null,
      "order": 0,
      "issues": []
    },
    {
      "term_id": 72,
      "taxonomy": "pa_tsvet-dveri",
      "name": "Древесина графит",
      "slug": "drevesina-grafit",
      "type": "color",
      "color": "#777777",
      "thumbnail_url": null,
      "preview_url": null,
      "order": 0,
      "issues": []
    },
    {
      "term_id": 129,
      "taxonomy": "pa_tsvet-dveri",
      "name": "Бежевый песок",
      "slug": "bezhevyy-pesok-u156-st9",
      "type": "color",
      "color": "#dd9c39",
      "thumbnail_url": null,
      "preview_url": null,
      "order": 0,
      "issues": []
    },
    {
      "term_id": 130,
      "taxonomy": "pa_tsvet-dveri",
      "name": "Бетон светло серый",
      "slug": "beton-chikago-svetlo-seryy-f186-st9",
      "type": "image",
      "color": null,
      "thumbnail_url": "https://ofisnye-dveri.test/wp-content/uploads/2026/11/beton-chikago-svetlo-seryy-f186-st9-150x150.jpg",
      "preview_url": "https://ofisnye-dveri.test/wp-content/uploads/2026/11/beton-chikago-svetlo-seryy-f186-st9-300x200.jpg",
      "order": 0,
      "issues": []
    }
  ],
  "products": [
    {
      "product_id": 241,
      "term_ids": [
        130
      ]
    },
    {
      "product_id": 261,
      "term_ids": [
        58
      ]
    }
  ]
}
~~~

### GET /wp-json/od/v1/attribute-term-swatches?taxonomy=pa_tsvet-paneli

HTTP 200, без авторизации.

~~~json
{
  "schema_version": 1,
  "taxonomy": "pa_tsvet-paneli",
  "items": [
    {
      "term_id": 65,
      "taxonomy": "pa_tsvet-paneli",
      "name": "Желтый",
      "slug": "zheltyy",
      "type": "color",
      "color": "#eeee22",
      "thumbnail_url": null,
      "preview_url": null,
      "order": 0,
      "issues": []
    },
    {
      "term_id": 66,
      "taxonomy": "pa_tsvet-paneli",
      "name": "Синий",
      "slug": "siniy",
      "type": "color",
      "color": "#1e73be",
      "thumbnail_url": null,
      "preview_url": null,
      "order": 0,
      "issues": []
    },
    {
      "term_id": 119,
      "taxonomy": "pa_tsvet-paneli",
      "name": "Красный",
      "slug": "krasnyy",
      "type": "color",
      "color": "#dd3333",
      "thumbnail_url": null,
      "preview_url": null,
      "order": 2,
      "issues": []
    }
  ],
  "products": []
}
~~~

