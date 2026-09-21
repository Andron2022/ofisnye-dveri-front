# Approved Local/Staging code → Production: release without DB transfer

## Статус Production DB

**Production DB уже боевая.**

Для обычных releases действует жёсткое правило:

```text
НЕ переносить полностью Local DB → Production
НЕ переносить полностью Staging DB → Production
НЕ заменять production DB dump-файлом другого окружения
```

Production data изменяются только точечно через WP/Woo admin, контролируемый WP-CLI/SQL migration или отдельно утверждённый data-sync механизм.

Этот runbook продвигает **только одобренный Git SHA приложения**, а настройки нового filter UI повторяются точечно в существующей production DB.

Production:

```text
Storefront: https://ofisnyedveri.ru
WordPress:  https://wp.ofisnyedveri.ru
WP root:    /srv/wordpress/production/public
App root:   /srv/ofisnye-dveri/production
```

---

## 0. Preconditions

До production release должны быть зафиксированы:

```text
APPROVED_SHA=<полный SHA>
Staging deploy=PASS
WP REST order=PASS
collapsed_visible_count=PASS
Catalog UI=PASS
Selected-below-limit=PASS
SEO routing=PASS
```

Нельзя вместо `APPROVED_SHA` без проверки брать новый HEAD, если после staging acceptance в `main` уже появились другие commits.

---

## 1. Local: убедиться в SHA

```powershell
cd "E:\Practic\ofisnye-dveri-front"
git fetch origin
git show --stat $APPROVED_SHA
git status --short
```

Проверить, что SHA содержит именно уже проверенный на staging release.

---

## 2. Production: backup боевой WordPress DB перед release

Под `root` на VDS:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env local
```

Если настроен offsite restore-test и он входит в текущий operational cycle, дополнительно:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env offsite
```

Важно: backup создаётся **из текущей production DB**. Он нужен для аварийного восстановления production, а не для её замены staging DB.

---

## 3. Production: обновить canonical Git repository

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

## 4. Production: deploy строго APPROVED_SHA

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh \
  production \
  "$APPROVED_SHA" \
  /etc/ofisnye-dveri/production-inventory.env
```

Для закрытого production-prelaunch storefront скрипт может запросить Basic Auth для external smoke test.

Успешный итог:

```text
Combined application release passed
```

Этот deploy обновляет:

```text
Git-managed wordpress/mu-plugins
Next.js immutable release
```

и **не импортирует production DB**.

---

## 5. Production: точечно настроить Woo order

Открыть:

```text
https://wp.ofisnyedveri.ru/wp-admin/
Товары → Атрибуты → нужный атрибут → Редактировать
```

Выставить тот же режим `Default sort order`, который был принят на staging.

Для ручной сортировки:

```text
Произвольный порядок / Custom ordering
```

Затем `Настроить значения` и расставить terms в том же порядке.

Не менять taxonomy slug и filterKey.

---

## 6. Production: точечно настроить количество видимых значений

Открыть:

```text
Товары → Конфигурация дверей → Атрибуты и фильтры
```

У нужного фильтра в колонке:

```text
Показывать до «Все»
```

ввести принятое на staging значение, например:

```text
5
```

Сохранить.

Семантика:

```text
0 = все сразу
N > 0 = первые N + «Посмотреть все»
```

Это точечная запись в текущую production DB. Полного DB transfer нет.

---

## 7. Production: проверить REST

```bash
curl -fsS \
  https://wp.ofisnyedveri.ru/wp-json/od/v1/door-filter-terms \
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

1. лимит совпадает со staging;
2. порядок values совпадает со staging/Woo;
3. `filter_key` и taxonomy прежние.

---

## 8. Production: storefront acceptance

Открыть реальную категорию:

```text
https://ofisnyedveri.ru/mezhkomnatnye-dveri
```

Если storefront закрыт Basic Auth — проверять с текущими production credentials.

Проверить:

1. правильный Woo order;
2. первые N values;
3. `Посмотреть все`;
4. `Свернуть`;
5. выбранный value ниже лимита остаётся видимым;
6. count товаров рядом с options не изменился из-за UI collapse;
7. multi-select AND/OR semantics прежняя;
8. clean landing / residual query / category query формируются как раньше;
9. PDP variant dimensions не затронуты;
10. production indexing state не изменился этим release.

---

## 9. SHA parity

Проверить storefront release SHA:

```bash
CURRENT_RELEASE="$(readlink -f /srv/ofisnye-dveri/production/current)"
grep '^GIT_COMMIT=' "$CURRENT_RELEASE/.release.env"
```

Проверить WordPress managed code state:

```bash
sudo grep '^WORDPRESS_CODE_GIT_COMMIT=' \
  /var/lib/ofisnye-dveri/wordpress-code/production.state
```

Оба должны содержать `APPROVED_SHA`.

---

## 10. Что запрещено делать после этого release

Не выполнять:

```bash
wp db import <local-or-staging-dump>
mysql wordpress_production < staging.sql
DROP DATABASE wordpress_production
```

Не копировать staging `wp-content/uploads` поверх production целиком.

Если позже понадобится перенести конкретные данные, сначала выбрать отдельный controlled migration для этих данных.

---

## 11. Rollback

### Code regression

Использовать project rollback scripts/previous immutable release. Не откатывать code regression заменой DB.

### Ошибка только в visible count

В Production admin установить:

```text
Показывать до «Все» = 0
```

### Ошибка только в Woo term order

Вернуть правильный `Default sort order` / drag-and-drop порядок в Woo.

### Data corruption

Только при реальном повреждении production data использовать **production backup → production restore** по disaster-recovery runbook.

Staging/Local DB для восстановления production не использовать.
