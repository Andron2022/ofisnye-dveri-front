# Первый запуск: чистый VDS → LocalWP → Staging → Production → публичный сайт

Актуализировано по коду репозитория 19.10.2026.

Это пошаговый runbook **первого развёртывания на новом сервере с пустыми целевыми БД**. Он охватывает установку сервера, перенос WordPress из LocalWP, проверку staging, создание изолированного production, backup и публичный запуск. Подготовка этого документа не означает выполнения команд на VDS.

**На существующем рабочем production разделы импорта БД и распаковки `wp-content` выполнять нельзя.** После первого запуска релизы идут без переноса БД: [операционный справочник](deployment-operations.md), [Local → Staging](local-to-staging-no-db.md), [Staging → Production](local-to-production-no-db.md). Последние два документа также содержат проверки конкретных функций приложения; выполняй относящиеся к своему релизу пункты.

Исходный пример из экспорта ChatGPT использован как образец подробности. Домены, команды релиза и ограничения ниже сверены с текущим repository. Старый IP, ветки, версии WordPress и секреты из экспорта не считаются параметрами нового сервера.

## 0. Карта пути и правила выполнения

| Этап | Результат | Где выполнять |
| --- | --- | --- |
| 1 | Проверенный код и пакет LocalWP: SQL + `wp-content` + описание источника + SHA-256 | Windows / LocalWP |
| 2–4 | Ubuntu, пользователи, Git, Node, WP-CLI, каталоги, inventory и DNS | VDS, root |
| 5–7 | Изолированный WordPress staging и HTTPS | VDS, root |
| 8–10 | Проверенный релиз staging, offsite backup и restore-test | VDS, root / браузер |
| 11–14 | Первый production из зафиксированного staging backup, закрытый prelaunch | VDS, root / браузер |
| 15 | Проверенный production backup и итоговый допуск | VDS, root / браузер |
| 16 | Отдельное открытие production и индексации | VDS, root / браузер |
| 17–18 | План отката, фиксация результата и дальнейшие релизы | VDS / рабочая машина |

Основной вариант: один **Ubuntu 24.04 LTS VDS**, Nginx, PHP 8.3 FPM, MySQL 8.0, Node 24 через проектный installer. Storefront собирается непосредственно на сервере. Окружения имеют отдельные каталоги, БД, Woo-ключи и backup, но используют общие ресурсы VDS и системные сервисы.

| Параметр | Staging | Production |
| --- | --- | --- |
| Storefront | `staging.ofisnyedveri.ru` | `ofisnyedveri.ru` |
| Дополнительный hostname | — | `www.ofisnyedveri.ru` → основной домен |
| WordPress | `wp-staging.ofisnyedveri.ru` | `wp.ofisnyedveri.ru` |
| Next.js | `127.0.0.1:3001` | `127.0.0.1:3000` |
| Корень приложения | `/srv/ofisnye-dveri/staging` | `/srv/ofisnye-dveri/production` |
| WordPress root | `/srv/wordpress/staging/public` | `/srv/wordpress/production/public` |
| MySQL DB | `wordpress_staging` | `wordpress_production` |
| Тестовая DB восстановления | `wordpress_staging_restore_test` | `wordpress_production_restore_test` |
| Inventory | `/etc/ofisnye-dveri/staging-inventory.env` | `/etc/ofisnye-dveri/production-inventory.env` |
| Build/runtime env | `/etc/ofisnye-dveri/staging.env` | `/etc/ofisnye-dveri/production.env` |
| Backup env | `/etc/ofisnye-dveri/wordpress-backup.env` | `/etc/ofisnye-dveri/wordpress-production-backup.env` |
| Служба Next.js | `ofisnye-dveri@staging.service` | `ofisnye-dveri@production.service` |

В доменах **нет дефиса**. В именах каталогов, служб и файлов `ofisnye-dveri` дефис сохраняется — это другой идентификатор.

Правила:

1. Команды `powershell` выполняются на Windows; `console` в разделе LocalWP — в **Open Site Shell** выбранного сайта; `bash` — на VDS в интерактивном Bash от root, если явно не написано иное. SQL вводится внутри клиента MySQL.
2. Выполняй блоки последовательно, проверяя результат каждого. При ошибке остановись на этом шаге. Это инструкция с ручными контрольными точками, не скрипт для запуска целиком.
3. Серверные блоки предполагают одну root-сессию. После переподключения повторно задай необходимые переменные из соответствующего раздела; не используй пустые или оставшиеся от другого окружения значения.
4. Пароли вводи скрытым prompt или через редактор файлов с ограниченными правами. Не включай `set -x`, не сохраняй вывод секретов в Git, чат или общий журнал. SQL-пароли ниже — обозначения для замены в клиенте MySQL.
5. До завершения аудита интеграций не включай cron, платежи и реальные уведомления клонированного WP. До раздела 16 production остаётся за Basic Auth с выключенной индексацией.
6. Не отключай проверку TLS: на VDS нет `NODE_TLS_REJECT_UNAUTHORIZED=0`, `curl -k` или WP-CLI `--insecure`.

## 1. Рабочая машина: подготовить код и пакет LocalWP

### 1.1. Зафиксировать исходные факты

Понадобятся: доступ к DNS всех пяти имён, новый VDS и SSH-ключ, Git repository, доступ к S3-compatible Object Storage, точная версия/локаль WordPress и фактические URL источника. IP VDS, Git URL и bucket names вводятся при выполнении, а не копируются из старого экспорта.

Минимум, проверяемый `check-host.sh`: 2 GB RAM и 5 GB свободного диска. Для совместной работы MySQL, PHP и сборки Next.js разумно выделить от 4 GB RAM и запас диска под uploads, архивы и несколько релизов. При меньшей памяти заранее подготовь swap по правилам своего VDS; порог проверки не гарантирует успешную сборку при любой нагрузке.

В PowerShell из frontend repository:

```powershell
Set-Location -LiteralPath 'E:\Practic\ofisnye-dveri-front'
git status --short
npm ci
npm run lint
npm run typecheck
npm run build
```

После ручной проверки выполни принятый в проекте review/commit/merge/push. На VDS должен попасть согласованный commit из `main`, содержащий frontend, `wordpress/mu-plugins` и deploy-файлы. Сам по себе этот документ не делает commit и не отправляет изменения.

Запиши **полный SHA** согласованного commit. Не переносим на сервер `.env.local`, `node_modules`, локальную `.next` и LocalWP `wp-config.php`. Frontend будет собран из Git. Проверь, что локальные project-managed MU-плагины соответствуют этому же коду.

### 1.2. Экспортировать WordPress

Создай новый каталог вне Git. Если он уже содержит предыдущий экспорт — выбери другое имя, чтобы не смешать снимки:

```powershell
$MigrationDirectory = 'C:\Users\I\Downloads\ofisnye-dveri-initial-migration'
if (Test-Path -LiteralPath $MigrationDirectory) { throw 'Выбери новый пустой каталог экспорта.' }
New-Item -ItemType Directory -Path $MigrationDirectory | Out-Null
```

Запусти нужный сайт в LocalWP и открой **Open Site Shell**. Убедись, что shell относится именно к нужному WP. До окончания SQL export и архивации прекрати редактирование контента, загрузку media и создание заказов. Не запускай обновления плагинов/схемы.

```console
wp core version
wp option get WPLANG
wp config get table_prefix --type=variable
wp option get home
wp option get siteurl
wp plugin list
wp db query "SELECT VERSION();"
wp db query "SELECT ENGINE,COUNT(*) AS tables_count FROM information_schema.tables WHERE table_schema=DATABASE() GROUP BY ENGINE;"
wp db export "C:\Users\I\Downloads\ofisnye-dveri-initial-migration\database.sql" --single-transaction --quick --no-tablespaces --set-gtid-purged=OFF --default-character-set=utf8mb4
```

Если `WPLANG` пустой/отсутствует, стандартная локаль core — `en_US`; проверь это по установленному пакету. В `source-info.txt` вручную запиши:

- дату экспорта, версию WP и локаль;
- фактические `table_prefix`, `home` и `siteurl`;
- URL локального storefront из его конфигурации, например `http://localhost:3000` — только если он действительно использовался в WP-контенте;
- версии MySQL, Woo, ACF и список активных плагинов;
- полный согласованный Git SHA.

Пароли, salts и Woo API keys в этот файл не включаются. Не читай весь `.env.local` в журнал ради одного URL.

Этот путь предполагает обычный single-site WP, `wp-content` в стандартном месте и совместимый с MySQL 8.0 dump. При Multisite, внешнем хранилище media, нестандартных drop-in/`WP_CONTENT_DIR`, другой СУБД или ошибках collation сначала разберись с совместимостью. Не лечи SQL глобальным текстовым replace. `--single-transaction` обеспечивает согласованность транзакционных таблиц; для изменяемых MyISAM/MEMORY нужны отдельные меры. Параметры dump описаны в [документации MySQL](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html).

В PowerShell архивируй **весь** `wp-content`, включая uploads, plugins, themes, languages и MU-плагины. Core и `wp-config.php` не входят:

```powershell
$MigrationDirectory = 'C:\Users\I\Downloads\ofisnye-dveri-initial-migration'
$LocalWordPressRoot = 'C:\Users\I\Local Sites\ofisne-dveri\app\public'
tar.exe -czf "$MigrationDirectory\wp-content.tar.gz" -C $LocalWordPressRoot wp-content
if ($LASTEXITCODE -ne 0) { throw 'Ошибка архивации wp-content.' }
notepad.exe "$MigrationDirectory\source-info.txt"
```

Сохрани `source-info.txt`, затем создай совместимый с Linux manifest без BOM и CRLF:

```powershell
$MigrationDirectory = 'C:\Users\I\Downloads\ofisnye-dveri-initial-migration'
$ManifestLines = foreach ($MigrationFile in @('database.sql', 'wp-content.tar.gz', 'source-info.txt')) {
    $MigrationHash = (Get-FileHash -LiteralPath "$MigrationDirectory\$MigrationFile" -Algorithm SHA256).Hash.ToLowerInvariant()
    "$MigrationHash  $MigrationFile"
}
[IO.File]::WriteAllText("$MigrationDirectory\SHA256SUMS", ($ManifestLines -join "`n") + "`n", [Text.UTF8Encoding]::new($false))
Get-ChildItem -LiteralPath $MigrationDirectory
```

Ожидаются четыре файла. SQL содержит WP-пользователей и настройки интеграций; храни пакет приватно. Это исходный снимок переноса, а не полный backup локального компьютера.

## 2. Чистый VDS: ОС, доступ и системные пакеты

### 2.1. Подключиться и установить пакеты

Проверь SSH fingerprint по консоли провайдера. На Windows:

```powershell
$VdsAddress = Read-Host 'IPv4 нового VDS'
ssh "root@$VdsAddress"
```

Если провайдер выдаёт другого администратора, подключись им и выполни `sudo -i`. Дальше команды VDS идут от root. Сначала:

```bash
cat /etc/os-release
uname -m
free -h
df -h /srv
timedatectl
apt update
apt full-upgrade -y
apt install -y sudo ca-certificates gnupg openssl xz-utils git curl tar gzip unzip rsync \
  nginx mysql-server mysql-client php8.3-fpm php8.3-cli php8.3-mysql \
  php8.3-curl php8.3-gd php8.3-intl php8.3-mbstring php8.3-xml php8.3-zip php8.3-bcmath \
  certbot apache2-utils restic ufw
```

Ожидается Ubuntu `24.04`; архитектура installer Node — `x86_64` или `aarch64/arm64`. Если после обновления требуется reboot, перезагрузи новый VDS и подключись заново до продолжения. Не выполняй этот upgrade как часть обычного релиза работающего магазина.

```bash
systemctl enable --now nginx mysql php8.3-fpm
systemctl is-active nginx mysql php8.3-fpm
php --version
mysql --version
test -S /run/php/php8.3-fpm.sock
```

### 2.2. Ограничить сетевые порты

Убедись, что SSH действительно работает на `22`; при другом порте сначала разреши его. Оставь текущую SSH-сессию открытой и проверь второе подключение после включения firewall.

```bash
sshd -T | grep '^port '
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status numbered
```

В firewall провайдера открой те же порты. `3000`, `3001`, `3306` и MySQL X Protocol не открываются наружу. В `/etc/mysql/mysql.conf.d/mysqld.cnf` проверь `bind-address = 127.0.0.1` и, если X Protocol включён, `mysqlx-bind-address = 127.0.0.1`; после правки перезапусти MySQL:

```bash
editor /etc/mysql/mysql.conf.d/mysqld.cnf
systemctl restart mysql
ss -lntp
```

После запуска приложений Next-порты тоже должны слушать только loopback. Не переключай SSH password/root-login настройки до проверки рабочего доступа по ключу и доступности консоли провайдера.

### 2.3. Создать пользователей и Git-доступ

```bash
adduser --disabled-password --gecos '' deploy
adduser --system --group --home /nonexistent --no-create-home storefront
usermod -aG storefront deploy
install -d -o deploy -g deploy -m 0700 /home/deploy/.ssh
install -o deploy -g deploy -m 0600 /dev/null /home/deploy/.ssh/authorized_keys
editor /home/deploy/.ssh/authorized_keys
```

В `authorized_keys` помести **публичный** ключ своей рабочей машины и проверь `ssh deploy@VDS_IP` во втором окне. Приватный ключ рабочей машины на VDS не копируется.

Отдельный read-only deploy key для Git repository:

```bash
runuser -u deploy -- ssh-keygen -t ed25519 -f /home/deploy/.ssh/id_ed25519 -N '' -C 'ofisnye-dveri-vds-readonly'
cat /home/deploy/.ssh/id_ed25519.pub
```

Добавь этот публичный ключ как read-only deploy key repository. Для GitHub проверь опубликованный host fingerprint, затем один раз подключись `runuser -u deploy -- ssh -T git@github.com`. GitHub может вернуть exit code `1` с сообщением об успешной аутентификации без shell — это не ошибка Git-доступа. Не отключай `StrictHostKeyChecking`.

## 3. Git repository, runtime и файловая структура

### 3.1. Создать каталоги и клонировать Git

```bash
install -d -o root -g root -m 0755 /srv/ofisnye-dveri /srv/wordpress
install -d -o deploy -g storefront -m 2750 /srv/ofisnye-dveri/repository
for target in staging production; do
  install -d -o deploy -g storefront -m 2750 "/srv/ofisnye-dveri/$target"
  install -d -o deploy -g storefront -m 2750 "/srv/ofisnye-dveri/$target/"{builds,releases,shared}
  install -d -o storefront -g storefront -m 2770 "/srv/ofisnye-dveri/$target/shared/cache"
  install -d -o root -g root -m 0755 "/srv/wordpress/$target"
  install -d -o deploy -g www-data -m 2750 "/srv/wordpress/$target/public"
  install -d -o root -g root -m 0700 "/var/backups/ofisnye-dveri/wordpress-$target"
done
install -d -o root -g deploy -m 0750 /etc/ofisnye-dveri
install -d -o root -g root -m 0700 /var/lib/ofisnye-dveri/migration/local-seed
install -d -o root -g root -m 0700 /var/cache/ofisnye-dveri/restic /var/cache/ofisnye-dveri/restic-production
install -d -o root -g root -m 0755 /var/www/letsencrypt/.well-known/acme-challenge
read -r -p 'SSH URL Git repository: ' REPOSITORY_URL
runuser -u deploy -- git clone "$REPOSITORY_URL" /srv/ofisnye-dveri/repository
REPOSITORY_DIR=/srv/ofisnye-dveri/repository
DEPLOY_SCRIPTS="$REPOSITORY_DIR/deploy/scripts"
runuser -u deploy -- git -C "$REPOSITORY_DIR" fetch --prune origin
read -r -p 'Полный согласованный Git SHA из main: ' APPROVED_SHA
[[ "$APPROVED_SHA" =~ ^[0-9a-f]{40}$ ]] || { echo 'Нужен полный SHA'; exit 1; }
runuser -u deploy -- git -C "$REPOSITORY_DIR" merge-base --is-ancestor "$APPROVED_SHA" origin/main
runuser -u deploy -- git -C "$REPOSITORY_DIR" checkout --detach "$APPROVED_SHA"
runuser -u deploy -- git -C "$REPOSITORY_DIR" status --short
```

Последний вывод должен быть пустым. Нужен именно согласованный commit; не используй старую foundation-ветку из исторических инструкций. Скрипты читаются из canonical checkout, а код релиза — через `git archive` выбранного SHA. Во время этого первого запуска не обновляй checkout параллельно другим deploy.

Владелец **самого** `/srv/ofisnye-dveri/<environment>` — `deploy:storefront`, режим `2750`. Проверить нужно не только вложенные `releases`: здесь создаётся `.deploy.lock` и переключается `current`.

### 3.2. Установить Node и WP-CLI

```bash
bash "$DEPLOY_SCRIPTS/install-node24.sh"
/usr/local/bin/node --version
/usr/local/bin/npm --version
runuser -u deploy -- /usr/local/bin/node --version
runuser -u storefront -- /usr/local/bin/node --version
```

Installer скачивает официальный Node 24 и проверяет SHA-256. Запиши точную установленную patch-версию; при повторении используй её как аргумент `install-node24.sh v24.<minor>.<patch>`, подставив реальные числа. Не устанавливай другой Node отдельно через apt/nvm поверх этого пути.

Установка WP-CLI соответствует [официальному руководству](https://make.wordpress.org/cli/handbook/guides/installing/):

```bash
WPCLI_DOWNLOAD_DIR="$(mktemp -d /var/tmp/ofisnye-dveri-wpcli.XXXXXX)"
curl --fail --silent --show-error --location \
  https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
  -o "$WPCLI_DOWNLOAD_DIR/wp-cli.phar"
curl --fail --silent --show-error --location \
  https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar.asc \
  -o "$WPCLI_DOWNLOAD_DIR/wp-cli.phar.asc"
curl --fail --silent --show-error --location \
  https://raw.githubusercontent.com/wp-cli/builds/gh-pages/wp-cli.pgp \
  -o "$WPCLI_DOWNLOAD_DIR/wp-cli.pgp"
gpg --import "$WPCLI_DOWNLOAD_DIR/wp-cli.pgp"
gpg --verify "$WPCLI_DOWNLOAD_DIR/wp-cli.phar.asc" "$WPCLI_DOWNLOAD_DIR/wp-cli.phar"
php "$WPCLI_DOWNLOAD_DIR/wp-cli.phar" --info
install -o root -g root -m 0755 "$WPCLI_DOWNLOAD_DIR/wp-cli.phar" /usr/local/bin/wp
wp --info
```

Если проверка подписи/скачивание не прошли — остановись; не пропускай ошибку ради следующего шага. Временный download-каталог можно убрать после успешной установки.

### 3.3. Установить systemd и ограниченный sudoers

```bash
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/systemd/ofisnye-dveri@.service" /etc/systemd/system/ofisnye-dveri@.service
install -o root -g root -m 0440 "$REPOSITORY_DIR/deploy/sudoers/ofisnye-dveri-deploy.example" /etc/sudoers.d/ofisnye-dveri-deploy
visudo -cf /etc/sudoers.d/ofisnye-dveri-deploy
systemctl daemon-reload
systemctl enable ofisnye-dveri@staging.service ofisnye-dveri@production.service
```

Службы пока **не запускать**: `current/server.js` появится после build. Готовый sudoers разрешает `deploy` combined release только с `origin/main`. В этом runbook deploy с закреплённым SHA запускается **root**; выдавать `deploy` неограниченный sudo для этого не нужно.

## 4. Inventory, DNS и общая конфигурация Nginx

### 4.1. Подготовить два inventory

```bash
install -o root -g deploy -m 0640 "$REPOSITORY_DIR/deploy/inventory/staging.env.example" /etc/ofisnye-dveri/staging-inventory.env
install -o root -g deploy -m 0640 "$REPOSITORY_DIR/deploy/inventory/production.env.example" /etc/ofisnye-dveri/production-inventory.env
editor /etc/ofisnye-dveri/staging-inventory.env
editor /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/check-staging-inventory.sh" /etc/ofisnye-dveri/staging-inventory.env
bash "$DEPLOY_SCRIPTS/check-production-inventory.sh" /etc/ofisnye-dveri/production-inventory.env
```

Замени `VDS_IPV4` в **обоих** файлах на новый адрес; IP в шаблоне — пример, валидатор не отличает его от твоего сервера. Заполни `DNS_PROVIDER`, `GIT_REPOSITORY_URL`; проверь остальные значения по таблице раздела 0. `GIT_DEPLOY_REF=origin/main`. Production пока указывает на `ofisnye-dveri-production-prelaunch`, Basic Auth file остаётся заданным. IPv6 оставь пустым, если он не настроен.

### 4.2. Создать DNS records

В DNS-панели создай `A` для `staging`, `wp-staging`, `@`, `www`, `wp` зоны `ofisnyedveri.ru` → новый VDS IPv4; временный TTL `300`. Для `www` допустим CNAME на apex при отсутствии конфликтующего record. `AAAA` создавай только для полностью рабочего IPv6. Удали неверные старые AAAA; HTTPS должен работать по всем опубликованным адресам.

```bash
for domain in staging.ofisnyedveri.ru wp-staging.ofisnyedveri.ru ofisnyedveri.ru www.ofisnyedveri.ru wp.ofisnyedveri.ru; do
  getent ahostsv4 "$domain"
done
```

Ожидается новый VDS. Проверь DNS также со своей рабочей машины. Этот сценарий предполагает новые свободные домены/новую установку. Если apex уже обслуживает рабочий сайт, смена A records станет отдельным cutover с трафиком — не выполняй её как безусловный bootstrap-шаг.

### 4.3. Подготовить HTTP bootstrap

```bash
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/conf.d/storefront-rate-limits.conf.example" /etc/nginx/conf.d/ofisnye-dveri-rate-limits.conf
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/snippets/storefront-proxy.conf.example" /etc/nginx/snippets/storefront-proxy.conf
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/sites-available/ofisnye-dveri-staging-bootstrap.conf.example" /etc/nginx/sites-available/ofisnye-dveri-staging-bootstrap
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/sites-available/ofisnye-dveri-production-bootstrap.conf.example" /etc/nginx/sites-available/ofisnye-dveri-production-bootstrap
ln -s /etc/nginx/sites-available/ofisnye-dveri-staging-bootstrap /etc/nginx/sites-enabled/ofisnye-dveri-staging-bootstrap
ln -s /etc/nginx/sites-available/ofisnye-dveri-production-bootstrap /etc/nginx/sites-enabled/ofisnye-dveri-production-bootstrap
nginx -t
systemctl reload nginx
printf 'acme-bootstrap-ok\n' > /var/www/letsencrypt/.well-known/acme-challenge/bootstrap-check
for domain in staging.ofisnyedveri.ru wp-staging.ofisnyedveri.ru ofisnyedveri.ru www.ofisnyedveri.ru wp.ofisnyedveri.ru; do
  curl --fail --silent --show-error "http://$domain/.well-known/acme-challenge/bootstrap-check"
done
```

Все пять ответов — `acme-bootstrap-ok`; обычные URL в bootstrap дают `404`. На чистом сервере можно отключить стандартный `sites-enabled/default`, убедившись, что это именно стандартный symlink. Не держи два активных server block с одним hostname. Общие snippet/rate-limit устанавливаются до сайтов, которые на них ссылаются.

## 5. Staging: MySQL и доставка пакета

### 5.1. Создать БД и три отдельных аккаунта

Сгенерируй три разных пароля в менеджере паролей, например 64 hex-символа. Сохрани их как staging runtime / backup / restore-test. В root-сессии:

```bash
MYSQL_HISTFILE=/dev/null mysql
```

Сначала проверь `SELECT VERSION(), @@partial_revokes;`. Для штатного нового MySQL 8.0 ожидается `partial_revokes=0`; приведённые GRANT экранируют `_` в именах schema. Если на сервере другое значение, адаптируй GRANT по [официальным правилам MySQL](https://dev.mysql.com/doc/refman/8.0/en/grant.html), а не меняй глобальные настройки вслепую.

В MySQL, подставив пароли вместо обозначений:

```sql
CREATE DATABASE wordpress_staging CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wordpress_staging'@'localhost' IDENTIFIED BY 'STAGING_RUNTIME_PASSWORD';
GRANT ALL PRIVILEGES ON `wordpress\_staging`.* TO 'wordpress_staging'@'localhost';
CREATE USER 'wordpress_backup'@'127.0.0.1' IDENTIFIED BY 'STAGING_BACKUP_PASSWORD';
GRANT SELECT, SHOW VIEW, TRIGGER, EVENT ON `wordpress\_staging`.* TO 'wordpress_backup'@'127.0.0.1';
CREATE USER 'wordpress_restore_test'@'127.0.0.1' IDENTIFIED BY 'STAGING_RESTORE_PASSWORD';
GRANT ALL PRIVILEGES ON `wordpress\_staging\_restore\_test`.* TO 'wordpress_restore_test'@'127.0.0.1';
SHOW GRANTS FOR 'wordpress_restore_test'@'127.0.0.1';
EXIT;
```

Runtime имеет права только на свою рабочую БД; backup — чтение; restore-test — создание/удаление и импорт только своей тестовой БД. Глобальных `ALL ON *.*` не выдаём. `CREATE DATABASE/USER` без `IF NOT EXISTS` намеренно останавливает повторный bootstrap поверх существующего состояния.

### 5.2. Доставить и проверить пакет

На VDS:

```bash
install -d -o deploy -g deploy -m 0700 /home/deploy/migration-incoming
```

На Windows, в отдельном PowerShell:

```powershell
$VdsAddress = Read-Host 'IPv4 VDS'
$MigrationDirectory = 'C:\Users\I\Downloads\ofisnye-dveri-initial-migration'
scp "$MigrationDirectory\database.sql" "$MigrationDirectory\wp-content.tar.gz" "$MigrationDirectory\source-info.txt" "$MigrationDirectory\SHA256SUMS" "deploy@${VdsAddress}:/home/deploy/migration-incoming/"
if ($LASTEXITCODE -ne 0) { throw 'Пакет переноса не доставлен полностью.' }
```

На VDS:

```bash
chmod 0600 /home/deploy/migration-incoming/{database.sql,wp-content.tar.gz,source-info.txt,SHA256SUMS}
install -o root -g root -m 0600 /home/deploy/migration-incoming/{database.sql,wp-content.tar.gz,source-info.txt,SHA256SUMS} /var/lib/ofisnye-dveri/migration/local-seed/
cd /var/lib/ofisnye-dveri/migration/local-seed
sha256sum -c SHA256SUMS
cat source-info.txt
tar -tzf wp-content.tar.gz | head -40
```

Все три checksum должны дать `OK`; архив начинается с `wp-content/`. Перед распаковкой проверь полный список имён на отсутствие абсолютных/выходящих через `..` путей, неожиданных symlink и вложенного второго WordPress. Это должен быть твой проверенный архив из раздела 1.

## 6. Staging: чистый WP core, новый config, импорт

### 6.1. Установить core той же версии

В этой root-сессии задай данные **из `source-info.txt`**, без угадывания версии и prefix:

```bash
WORDPRESS_ROOT=/srv/wordpress/staging/public
read -r -p 'Точная версия WP из экспорта: ' SOURCE_WP_VERSION
read -r -p 'Локаль core, например ru_RU или en_US: ' SOURCE_WP_LOCALE
read -r -p 'Префикс таблиц из экспорта: ' SOURCE_TABLE_PREFIX
read -r -p 'Исходный WordPress origin без / на конце: ' SOURCE_WORDPRESS_ORIGIN
[[ -n "$SOURCE_WP_VERSION" && -n "$SOURCE_WP_LOCALE" && "$SOURCE_TABLE_PREFIX" =~ ^[A-Za-z0-9_]+$ ]] || { echo 'Проверь version, locale и prefix источника'; exit 1; }
[[ "$SOURCE_WORDPRESS_ORIGIN" =~ ^https?://[^/]+$ ]] || { echo 'Нужен непустой фактический WordPress origin'; exit 1; }
test -z "$(find "$WORDPRESS_ROOT" -mindepth 1 -maxdepth 1 -print -quit)" || { echo 'WP root не пуст'; exit 1; }
wp core download --path="$WORDPRESS_ROOT" --version="$SOURCE_WP_VERSION" --locale="$SOURCE_WP_LOCALE" --skip-content --allow-root
wp core verify-checksums --path="$WORDPRESS_ROOT" --version="$SOURCE_WP_VERSION" --locale="$SOURCE_WP_LOCALE" --allow-root
tar --no-same-owner -xzf /var/lib/ofisnye-dveri/migration/local-seed/wp-content.tar.gz -C "$WORDPRESS_ROOT"
wp config create --path="$WORDPRESS_ROOT" --dbname=wordpress_staging --dbuser=wordpress_staging \
  --dbhost=localhost --dbprefix="$SOURCE_TABLE_PREFIX" --dbcharset=utf8mb4 --prompt=dbpass --allow-root
wp config shuffle-salts --path="$WORDPRESS_ROOT" --allow-root
wp config set WP_ENVIRONMENT_TYPE staging --path="$WORDPRESS_ROOT" --allow-root
wp config set WP_DEBUG false --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set FORCE_SSL_ADMIN true --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set DISALLOW_FILE_EDIT true --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set DISABLE_WP_CRON true --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set FS_METHOD direct --path="$WORDPRESS_ROOT" --allow-root
```

В prompt вводится пароль **staging runtime** из шага 5.1. `config create` использует именно prefix экспортированных таблиц. WP-CLI создаёт новый config и salts; LocalWP config не копируется. `DISABLE_WP_CRON=true` временно и далее поддерживается отдельным server timer. `FS_METHOD=direct` не отменяет Linux permissions. Параметры [core download](https://developer.wordpress.org/cli/commands/core/download/) и [config create](https://developer.wordpress.org/cli/commands/config/create/) описаны в WP-CLI.

Если в `wp-content` имеются LocalWP-specific drop-in (`db.php`, `object-cache.php`, `advanced-cache.php` и другие), проверь их зависимости до первого запуска. Не переноси ссылку на локальный Redis/SQLite или отсутствующий cache backend как рабочую конфигурацию VDS. Не удаляй project MU-плагины ради обхода ошибки.

### 6.2. Импортировать только в пустую staging DB

```bash
STAGING_TABLE_COUNT="$(mysql --batch --skip-column-names -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='wordpress_staging';")"
[[ "$STAGING_TABLE_COUNT" == 0 ]] || { echo 'STOP: staging DB уже содержит таблицы'; exit 1; }
mysql wordpress_staging < /var/lib/ofisnye-dveri/migration/local-seed/database.sql
wp core is-installed --path="$WORDPRESS_ROOT" --allow-root
```

Если import завершился ошибкой, не запускай его снова поверх частично импортированных таблиц. Разбери причину и заново подготовь **именно новую целевую staging DB**, сохранив источник. Исходная LocalWP DB этими командами не меняется.

### 6.3. Перенести URL с поддержкой serialized values

```bash
wp search-replace "$SOURCE_WORDPRESS_ORIGIN" 'https://wp-staging.ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --dry-run --path="$WORDPRESS_ROOT" --allow-root
```

Просмотри отчёт. Если правильные старый/новый origin подтверждены:

```bash
wp search-replace "$SOURCE_WORDPRESS_ORIGIN" 'https://wp-staging.ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --path="$WORDPRESS_ROOT" --allow-root
wp option update home 'https://wp-staging.ofisnyedveri.ru' --path="$WORDPRESS_ROOT" --allow-root
wp option update siteurl 'https://wp-staging.ofisnyedveri.ru' --path="$WORDPRESS_ROOT" --allow-root
wp option update blog_public 0 --path="$WORDPRESS_ROOT" --allow-root
wp cache flush --path="$WORDPRESS_ROOT" --allow-root
```

Если `home` и `siteurl` источника различались, либо WP использовал ещё `http`/`https` вариант, отдельно проверь каждый реальный старый origin тем же dry-run → просмотр → применение. Не заменяй отдельные слова/имя домена внутри всех данных.

Для абсолютных ссылок локального **storefront** в Navigation, ACF, тексте и ручных Canonical выполни отдельный dry-run. Если таких ссылок в источнике не было, этот блок пропускается. Используй фактический старый URL из source-info:

```bash
read -r -p 'Исходный storefront origin без / на конце: ' SOURCE_STOREFRONT_ORIGIN
[[ "$SOURCE_STOREFRONT_ORIGIN" =~ ^https?://[^/]+$ ]] || { echo 'Нужен непустой фактический storefront origin'; exit 1; }
wp search-replace "$SOURCE_STOREFRONT_ORIGIN" 'https://staging.ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --dry-run --path="$WORDPRESS_ROOT" --allow-root
```

После просмотра отчёта, если нужны именно эти замены:

```bash
wp search-replace "$SOURCE_STOREFRONT_ORIGIN" 'https://staging.ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --path="$WORDPRESS_ROOT" --allow-root
```

Это отдельная замена от WordPress origin. Serialized data обрабатывает [WP-CLI search-replace](https://developer.wordpress.org/cli/commands/search-replace/).

### 6.4. Настроить права

Следующий блок применяется сейчас, к первому staging root. Для production ниже он будет повторён явно:

```bash
WORDPRESS_ROOT=/srv/wordpress/staging/public
test "$(realpath "$WORDPRESS_ROOT")" = /srv/wordpress/staging/public
chown -R deploy:www-data "$WORDPRESS_ROOT"
find "$WORDPRESS_ROOT" -type d -exec chmod 2750 {} +
find "$WORDPRESS_ROOT" -type f -exec chmod 0640 {} +
for directory in uploads cache upgrade; do
  install -d -o www-data -g www-data -m 2750 "$WORDPRESS_ROOT/wp-content/$directory"
  chown -R www-data:www-data "$WORDPRESS_ROOT/wp-content/$directory"
done
chown root:www-data "$WORDPRESS_ROOT/wp-config.php"
chmod 0640 "$WORDPRESS_ROOT/wp-config.php"
runuser -u www-data -- test -r "$WORDPRESS_ROOT/wp-config.php"
runuser -u www-data -- test -w "$WORDPRESS_ROOT/wp-content/uploads"
runuser -u www-data -- test ! -w "$WORDPRESS_ROOT/wp-config.php"
runuser -u www-data -- test ! -w "$WORDPRESS_ROOT/wp-includes/version.php"
```

Ожидается exit code `0` всех четырёх проверок. Core, plugins и MU-code не обновляются произвольно из WP admin; uploads/cache/upgrade доступны PHP. Для нового плагина с отдельным writable-каталогом сначала выясни его точное требование, а не делай весь WP root writable.

## 7. Staging: сертификаты и HTTPS sites

После успешной ACME-проверки шага 4.3:

```bash
read -r -p 'Email владельца TLS certificates: ' ACME_EMAIL
certbot certonly --webroot -w /var/www/letsencrypt --agree-tos --email "$ACME_EMAIL" \
  --cert-name staging.ofisnyedveri.ru -d staging.ofisnyedveri.ru
certbot certonly --webroot -w /var/www/letsencrypt --agree-tos --email "$ACME_EMAIL" \
  --cert-name wp-staging.ofisnyedveri.ru -d wp-staging.ofisnyedveri.ru
htpasswd -c /etc/nginx/.htpasswd-ofisnye-dveri-staging staging
chown root:www-data /etc/nginx/.htpasswd-ofisnye-dveri-staging
chmod 0640 /etc/nginx/.htpasswd-ofisnye-dveri-staging
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/sites-available/ofisnye-dveri-staging.conf.example" /etc/nginx/sites-available/ofisnye-dveri-staging
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/sites-available/ofisnye-dveri-wp-staging.conf.example" /etc/nginx/sites-available/ofisnye-dveri-wp-staging
test -L /etc/nginx/sites-enabled/ofisnye-dveri-staging-bootstrap
unlink /etc/nginx/sites-enabled/ofisnye-dveri-staging-bootstrap
ln -s /etc/nginx/sites-available/ofisnye-dveri-staging /etc/nginx/sites-enabled/ofisnye-dveri-staging
ln -s /etc/nginx/sites-available/ofisnye-dveri-wp-staging /etc/nginx/sites-enabled/ofisnye-dveri-wp-staging
nginx -t
systemctl reload nginx
curl --fail --silent --show-error https://wp-staging.ofisnyedveri.ru/wp-json/ -o /var/tmp/ofisnye-dveri-staging-rest.json
curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' https://staging.ofisnyedveri.ru/
certbot renew --dry-run
systemctl list-timers --all 'certbot*'
```

WP REST должен отвечать JSON без outer Basic Auth; storefront без пароля — `401`. С паролем storefront пока может дать `502`, потому что первый Next.js release ещё не создан. После первого deploy `502` недопустим. WP HTML и REST остаются `noindex`.

Staging WP шаблон отличается от hardened production: он оставляет обычный WP frontend/admin и WP cron HTTP surface. Не запускай production-only `verify-wordpress-origin.sh` против staging и не обещай одинаковые правила двух origin.

## 8. Staging: интеграции, credentials, env и первый release

### 8.1. Проверить импортированные настройки до запуска cron

В WP admin staging проверь:

- WooCommerce и ACF активны, их версии совпадают с источником; content/media/категории/товары/ACF на месте;
- платежи выключены или используют sandbox; почта, SMS, CRM, доставка, webhooks и аналитика не отправляют реальные события из staging;
- WooCommerce Scheduled Actions и cron events просмотрены: нет неизвестных задач с внешними последствиями; не удаляй очередь вслепую;
- клонированные LocalWP Woo REST keys отозваны **в staging DB**; созданы две новые пары: Read и отдельная Read/Write;
- slug главной — `glavnaya`, настроек chrome — реальный slug (шаблон `nastrojki-sajta`), header/footer `wp_navigation` существуют и опубликованы;
- меню использует `/mezhkomnatnye-dveri`, не содержит `/catalog`, локальных абсолютных URL и ссылок на production вместо staging;
- ручные Canonical и social image URL не ведут на LocalWP; SEO-поля архивов при необходимости заданы на WP-страницах `novosti-i-stati` и `portfolio`.

Посмотреть slugs без предположений об ID:

```bash
wp post list --post_type=wp_navigation --fields=ID,post_name,post_status --path=/srv/wordpress/staging/public --allow-root
wp post list --post_type=page --fields=ID,post_name,post_status --path=/srv/wordpress/staging/public --allow-root
wp cron event list --path=/srv/wordpress/staging/public --allow-root
```

Создание Woo keys: WooCommerce → Settings → Advanced → REST API. Read используется SSR/catalog, Read/Write — только серверным BFF для заказов. Эти credentials и новый случайный `BFF_SECURITY_SECRET` хранятся только в env нужного окружения. Не копируй `.env.local` целиком.

### 8.2. Заполнить staging env и backup config

```bash
install -o root -g deploy -m 0640 "$REPOSITORY_DIR/deploy/env/staging.env.example" /etc/ofisnye-dveri/staging.env
editor /etc/ofisnye-dveri/staging.env
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/wordpress-backup.env.example" /etc/ofisnye-dveri/wordpress-backup.env
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/mysql-backup.cnf.example" /etc/ofisnye-dveri/mysql-backup.cnf
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/mysql-restore-admin.cnf.example" /etc/ofisnye-dveri/mysql-restore-admin.cnf
editor /etc/ofisnye-dveri/wordpress-backup.env
editor /etc/ofisnye-dveri/mysql-backup.cnf
editor /etc/ofisnye-dveri/mysql-restore-admin.cnf
```

В env: `APP_ENV=staging`, `SITE_INDEXING_ENABLED=false`, `PORT=3001`, `HOSTNAME=127.0.0.1`, все site URL как в таблице 0, новые Woo пары и BFF secret, реальные slugs. Сохрани остальные параметры шаблона. Env должен быть совместим с Bash `source` и systemd: простые `KEY=value`, без `export`, команд и shell expansion. Случайный BFF secret — минимум 32 символа, например 64 hex из менеджера паролей.

В `.cnf` подставь пароли созданных backup/restore-test пользователей. В `wordpress-backup.env` временно установи `OFFSITE_ENABLED=false`; рабочая и тестовая DB должны быть **разными**. До проверки offsite ниже staging ещё не считается готовым.

Не добавляй `NEXT_IMMUTABLE_RELEASE_RUNTIME=true` в постоянный env: deploy сам добавляет его только в `.release.env` готового standalone runtime.

Проверки без раскрытия env:

```bash
(
  set -a
  source /etc/ofisnye-dveri/staging.env
  set +a
  /usr/local/bin/node "$REPOSITORY_DIR/scripts/validate-deploy-env.mjs"
)
mysql --defaults-extra-file=/etc/ofisnye-dveri/mysql-backup.cnf --batch -e 'SELECT CURRENT_USER(); SHOW GRANTS;'
mysql --defaults-extra-file=/etc/ofisnye-dveri/mysql-restore-admin.cnf --batch -e 'SELECT CURRENT_USER(); SHOW GRANTS;'
runuser -u deploy -- test -w /srv/ofisnye-dveri/staging
runuser -u storefront -- test -w /srv/ofisnye-dveri/staging/shared/cache
bash "$DEPLOY_SCRIPTS/check-host.sh" /etc/ofisnye-dveri/staging-inventory.env
```

Ожидается `Deployment environment is valid for staging` и `Host preflight passed`. Проверка env валидирует значения, а не реальность Woo credentials — её проверяет REST verifier.

### 8.3. Выполнить combined deploy

```bash
bash "$DEPLOY_SCRIPTS/deploy-environment.sh" staging "$APPROVED_SHA" /etc/ofisnye-dveri/staging-inventory.env
```

Скрипт запросит Basic Auth в виде `staging:пароль` без вывода. Он последовательно:

1. установит project-managed MU-code из этого SHA и создаст manifest/state;
2. проверит WordPress/Woo/ACF/Navigation REST contract;
3. выполнит от `deploy` `npm ci`, env validation, lint, typecheck, build;
4. создаст standalone immutable release, переключит `current`, перезапустит systemd и проверит health;
5. проверит совпадение WP/Next Git SHA, внешний smoke и запишет environment state.

Ожидаемый финал — `Combined application release passed: environment=staging ...`. Первый verifier **после импорта до managed-code deploy** не имеет обязательного manifest/state: combined deploy создаёт их в правильном порядке. SQL/import не являются частью этого deploy.

### 8.4. Проверить code contract и данные

```bash
systemctl status ofisnye-dveri@staging.service --no-pager -l
bash "$DEPLOY_SCRIPTS/healthcheck.sh" http://127.0.0.1:3001/api/health staging
bash "$DEPLOY_SCRIPTS/verify-wordpress-staging.sh" /etc/ofisnye-dveri/staging-inventory.env
bash "$DEPLOY_SCRIPTS/verify-door-configuration-readiness.sh" /etc/ofisnye-dveri/staging-inventory.env true
ss -lntp | grep -E ':(3000|3001|3306)\b'
```

Health: `status=ok`, `appEnvironment=staging`, `indexingEnabled=false`. Strict readiness требует валидных конфигураций всех опубликованных дверей и выключенных fallback modes. Если он не проходит, настрой данные через WP и повтори; обычный WP verifier проверяет форму code contract и не заменяет readiness.

После изменений WP учитывай существующие кеши REST/Data Cache/ISR и изображения: сохранение поля в admin не гарантирует немедленное обновление storefront. Сверь свежий REST-ответ и отрендеренную страницу; при необходимости дождись revalidation или выполни новый build того же SHA. Подробности — в [описании WP-driven SEO](wp-driven-seo-metadata.md).

Ручная acceptance для staging и затем production:

- главная, header/footer, ссылки, изображения и мобильная версия;
- каталог дверей, фильтры, категории/SEO landing, выбор вариантов и аксессуаров, PDP summary/характеристики/вкладки;
- стеновые панели и заявка; статьи, portfolio, контакты и информационные страницы;
- одна тестовая покупка двери и одна заявка панели: правильные строки/опции/meta в Woo; повтор **того же запроса с тем же idempotency key** не создаёт дубликат (проверь через Network, не отправляй новый самостоятельный checkout);
- заведомо неверная цена/конфигурация не принимается как доверенное клиентское значение; ошибки формы понятны;
- title, description, OG/Twitter, Canonical, per-page `seo_noindex`; данные приходят из WP, технические canonical/indexing правила сохраняются;
- закрытые robots/sitemap: `Disallow: /`, пустой sitemap, внешний `X-Robots-Tag: noindex`; без Basic Auth доступа к storefront нет;
- REST-запросы и media идут к WP staging, заказы появляются только в staging, реальные уведомления не уходят.

Тестовые записи пометь и убирай только адресно через Woo admin/API. Очистка всей таблицы заказов не является acceptance-проверкой.

## 9. Staging: включить управляемый cron

В repository готовый cron service/template есть для production. Для нового staging здесь создаётся **серверная адаптация того же шаблона**, с заменой окружения в имени, description и WP path. Готового `wordpress-staging-cron.*.example` в Git нет.

Только после аудита интеграций и очереди из шага 8.1:

```bash
sed 's/production/staging/g' "$REPOSITORY_DIR/deploy/systemd/wordpress-production-cron.service.example" > /etc/systemd/system/wordpress-staging-cron.service
sed 's/production/staging/g' "$REPOSITORY_DIR/deploy/systemd/wordpress-production-cron.timer.example" > /etc/systemd/system/wordpress-staging-cron.timer
chmod 0644 /etc/systemd/system/wordpress-staging-cron.{service,timer}
systemctl daemon-reload
systemctl start wordpress-staging-cron.service
journalctl -u wordpress-staging-cron.service -n 60 --no-pager
systemctl enable --now wordpress-staging-cron.timer
systemctl list-timers --all wordpress-staging-cron.timer
```

Service выполняет `wp cron event run --due-now` от `www-data` для staging; timer запускается после boot и затем примерно каждые пять минут. `DISABLE_WP_CRON=true` остаётся, чтобы не было второго запуска через HTTP. Проверь Woo Scheduled Actions. Ошибка `ftp_nlist()` требует проверки `FS_METHOD=direct` и нужных writable directories, а не выдачи `777`.

## 10. Staging: backup, offsite, restore-test и допуск

### 10.1. Проверить локальное восстановление

```bash
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-backup.env local
```

Backup содержит `database.sql.gz`, весь `wp-content.tar.gz`, manifest, checksum и, после managed deploy, `wordpress-code.manifest`. `local` здесь — диск **VDS** `/var/backups/...`, не Windows LocalWP.

Restore-test **создаёт, импортирует и удаляет отдельную тестовую DB**, проверяет распаковку uploads и hash MU-code. Рабочую DB не восстанавливает и полноценный WP/checkout из backup не запускает. Успех — `Restore test passed ...`; одной строки успешного backup недостаточно.

### 10.2. Создать offsite storage

Пример ниже — Yandex Object Storage, как в исходном материале; совместимый другой S3 provider потребует своего endpoint/region. В cloud console создай **два приватных bucket**: отдельный staging и отдельный production. Имена уникальны и выбираются при создании, не считаются уже существующими.

Создай service account и static access key с доступом к нужному bucket: чтение/list, запись и удаление объектов для restic retention. Для Yandex применима `storage.editor` на соответствующем bucket; отдельные credentials для окружений уменьшают общую область доступа. Public access выключен. Не добавляй lifecycle auto-delete к объектам restic. Object Lock/retention bucket нужно отдельно согласовать с `prune`. Настройка endpoint/region и прав приведена в [Yandex S3](https://yandex.cloud/en/docs/storage/tools/aws-cli) и [IAM roles](https://yandex.cloud/en/docs/storage/security/).

Restic шифрует repository своим паролем. Сохрани пароль и cloud credentials в независимом защищённом хранилище вне VDS: backup без доступного пароля не восстановить.

```bash
test ! -e /etc/ofisnye-dveri/restic-staging.password
(umask 077; openssl rand -hex 32 > /etc/ofisnye-dveri/restic-staging.password)
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/restic-staging.env.example" /etc/ofisnye-dveri/restic-staging.env
editor /etc/ofisnye-dveri/restic-staging.env
```

Для Yandex заполни файл так, заменив bucket и ключи реальными значениями:

```dotenv
RESTIC_REPOSITORY=s3:https://storage.yandexcloud.net/YOUR-STAGING-BUCKET/ofisnye-dveri-staging
RESTIC_PASSWORD_FILE=/etc/ofisnye-dveri/restic-staging.password
RESTIC_CACHE_DIR=/var/cache/ofisnye-dveri/restic
AWS_ACCESS_KEY_ID=YOUR-STAGING-ACCESS-KEY
AWS_SECRET_ACCESS_KEY=YOUR-STAGING-SECRET-KEY
AWS_DEFAULT_REGION=ru-central1
```

Один раз инициализируй **новый пустой** repository:

```bash
(
  set -a
  source /etc/ofisnye-dveri/restic-staging.env
  set +a
  restic init
  restic snapshots
)
```

Если repository уже существует, `init` повторно не нужен. Если получен `AccessDenied`, проблема сети или неправильного пароля — это не основание инициализировать другой repository поверх неизвестного состояния. Порядок описан в [restic](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html).

### 10.3. Проверить offsite и включить расписания

В `/etc/ofisnye-dveri/wordpress-backup.env` установи `OFFSITE_ENABLED=true`, сохрани `RESTIC_ENV_FILE=/etc/ofisnye-dveri/restic-staging.env` и retention шаблона.

```bash
editor /etc/ofisnye-dveri/wordpress-backup.env
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-backup.env offsite
bash "$DEPLOY_SCRIPTS/maintain-offsite-backup.sh" /etc/ofisnye-dveri/wordpress-backup.env
for unit in wordpress-backup wordpress-backup-maintenance wordpress-restore-test; do
  for kind in service timer; do
    install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/systemd/$unit.$kind.example" "/etc/systemd/system/$unit.$kind"
  done
done
systemctl daemon-reload
systemctl start wordpress-backup.service
systemctl start wordpress-backup-maintenance.service
systemctl start wordpress-restore-test.service
systemctl show wordpress-backup.service wordpress-backup-maintenance.service wordpress-restore-test.service -p Id -p Result -p ExecMainStatus
systemctl enable --now wordpress-backup.timer wordpress-backup-maintenance.timer wordpress-restore-test.timer
systemctl list-timers --all 'wordpress*'
bash "$DEPLOY_SCRIPTS/record-staging-state.sh" /etc/ofisnye-dveri/staging-inventory.env
```

До включения timers все три oneshot service должны завершиться с `Result=success`, `ExecMainStatus=0`. Это дополнительно проверяет systemd sandbox и пути, которые прямой запуск скрипта не проверял. При ошибке смотри `journalctl -u <имя>.service` и не включай расписание.

Maintenance удаляет старые snapshots по retention и делает `restic check` с чтением 5% data. Это частичная проверка целостности, не полное чтение всех данных. Offsite restore-test скачивает latest snapshot соответствующего tag и реально импортирует SQL в тестовую DB.

Staging принят только после ручной acceptance, strict readiness, local + offsite restore-test и state record. Сохрани SHA, время acceptance и список проверок. На production переносится **тот же SHA**, а не новая вершина `origin/main`.

## 11. Production: пустая DB и зафиксированный staging seed

### 11.1. Проверить staging перед клонированием

```bash
bash "$DEPLOY_SCRIPTS/healthcheck.sh" http://127.0.0.1:3001/api/health staging
bash "$DEPLOY_SCRIPTS/verify-wordpress-staging.sh" /etc/ofisnye-dveri/staging-inventory.env
bash "$DEPLOY_SCRIPTS/verify-door-configuration-readiness.sh" /etc/ofisnye-dveri/staging-inventory.env true
```

Проверь принятый staging release и WP manifest:

```bash
STAGING_CURRENT_RELEASE="$(readlink -f /srv/ofisnye-dveri/staging/current)"
STAGING_ACCEPTED_SHA="$(sed -n 's/^GIT_COMMIT=//p' "$STAGING_CURRENT_RELEASE/.release.env" | head -1)"
STAGING_WP_SHA="$(sed -n 's/^GIT_COMMIT=//p' /var/lib/ofisnye-dveri/wordpress-code/staging.manifest | head -1)"
[[ "$STAGING_ACCEPTED_SHA" == "$APPROVED_SHA" && "$STAGING_WP_SHA" == "$APPROVED_SHA" ]] || { echo 'STOP: staging SHA не совпадают с принятым'; exit 1; }
```

Подтверди, что контент/данные staging готовы стать первоначальным production. Прекрати запись в staging на время seed: редактирование, uploads, заказы и внешние jobs. Останови staging cron timer и дождись завершения уже запущенного service:

```bash
systemctl stop wordpress-staging-cron.timer
systemctl status wordpress-staging-cron.service --no-pager
```

У oneshot после завершения нормален `inactive (dead)` с успешным последним result; `systemctl status` может вернуть ненулевой код. Если job ещё работает, дождись окончания, не убивай его посередине изменения данных.

Создай **новый успешный** backup и проверь его:

```bash
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-backup.env local
STAGING_SEED_BACKUP="$(find /var/backups/ofisnye-dveri/wordpress-staging -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | LC_ALL=C sort | tail -1)"
[[ "$STAGING_SEED_BACKUP" =~ ^[0-9]{8}T[0-9]{6}Z$ ]] || { echo 'Не найден timestamp backup'; exit 1; }
STAGING_SEED_BACKUP="/var/backups/ofisnye-dveri/wordpress-staging/$STAGING_SEED_BACKUP"
(cd "$STAGING_SEED_BACKUP" && sha256sum -c SHA256SUMS)
cat "$STAGING_SEED_BACKUP/manifest.txt"
test -f "$STAGING_SEED_BACKUP/wordpress-code.manifest"
grep '^GIT_COMMIT=' "$STAGING_SEED_BACKUP/wordpress-code.manifest"
```

Сверь путь с напечатанным последним `WordPress backup created`, `backup_name=wordpress-staging`, `database=wordpress_staging` и SHA с принятым. Зафиксируй этот конкретный путь и хеши в записи переноса. Не продолжай по «самому свежему каталогу», если backup перед этим завершился ошибкой. Не копируй staging deployment `.state`/server secrets в production.

### 11.2. Создать production DB accounts

Три новых production-only пароля. В `MYSQL_HISTFILE=/dev/null mysql`:

```sql
CREATE DATABASE wordpress_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wordpress_production'@'localhost' IDENTIFIED BY 'PRODUCTION_RUNTIME_PASSWORD';
GRANT ALL PRIVILEGES ON `wordpress\_production`.* TO 'wordpress_production'@'localhost';
CREATE USER 'wordpress_production_backup'@'127.0.0.1' IDENTIFIED BY 'PRODUCTION_BACKUP_PASSWORD';
GRANT SELECT, SHOW VIEW, TRIGGER, EVENT ON `wordpress\_production`.* TO 'wordpress_production_backup'@'127.0.0.1';
CREATE USER 'wordpress_prod_restore_test'@'127.0.0.1' IDENTIFIED BY 'PRODUCTION_RESTORE_PASSWORD';
GRANT ALL PRIVILEGES ON `wordpress\_production\_restore\_test`.* TO 'wordpress_prod_restore_test'@'127.0.0.1';
SHOW GRANTS FOR 'wordpress_prod_restore_test'@'127.0.0.1';
EXIT;
```

Здесь намеренно короткое имя MySQL user **`wordpress_prod_restore_test`**, а DB — **`wordpress_production_restore_test`**. В текущем `mysql-production-restore-admin.cnf.example` user длиннее допустимых 32 символов; при установке файла ниже его нужно исправить. Имена пользователей и DB не обязаны совпадать. Ограничение — [MySQL account names](https://dev.mysql.com/doc/refman/8.0/en/user-names.html).

## 12. Production: чистый core, новый config и разовый импорт

### 12.1. Собрать независимый WP root

Используй prefix и locale принятого staging. Сверь их с source-info; не подставляй `wp_` автоматически.

```bash
WORDPRESS_ROOT=/srv/wordpress/production/public
STAGING_WP_VERSION="$(wp core version --path=/srv/wordpress/staging/public --allow-root)"
STAGING_TABLE_PREFIX="$(wp config get table_prefix --type=variable --path=/srv/wordpress/staging/public --allow-root)"
read -r -p 'Подтверждённая локаль WP core staging: ' STAGING_WP_LOCALE
test -z "$(find "$WORDPRESS_ROOT" -mindepth 1 -maxdepth 1 -print -quit)" || { echo 'Production WP root не пуст'; exit 1; }
wp core download --path="$WORDPRESS_ROOT" --version="$STAGING_WP_VERSION" --locale="$STAGING_WP_LOCALE" --skip-content --allow-root
wp core verify-checksums --path="$WORDPRESS_ROOT" --version="$STAGING_WP_VERSION" --locale="$STAGING_WP_LOCALE" --allow-root
tar --no-same-owner -xzf "$STAGING_SEED_BACKUP/wp-content.tar.gz" -C "$WORDPRESS_ROOT"
wp config create --path="$WORDPRESS_ROOT" --dbname=wordpress_production --dbuser=wordpress_production \
  --dbhost=localhost --dbprefix="$STAGING_TABLE_PREFIX" --dbcharset=utf8mb4 --prompt=dbpass --allow-root
wp config shuffle-salts --path="$WORDPRESS_ROOT" --allow-root
wp config set WP_ENVIRONMENT_TYPE production --path="$WORDPRESS_ROOT" --allow-root
wp config set WP_DEBUG false --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set FORCE_SSL_ADMIN true --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set DISALLOW_FILE_EDIT true --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set DISABLE_WP_CRON true --raw --path="$WORDPRESS_ROOT" --allow-root
wp config set FS_METHOD direct --path="$WORDPRESS_ROOT" --allow-root
```

В prompt вводится production runtime DB password. WP core скачивается той же версии, а не копируется целиком со staging. Backup переносит DB + `wp-content`; production получает новый config, salts и DB credentials. Проверь перенесённые drop-in и paths так же, как в staging.

### 12.2. Импортировать только в пустую production DB

```bash
PRODUCTION_TABLE_COUNT="$(mysql --batch --skip-column-names -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='wordpress_production';")"
[[ "$PRODUCTION_TABLE_COUNT" == 0 ]] || { echo 'STOP: production DB уже содержит таблицы — импорт запрещён'; exit 1; }
(set -o pipefail; gzip -dc "$STAGING_SEED_BACKUP/database.sql.gz" | mysql wordpress_production)
wp core is-installed --path="$WORDPRESS_ROOT" --allow-root
wp search-replace 'https://wp-staging.ofisnyedveri.ru' 'https://wp.ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --dry-run --path="$WORDPRESS_ROOT" --allow-root
```

Проверь отчёт, затем:

```bash
wp search-replace 'https://wp-staging.ofisnyedveri.ru' 'https://wp.ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --path="$WORDPRESS_ROOT" --allow-root
wp search-replace 'https://staging.ofisnyedveri.ru' 'https://ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --dry-run --path="$WORDPRESS_ROOT" --allow-root
```

После отдельного просмотра storefront dry-run:

```bash
wp search-replace 'https://staging.ofisnyedveri.ru' 'https://ofisnyedveri.ru' \
  --all-tables-with-prefix --skip-columns=guid --path="$WORDPRESS_ROOT" --allow-root
wp option update home 'https://wp.ofisnyedveri.ru' --path="$WORDPRESS_ROOT" --allow-root
wp option update siteurl 'https://wp.ofisnyedveri.ru' --path="$WORDPRESS_ROOT" --allow-root
wp option update blog_public 0 --path="$WORDPRESS_ROOT" --allow-root
wp cache flush --path="$WORDPRESS_ROOT" --allow-root
wp option get home --path="$WORDPRESS_ROOT" --allow-root
wp option get siteurl --path="$WORDPRESS_ROOT" --allow-root
```

Оба значения — `https://wp.ofisnyedveri.ru`. `guid` намеренно не заменяется и не является доказательством рабочего запроса к старому origin. Ручные Canonical нужно проверить отдельно: корректный URL ещё не гарантирует существование/индексируемость целевой страницы.

### 12.3. Установить production permissions

```bash
WORDPRESS_ROOT=/srv/wordpress/production/public
test "$(realpath "$WORDPRESS_ROOT")" = /srv/wordpress/production/public
chown -R deploy:www-data "$WORDPRESS_ROOT"
find "$WORDPRESS_ROOT" -type d -exec chmod 2750 {} +
find "$WORDPRESS_ROOT" -type f -exec chmod 0640 {} +
for directory in uploads cache upgrade; do
  install -d -o www-data -g www-data -m 2750 "$WORDPRESS_ROOT/wp-content/$directory"
  chown -R www-data:www-data "$WORDPRESS_ROOT/wp-content/$directory"
done
chown root:www-data "$WORDPRESS_ROOT/wp-config.php"
chmod 0640 "$WORDPRESS_ROOT/wp-config.php"
runuser -u www-data -- test -r "$WORDPRESS_ROOT/wp-config.php"
runuser -u www-data -- test -w "$WORDPRESS_ROOT/wp-content/uploads"
runuser -u www-data -- test ! -w "$WORDPRESS_ROOT/wp-config.php"
runuser -u www-data -- test ! -w "$WORDPRESS_ROOT/wp-includes/version.php"
```

После завершения snapshot можно снять freeze staging и вернуть его timer. Production после этого продолжает жить независимо:

```bash
systemctl start wordpress-staging-cron.timer
```

## 13. Production: TLS, закрытый storefront и hardened WP origin

```bash
read -r -p 'Email владельца TLS certificates: ' ACME_EMAIL
certbot certonly --webroot -w /var/www/letsencrypt --agree-tos --email "$ACME_EMAIL" \
  --cert-name ofisnyedveri.ru -d ofisnyedveri.ru -d www.ofisnyedveri.ru
certbot certonly --webroot -w /var/www/letsencrypt --agree-tos --email "$ACME_EMAIL" \
  --cert-name wp.ofisnyedveri.ru -d wp.ofisnyedveri.ru
htpasswd -c /etc/nginx/.htpasswd-ofisnye-dveri-production-prelaunch prelaunch
htpasswd -c /etc/nginx/.htpasswd-ofisnye-dveri-wp-production-admin wpadmin
chown root:www-data /etc/nginx/.htpasswd-ofisnye-dveri-production-prelaunch /etc/nginx/.htpasswd-ofisnye-dveri-wp-production-admin
chmod 0640 /etc/nginx/.htpasswd-ofisnye-dveri-production-prelaunch /etc/nginx/.htpasswd-ofisnye-dveri-wp-production-admin
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/sites-available/ofisnye-dveri-production-prelaunch.conf.example" /etc/nginx/sites-available/ofisnye-dveri-production-prelaunch
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/sites-available/ofisnye-dveri-wp-production.conf.example" /etc/nginx/sites-available/ofisnye-dveri-wp-production
install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/nginx/sites-available/ofisnye-dveri-production.conf.example" /etc/nginx/sites-available/ofisnye-dveri-production
test -L /etc/nginx/sites-enabled/ofisnye-dveri-production-bootstrap
unlink /etc/nginx/sites-enabled/ofisnye-dveri-production-bootstrap
ln -s /etc/nginx/sites-available/ofisnye-dveri-production-prelaunch /etc/nginx/sites-enabled/ofisnye-dveri-production-prelaunch
ln -s /etc/nginx/sites-available/ofisnye-dveri-wp-production /etc/nginx/sites-enabled/ofisnye-dveri-wp-production
nginx -t
systemctl reload nginx
test ! -e /etc/nginx/sites-enabled/ofisnye-dveri-production
certbot renew --dry-run
```

Публичный production config установлен в `sites-available`, но не включён. Никогда не включай его одновременно с prelaunch: они определяют одинаковые upstream/server names.

Ожидаемая поверхность WordPress production:

| URL | Без outer Basic Auth |
| --- | --- |
| `/wp-json/` | `200`, JSON, `X-Robots-Tag: noindex` |
| существующий `/wp-content/uploads/...` | media доступно |
| `/` и прямой `/index.php` | `404` |
| `/xmlrpc.php`, `/wp-cron.php` | `403` |
| `/wp-login.php`, `/wp-admin/` | `401` |
| PHP внутри uploads | `403` |

Outer WP Basic Auth (`wpadmin`) защищает только admin/login; REST/media нужны Next.js и редактору. Storefront Basic Auth (`prelaunch`) — другая пара. Не подставляй WP admin Basic Auth в Woo REST credentials: оба механизма используют HTTP Authorization, REST защищается своими Woo keys.

## 14. Production: отдельные секреты, контракт, cron и первый release

### 14.1. Проверить интеграции и создать новые keys

Повтори аудит шага 8.1 **в production WP** до cron и тестовых заказов. В независимой production DB:

- отзови клонированные staging Woo REST keys и создай production Read + Read/Write;
- задай production-only BFF secret, проверь WP admin users/passwords и доступы;
- проверь SMTP/SMS/CRM/платежи/webhooks/доставку/analytics и Woo Scheduled Actions; до launch оставь реальные внешние операции выключенными либо sandbox;
- проверь тестовые заказы, заявки и пользователей, унаследованные от staging; убери только точно определённые тестовые объекты через WP/Woo, сохрани нужный контент;
- проверь Navigation, ссылки, media, Canonical и SEO: нет рабочих обращений к LocalWP/staging; каждый запрос идёт к правильному origin.

Это ручной этап, потому что repository не знает текущие плагины, их секреты и настройки DB. Не включай timer, пока неизвестные внешние действия не разобраны.

### 14.2. Подготовить env и backup defaults

```bash
install -o root -g deploy -m 0640 "$REPOSITORY_DIR/deploy/env/production.env.example" /etc/ofisnye-dveri/production.env
editor /etc/ofisnye-dveri/production.env
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/wordpress-production-backup.env.example" /etc/ofisnye-dveri/wordpress-production-backup.env
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/mysql-production-backup.cnf.example" /etc/ofisnye-dveri/mysql-production-backup.cnf
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/mysql-production-restore-admin.cnf.example" /etc/ofisnye-dveri/mysql-production-restore-admin.cnf
editor /etc/ofisnye-dveri/wordpress-production-backup.env
editor /etc/ofisnye-dveri/mysql-production-backup.cnf
editor /etc/ofisnye-dveri/mysql-production-restore-admin.cnf
```

В env: `APP_ENV=production`, **`SITE_INDEXING_ENABLED=false`**, `PORT=3000`, `HOSTNAME=127.0.0.1`, site URL `https://ofisnyedveri.ru`, WP URL `https://wp.ofisnyedveri.ru`, новые production Woo pairs/BFF secret, реальные slugs. Backup временно `OFFSITE_ENABLED=false`.

В `mysql-production-restore-admin.cnf` обязательно **`user=wordpress_prod_restore_test`** и соответствующий пароль шага 11.2. DB name в backup env остаётся длинным `RESTORE_TEST_DB_NAME=wordpress_production_restore_test`.

```bash
(
  set -a
  source /etc/ofisnye-dveri/production.env
  set +a
  /usr/local/bin/node "$REPOSITORY_DIR/scripts/validate-deploy-env.mjs"
)
mysql --defaults-extra-file=/etc/ofisnye-dveri/mysql-production-backup.cnf --batch -e 'SELECT CURRENT_USER(); SHOW GRANTS;'
mysql --defaults-extra-file=/etc/ofisnye-dveri/mysql-production-restore-admin.cnf --batch -e 'SELECT CURRENT_USER(); SHOW GRANTS;'
runuser -u deploy -- test -w /srv/ofisnye-dveri/production
runuser -u storefront -- test -w /srv/ofisnye-dveri/production/shared/cache
bash "$DEPLOY_SCRIPTS/check-host.sh" /etc/ofisnye-dveri/production-inventory.env
```

### 14.3. Развернуть принятый SHA и проверить

```bash
runuser -u deploy -- git -C "$REPOSITORY_DIR" fetch --prune origin
runuser -u deploy -- git -C "$REPOSITORY_DIR" merge-base --is-ancestor "$APPROVED_SHA" origin/main
bash "$DEPLOY_SCRIPTS/deploy-environment.sh" production "$APPROVED_SHA" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/verify-wordpress-production.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/verify-wordpress-origin.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/verify-door-configuration-readiness.sh" /etc/ofisnye-dveri/production-inventory.env true
bash "$DEPLOY_SCRIPTS/healthcheck.sh" http://127.0.0.1:3000/api/health production
systemctl status ofisnye-dveri@production.service --no-pager -l
```

На Basic Auth prompt введи `prelaunch:пароль`. Ожидается combined success; health — `production`, `indexingEnabled=false`; strict readiness и origin hardening проходят. Впервые импортированный MU-code получает **production** manifest/state через deploy, а не копированием staging state.

`verify-wordpress-origin.sh` может дополнительно проверить admin с `WP_ADMIN_CURL_USER`; если это нужно, передай значение через скрытый `read -s`, не вписывай пароль в команду/историю.

### 14.4. Включить production cron и выполнить QA

Только после аудита интеграций:

```bash
for kind in service timer; do
  install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/systemd/wordpress-production-cron.$kind.example" "/etc/systemd/system/wordpress-production-cron.$kind"
done
systemctl daemon-reload
systemctl start wordpress-production-cron.service
journalctl -u wordpress-production-cron.service -n 60 --no-pager
systemctl enable --now wordpress-production-cron.timer
systemctl list-timers --all wordpress-production-cron.timer
```

Повтори весь ручной acceptance из шага 8.4 на production prelaunch. Особенно: заказы только в production, корректные options/accessories/meta, replay без дублей, panel request, ссылки и media без staging. Не считай успешный health доказательством правильного расчёта заказа.

## 15. Production: backup и допуск к публичному запуску

### 15.1. Local backup и offsite repository

```bash
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-production-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-production-backup.env local
test ! -e /etc/ofisnye-dveri/restic-production.password
(umask 077; openssl rand -hex 32 > /etc/ofisnye-dveri/restic-production.password)
install -o root -g root -m 0600 "$REPOSITORY_DIR/deploy/backup/restic-production.env.example" /etc/ofisnye-dveri/restic-production.env
editor /etc/ofisnye-dveri/restic-production.env
```

Используй созданный отдельный production bucket, отдельный restic password и свои credentials:

```dotenv
RESTIC_REPOSITORY=s3:https://storage.yandexcloud.net/YOUR-PRODUCTION-BUCKET/ofisnye-dveri-production
RESTIC_PASSWORD_FILE=/etc/ofisnye-dveri/restic-production.password
RESTIC_CACHE_DIR=/var/cache/ofisnye-dveri/restic-production
AWS_ACCESS_KEY_ID=YOUR-PRODUCTION-ACCESS-KEY
AWS_SECRET_ACCESS_KEY=YOUR-PRODUCTION-SECRET-KEY
AWS_DEFAULT_REGION=ru-central1
```

Сохрани пароль вне VDS, затем один раз инициализируй новый repository:

```bash
(
  set -a
  source /etc/ofisnye-dveri/restic-production.env
  set +a
  restic init
  restic snapshots
)
editor /etc/ofisnye-dveri/wordpress-production-backup.env
```

Установи `OFFSITE_ENABLED=true`, проверь production `RESTIC_ENV_FILE`. Затем:

```bash
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-production-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-production-backup.env offsite
bash "$DEPLOY_SCRIPTS/maintain-offsite-backup.sh" /etc/ofisnye-dveri/wordpress-production-backup.env
for unit in wordpress-production-backup wordpress-production-backup-maintenance wordpress-production-restore-test; do
  for kind in service timer; do
    install -o root -g root -m 0644 "$REPOSITORY_DIR/deploy/systemd/$unit.$kind.example" "/etc/systemd/system/$unit.$kind"
  done
done
systemctl daemon-reload
systemctl start wordpress-production-backup.service
systemctl start wordpress-production-backup-maintenance.service
systemctl start wordpress-production-restore-test.service
systemctl show wordpress-production-backup.service wordpress-production-backup-maintenance.service wordpress-production-restore-test.service -p Id -p Result -p ExecMainStatus
systemctl enable --now wordpress-production-backup.timer wordpress-production-backup-maintenance.timer wordpress-production-restore-test.timer
systemctl list-timers --all 'wordpress*'
bash "$DEPLOY_SCRIPTS/record-production-state.sh" /etc/ofisnye-dveri/production-inventory.env
```

До включения timers требуются `Result=success`, `ExecMainStatus=0` у всех трёх service, как на staging. В случае ошибки расписание не включается до исправления.

Default retention: локальные каталоги старше порога 14 дней; restic — 14 daily / 8 weekly / 6 monthly. Calendars используют **часовой пояс VDS** и randomized delay, timestamps архивов/релизов — UTC. Фактический следующий запуск смотри через `systemctl list-timers`; расписания подробно приведены в [операционном справочнике](deployment-operations.md).

### 15.2. Gate перед открытием

Не переходи к разделу 16, пока не выполнено всё:

- staging принят; production использует тот же `APPROVED_SHA`; WP/Next SHA совпадают в каждом окружении;
- runtime DB, uploads, Woo keys, BFF secrets и backup repositories двух окружений независимы;
- production QA и обе ветки создания заказа/заявки, включая replay, пройдены;
- strict door readiness и hardened origin проверки проходят;
- local и offsite restore-test production успешны; password/credentials восстановления доступны вне VDS;
- cron, backup и TLS renewal timers установлены, нет failed units; есть порядок просмотра ошибок;
- выбран момент запуска; production контент, цены, контакты, юридические страницы, доставка, платежи и уведомления готовы;
- тестовые данные/интеграции пересмотрены; включение реальных интеграций выполняется осознанно, по их собственной процедуре;
- homepage и нужные страницы не имеют случайного `seo_noindex`; Canonical/социальные картинки не ведут на staging; при необходимости созданы страницы SEO для архивов;
- проверены актуальные сертификаты и DNS; публичный production Nginx config всё ещё выключен;
- назначен ответственный за наблюдение после открытия. Установленные timers сами не настраивают внешние оповещения о сбоях.

Backup проекта **не включает** новый `wp-config.php`, `/etc/ofisnye-dveri`, Nginx/systemd, Git-доступ и весь VDS. Сохрани нужные конфигурации и секреты отдельно в защищённом хранилище. Не клади их в публичный Git/этот документ.

## 16. Отдельный этап: открыть production и индексацию

### 16.1. Зафиксировать точку возврата

Это отдельное операционное действие после принятого prelaunch. Сначала новый backup; никаких новых импортов staging DB:

```bash
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-production-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-production-backup.env local
PRELAUNCH_RELEASE_PATH="$(readlink -f /srv/ofisnye-dveri/production/current)"
test -f "$PRELAUNCH_RELEASE_PATH/server.js"
PRELAUNCH_SHA="$(sed -n 's/^GIT_COMMIT=//p' "$PRELAUNCH_RELEASE_PATH/.release.env" | head -1)"
[[ "$PRELAUNCH_SHA" == "$APPROVED_SHA" ]] || { echo 'STOP: production SHA не совпадает с принятым'; exit 1; }
PRELAUNCH_RELEASE="$(basename "$PRELAUNCH_RELEASE_PATH")"
LAUNCH_RECORD_DIR="/var/lib/ofisnye-dveri/launch-$(date -u +%Y%m%dT%H%M%SZ)"
install -d -o root -g root -m 0700 "$LAUNCH_RECORD_DIR"
install -o root -g root -m 0600 /etc/ofisnye-dveri/production.env "$LAUNCH_RECORD_DIR/production.env.prelaunch"
install -o root -g root -m 0600 /etc/ofisnye-dveri/production-inventory.env "$LAUNCH_RECORD_DIR/production-inventory.env.prelaunch"
printf '%s\n' "$PRELAUNCH_RELEASE" > "$LAUNCH_RECORD_DIR/prelaunch-release.txt"
printf '%s\n' "$APPROVED_SHA" > "$LAUNCH_RECORD_DIR/approved-sha.txt"
printf '%s\n' "$LAUNCH_RECORD_DIR"
```

Запиши путь вне сессии. Данные этого каталога содержат секреты и остаются root-only. Убедись, что SHA текущего prelaunch действительно равен принятому. Старый release не удаляется до завершения открытия.

### 16.2. Пересобрать тот же SHA с включённой индексацией, пока Basic Auth действует

В `/etc/ofisnye-dveri/production.env` поменяй **только** `SITE_INDEXING_ENABLED=false` на `SITE_INDEXING_ENABLED=true`:

```bash
editor /etc/ofisnye-dveri/production.env
(
  set -a
  source /etc/ofisnye-dveri/production.env
  set +a
  /usr/local/bin/node "$REPOSITORY_DIR/scripts/validate-deploy-env.mjs"
)
SKIP_EXTERNAL_SMOKE=true bash "$DEPLOY_SCRIPTS/deploy-environment.sh" production "$APPROVED_SHA" /etc/ofisnye-dveri/production-inventory.env
curl --fail --silent --show-error http://127.0.0.1:3000/api/health
curl --fail --silent --show-error http://127.0.0.1:3000/robots.txt
curl --fail --silent --show-error http://127.0.0.1:3000/sitemap.xml -o /var/tmp/ofisnye-dveri-launch-sitemap.xml
```

Ожидается `indexingEnabled=true`, robots с `Sitemap: https://ofisnyedveri.ru/sitemap.xml`, реальные ожидаемые URL в sitemap. Проверь HTML главной и индексируемой PDP через текущий Basic Auth: canonical на production и нет случайного page-level noindex.

**Почему здесь разрешён `SKIP_EXTERNAL_SMOKE=true`:** Nginx пока намеренно закрыт Basic Auth и добавляет `X-Robots-Tag: noindex`. Обычный внешний smoke для `indexing=true` на этом промежуточном этапе должен упасть. Это единственное временное исключение в runbook; оно не означает acceptance. Обязательный smoke без credentials выполняется сразу после переключения Nginx ниже.

Нужен новый build, поскольку metadata/robots/sitemap могут быть предварительно отрендерены и закешированы. Одной правки env и `systemctl restart` недостаточно. Если build/deploy неуспешен, **останови открытие**, верни сохранённый env и принятый prelaunch release по разделу 17, проверь закрытый smoke.

### 16.3. Переключить только storefront Nginx

Сначала убедись, что внутренние проверки выше прошли. WP origin остаётся в hardened конфигурации и всегда `noindex`.

```bash
test -L /etc/nginx/sites-enabled/ofisnye-dveri-production-prelaunch
test ! -e /etc/nginx/sites-enabled/ofisnye-dveri-production
unlink /etc/nginx/sites-enabled/ofisnye-dveri-production-prelaunch
ln -s /etc/nginx/sites-available/ofisnye-dveri-production /etc/nginx/sites-enabled/ofisnye-dveri-production
if nginx -t; then
  systemctl reload nginx
else
  unlink /etc/nginx/sites-enabled/ofisnye-dveri-production
  ln -s /etc/nginx/sites-available/ofisnye-dveri-production-prelaunch /etc/nginx/sites-enabled/ofisnye-dveri-production-prelaunch
  echo 'STOP: nginx validation failed; prelaunch link restored, launch incomplete'
  exit 1
fi
```

Если reload не прошёл, проверь runtime и восстанови prelaunch links/конфигурацию по разделу 17. Не продолжай, полагаясь только на содержимое `sites-enabled`.

В `/etc/ofisnye-dveri/production-inventory.env` установи:

```dotenv
STOREFRONT_NGINX_SITE=/etc/nginx/sites-available/ofisnye-dveri-production
```

`STOREFRONT_BASIC_AUTH_FILE` оставь заданным: текущий inventory validator требует поле и после launch. Файл сохраняется для возможного возврата; **публичный Nginx template его не использует**. Само наличие Basic Auth file не означает, что storefront закрыт.

### 16.4. Обязательная проверка снаружи без пароля

```bash
unset CURL_USER CURL_RESOLVE SKIP_EXTERNAL_SMOKE
bash "$DEPLOY_SCRIPTS/check-production-inventory.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/smoke-test.sh" https://ofisnyedveri.ru production '' true
bash "$DEPLOY_SCRIPTS/verify-wordpress-origin.sh" /etc/ofisnye-dveri/production-inventory.env
curl --silent --show-error --head https://ofisnyedveri.ru/
curl --silent --show-error --head https://www.ofisnyedveri.ru/
curl --fail --silent --show-error https://ofisnyedveri.ru/robots.txt
bash "$DEPLOY_SCRIPTS/record-production-state.sh" /etc/ofisnye-dveri/production-inventory.env
```

В чистом браузере без сохранённого Basic Auth проверь:

- основной домен отвечает `200`, не запрашивает пароль; HTTP и HTTPS `www` перенаправляются на HTTPS apex, сохраняя путь;
- health — `production`, `indexingEnabled=true`; у обычных индексируемых страниц нет общего `X-Robots-Tag: noindex` и ошибочного HTML robots noindex;
- robots не содержит глобального `Disallow: /`; sitemap содержит ожидаемые production URL, исключает закрытые страницы и корректно учитывает ручные Canonical;
- WP origin и staging по-прежнему `noindex`, WP admin по-прежнему требует outer Basic Auth;
- media, формы, корзина и checkout работают без credentials prelaunch; выполни согласованный контрольный заказ/заявку и проверь доставку в production;
- нет ошибок в browser console и свежих журналах Nginx/Next/PHP; реальные интеграции работают согласно выбранному режиму.

`blog_public=0` на **WordPress origin оставь**: публичная индексируемая витрина — Next.js, глобальный её флаг `SITE_INDEXING_ENABLED=true`. Не открывай индексацию WP theme вместе с storefront. `seo_noindex` отдельных сущностей остаётся самостоятельным редакторским решением.

Далее при необходимости добавь сайт и sitemap в панели поисковых систем. Это отдельное действие владельца аккаунтов; успешный launch не означает немедленное появление в поиске. После стабилизации можно повысить DNS TTL.

## 17. Если проверка не прошла: закрыть сайт и вернуть рабочий код

### 17.1. Быстро вернуть внешний prelaunch барьер

В root Bash проверь, какие links активны. Если включён public symlink:

```bash
if test -L /etc/nginx/sites-enabled/ofisnye-dveri-production; then
  unlink /etc/nginx/sites-enabled/ofisnye-dveri-production
fi
if ! test -e /etc/nginx/sites-enabled/ofisnye-dveri-production-prelaunch; then
  ln -s /etc/nginx/sites-available/ofisnye-dveri-production-prelaunch /etc/nginx/sites-enabled/ofisnye-dveri-production-prelaunch
fi
nginx -t
systemctl reload nginx
curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' https://ofisnyedveri.ru/
```

Ожидается `401` без пароля. Это возвращает внешний барьер, но ещё не подтверждает выключенную индексацию внутри Next.js.

### 17.2. Вернуть env и точный prelaunch release

Задай **сохранённый** путь `LAUNCH_RECORD_DIR` из шага 16.1, если сессия потеряна. Не выбирай случайный каталог. Проверь его наличие и записанный release, затем:

```bash
test -f "$LAUNCH_RECORD_DIR/production.env.prelaunch"
PRELAUNCH_RELEASE="$(cat "$LAUNCH_RECORD_DIR/prelaunch-release.txt")"
test -f "/srv/ofisnye-dveri/production/releases/$PRELAUNCH_RELEASE/server.js"
install -o root -g deploy -m 0640 "$LAUNCH_RECORD_DIR/production.env.prelaunch" /etc/ofisnye-dveri/production.env
install -o root -g deploy -m 0640 "$LAUNCH_RECORD_DIR/production-inventory.env.prelaunch" /etc/ofisnye-dveri/production-inventory.env
runuser -u deploy -- bash "$DEPLOY_SCRIPTS/rollback-release.sh" production "$PRELAUNCH_RELEASE"
curl --fail --silent --show-error http://127.0.0.1:3000/api/health
read -r -s -p 'Basic Auth prelaunch user:password: ' CURL_USER
printf '\n'
export CURL_USER
bash "$DEPLOY_SCRIPTS/smoke-test.sh" https://ofisnyedveri.ru production '' false
unset CURL_USER
bash "$DEPLOY_SCRIPTS/verify-wordpress-production.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/record-production-state.sh" /etc/ofisnye-dveri/production-inventory.env
```

В public-launch шаге code SHA не менялся, поэтому MU-code уже соответствует тому же commit; достаточно возврата env + сохранённого Next release и проверки parity. Если одновременно менялся Git SHA, это другой инцидент: согласованно откатывай оба компонента по [операционному справочнику](deployment-operations.md), а не только symlink.

Для обычного неуспешного code deploy скрипты сами **пытаются** вернуть компоненты. На первом запуске предыдущего Next release может не быть; rollback тогда не создаёт его из ничего. Любой откат требует health/REST/smoke и проверки SHA.

**DB не откатывается вместе с кодом.** Если после открытия уже поступили реальные заказы, импорт старого staging/production dump потеряет новые данные. Restore-test — не инструмент восстановления рабочей БД. Полное аварийное восстановление данных требует выбранного backup, остановки записи и отдельного решения о сохранении более новых заказов; готовой команды live restore в repository нет.

## 18. Финальный протокол и последующие релизы

После successful launch:

```bash
nginx -t
ufw status numbered
systemctl --failed
systemctl list-timers --all 'wordpress*' 'certbot*'
certbot certificates
ss -lntp | grep -E ':(22|80|443|3000|3001|3306|33060)\b'
bash "$DEPLOY_SCRIPTS/healthcheck.sh" http://127.0.0.1:3001/api/health staging
bash "$DEPLOY_SCRIPTS/healthcheck.sh" http://127.0.0.1:3000/api/health production
bash "$DEPLOY_SCRIPTS/record-staging-state.sh" /etc/ofisnye-dveri/staging-inventory.env
bash "$DEPLOY_SCRIPTS/record-production-state.sh" /etc/ofisnye-dveri/production-inventory.env
journalctl -u ofisnye-dveri@production.service -n 100 --no-pager
journalctl -u wordpress-production-backup.service -n 60 --no-pager
journalctl -u wordpress-production-cron.service -n 60 --no-pager
```

Отдельно повтори внешний **закрытый** smoke staging со staging Basic Auth, затем удали переменную credentials из сессии. Его `indexingEnabled=false` не меняется после production launch.

Сохрани в эксплуатационном журнале:

1. даты и результаты staging acceptance, prelaunch acceptance и public launch;
2. полный SHA, release ID и совпадение WP/Next SHA;
3. путь исходного LocalWP пакета и конкретного staging seed backup, их checksum;
4. пути production backup, успешные local/offsite restore-test и время следующих timers;
5. место защищённого хранения секретов/конфигураций, ответственного за них — без публикации самих значений;
6. путь `LAUNCH_RECORD_DIR` и понятную точку возврата;
7. фактические runtime versions, DNS/TLS и state reports из `/var/lib/ofisnye-dveri/deployment-records`.

После проверки и принятого срока хранения удали лишнюю транспортную копию SQL/архивов из `/home/deploy/migration-incoming`; исходный migration package и проверенные backup хранятся по выбранной политике. Не оставляй SQL/архивы в web root. Не удаляй единственную копию restic password.

Теперь повторяется только обычный цикл: Local проверка → review/commit/merge/push → staging того SHA → ручная acceptance → production **того же** SHA → smoke/наблюдение. Production DB и uploads живут самостоятельно. `deploy-environment.sh` не делает полный DB backup автоматически: создавай его отдельно перед нужными изменениями и используй настроенные timers.

Справочные файлы проекта:

- [Операции deploy, backup, restore-test и rollback](deployment-operations.md).
- [Контракт каталога deploy](../README.md).
- [WordPress staging data checklist](wordpress-staging-checklist.md).
- [WP-driven SEO и ручная проверка metadata](wp-driven-seo-metadata.md).
- [REST inventory](rest-api-inventory.md) и [REST contracts](rest-api-contracts.md).
- [Staging code releases без DB transfer](local-to-staging-no-db.md).
- [Production code releases без DB transfer](local-to-production-no-db.md).
