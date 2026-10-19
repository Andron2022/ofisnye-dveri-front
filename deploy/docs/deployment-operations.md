# Справочник deploy и эксплуатации staging / production

Проверено по коду репозитория 19.10.2026. Документ описывает существующие скрипты, их параметры, результаты и ограничения. Он не меняет механизм deploy и не подтверждает, что все шаблоны уже установлены на VDS: фактические настройки, backup и timers проверяются на самом сервере.

## 1. Что находится в каждом окружении

| Параметр | Staging | Production |
| --- | --- | --- |
| Storefront | `https://staging.ofisnyedveri.ru` | `https://ofisnyedveri.ru` |
| WordPress | `https://wp-staging.ofisnyedveri.ru` | `https://wp.ofisnyedveri.ru` |
| Next.js port | `3001` | `3000` |
| Каталог приложения | `/srv/ofisnye-dveri/staging` | `/srv/ofisnye-dveri/production` |
| WordPress root | `/srv/wordpress/staging/public` | `/srv/wordpress/production/public` |
| Inventory | `/etc/ofisnye-dveri/staging-inventory.env` | `/etc/ofisnye-dveri/production-inventory.env` |
| Переменные приложения | `/etc/ofisnye-dveri/staging.env` | `/etc/ofisnye-dveri/production.env` |
| Конфигурация backup | `/etc/ofisnye-dveri/wordpress-backup.env` | `/etc/ofisnye-dveri/wordpress-production-backup.env` |
| Backup root в шаблонах | `/var/backups/ofisnye-dveri/wordpress-staging` | `/var/backups/ofisnye-dveri/wordpress-production` |
| Next.js systemd unit | `ofisnye-dveri@staging.service` | `ofisnye-dveri@production.service` |

Общий Git checkout: `/srv/ofisnye-dveri/repository`.

В каталоге приложения:

```text
builds/        временные рабочие каталоги сборки
releases/      готовые standalone-релизы
current        symlink на действующий релиз
shared/cache/  доступный для runtime кеш
```

Storefront и WordPress имеют отдельные кодовые компоненты одного application release. Окружения имеют собственные БД, uploads, ключи и backup. Обычный deploy не переносит данные Local → Staging → Production.

В репозитории staging настроен как закрытый контур, production описан также в режиме prelaunch. Состояние индексации задаёт `SITE_INDEXING_ENABLED` в env конкретного окружения. Открытие индексации и переключение Nginx на публичный production — отдельные операции, не часть обычного release.

## 2. Где выполнять команды и как выбрать окружение

Серверные примеры ниже выполняются в **Bash через SSH на Linux VDS**, не в локальном PowerShell. Скрипты вызываются через `bash`; устанавливать executable bit для них не требуется.

Выберите один блок параметров для текущей SSH-сессии.

Staging:

```bash
ENVIRONMENT=staging
INVENTORY_FILE=/etc/ofisnye-dveri/staging-inventory.env
BACKUP_ENV_FILE=/etc/ofisnye-dveri/wordpress-backup.env
STOREFRONT_URL=https://staging.ofisnyedveri.ru
PORT=3001
```

Production:

```bash
ENVIRONMENT=production
INVENTORY_FILE=/etc/ofisnye-dveri/production-inventory.env
BACKUP_ENV_FILE=/etc/ofisnye-dveri/wordpress-production-backup.env
STOREFRONT_URL=https://ofisnyedveri.ru
PORT=3000
```

Общие параметры после выбранного блока:

```bash
REPOSITORY_DIR=/srv/ofisnye-dveri/repository
DEPLOY_SCRIPTS="$REPOSITORY_DIR/deploy/scripts"
APP_ROOT="/srv/ofisnye-dveri/$ENVIRONMENT"
SERVICE_NAME="ofisnye-dveri@$ENVIRONMENT.service"
```

Для пути к БД и backup источником истины остаются серверные env-файлы, а не пример в этой таблице. Секреты из env, MySQL defaults и restic password не копируются в Git или отчёты.

## 3. Карта существующих функций

Все перечисленные скрипты находятся в [deploy/scripts](../scripts).

| Скрипт | Назначение | Что изменяет |
| --- | --- | --- |
| `check-environment-inventory.sh` | Проверка обязательных параметров и разделения окружений | Не выполняет deploy |
| `check-host.sh` | Проверка ОС, runtime, путей, ресурсов, сервисов и Nginx config | Не устанавливает пакеты и не перезапускает сервисы |
| `verify-wordpress-environment.sh` | Проверка WP/Woo/ACF/Navigation/REST и managed mu-кода | Диагностика через WP-CLI/GET; временные файлы |
| `verify-door-configuration-readiness.sh` | Проверка готовности конфигураций дверей | WP-CLI/GET; может проверять много товаров |
| `verify-wordpress-origin.sh` | Проверка защиты production WP origin | HTTP-проверки |
| `healthcheck.sh` | Проверка `status`, окружения и deployment ID | GET с повторами |
| `smoke-test.sh` | Внешние проверки storefront, robots и Sitemap | HTTP-проверки |
| `backup-wordpress.sh` | Полный dump выбранной БД и архив `wp-content` | Создаёт backup, при настройке отправляет offsite, удаляет старые локальные наборы |
| `verify-backup-restore.sh` | Проверка восстановления локальной или offsite-копии | Создаёт и удаляет отдельную restore-test БД и временные файлы |
| `maintain-offsite-backup.sh` | Retention и проверка restic | Может удалять старые offsite snapshots и освобождать место |
| `deploy-environment.sh` | Общий release WordPress + Next.js | Устанавливает оба компонента, запускает проверки и записывает состояние |
| `deploy-wordpress-code.sh` | Установка Git-managed mu-плагинов | Меняет managed PHP-файлы и manifest/state; сохраняет предыдущие файлы |
| `deploy-release.sh` | Сборка и установка standalone Next.js | Создаёт релиз, переключает `current`, перезапускает сервис, удаляет старые релизы |
| `rollback-release.sh` | Откат Next.js на сохранённый релиз | Переключает `current` и перезапускает Next.js |
| `rollback-wordpress-code.sh` | Откат mu-кода по snapshot из state | Восстанавливает managed PHP-файлы, manifest и state |
| `record-environment-state.sh` | Отчёт о действующем окружении | Создаёт Markdown-файл на сервере |
| `install-node24.sh` | Первичная установка Node.js | Меняет runtime на сервере; не нужен для обычного release |

Обёртки `check-staging-inventory.sh`, `check-production-inventory.sh`, `verify-wordpress-staging.sh`, `verify-wordpress-production.sh`, `record-staging-state.sh` и `record-production-state.sh` выбирают окружение и вызывают общие механизмы.

## 4. Проверки перед release и после него

### Inventory и сервер

```bash
sudo bash "$DEPLOY_SCRIPTS/check-environment-inventory.sh" "$INVENTORY_FILE"
sudo bash "$DEPLOY_SCRIPTS/check-host.sh" "$INVENTORY_FILE"
```

Inventory проверяет заполненность, домены, пути, соответствие env окружению и порты. Для production параметр `GIT_DEPLOY_REF` должен быть `origin/main`.

Host preflight проверяет команды, ожидаемые ОС и Node major, проектный диапазон Node, PHP-FPM/MySQL, socket, существование каталогов и env, минимум 2 GB RAM и 5 GB свободного места, затем выполняет `nginx -t`. При RAM менее 4 GB выводится предупреждение. Прослушиваемый порт сам по себе не считается ошибкой для уже работающего окружения.

### WordPress и готовность дверей

```bash
sudo bash "$DEPLOY_SCRIPTS/verify-wordpress-environment.sh" "$INVENTORY_FILE"
sudo bash "$DEPLOY_SCRIPTS/verify-door-configuration-readiness.sh" "$INVENTORY_FILE" true
```

Первая проверка сверяет WP URL с inventory, manifest/checksum mu-плагинов и SHA, активность Woo/ACF, REST, schema/landings/terms, ACF главной и настроек сайта, Navigation, Woo-поля `public_article_no` и `headless_seo`.

Вторая отдельно проверяет опубликованные двери: schema version 2, `valid=true`, нужные массивы конфигурации. Аргумент `true` требует выключенных fallback modes. `false` позволяет fallback modes для промежуточной настройки, сохраняя остальные проверки. Общий WP code-health допускает включённые fallback и не заменяет строгую readiness-проверку.

Проверка защиты production WP origin:

```bash
sudo bash "$DEPLOY_SCRIPTS/verify-wordpress-origin.sh" /etc/ofisnye-dveri/production-inventory.env
```

Она проверяет доступный REST и закрытый WordPress frontend, robots/noindex, запрет XML-RPC, HTTP-доступа к cron и PHP в uploads, внешний Basic Auth у login/admin. При заданном `WP_ADMIN_CURL_USER` дополнительно проверяется доступ к admin с авторизацией. Этот скрипт предназначен для production inventory.

### Health и внешний smoke

`DEPLOYMENT_ID` можно получить из действующего релиза:

```bash
CURRENT_RELEASE="$(sudo readlink -f "$APP_ROOT/current")"
DEPLOYMENT_ID="$(sudo sed -n 's/^DEPLOYMENT_ID=//p' "$CURRENT_RELEASE/.release.env")"
sudo bash "$DEPLOY_SCRIPTS/healthcheck.sh" \
  "http://127.0.0.1:$PORT/api/health" "$ENVIRONMENT" "$DEPLOYMENT_ID"
```

По умолчанию healthcheck делает до 30 попыток с паузой 2 секунды; один curl ограничен 5 секундами. Проверяются `status=ok`, `appEnvironment` и переданный deployment ID. Это не тест заказа и не проверка всех страниц.

Для внешнего smoke значение `EXPECTED_INDEXING` должно совпадать с действующим env. Для staging и закрытого production-prelaunch используется `false`:

```bash
EXPECTED_INDEXING=false
```

У закрытого storefront нужен Basic Auth. Самостоятельный `smoke-test.sh` не запрашивает пароль; для закрытого контура запускать его с авторизацией, например без записи пароля в shell history:

```bash
read -r -s -p 'Basic Auth user:password: ' CURL_USER
echo
sudo env CURL_USER="$CURL_USER" bash "$DEPLOY_SCRIPTS/smoke-test.sh" \
  "$STOREFRONT_URL" "$ENVIRONMENT" "$DEPLOYMENT_ID" "$EXPECTED_INDEXING"
unset CURL_USER
```

Для уже открытого storefront, если Basic Auth снят и в env действительно установлено `SITE_INDEXING_ENABLED=true`:

```bash
EXPECTED_INDEXING=true
sudo bash "$DEPLOY_SCRIPTS/smoke-test.sh" \
  "$STOREFRONT_URL" "$ENVIRONMENT" "$DEPLOYMENT_ID" "$EXPECTED_INDEXING"
```

Эта переменная задаёт ожидаемый результат проверки и не включает индексацию на сайте.

Smoke проверяет health/indexing state, доступность главной, robots.txt и sitemap.xml. При закрытой индексации требуются внешний `X-Robots-Tag: noindex`, `Disallow: /` и пустой Sitemap. При разрешённой индексации проверяются ссылка на Sitemap в robots.txt и отсутствие внешнего `X-Robots-Tag: noindex`.

Успешный smoke не подтверждает корректность каждого Canonical, каждой цены и пользовательского checkout. Эти сценарии проверяются отдельно. Диагностика через WordPress может затрагивать обычные служебные кеши WP; это не проверка побайтовой неизменности БД.

## 5. Создание backup: что сохраняется и где искать

Команда для выбранного окружения:

```bash
sudo bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" "$BACKUP_ENV_FILE"
```

Источники конфигурации: [staging backup template](../backup/wordpress-backup.env.example) и [production backup template](../backup/wordpress-production-backup.env.example).

Скрипт создаёт каталог `BACKUP_ROOT/<UTC timestamp>/` и выводит фактический путь в строке `WordPress backup created: ...`.

| Файл в наборе | Содержимое |
| --- | --- |
| `database.sql.gz` | Полный mysqldump БД, указанной в `DB_NAME`; используется `--single-transaction` |
| `wp-content.tar.gz` | Весь `WP_ROOT/wp-content`: uploads, плагины, mu-плагины и темы |
| `wordpress-code.manifest` | Manifest managed mu-кода, если он существует |
| `manifest.txt` | Имя backup, UTC-время, исходные WP root/БД/host |
| `SHA256SUMS` | Контрольные суммы файлов набора |

Это не полный снимок VDS. В этот пакет не входят WordPress core, `wp-config.php`, `/etc/ofisnye-dveri`, конфигурации Nginx/systemd, TLS-сертификаты и standalone-релизы Next.js. Для восстановления сервера эти компоненты нужны отдельно. Dump БД и архив файлов создаются последовательно, а не как единый атомарный снимок диска.

После создания контрольные суммы сразу проверяются. При `OFFSITE_ENABLED=true` набор отправляется в restic repository из `RESTIC_ENV_FILE`. Ошибка отправки приводит к ошибке backup-команды, хотя локальные файлы уже могут существовать. Staging и production используют отдельные restic-конфигурации и хранилища.

По умолчанию локальный retention задаётся `RETENTION_DAYS=14`; очистка старых каталогов выполняется в конце успешного backup по `mtime`. Это срок хранения, а не фиксированное число копий. Не храните в `BACKUP_ROOT` посторонние каталоги: они тоже могут попасть под эту очистку.

**Combined deploy не вызывает `backup-wordpress.sh` автоматически.** Полный backup перед release или ручной правкой данных запускается отдельно и проверяется по exit code и результату restore-test.

## 6. Проверка восстановления backup

Из последней локальной копии выбранного окружения:

```bash
sudo bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" "$BACKUP_ENV_FILE" local
```

Из последней offsite-копии с соответствующим `BACKUP_NAME`:

```bash
sudo bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" "$BACKUP_ENV_FILE" offsite
```

Здесь `local` означает **backup на диске VDS**, а не БД программы LocalWP на Windows.

Скрипт:

1. Выбирает последнюю локальную копию или получает `restic restore latest` по tag окружения.
2. Копирует набор во временный каталог `/var/tmp` и проверяет `SHA256SUMS`.
3. Распаковывает `wp-content` во временный каталог, проверяет uploads и mu-код. Если manifest есть, проверяет точные checksum; для старых наборов без manifest проверка слабее и выводится предупреждение.
4. Пересоздаёт отдельную БД из `RESTORE_TEST_DB_NAME`, импортирует dump и требует более 10 таблиц.
5. При завершении удаляет тестовую БД и временные файлы, включая распакованную offsite-копию.

В шаблонах тестовые БД — `wordpress_staging_restore_test` и `wordpress_production_restore_test`. Имя обязано содержать `restore_test`. Это условие не заменяет проверку конфигурации: тестовая БД не должна содержать нужные данные.

Успех: `Restore test passed from local backup: ...` или `Restore test passed from offsite backup: ...`.

**Рабочая БД и действующий `wp-content` этой командой не восстанавливаются.** Успех подтверждает импортируемость dump, базовую структуру и целостность архивных файлов; работоспособность всего storefront на восстановленных данных отдельно не запускается. Произвольный старый backup по timestamp скрипт аргументом не принимает.

## 7. Offsite retention и обслуживание restic

```bash
sudo bash "$DEPLOY_SCRIPTS/maintain-offsite-backup.sh" "$BACKUP_ENV_FILE"
```

При отключённом offsite скрипт сообщает об этом и завершает работу. При включённом выполняет `restic forget` по tag `BACKUP_NAME` с `--prune`, затем `restic check --read-data-subset=5%`.

Значения в шаблонах: сохранять 14 daily, 8 weekly, 6 monthly snapshots. Это удаляющая операция над историей backup. Проверка 5% данных не является полным чтением всего restic repository. Само обслуживание новый backup не создаёт.

## 8. Штатный выпуск кода

### Local / Git

1. Завершить ручную проверку, выполнить `npm run lint`, `npm run typecheck`, `npm run build` и относящиеся к изменению тесты.
2. Зафиксировать выбранные файлы, отправить изменения в Git и пройти review/merge.
3. Зафиксировать полный SHA приложения из `main`. После принятия staging именно этот SHA продвигается в production.

Скрипты принимают Git ref или SHA. Факт ручного принятия staging они не проверяют: это часть release-процедуры. Production inventory фиксирует `GIT_DEPLOY_REF=origin/main`, но передача SHA сама по себе не доказывает его происхождение из `main`.

### VDS: подготовка

Сначала проверить чистоту checkout. При неожиданных изменениях остановиться и разобрать их, не выполнять reset:

```bash
sudo -iu deploy git -C "$REPOSITORY_DIR" status --short
sudo -iu deploy git -C "$REPOSITORY_DIR" fetch --prune origin
sudo -iu deploy git -C "$REPOSITORY_DIR" switch main
sudo -iu deploy git -C "$REPOSITORY_DIR" pull --ff-only origin main
```

Задать полный проверенный SHA и проверить его наличие и принадлежность истории `main`:

```bash
APPROVED_SHA='ЗАМЕНИТЬ_НА_ПОЛНЫЙ_SHA'
sudo -iu deploy git -C "$REPOSITORY_DIR" cat-file -e "${APPROVED_SHA}^{commit}"
sudo -iu deploy git -C "$REPOSITORY_DIR" merge-base --is-ancestor "$APPROVED_SHA" origin/main
sudo -iu deploy git -C "$REPOSITORY_DIR" show --no-patch --oneline "$APPROVED_SHA"
```

Ошибку любой проверки нужно устранить до deploy. Затем выполнить inventory/host checks, создать полный backup текущего выбранного окружения и пройти local restore-test из разделов выше.

### Combined deploy

```bash
sudo bash "$DEPLOY_SCRIPTS/deploy-environment.sh" \
  "$ENVIRONMENT" "$APPROVED_SHA" "$INVENTORY_FILE"
```

Порядок внутри orchestrator:

1. Проверка inventory, загрузка env и разрешение Git ref в конкретный commit.
2. Установка mu-плагинов из `wordpress/mu-plugins` этого commit: PHP syntax checks, snapshot предыдущих managed-файлов, checksum, новый manifest/state.
3. `verify-wordpress-environment.sh` против установленного WP-кода.
4. Сборка Next.js из того же commit: `npm ci`, `check:deploy-env`, `lint`, `typecheck`, `build`.
5. Установка standalone release, переключение `current`, перезапуск службы и внутренний healthcheck.
6. Проверка совпадения Git SHA storefront и WordPress.
7. Внешний smoke и запись состояния окружения.

Для закрытого storefront orchestrator запрашивает Basic Auth интерактивно, если `CURL_USER` не передан. Для автоматизированного запуска нужны явно переданные credentials. `SKIP_EXTERNAL_SMOKE=true` — существующий обход этой проверки, его не следует включать в обычный release.

`check:deploy-env` проверяет, в частности, HTTPS origins, разделение storefront/WP, Woo/BFF-параметры, обязательный Origin для BFF, состояние индексации и запрет `NODE_TLS_REJECT_UNAUTHORIZED=0`. На staging индексация обязана быть выключена; для production её состояние должно быть явно задано.

Запускать один deploy/rollback на окружение за раз. Скрипты используют отдельные блокировки компонентов; combined release последовательно заменяет WP и Next.js и не является одной атомарной транзакцией над всеми компонентами.

Успех всей операции: `Combined application release passed: environment=... commit=... deployment=...` и exit code `0`.

`deploy-wordpress-code.sh` обновляет managed PHP-файлы и сохраняет чужие unmanaged mu-плагины; конфликт имён останавливает операцию. Отдельный `deploy-release.sh` обновляет только Next.js. Для обычного application release используется общий orchestrator, чтобы сохранить SHA parity.

Code deploy не импортирует БД, не заменяет uploads, не переносит SEO/ACF-значения, заказы или настройки из Local/Staging, не обновляет WordPress core и обычные плагины, не устанавливает Nginx-конфиги и timers. PHP-регистрации полей приезжают с кодом; значения данных задаются отдельно в нужном WP.

Для staging пройти ручную приёмку и записать принятый SHA. После этого выбрать production-параметры из раздела 2, создать production backup, пройти restore-test и выполнить тот же combined deploy с **тем же SHA**. Текущее состояние индексации сохраняется.

## 9. Откат кода

### Автоматическая попытка при ошибке deploy

Next.js deploy при неудаче после переключения `current` пытается вернуть предыдущий релиз. WP deploy при ошибке после изменения файлов пытается восстановить свой snapshot. Orchestrator дополнительно пытается откатить уже установленные компоненты при ошибке следующих этапов.

Это попытка восстановления, а не гарантия: ошибки rollback тоже возможны. После неудачного deploy проверить журнал, `current`, health, WP verification и SHA обоих компонентов. БД и ручные изменения данных эти механизмы не откатывают.

### Ручной откат Next.js

Посмотреть сохранённые релизы и выбрать конкретный каталог:

```bash
sudo ls -1 "$APP_ROOT/releases"
sudo readlink -f "$APP_ROOT/current"
```

После выбора `RELEASE_ID`:

```bash
RELEASE_ID='ЗАМЕНИТЬ_НА_ИМЯ_КАТАЛОГА_РЕЛИЗА'
sudo -iu deploy bash "$DEPLOY_SCRIPTS/rollback-release.sh" "$ENVIRONMENT" "$RELEASE_ID"
```

Без второго аргумента выбирается самый новый сохранённый релиз, отличающийся от текущего; он не обязательно является желаемой версией. Если target не проходит restart/health, скрипт пытается вернуть исходный `current`.

Next.js по умолчанию хранит пять релизов (`KEEP_RELEASES=5`). Откат возможен только на сохранившийся каталог.

### Ручной откат WordPress mu-кода

```bash
sudo bash "$DEPLOY_SCRIPTS/rollback-wordpress-code.sh" "$ENVIRONMENT" "$INVENTORY_FILE"
```

Он использует `WORDPRESS_CODE_ROLLBACK_SNAPSHOT` из `/var/lib/ofisnye-dveri/wordpress-code/<environment>.state`, восстанавливает PHP-файлы, прежний manifest и state. Отдельного аргумента для выбора произвольного snapshot у скрипта нет. По умолчанию хранится пять WP snapshots (`WORDPRESS_CODE_KEEP_SNAPSHOTS=5`).

Откат одного компонента не откатывает второй. До ручного отката нужно определить согласованную пару Next.js release / WP snapshot; после — проверить SHA parity. Для другой известной принятой версии можно заново выполнить combined deploy её SHA, если это подходит текущим данным и доступна сборка. Это пересборка, а не мгновенное переключение на старый каталог.

## 10. Аварийное восстановление рабочей БД и файлов

**Готового project-скрипта для полного восстановления действующего WordPress одной командой в репозитории нет.** `verify-backup-restore.sh` выполняет изолированный тест, а `rollback-wordpress-code.sh` возвращает только managed mu-код.

При реальном повреждении данных порядок восстановления определяется для выбранного окружения и конкретного набора backup:

1. Зафиксировать инцидент, нужный момент восстановления, текущие SHA и допустимую потерю изменений после backup. Для production выбрать собственную production-копию.
2. Ограничить новые записи: учесть storefront/BFF, WP admin, cron и прочие фоновые процессы. Подготовить окно обслуживания.
3. Если возможно, отдельно сохранить текущее повреждённое состояние для разбора и возврата.
4. Получить выбранный локальный/offsite backup, сверить `manifest.txt`, окружение, БД, UTC-время и `SHA256SUMS`.
5. Проверить восстановление именно выбранного набора в изоляции. Штатный restore-test автоматически выбирает latest; для более старого набора нужна отдельная подготовка теста.
6. Восстановить dump в целевую БД этого же окружения, затем необходимый `wp-content` из согласованного набора с сохранением правильных владельцев/прав. Это отдельная изменяющая операция, а не запуск обычного deploy.
7. Согласовать mu-код и Next.js с восстановленными данными и manifest. Сохранить environment-specific `wp-config.php`, ключи и инфраструктурные настройки.
8. Проверить WP/REST, media, health, SHA, внешние проверки, релевантные бизнес-сценарии и кеши; только затем возобновить записи/cron и доступ.
9. Записать итоговое состояние и создать проверенный backup восстановленной версии.

Здесь намеренно нет универсальной команды `DROP DATABASE` / SQL import поверх live DB: нужные реквизиты, snapshot и последствия зависят от инцидента. Полный restore вернёт данные к моменту копии и может потерять более поздние заказы, контент и настройки. Code-регрессия сама по себе не является основанием импортировать БД.

## 11. SHA, состояние сервера и журналы

Сравнить SHA компонентов:

```bash
CURRENT_RELEASE="$(sudo readlink -f "$APP_ROOT/current")"
sudo grep '^GIT_COMMIT=' "$CURRENT_RELEASE/.release.env"
sudo grep '^WORDPRESS_CODE_GIT_COMMIT=' \
  "/var/lib/ofisnye-dveri/wordpress-code/$ENVIRONMENT.state"
```

Записать отчёт после deploy, rollback или восстановления:

```bash
sudo bash "$DEPLOY_SCRIPTS/record-environment-state.sh" "$INVENTORY_FILE"
```

По умолчанию он сохраняется в `/var/lib/ofisnye-dveri/deployment-records/<environment>-<UTC timestamp>.md`. Вторым аргументом можно указать собственный output-file. Отчёт включает SHA parity, deployment ID, DNS/TLS, версии, сервисы и сведения о последнем backup. Это фиксация наблюдаемого состояния; наличие отчёта само по себе не означает, что всё прошло проверки.

Диагностика Next.js:

```bash
sudo systemctl status "$SERVICE_NAME" --no-pager
sudo journalctl -u "$SERVICE_NAME" -n 100 --no-pager
sudo journalctl -u "$SERVICE_NAME" -f
```

Проверка Nginx:

```bash
sudo nginx -t
sudo systemctl status nginx --no-pager
```

Служба Next.js использует пользователя `storefront`, файл `/etc/ofisnye-dveri/<environment>.env` и `.release.env`, пишет stdout/stderr в journal. При падении настроен `Restart=on-failure` с задержкой 5 секунд. Обычный `systemctl restart` перезапускает текущий код; новую версию он не устанавливает.

`.release.env` также включает `NEXT_IMMUTABLE_RELEASE_RUNTIME=true` для runtime-кеша immutable release; эту переменную не добавляют в общий env сборки. Часть настроек, включая публичные значения Next.js и предрендеренные metadata, используется уже при build: после их изменения одного restart может быть недостаточно, требуется пересборка release. Кеширование контента/страниц/Sitemap не равнозначно обновлению кода.

## 12. Расписания backup, maintenance, restore-test и cron

В [deploy/systemd](../systemd) лежат шаблоны. Наличие файла в Git не означает, что timer установлен и включён на сервере.

| Операция | Staging timer | Production timer | Расписание в шаблонах |
| --- | --- | --- | --- |
| Backup | `wordpress-backup.timer` | `wordpress-production-backup.timer` | Ежедневно: staging 03:30, production 02:45; случайная задержка до 15 минут |
| Offsite maintenance | `wordpress-backup-maintenance.timer` | `wordpress-production-backup-maintenance.timer` | Воскресенье: staging 05:15, production 04:30; задержка до 30 минут |
| Offsite restore-test | `wordpress-restore-test.timer` | `wordpress-production-restore-test.timer` | Первое воскресенье месяца: staging 06:30, production 05:45; задержка до 30 минут |
| WP cron | Отдельного staging-шаблона в этом каталоге нет | `wordpress-production-cron.timer` | Первый запуск через 2 минуты после boot, далее через 5 минут после активации службы |

Времена calendar timers определяются часовым поясом VDS, поскольку в шаблонах не указан отдельный timezone. Это не обязательно время Екатеринбурга. Каталоги backup и release при этом именуются в UTC. Calendar timers имеют `Persistent=true`, поэтому пропущенный запуск может выполниться после возобновления работы timer.

Посмотреть фактическое расписание и журнал, например для production:

```bash
timedatectl
sudo systemctl list-timers --all 'wordpress*'
sudo systemctl status wordpress-production-backup.timer --no-pager
sudo journalctl -u wordpress-production-backup.service -n 100 --no-pager
sudo journalctl -u wordpress-production-restore-test.service -n 100 --no-pager
```

Staging использует соответствующие имена без `production-`. Production cron запускает `wp cron event run --due-now` от `www-data`; это выполнение фоновых задач и может изменять данные WP. Включение/изменение timers и первоначальная настройка restic выполняются по bootstrap-инструкциям, не при каждом release.

## 13. Что проверяется вручную и связанные документы

Автоматические code/health/smoke checks не заменяют проверку реального каталога, фильтров, PDP, корзины, формы заказа, заявок на панели, SEO-метаданных и WordPress-контента. Тесты с созданием заказов и изменением данных production требуют отдельного согласованного сценария. Отдельный LocalWP SEO roundtrip-скрипт из `tests` не используется для staging/production.

Полезные документы:

- [Общий deploy contract](../README.md).
- [Штатное продвижение Local → Staging без переноса БД](local-to-staging-no-db.md).
- [Продвижение принятого SHA → Production без переноса БД](local-to-production-no-db.md).
- [Первоначальное развёртывание staging](first-staging-deploy.md).
- [Production prelaunch: инфраструктура, origin hardening и backup](production-prelaunch.md).
- [WordPress checklist](wordpress-staging-checklist.md).
- [REST API inventory](rest-api-inventory.md).

Пошаговые `local-to-*-no-db.md` содержат также настройки конкретного предыдущего шага фильтров. Для другого release используйте общий порядок кода/backup и приёмку именно его функциональности. Исторический `local-to-production-with-staging-db.md` не является инструкцией для штатного обновления существующего production.
