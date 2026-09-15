# Local → Staging: code promotion without Local DB transfer

## Цель

Продвинуть проверенный Local application code в существующий staging на VDS, **не импортируя Local WordPress DB**.

В staging остаётся существующая staging DB предыдущего шага. Новый `client45/wp10` code должен подняться поверх неё, после чего Schema/Policy настраивается непосредственно в staging.

Новые canonical staging hosts:

```text
Storefront: https://staging.ofisnyedveri.ru
WordPress:  https://wp-staging.ofisnyedveri.ru
```

Внутренние пути не переименовываются:

```text
/srv/ofisnye-dveri
/etc/ofisnye-dveri
/srv/wordpress/staging/public
```

---

## 0. Что НЕ делаем

На этом цикле запрещено:

```text
Local DB → Staging DB
Local uploads → Staging uploads как полный overwrite
Local Schema/Policy manifest → Staging
```

Разрешается только изменение существующей staging DB, необходимое для смены staging hostname и последующей ручной настройки Schema/Policy.

---

## 1. Local: финальная фиксация кода

В PowerShell:

```powershell
cd "E:\Practic\ofisnye-dveri-front"

git status
git diff --check
npm run lint
npm run typecheck
npm run build
```

После проверки:

```powershell
git add .
git commit -m "chore(deploy): add wordpress code promotion foundation"
git -c http.version=HTTP/1.1 push
```

Убедиться, что нужный commit находится в `origin/main` после merge.

Зафиксировать SHA:

```powershell
git rev-parse origin/main
```

---

## 2. DNS: создать новые staging records

У DNS-провайдера:

```text
A staging    → 153.80.184.15
A wp-staging → 153.80.184.15
```

Проверить из Windows:

```powershell
Resolve-DnsName staging.ofisnyedveri.ru -Type A -Server 1.1.1.1
Resolve-DnsName wp-staging.ofisnyedveri.ru -Type A -Server 1.1.1.1
```

Оба имени должны вернуть:

```text
153.80.184.15
```

Старые staging hostnames пока не удалять.

---

## 3. VDS: сделать backup текущего staging

Под `root`:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-backup.env

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-backup.env local
```

Если настроен offsite Restic:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-backup.env offsite
```

До успешного restore-test дальше не идти.

---

## 4. VDS: обновить canonical Git repository

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

SHA должен совпасть с подтверждённым `origin/main` с Local/GitHub.

---

## 5. Установить обновлённые deploy scripts и sudoers

Под `root`:

```bash
sudo cp \
  /srv/ofisnye-dveri/repository/deploy/sudoers/ofisnye-dveri-deploy.example \
  /etc/sudoers.d/ofisnye-dveri-deploy

sudo chmod 0440 /etc/sudoers.d/ofisnye-dveri-deploy
sudo visudo -cf /etc/sudoers.d/ofisnye-dveri-deploy
```

Проверить executable bits:

```bash
sudo chmod 0755 \
  /srv/ofisnye-dveri/repository/deploy/scripts/deploy-wordpress-code.sh \
  /srv/ofisnye-dveri/repository/deploy/scripts/rollback-wordpress-code.sh \
  /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh \
  /srv/ofisnye-dveri/repository/deploy/scripts/verify-door-configuration-readiness.sh
```

---

## 6. Получить TLS certificates для новых staging hosts

Сначала установить HTTP bootstrap:

```bash
sudo cp \
  /srv/ofisnye-dveri/repository/deploy/nginx/sites-available/ofisnye-dveri-staging-bootstrap.conf.example \
  /etc/nginx/sites-available/ofisnye-dveri-staging-new-domain-bootstrap

sudo ln -sfn \
  /etc/nginx/sites-available/ofisnye-dveri-staging-new-domain-bootstrap \
  /etc/nginx/sites-enabled/ofisnye-dveri-staging-new-domain-bootstrap

sudo nginx -t
sudo systemctl reload nginx
```

Получить certificates:

```bash
sudo certbot certonly --webroot \
  -w /var/www/letsencrypt \
  -d staging.ofisnyedveri.ru

sudo certbot certonly --webroot \
  -w /var/www/letsencrypt \
  -d wp-staging.ofisnyedveri.ru
```

Проверить:

```bash
sudo ls -la /etc/letsencrypt/live/staging.ofisnyedveri.ru/
sudo ls -la /etc/letsencrypt/live/wp-staging.ofisnyedveri.ru/
```

---

## 7. Обновить staging inventory и storefront env

Не перезаписывать реальные secret-файлы `.example`-файлами целиком.

Открыть:

```bash
sudo nano /etc/ofisnye-dveri/staging-inventory.env
```

Зафиксировать:

```text
STOREFRONT_DOMAIN=staging.ofisnyedveri.ru
WORDPRESS_DOMAIN=wp-staging.ofisnyedveri.ru
STOREFRONT_CERT_NAME=staging.ofisnyedveri.ru
WORDPRESS_CERT_NAME=wp-staging.ofisnyedveri.ru
GIT_DEPLOY_REF=origin/main
```

Проверить остальные существующие значения, особенно VDS IP, repository paths и backup paths.

Затем:

```bash
sudo nano /etc/ofisnye-dveri/staging.env
```

Изменить только URL-dependent values:

```text
NEXT_PUBLIC_SITE_URL=https://staging.ofisnyedveri.ru
SITE_URL=https://staging.ofisnyedveri.ru
WORDPRESS_URL=https://wp-staging.ofisnyedveri.ru
BFF_ALLOWED_ORIGINS=https://staging.ofisnyedveri.ru
```

Woo keys, `BFF_SECURITY_SECRET` и остальные staging secrets не менять.

Проверить inventory:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/check-staging-inventory.sh \
  /etc/ofisnye-dveri/staging-inventory.env
```

---

## 8. Переключить Nginx на новые staging hosts

Скопировать актуальные templates:

```bash
sudo cp \
  /srv/ofisnye-dveri/repository/deploy/nginx/sites-available/ofisnye-dveri-staging.conf.example \
  /etc/nginx/sites-available/ofisnye-dveri-staging

sudo cp \
  /srv/ofisnye-dveri/repository/deploy/nginx/sites-available/ofisnye-dveri-wp-staging.conf.example \
  /etc/nginx/sites-available/ofisnye-dveri-wp-staging

sudo ln -sfn /etc/nginx/sites-available/ofisnye-dveri-staging \
  /etc/nginx/sites-enabled/ofisnye-dveri-staging
sudo ln -sfn /etc/nginx/sites-available/ofisnye-dveri-wp-staging \
  /etc/nginx/sites-enabled/ofisnye-dveri-wp-staging

sudo rm -f /etc/nginx/sites-enabled/ofisnye-dveri-staging-new-domain-bootstrap
sudo nginx -t
sudo systemctl reload nginx
```

---

## 9. Изменить staging WordPress origin БЕЗ импорта другой DB

Это изменение текущей staging DB, не перенос Local DB.

Dry-run:

```bash
sudo wp search-replace \
  'https://wp-staging.ofisnye-dveri.ru' \
  'https://wp-staging.ofisnyedveri.ru' \
  --path=/srv/wordpress/staging/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --precise \
  --dry-run \
  --allow-root
```

Если результат корректен:

```bash
sudo wp search-replace \
  'https://wp-staging.ofisnye-dveri.ru' \
  'https://wp-staging.ofisnyedveri.ru' \
  --path=/srv/wordpress/staging/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --precise \
  --allow-root
```

Зафиксировать origin:

```bash
sudo wp option update home 'https://wp-staging.ofisnyedveri.ru' \
  --path=/srv/wordpress/staging/public --allow-root
sudo wp option update siteurl 'https://wp-staging.ofisnyedveri.ru' \
  --path=/srv/wordpress/staging/public --allow-root
sudo wp cache flush --path=/srv/wordpress/staging/public --allow-root
```

Проверить:

```bash
sudo wp option get home --path=/srv/wordpress/staging/public --allow-root
sudo wp option get siteurl --path=/srv/wordpress/staging/public --allow-root
```

Проверить возможные абсолютные ссылки старого staging storefront domain в Navigation / ACF / content. Сначала только dry-run:

```bash
sudo wp search-replace \
  'https://staging.ofisnye-dveri.ru' \
  'https://staging.ofisnyedveri.ru' \
  --path=/srv/wordpress/staging/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --precise \
  --dry-run \
  --allow-root
```

Если dry-run показывает актуальные Navigation / ACF / content URL, выполнить ту же команду без `--dry-run`:

```bash
sudo wp search-replace \
  'https://staging.ofisnye-dveri.ru' \
  'https://staging.ofisnyedveri.ru' \
  --path=/srv/wordpress/staging/public \
  --all-tables-with-prefix \
  --skip-columns=guid \
  --precise \
  --allow-root
```

Это по-прежнему изменение существующей staging DB, а не импорт Local DB.

---

## 10. Первый managed application release

Staging закрыт Basic Auth. Запусти orchestrator; перед внешним smoke он сам скрыто запросит `user:password` и не запишет пароль в shell history:

```bash
sudo /srv/ofisnye-dveri/repository/deploy/scripts/deploy-environment.sh \
  staging origin/main
```

Orchestrator выполняет:

```text
same Git SHA
→ managed WordPress MU-code
→ WP REST code-health
→ Next immutable release
→ storefront health
→ external smoke
→ SHA parity
→ deployment record
```

Проверить WordPress code state:

```bash
sudo cat /var/lib/ofisnye-dveri/wordpress-code/staging.state
sudo cat /var/lib/ofisnye-dveri/wordpress-code/staging.manifest
```

Git SHA WordPress и storefront должен совпадать.

---

## 11. Проверить, что Local DB действительно не переносилась

До ручной настройки Schema/Policy staging должен содержать прежние staging business data.

Проверить несколько известных staging товаров/категорий/SEO landing и отсутствие Local-only тестовых записей.

Никакой команды вида:

```text
wp db import <local dump>
```

в этом runbook нет и быть не должно.

---

## 12. Настроить Door Schema/Policy непосредственно на staging

Через WordPress admin staging настроить:

```text
Attribute Registry
Catalog filters
Canonical configuration category
Variant dimensions
Order options
Accessory groups
Family/product policies
```

Сначала fallback можно оставить ON.

После настройки проверять отдельный readiness-layer:

```bash
sudo bash \
  /srv/ofisnye-dveri/repository/deploy/scripts/verify-door-configuration-readiness.sh \
  /etc/ofisnye-dveri/staging-inventory.env false
```

Затем отключать fallback по одному:

```text
family             OFF
variant_dimensions OFF
order_options      OFF
accessories        OFF
```

Финальный acceptance:

```bash
sudo bash \
  /srv/ofisnye-dveri/repository/deploy/scripts/verify-door-configuration-readiness.sh \
  /etc/ofisnye-dveri/staging-inventory.env true
```

---

## 13. Финальный staging vertical smoke

Обязательно вручную проверить:

```text
Каталог
→ фильтры
→ существующая SEO landing
→ PDP family
→ variant selectors
→ options
→ accessory groups
→ Cart
→ Checkout
→ Woo order
```

Проверить idempotency checkout повторным запросом с тем же key.

Сделать свежий backup уже после успешной настройки staging:

```bash
sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/backup-wordpress.sh \
  /etc/ofisnye-dveri/wordpress-backup.env

sudo bash /srv/ofisnye-dveri/repository/deploy/scripts/verify-backup-restore.sh \
  /etc/ofisnye-dveri/wordpress-backup.env local
```

После этого staging является источником проверенной DB для prelaunch production promotion.
