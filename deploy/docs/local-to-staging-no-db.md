# Local → Staging: code release without DB transfer

## Назначение

Штатный release-runbook для продвижения проверенного кода из Local/GitHub в существующий staging-контур **без переноса WordPress DB**.

Актуально для изменений `Door Catalog Filter Presentation`:

- Woo задаёт порядок значений global attribute через `Default sort order`;
- Door Attribute Registry хранит `Показывать до «Посмотреть все»`;
- storefront отображает первые N значений, выбранные значения всегда видимы;
- остальные значения остаются в DOM и раскрываются кнопкой `Посмотреть все`;
- `filterKey`, taxonomy, term ID, SEO landing rules и routing не меняются.

Staging:

```text
Storefront: https://staging.ofisnyedveri.ru
WordPress:  https://wp-staging.ofisnyedveri.ru
WP root:    /srv/wordpress/staging/public
App root:   /srv/ofisnye-dveri/staging
```

## 0. Что принципиально НЕ делаем

В этом release запрещено:

```text
Local DB → Staging DB
wp db import локального dump в staging
полная замена staging wp-content/uploads
```

Изменения Woo/Registry выполняются **точечно в существующей staging DB** через админку. Это изменение данных, но не перенос БД.

---

## 1. Local: применить изменённые файлы

В корне проекта должен находиться актуальный `client46` с ранее применённым label-sync fix и новым filter presentation fix.

Проверить:

```powershell
cd "E:\Practic\ofisnye-dveri-front"

git status --short
git diff --check
git diff --stat
```

Изменения должны быть только ожидаемыми файлами шага.

---

## 2. Local: PHP и frontend verification

Если PHP доступен из Local Site Shell:

```bash
php -l wordpress/mu-plugins/door-product-configuration.php
php -l wordpress/mu-plugins/door-seo-landing.php
```

В PowerShell:

```powershell
npm run lint
npm run typecheck
npm run build
```

Дальше не идти при ошибках.

---

## 3. Local WordPress: настроить и проверить функционал

### 3.1. Настроить порядок term values в Woo

Открыть:

```text
Товары → Атрибуты → нужный атрибут → Редактировать
```

Для ручного drag-and-drop порядка установить:

```text
Порядок сортировки по умолчанию = Произвольный порядок / Custom ordering
```

Затем открыть `Настроить значения` и расставить значения в нужном порядке.

Пример:

```text
1. Для АЗС
2. Для автосалонов
3. Для офисов
...
```

Если у атрибута выбрано `Name`, `Name (numeric)` или `Term ID`, storefront должен следовать именно этому Woo-режиму, а не drag-and-drop.

### 3.2. Настроить лимит отображения

Открыть:

```text
Товары → Конфигурация дверей → Атрибуты и фильтры
```

В колонке:

```text
Показывать до «Все»
```

указать, например:

```text
5
```

Семантика:

```text
0 = показывать все значения сразу
N > 0 = показать первые N и кнопку «Посмотреть все»
```

Нажать `Сохранить фильтры`.

### 3.3. Проверить REST

Открыть/запросить:

```text
https://ofisnye-dveri.test/wp-json/od/v1/door-filter-terms
```

Для нужной группы проверить:

```json
{
  "filter_key": "naznachenie",
  "collapsed_visible_count": 5,
  "terms": [
    { "name": "Для АЗС" },
    { "name": "Для автосалонов" }
  ]
}
```

Порядок `terms[]` должен совпадать с выбранным Woo `Default sort order`.

### 3.4. Проверить storefront

Открыть реальную категорию:

```text
/mezhkomnatnye-dveri
```

или дочернюю категорию с этим фильтром.

Проверить:

1. первые N значений соответствуют Woo-порядку;
2. если значений больше N — есть `Посмотреть все`;
3. после клика видны остальные значения и появляется `Свернуть`;
4. после `Свернуть` остаются первые N;
5. выбранное значение ниже N остаётся видимым даже в свёрнутом состоянии;
6. фильтрация и preferred SEO URL продолжают работать;
7. чистые SEO landing links не исчезли из DOM.

---

## 4. Git: зафиксировать release

После успешной Local-проверки:

```powershell
git add .
git commit -m "feat(filters): add Woo ordering and collapsed value limit"
git push
```

После merge в `main`:

```powershell
git switch main
git pull --ff-only
git rev-parse HEAD
```

Сохранить полный SHA как:

```text
APPROVED_SHA=<full sha>
```

---

## 5. Staging: backup перед точечными изменениями данных

Под `root` на VDS:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-backup.env

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-backup.env local
```

Если restore-test не прошёл — release остановить.

Этот backup не переносится из Local: он создаётся из текущей staging DB.

---

## 6. Staging: обновить repository и проверить SHA

```bash
sudo -iu deploy
cd /srv/ofisnye-dveri/repository

git status
git fetch --prune origin
git switch main
git pull --ff-only origin main
git rev-parse HEAD
exit
```

Полученный SHA должен быть равен `APPROVED_SHA`.

---

## 7. Staging: deploy кода без DB import

Запустить единый штатный orchestrator именно по подтверждённому SHA:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh \
  staging \
  "$APPROVED_SHA" \
  /etc/ofisnye-dveri/staging-inventory.env
```

Для закрытого staging скрипт запросит Basic Auth для external smoke test.

Успешный итог должен содержать:

```text
Combined application release passed
```

---

## 8. Staging: точечно повторить настройки данных

Поскольку БД не переносится, Local-настройки сами в staging не появятся.

В `https://wp-staging.ofisnyedveri.ru/wp-admin/` вручную:

1. у нужного Woo attribute выставить правильный `Default sort order`;
2. если используется `Custom ordering`, расставить terms drag-and-drop;
3. `Товары → Конфигурация дверей → Атрибуты и фильтры`;
4. установить тот же `Показывать до «Все»`;
5. сохранить.

Это точечное изменение staging DB, а не её перенос.

---

## 9. Staging: проверить REST-контракт

Пример для `naznachenie`:

```bash
curl -fsS \
  https://wp-staging.ofisnyedveri.ru/wp-json/od/v1/door-filter-terms \
  | python3 -c '
import json,sys
d=json.load(sys.stdin)
g=next(x for x in d["groups"] if x["filter_key"]=="naznachenie")
print("collapsed_visible_count=", g.get("collapsed_visible_count"))
for i,t in enumerate(g["terms"],1):
    print(i, t["id"], t["name"], t["slug"])
'
```

Проверить:

- `collapsed_visible_count` равен настройке;
- порядок вывода term совпадает с Woo;
- `filter_key` и taxonomy не изменились.

---

## 10. Staging: проверить UI и SEO-регрессию

В браузере открыть:

```text
https://staging.ofisnyedveri.ru/mezhkomnatnye-dveri
```

Проверить реальный сценарий:

```text
Woo order
→ REST order
→ filter UI order
→ collapse/expand
→ выбор значения
→ preferred URL
→ корректная товарная выборка
```

Обязательно проверить выбранное значение, находящееся ниже лимита: оно должно оставаться видимым после навигации.

Если есть SEO landing для одного из скрываемых значений, через DevTools Elements убедиться, что соответствующая `<a href>` присутствует в DOM даже в свёрнутом состоянии.

---

## 11. Staging: зафиксировать acceptance

Зафиксировать:

```text
APPROVED_SHA=<sha>
Staging deploy=PASS
WP REST order=PASS
collapsed_visible_count=PASS
Catalog UI=PASS
Selected-below-limit=PASS
SEO routing=PASS
```

Только этот SHA разрешается продвигать в production.

---

## 12. Rollback

При code-регрессии orchestrator выполняет component rollback автоматически при неуспешном deploy.

Для ручного отката использовать существующие project scripts, а не DB import.

Если требуется отменить только новую UI-настройку до code rollback:

```text
Показывать до «Все» = 0
```

Это возвращает отображение всех значений сразу.

Полный Local DB → Staging DB для rollback этого шага не нужен.
