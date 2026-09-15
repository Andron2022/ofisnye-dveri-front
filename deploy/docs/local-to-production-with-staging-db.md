# Approved Local code → Production prelaunch with full Staging DB promotion

## Цель

Продвинуть одобренный application release в production prelaunch и **полностью заменить production WordPress DB проверенной staging DB**.

Этот сценарий допустим только пока production не открыт пользователям и в нём нет уникальных production orders/customers, которые нельзя перезаписывать.

Новый canonical production contract:

```text
Storefront: https://ofisnyedveri.ru
www:        https://www.ofisnyedveri.ru
WordPress:  https://wp.ofisnyedveri.ru
```

Source staging:

```text
Storefront: https://staging.ofisnyedveri.ru
WordPress:  https://wp-staging.ofisnyedveri.ru
```

---

## 0. Жёсткое ограничение

После публичного launch полный:

```text
Staging DB → Production DB
```

запрещён: он может уничтожить реальные production orders, customers и runtime data.

Этот runbook предназначен только для текущего prelaunch-периода.

---

## 1. Preconditions на staging

Перед production promotion staging должен пройти:

```bash
sudo bash \
  /srv/ofisnye-dveri/repository/deploy/scripts/verify-door-configuration-readiness.sh \
  /etc/ofisnye-dveri/staging-inventory.env true
```

То есть все четыре fallback должны быть OFF и все опубликованные door products должны иметь valid resolved configuration.

Также вручную должен быть пройден:

```text
Catalog → SEO landing → PDP → Cart → Checkout → Woo order
```

---

## 2. Зафиксировать approved Git SHA

Под `deploy`:

```bash
sudo -iu deploy
cd /srv/ofisnye-dveri/repository

git fetch --prune origin
git switch main
git pull --ff-only origin main
APPROVED_SHA="$(git rev-parse origin/main)"
echo "$APPROVED_SHA"
exit
```

Production должен получить именно этот SHA.

---

## 3. DNS для нового production domain

У DNS provider:

```text
A @   → 153.80.184.15
A www → 153.80.184.15
A wp  → 153.80.184.15
```

Для домена `ofisnyedveri.ru`.

Проверить:

```bash
getent ahostsv4 ofisnyedveri.ru
getent ahostsv4 www.ofisnyedveri.ru
getent ahostsv4 wp.ofisnyedveri.ru
```

Старый `ofisnye-dveri.ru` пока не удалять.

---

## 4. Получить новые TLS certificates

Установить bootstrap:

```bash
sudo cp \
  /srv/ofisnye-dveri/repository/deploy/nginx/sites-available/ofisnye-dveri-production-bootstrap.conf.example \
  /etc/nginx/sites-available/ofisnye-dveri-production-new-domain-bootstrap

sudo ln -sfn \
  /etc/nginx/sites-available/ofisnye-dveri-production-new-domain-bootstrap \
  /etc/nginx/sites-enabled/ofisnye-dveri-production-new-domain-bootstrap

sudo nginx -t
sudo systemctl reload nginx
```

Получить storefront certificate:

```bash
sudo certbot certonly --webroot \
  -w /var/www/letsencrypt \
  -d ofisnyedveri.ru \
  -d www.ofisnyedveri.ru
```

WordPress certificate:

```bash
sudo certbot certonly --webroot \
  -w /var/www/letsencrypt \
  -d wp.ofisnyedveri.ru
```

---

## 5. Обновить production inventory/env без замены secrets

`/etc/ofisnye-dveri/production-inventory.env`:

```text
STOREFRONT_DOMAIN=ofisnyedveri.ru
STOREFRONT_WWW_DOMAIN=www.ofisnyedveri.ru
WORDPRESS_DOMAIN=wp.ofisnyedveri.ru
STOREFRONT_CERT_NAME=ofisnyedveri.ru
WORDPRESS_CERT_NAME=wp.ofisnyedveri.ru
GIT_DEPLOY_REF=origin/main
```

`/etc/ofisnye-dveri/production.env`:

```text
NEXT_PUBLIC_SITE_URL=https://ofisnyedveri.ru
SITE_URL=https://ofisnyedveri.ru
WORDPRESS_URL=https://wp.ofisnyedveri.ru
BFF_ALLOWED_ORIGINS=https://ofisnyedveri.ru
```

Не менять:

```text
production Woo secrets
BFF_SECURITY_SECRET
Restic credentials
MySQL credentials
```

Проверить:

```bash
sudo bash \
  /srv/ofisnye-dveri/repository/deploy/scripts/check-production-inventory.sh \
  /etc/ofisnye-dveri/production-inventory.env
```

---

## 6. Установить Nginx configs нового production domain

```bash
sudo cp \
  /srv/ofisnye-dveri/repository/deploy/nginx/sites-available/ofisnye-dveri-production-prelaunch.conf.example \
  /etc/nginx/sites-available/ofisnye-dveri-production-prelaunch

sudo cp \
  /srv/ofisnye-dveri/repository/deploy/nginx/sites-available/ofisnye-dveri-wp-production.conf.example \
  /etc/nginx/sites-available/ofisnye-dveri-wp-production

sudo ln -sfn /etc/nginx/sites-available/ofisnye-dveri-production-prelaunch \
  /etc/nginx/sites-enabled/ofisnye-dveri-production-prelaunch
sudo ln -sfn /etc/nginx/sites-available/ofisnye-dveri-wp-production \
  /etc/nginx/sites-enabled/ofisnye-dveri-wp-production

sudo rm -f /etc/nginx/sites-enabled/ofisnye-dveri-production-new-domain-bootstrap
sudo nginx -t
sudo systemctl reload nginx
```

Production остаётся prelaunch:

```text
Basic Auth ON
SITE_INDEXING_ENABLED=false
X-Robots-Tag: noindex
```

---

## 7. Создать и ПРОВЕРИТЬ production backup ДО разрушительной операции

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env local

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env offsite
```

Не продолжать, если restore-test не прошёл.

---

## 8. Сохранить текущие production Woo REST API keys

Полный staging DB import перезапишет таблицу Woo API keys. Production keys надо сохранить и вернуть после import, чтобы `/etc/ofisnye-dveri/production.env` не потерял соответствующую пару credentials.

Проверить DB prefixes:

```bash
STAGING_PREFIX="$(sudo wp db prefix --path=/srv/wordpress/staging/public --allow-root)"
PRODUCTION_PREFIX="$(sudo wp db prefix --path=/srv/wordpress/production/public --allow-root)"
printf 'staging=%s production=%s\n' "$STAGING_PREFIX" "$PRODUCTION_PREFIX"
```

Для этого prelaunch runbook prefixes должны совпадать. Если они различаются — остановиться и не делать full DB overwrite этой процедурой.

```bash
[[ "$STAGING_PREFIX" == "$PRODUCTION_PREFIX" ]] || {
  echo 'DB prefixes differ; stop.' >&2
  exit 1
}
```

Определить API table:

```bash
API_KEYS_TABLE="${PRODUCTION_PREFIX}woocommerce_api_keys"
echo "$API_KEYS_TABLE"
```

Экспортировать только production key rows через существующий read-only backup credential:

```bash
sudo mysqldump \
  --defaults-extra-file=/etc/ofisnye-dveri/mysql-production-backup.cnf \
  --single-transaction \
  --skip-lock-tables \
  --no-create-info \
  --skip-triggers \
  --compact \
  wordpress_production \
  "$API_KEYS_TABLE" \
  > /root/production-woo-api-keys.sql

sudo chmod 0600 /root/production-woo-api-keys.sql
sudo test -s /root/production-woo-api-keys.sql
```

---

## 9. Получить свежий staging DB dump

Сначала ещё один staging backup после финального acceptance:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-backup.env
```

Для непосредственного promotion создать SQL export:

```bash
sudo wp db export \
  /var/tmp/staging-to-production.sql \
  --add-drop-table \
  --path=/srv/wordpress/staging/public \
  --allow-root

sudo chmod 0600 /var/tmp/staging-to-production.sql
sudo ls -lh /var/tmp/staging-to-production.sql
```

---

## 10. Временно развернуть approved WP code в production

Это не переносит DB:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-wordpress-code.sh \
  production origin/main
```

REST verifier пока не запускаем: production DB ещё должна быть заменена и переведена на новый origin.

---

## 11. Полностью заменить production DB staging DB

Это destructive step. До него backup и restore-test из шага 7 должны быть успешны.

Сначала остановить production storefront, чтобы он не обращался к DB во время полной замены:

```bash
sudo systemctl stop ofisnye-dveri@production.service
```

Полная копия означает не наложение staging dump поверх старой production DB, а создание production DB заново. MySQL users/grants при этом не удаляются: они относятся к серверу MySQL, а не к самой database.

```bash
sudo mysql -e "DROP DATABASE IF EXISTS wordpress_production; CREATE DATABASE wordpress_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

sudo mysql wordpress_production < /var/tmp/staging-to-production.sql
```

Не запускай storefront вручную на этом этапе. Финальный combined deploy ниже запустит/перезапустит production service уже после URL/key overlay и проверок.

Проверить число таблиц:

```bash
sudo mysql -Nse "
SELECT COUNT(*)
FROM information_schema.tables
WHERE table_schema='wordpress_production';
"
```

Количество должно быть явно больше нуля и сопоставимо со staging.

---

## 12. Заменить staging WordPress origin на production origin

Dry-run:

```bash
sudo wp search-replace \
  'https://wp-staging.ofisnyedveri.ru' \
  'https://wp.ofisnyedveri.ru' \
  --path=/srv/wordpress/production/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --precise \
  --dry-run \
  --allow-root
```

Применить:

```bash
sudo wp search-replace \
  'https://wp-staging.ofisnyedveri.ru' \
  'https://wp.ofisnyedveri.ru' \
  --path=/srv/wordpress/production/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --precise \
  --allow-root
```

Зафиксировать:

```bash
sudo wp option update home 'https://wp.ofisnyedveri.ru' \
  --path=/srv/wordpress/production/public --allow-root
sudo wp option update siteurl 'https://wp.ofisnyedveri.ru' \
  --path=/srv/wordpress/production/public --allow-root
```

---

## 13. Проверить/заменить абсолютные staging storefront URLs

Сначала только dry-run:

```bash
sudo wp search-replace \
  'https://staging.ofisnyedveri.ru' \
  'https://ofisnyedveri.ru' \
  --path=/srv/wordpress/production/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --precise \
  --dry-run \
  --allow-root
```

Если найденные значения — реальные Navigation/ACF/content links, выполнить замену. Если это только исторические staging test-order meta, их можно не переписывать: тестовые orders всё равно должны быть удалены до public launch.

---

## 14. Вернуть production Woo API keys

После staging DB import таблица содержит staging keys. Удаляем их и восстанавливаем сохранённые production rows:

```bash
sudo mysql wordpress_production -e \
  "DELETE FROM \`${API_KEYS_TABLE}\`;"

sudo mysql wordpress_production \
  < /root/production-woo-api-keys.sql
```

Проверить:

```bash
sudo mysql wordpress_production -e \
  "SELECT key_id, description, permissions, truncated_key, last_access FROM \`${API_KEYS_TABLE}\`;"
```

Убедиться, что это production keys, которые соответствуют `/etc/ofisnye-dveri/production.env`.

---

## 15. При необходимости синхронизировать staging uploads

DB и uploads — разные слои. Если в staging после предыдущего production clone добавлялись media, они должны существовать и в production.

Без удаления production-only файлов:

```bash
sudo rsync -a \
  /srv/wordpress/staging/public/wp-content/uploads/ \
  /srv/wordpress/production/public/wp-content/uploads/

sudo chown -R www-data:www-data \
  /srv/wordpress/production/public/wp-content/uploads
```

`--delete` не использовать.

---

## 16. Очистить cache и проверить environment-specific integrations

```bash
sudo wp cache flush --path=/srv/wordpress/production/public --allow-root
```

Проверить webhooks:

```bash
sudo wp db query \
  "SELECT webhook_id, name, status, topic, delivery_url FROM ${PRODUCTION_PREFIX}wc_webhooks;" \
  --path=/srv/wordpress/production/public \
  --allow-root
```

Проверить payment gateways и Scheduled Actions по production runbook. Никакой staging webhook/payment integration не должна случайно работать как production.

---

## 17. Финальный combined code release того же approved SHA

Production prelaunch защищён Basic Auth. Orchestrator сам скрыто запросит `user:password` перед внешним smoke:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh \
  production origin/main
```

Проверить state:

```bash
sudo cat /var/lib/ofisnye-dveri/wordpress-code/production.state
sudo readlink -f /srv/ofisnye-dveri/production/current
sudo cat /srv/ofisnye-dveri/production/current/.release.env
```

`GIT_COMMIT` storefront и `WORDPRESS_CODE_GIT_COMMIT` должны совпасть.

Проверить runtime-флаг immutable release и после открытия нескольких ISR-страниц убедиться, что Next.js не пытается писать prerender artifacts в read-only release:

```bash
grep ^NEXT_IMMUTABLE_RELEASE_RUNTIME= \
  /srv/ofisnye-dveri/production/current/.release.env

sudo journalctl \
  -u ofisnye-dveri@production.service \
  --since "10 minutes ago" \
  --no-pager \
  | grep -E "EROFS|Failed to update prerender cache" || true
```

Ожидается `NEXT_IMMUTABLE_RELEASE_RUNTIME=true` и отсутствие новых `EROFS` / `Failed to update prerender cache`.

---

## 18. Проверить Door Configuration production readiness

```bash
sudo bash \
  /srv/ofisnye-dveri/repository/deploy/scripts/verify-door-configuration-readiness.sh \
  /etc/ofisnye-dveri/production-inventory.env true
```

Так как DB целиком пришла из уже принятого staging, все четыре fallback должны остаться OFF и все door products должны быть valid.

---

## 19. Production functional smoke

Проверить вручную под Basic Auth:

```text
Главная
Каталог
Фильтры
SEO landing
PDP
family variants
options
accessories
Cart
Checkout
создание Woo test order
```

Проверить:

```text
SITE_INDEXING_ENABLED=false
robots.txt → Disallow: /
sitemap без indexable URL
X-Robots-Tag: noindex
```

---

## 20. Перевести старый domain в redirect-only после успешной проверки

Если старый `ofisnye-dveri.ru` остаётся под контролем, можно использовать:

```text
deploy/nginx/sites-available/ofisnye-dveri-old-domain-redirect.conf.example
```

Он переводит:

```text
ofisnye-dveri.ru     → ofisnyedveri.ru
www.ofisnye-dveri.ru → ofisnyedveri.ru
wp.ofisnye-dveri.ru  → wp.ofisnyedveri.ru
```

Старые certificates должны оставаться валидными, пока HTTPS redirect обслуживается.

---

## 21. Новый production backup после promotion

После успешных проверок:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-production-backup.env local
```

Удалить временные sensitive dumps:

```bash
sudo rm -f \
  /var/tmp/staging-to-production.sql \
  /root/production-woo-api-keys.sql
```

---

## 22. Граница после public launch

После открытия сайта пользователям эта процедура full-DB overwrite больше не применяется.

Дальнейшая схема:

```text
Git code → normal combined deploy
Schema/Policy → versioned manifest / targeted migration
content changes → targeted content migration
production orders/customers → никогда не заменяются staging DB
```
