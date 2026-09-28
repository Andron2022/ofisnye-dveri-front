# Local → Staging: MVP Door PDP Product Information Presentation & Specifications Foundation

## Назначение

Пошаговый runbook для продвижения кода шага из проверенного Local/Git в существующий staging **без переноса WordPress DB**.

Шаг добавляет:

- глобальные PDP presentation roles для Woo attributes;
- независимый порядок атрибутов в кратком блоке PDP и в табе «Характеристики»;
- product-level произвольные характеристики `Название + Описание/значение + Порядок`;
- динамический frontend без hardcoded списка характеристик;
- новые поля в `/wp-json/od/v1/door-configuration/schema`;
- усиленную deploy verification.

Staging:

```text
Storefront: https://staging.ofisnyedveri.ru
WordPress:  https://wp-staging.ofisnyedveri.ru
WP root:    /srv/wordpress/staging/public
App root:   /srv/ofisnye-dveri/staging
```

## 0. Что не переносим

Для этого шага запрещён полный перенос Local DB → Staging.

Не переносим:

```text
Local WordPress DB
Local wp-content/uploads
Local test products
Local custom PDP characteristics
```

Из Local в staging продвигается только approved Git SHA. Presentation settings и тестовые custom rows на staging задаются точечно в существующей staging DB.

---

## 1. Local: применить changed-files и проверить diff

В корне актуального `client47` применить архив шага или patch.

PowerShell:

```powershell
cd "E:\Practic\ofisnye-dveri-front"

git status --short
git diff --check
git diff --stat
```

Ожидаются только файлы шага.

---

## 2. Local: статические проверки

PHP:

```bash
php -l wordpress/mu-plugins/door-product-configuration.php
```

Deploy scripts:

```bash
bash -n deploy/scripts/verify-wordpress-environment.sh
bash -n deploy/scripts/verify-door-configuration-readiness.sh
```

Если локальная установка уже содержит `node_modules`, выполнить обычные проверки проекта:

```powershell
npm run lint
npm run typecheck
```

`npm ci` специально для этого шага не требуется.

---

## 3. Local: проверить глобальное управление PDP

Открыть:

```text
Товары → Конфигурация дверей → Отображение PDP
```

Для каждого Woo attribute доступны независимые настройки:

```text
Краткий блок: показывать / не показывать
Краткий блок: порядок
Характеристики: показывать / не показывать
Характеристики: порядок
```

Проверить, что initial defaults сохраняют прежний интерфейс:

```text
Краткий блок:
Материал → Остекление → Тип открывания → Направление открывания → Огнестойкость → Тип остекления

Характеристики:
Цвет → Размер → Количество полотен → Материал → Остекление → Тип открывания → Назначение → Направление открывания → Огнестойкость → Тип остекления
```

Названия должны приходить из Woo label, а не из отдельного поля PDP.

---

## 4. Local: проверить произвольные характеристики товара

Открыть тестовую дверь:

```text
Товары → нужный товар → Данные товара → Доп. характеристики PDP
```

Добавить, например:

```text
Название: Максимальная высота
Описание / значение: До 3000 мм по согласованию
Порядок: 75
```

Сохранить товар.

Проверить, что строка появилась только у этого товара и заняла место в общей таблице согласно `Порядок`.

Повторяемые характеристики нескольких товаров не добавлять как custom rows — для них использовать Woo global attributes.

---

## 5. Local: REST-проверка

Проверить:

```text
https://ofisnye-dveri.test/wp-json/od/v1/door-configuration/schema
```

У каждой записи `attributes[]` должны присутствовать:

```json
{
  "pdp_summary_enabled": true,
  "pdp_summary_order": 40,
  "pdp_characteristics_enabled": true,
  "pdp_characteristics_order": 40
}
```

Значения зависят от конкретного атрибута.

Через authenticated Woo REST проверить тестовый product и убедиться, что в `meta_data` присутствует:

```text
od_door_pdp_custom_characteristics_v1
```

для товара, где была добавлена custom row.

---

## 6. Local: storefront acceptance

Открыть реальный PDP двери и проверить:

1. `Арт.`, `Наличие`, `Категории` остались системными строками.
2. После них показываются только attributes, включённые в «Краткий блок».
3. Их порядок соответствует admin setting.
4. Attribute без значения у конкретного товара не создаёт пустую строку.
5. В табе «Характеристики» показываются только attributes, включённые для этого таба.
6. Custom rows смешиваются с Woo attribute rows по общему `order`.
7. Многострочное custom-описание сохраняет переносы строк.
8. Переименование Woo attribute label меняет label одновременно в фильтре, кратком блоке PDP и характеристиках.
9. Новый Woo attribute сам на PDP не появляется, пока его явно не включить.

Regression:

```text
Catalog filters
SEO landing routing
variantDimensions
PDP configurator
Cart
Checkout
```

должны остаться рабочими.

---

## 7. Git: зафиксировать approved release

После успешной Local-проверки:

```powershell
git add .
git commit -m "feat(pdp): add configurable product information presentation"
git push
```

После merge в `main`:

```powershell
git switch main
git pull --ff-only
git rev-parse HEAD
```

Зафиксировать полный SHA:

```text
APPROVED_SHA=<40-symbol SHA>
```

---

## 8. Staging: backup перед изменением DB-настроек

На VDS:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-staging-backup.env
```

Если имя staging backup env отличается в текущем контуре — использовать фактический файл из `/etc/ofisnye-dveri/`.

Проверить backup штатным restore verifier.

---

## 9. Staging: обновить canonical repository

```bash
sudo -iu deploy
cd /srv/ofisnye-dveri/repository

git status
git fetch --prune origin
git switch main
git pull --ff-only origin main

git cat-file -e "$APPROVED_SHA^{commit}"
git show --no-patch --oneline "$APPROVED_SHA"
exit
```

---

## 10. Staging: combined code deploy

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh \
  staging \
  "$APPROVED_SHA" \
  /etc/ofisnye-dveri/staging-inventory.env
```

Deploy обновляет из одного SHA:

```text
Git-managed wordpress/mu-plugins
Next.js storefront
```

DB не импортируется.

---

## 11. Staging: code-health

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-wordpress-environment.sh \
  /etc/ofisnye-dveri/staging-inventory.env
```

Новая проверка должна подтвердить, что `/door-configuration/schema` содержит для каждого attribute:

```text
pdp_summary_enabled: boolean
pdp_summary_order: non-negative integer
pdp_characteristics_enabled: boolean
pdp_characteristics_order: non-negative integer
```

Также выполнить текущий readiness-check проекта в принятом режиме fallback.

---

## 12. Staging: синхронизировать Registry без переноса данных

Войти в:

```text
https://wp-staging.ofisnyedveri.ru/wp-admin/
```

Сам вход в admin запускает штатный `admin_init` Registry sync.

Затем открыть:

```text
Товары → Конфигурация дверей → Отображение PDP
```

и вручную выставить принятые на Local роли/порядок для staging.

Не импортировать для этого полный Local configuration manifest, если Local содержит тестовые Schema/Policy данные, которые не должны попасть в staging.

---

## 13. Staging: добавить test custom row

На одном staging test product добавить строку через:

```text
Данные товара → Доп. характеристики PDP
```

Например:

```text
Тестовая характеристика staging
Проверка product meta
75
```

Это тестовые данные staging, а не перенос Local product meta.

---

## 14. Staging: functional acceptance

Проверить минимум два товара разных family/category.

### Краткий блок

- системные строки не исчезли;
- включение/выключение attribute работает независимо;
- order работает;
- Woo label синхронен.

### Характеристики

- глобальные attribute rows работают;
- custom row показывается только на нужном product;
- единый order работает;
- пустые values не отображаются.

### Regression

- каталог;
- filters и «Посмотреть все»;
- SEO landing;
- family selectors;
- configurator;
- cart;
- checkout.

---

## 15. Зафиксировать staging acceptance

Зафиксировать отдельно от Git:

```text
APPROVED_SHA=<sha>
Staging combined deploy=PASS
WP schema PDP contract=PASS
PDP summary=PASS
PDP characteristics=PASS
Custom product rows=PASS
Woo label sync=PASS
Catalog/SEO regression=PASS
Cart/Checkout regression=PASS
```

Только этот SHA использовать для production.
