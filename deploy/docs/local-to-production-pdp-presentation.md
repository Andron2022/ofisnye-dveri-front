# Approved Local/Staging code → Production: MVP Door PDP Product Information Presentation & Specifications Foundation

## Назначение

Продвижение уже принятого на staging Git SHA в production **без переноса Local/Staging DB в production**.

Production DB уже является боевой и источником реального контента. Для этого шага переносится code; PDP presentation settings повторяются точечно в production, а custom characteristics создаются как production product content.

Production:

```text
Storefront: https://ofisnyedveri.ru
WordPress:  https://wp.ofisnyedveri.ru
WP root:    /srv/wordpress/production/public
App root:   /srv/ofisnye-dveri/production
```

## 0. Запрещено

```text
Local DB → Production DB
Staging DB → Production DB целиком
полная замена production wp-content/uploads
```

Не использовать полный DB clone для переноса этой функции.

---

## 1. Preconditions

Должно быть зафиксировано:

```text
APPROVED_SHA=<40-symbol SHA>
Local acceptance=PASS
Staging combined deploy=PASS
WP schema PDP contract=PASS
PDP summary=PASS
PDP characteristics=PASS
Custom product rows=PASS
Woo label sync=PASS
Catalog/SEO regression=PASS
Cart/Checkout regression=PASS
```

Если после staging acceptance в `main` появились новые commits, production всё равно разворачивается по `APPROVED_SHA`, а не по текущему HEAD.

---

## 2. Production: fresh backup

Перед code deploy и перед изменением Registry/content:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env local
```

Если offsite restore verification входит в текущий release cycle, выполнить и его.

Дальше не идти при ошибке backup/restore-check.

---

## 3. Production: проверить approved SHA

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

## 4. Production: combined deploy строго APPROVED_SHA

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh \
  production \
  "$APPROVED_SHA" \
  /etc/ofisnye-dveri/production-inventory.env
```

Для закрытого production prelaunch внешний smoke может запросить Basic Auth.

Успешный combined deploy должен обновить одним SHA:

```text
door-product-configuration.php
остальной managed WordPress code
Next.js storefront
```

---

## 5. Production: code-health

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-wordpress-environment.sh \
  /etc/ofisnye-dveri/production-inventory.env
```

Проверка обязана увидеть новые PDP presentation keys в `/door-configuration/schema`.

Дополнительно выполнить текущий Door Configuration readiness-check проекта в режиме, принятом для production.

---

## 6. Production: Registry sync

Войти в:

```text
https://wp.ofisnyedveri.ru/wp-admin/
```

`admin_init` выполнит штатную синхронизацию Attribute Registry и сохранит недостающие PDP presentation fields для существующих attributes.

Никакой отдельный SQL migration не нужен.

---

## 7. Production: настроить глобальный PDP presentation

Открыть:

```text
Товары → Конфигурация дверей → Отображение PDP
```

Вручную повторить **принятые на staging** настройки:

```text
какие attributes показывать в кратком блоке
порядок краткого блока
какие attributes показывать в «Характеристиках»
порядок таблицы характеристик
```

Не менять здесь label — он всегда приходит из Woo attribute label.

Не импортировать полный staging/local manifest только ради этих четырёх presentation fields, если manifest содержит другие environment-specific/test policies.

---

## 8. Production: custom characteristics — только как реальный content

У конкретной production двери открыть:

```text
Данные товара → Доп. характеристики PDP
```

Добавлять только реальные product-specific сведения.

Пример:

```text
Максимальная высота
До 3000 мм по согласованию
75
```

Если характеристика повторяется у многих товаров, не копировать её вручную в custom rows — создать/использовать Woo global attribute.

Custom characteristics являются production content и в будущем должны сохраняться вместе с production DB/backups.

---

## 9. Production: REST verification

Проверить:

```text
https://wp.ofisnyedveri.ru/wp-json/od/v1/door-configuration/schema
```

У attributes должны присутствовать новые `pdp_*` поля.

Через authenticated Woo REST на product с custom rows проверить `meta_data` key:

```text
od_door_pdp_custom_characteristics_v1
```

---

## 10. Production: PDP smoke

На нескольких реальных дверях проверить:

1. `Арт.`, `Наличие`, `Категории` остались.
2. Summary attributes соответствуют production admin settings.
3. Их порядок корректен.
4. Woo label отображается актуально.
5. В «Характеристиках» правильный attribute set/order.
6. Custom rows есть только у нужных товаров.
7. Custom row правильно смешивается по `order` с Woo attributes.
8. Пустых строк нет.

---

## 11. Production regression

Обязательно пройти:

```text
/mezhkomnatnye-dveri
дочерняя категория
существующая SEO landing
PDP нескольких family
вариантные selectors
configurator
Cart
Checkout
```

Проверить, что новые PDP presentation settings не влияют на:

```text
filterKey
taxonomy
term IDs
SEO landing rules
canonical/noindex
variant dimensions
order options
accessory policies
```

---

## 12. После PASS

Зафиксировать:

```text
APPROVED_SHA=<sha>
Production deploy=PASS
WP schema PDP contract=PASS
PDP summary=PASS
PDP characteristics=PASS
Production custom content=PASS
Woo label sync=PASS
SEO regression=PASS
Cart/Checkout regression=PASS
```

С этого момента реальные custom characteristics редактируются в production как обычный товарный content.

---

## 13. Rollback при проблеме

Если проблема только в code и DB не успела получить значимые новые content changes — использовать штатные application rollback procedures текущего production contour.

Если уже изменены Registry settings или product custom characteristics и нужно восстановить DB-state, использовать свежий production backup этого release, а не staging/local DB.

Никогда не использовать staging DB как аварийную замену уже боевой production DB.
