# Продвижение очередной задачи: что делать в зависимости от изменений

Проверено по repository 19.10.2026. Документ применяется к **уже работающим staging и production** после очередного шага разработки.

**В production DB уже поступают реальные данные.** Обычный релиз сохраняет их: LocalWP и staging не являются источником для замены production DB. Продвигаются согласованный Git SHA и, когда задача этого требует, конкретные настройки/данные. Полный импорт БД, копирование таблиц и синхронизация всего `wp-content` не входят в обычный выпуск.

Документ помогает выбрать процедуру. Конкретные значения, объекты и migrations определяются по результату задачи и фактическому состоянию целевого WP. Он не подтверждает текущую конфигурацию VDS и не запускает перечисленные команды автоматически.

## 1. Что именно продвигается

Результат задачи может состоять из нескольких независимых частей:

| Часть | Где находится | Как попадает в окружение |
| --- | --- | --- |
| Frontend, BFF, нормализаторы, зависимости, Git assets | `src`, `public`, package files, Next.js config | Новый standalone build из принятого Git SHA |
| Project-managed PHP | Верхнеуровневые `wordpress/mu-plugins/*.php` | Managed-code deploy из того же SHA |
| ACF definitions в PHP | Код регистрации полей/групп | Вместе с соответствующим PHP; существующие значения полей остаются в DB |
| ACF definitions, созданные только в admin | DB конкретного WP, иногда отдельный JSON/export | Отдельный контролируемый перенос definitions с сохранением field keys; не автоматически через Git |
| Контент, SEO-значения, Navigation, Woo/Registry settings | DB конкретного окружения | Точечные действия через admin/API или подготовленную migration |
| Media WordPress | Uploads и attachment records в DB | Загрузка нужных файлов в целевой WP с привязкой к целевым объектам |
| Env, секреты, inventory | `/etc/ofisnye-dveri` на VDS | Отдельная настройка файлов окружения; `.example` в Git их не заменяет |
| Nginx, systemd, timers, runtime | Конфигурация и пакеты VDS | Отдельное инфраструктурное применение и проверки |
| Заказы, заявки, пользователи, рабочие остатки и история | Действующая production DB | Сохраняются в production; не заменяются состоянием Local/Staging |

**Один SHA подтверждает версию кода, но не равен состоянию DB, env или Nginx.** Для принятия шага нужны и SHA, и запись о выполненных настройках целевого окружения.

## 2. Быстрая матрица выбора

Одна задача может попадать в несколько строк: тогда выполняются все необходимые процедуры с учётом зависимостей раздела 4.

| Что изменилось за шаг | Что сделать на staging | Что сделать на production | Основной способ возврата |
| --- | --- | --- | --- |
| Только Markdown/инструкции, без runtime/config/data | Review и проверки документа | Сохранить в Git; app deploy не нужен | Исправить документ |
| React/TS/SCSS, BFF, package lock, Git assets | Combined release, проверка затронутой функции | Тот же принятый SHA через combined release | Предыдущий совместимый код, DB сохраняется |
| MU-PHP, REST contract, PHP ACF definitions | Combined release; PHP/REST/UI checks | Тот же SHA; заранее проверить совместимость с текущими данными | Согласованный откат WP + Next либо исправляющий release |
| Только SEO-текст, контент, ссылки или значения существующих ACF-полей | Проверить редакторский сценарий и результат REST/UI | Повторить согласованные изменения в нужных production-объектах | Предыдущие значения именно этих полей |
| Только настройки фильтров, PDP presentation, Registry/policies | Точечно настроить, проверить schema/readiness и UI | Повторить согласованный набор настроек; не импортировать весь staging manifest | Предыдущие изменённые настройки с проверкой актуальности |
| ACF-группа существует только в DB/admin | Подготовить и проверить перенос definitions отдельно от values | Применить конкретную группу/definitions, затем нужные values | Предыдущие definitions/values с учётом совместимости кода |
| Товары, категории, цены, media | Проверить процедуру на тестовых объектах | Адресно создать/обновить реальные объекты, сохраняя прочие данные | Адресное исправление/обратное изменение; без пересчёта старых заказов |
| `.env.example`, site URL, Woo keys, BFF secret | Настроить staging env и проверить новый build/runtime | Отдельно настроить production env и проверить; секреты разные | Сохранённый env + совместимый build; учесть отозванные ключи |
| Nginx/systemd/timers/deploy scripts/Node/PHP | Проверить инфраструктурную процедуру и её общий scope | Применить отдельно от code deploy, с проверкой обоих контуров | Сохранённая конфигурация/runtime по отдельному плану |
| WordPress core/Woo/ACF/сторонний plugin/theme | Отдельный upgrade и проверка возможных DB migrations | Отдельная операция с backup и известной совместимостью | Версия кода сама по себе может быть недостаточна после DB upgrade |
| Новые обязательные данные, переименование keys, изменение структуры DB | Проверить переход старый код → новые данные → новый код | Выполнить подготовленную миграцию по её плану, сохранив реальные данные | Адресная обратная migration или исправление вперёд |
| Изменение существующих заказов/клиентов/истории | Проверить на тестовых данных | Отдельная задача обработки production data с точным scope | Отдельный план, журнал изменений и адресное восстановление |
| Несколько типов одновременно | Принять весь набор: код + настройки + проверки | Воспроизвести согласованный порядок для production | Откатывать части по совместимости, а не заменой DB |

Под **combined release** понимается существующий `deploy-environment.sh`: Next.js и managed MU-code из одного SHA. Даже если изменён только frontend, штатный путь приложения остаётся combined release. Самостоятельный выбор файлов для ручного копирования на production не заменяет этот контракт.

Если менялись только данные в уже поддерживаемом кодом поле, новый Git commit и build обычно не нужны. Нужно проверить обновление кешей и фактический результат; при необходимости build того же SHA — отдельное техническое действие, а не перенос данных.

## 3. После каждой задачи: составить паспорт шага

До продвижения заполни короткую запись в задаче/эксплуатационном журнале. Для значимого шага её можно сохранить в Git без секретов и персональных данных. Это шаблон документа, не shell script:

```text
Задача / ожидаемое изменение поведения:
Типы изменений по матрице:
Исходная версия production code:
Целевой SHA из main (или «код не менялся»):
Изменённые файлы / новые файлы:

Данные WP:
  Какие сущности и поля затрагиваются:
  Как находим их в каждом окружении:
  Требуемое изменение, что сохраняем:
  Значения до изменения / где защищённый snapshot:
  Предусловия и действия при конфликте:

Env / инфраструктура / внешние плагины:
  Что применяем отдельно от app deploy:
  Какие службы/окружения затрагиваются:

Зависимости и порядок «до deploy / после deploy»:
Нужен ли отдельный переходный release / migration:
Backup и проверка восстановления:
Автоматические и ручные проверки:
План возврата без потери новых заказов:

Staging acceptance: SHA, изменения данных, дата, результат:
Production: release ID, настройки, дата, результат, наблюдение:
```

`git diff` показывает только часть результата задачи. Изменения через LocalWP admin и новые untracked files могут в него не попасть. На Windows для обзора файлов:

```powershell
Set-Location -LiteralPath 'E:\Practic\ofisnye-dveri-front'
git status --short
git diff --name-status
git diff --cached --name-status
```

Отдельно перечисли все действия в WP admin: создание/редактирование страниц, полей, Woo attributes/terms, Registry, policies, Navigation, upload media, настройку plugins. Не формулируй результат как «перенести всё, что отличается от Local».

### Как находить целевые объекты

| Объект | Как сопоставлять между окружениями |
| --- | --- |
| Товар | Проверенный уникальный SKU, затем целевой Woo product ID |
| Категория | Taxonomy + полный slug path с учётом родителей |
| Term атрибута | Taxonomy + slug; порядок и label проверяются отдельно |
| Семейство дверей | `door_family` slug с проверкой связанного каталога |
| Страница/статья/project | Post type + slug/path; проверить публикацию и назначение |
| Navigation | Проверенный slug нужного меню |
| ACF field | Стабильный field key, имя, тип и scope/location rules |
| Media | Загрузить/найти нужный файл в целевом WP; получить его attachment ID/URL |

WP IDs разных окружений могут различаться. Отсутствующий/неуникальный SKU, неоднозначный slug или другая структура категорий — причина остановить адресное изменение и уточнить mapping. Копировать numeric ID из staging как production ID нельзя.

## 4. Определить порядок кода и данных

### 4.1. Код поддерживает отсутствие новых значений

Обычный случай: добавлено необязательное SEO-поле, дополнительная характеристика или настройка с безопасным default/fallback.

1. Развернуть код через combined release.
2. Проверить прежние данные и прежнее поведение до заполнения нового поля.
3. Заполнить только согласованные значения в целевом WP.
4. Проверить REST, UI/SEO и существующие сценарии заказа.

**Добавление ACF definition не переносит значение, которое заполняли локально для теста.** Нужное production-значение задаётся отдельно; тестовые тексты не становятся рабочим контентом автоматически.

### 4.2. Новый build требует уже существующих данных

Если новый код не собирается/не работает без новой страницы, taxonomy, Registry entry или обязательного поля:

1. Проверить, что эти данные можно безопасно добавить при работающем старом production code и что оформление заказа в прежней версии продолжает работать.
2. Подготовить и адресно добавить необходимые данные, проверить их целевую идентичность и REST.
3. Выполнить combined release.
4. Пройти acceptance уже для нового кода с новыми данными.

Этот порядок допустим **только при совместимости со старым кодом**. Если старый PHP ещё не регистрирует нужное поле/API или старый frontend не понимает новые данные, сначала требуется совместимый переходный release.

В `deploy-environment.sh` нет универсального migration hook между установкой PHP, WP verifier и Next build. Нельзя рассчитывать, что оператор успеет нажать кнопку в admin посередине скрипта. Отдельный ручной WP-only deploy допустим лишь в специально разработанном плане перехода; он временно нарушает обычную SHA parity и не является стандартной процедурой.

### 4.3. Старый и новый контракты несовместимы

Для переименования meta keys, удаления полей, смены формата JSON или структуры отношений нужен отдельный переход:

1. Подготовить код, который сохраняет старый contract и умеет работать с новым представлением.
2. Выполнить контролируемое преобразование конкретных данных; проверить целостность и повторный запуск.
3. Переключить использование на новый contract после проверки.
4. Удалять прежнюю поддержку/данные только отдельным последующим решением, когда возврат к старому release уже не требуется.

Число releases определяется задачей. Нельзя удалять прежние order meta только потому, что новые заказы используют другой формат: старые реальные заказы должны оставаться читаемыми. При необходимости менять доменную модель сначала согласуется само изменение, а не только deploy-команды.

### 4.4. Смешанный шаг

Запиши явный порядок. Например: новые PHP/TS поддерживают пустое поле → combined release → значения в production admin → проверка кешей/SEO. Другой пример: старая версия уже допускает новую категорию → создать категорию → проверить mapping → release с новым маршрутом.

Порядок, доказанный на staging, повторяется на production с **production-объектами и значениями**. Acceptance staging не разрешает перезаписать текущий production content его копией.

## 5. Если менялся код приложения

### 5.1. Local: проверки и Git

Для frontend/BFF/TS/config/dependencies выполни `npm run lint`, `npm run typecheck`, `npm run build`; для изменённого PHP — `php -l` нужных файлов подходящим PHP runtime. Проверяй необходимые REST contracts и реальный пользовательский сценарий. Для одних Markdown-файлов проверь ссылки/примеры; runtime build ради неизменённого приложения не требуется.

После review/commit/merge/push зафиксируй полный SHA из `main`. Этот документ не является командой сделать commit или deploy сейчас. В production продвигается SHA, который реально принят на staging, даже если вершина `origin/main` уже ушла вперёд.

### 5.2. VDS: контекст выполнения и выбор SHA

Серверные команды далее — **Bash от root через SSH** (`sudo -i`, если вошёл другим администратором). Они предназначены для выполнения при конкретном release, не запускаются из Windows PowerShell. Права root нужны combined orchestrator; Next build он сам запускает от `deploy`.

Для обычного code release сначала:

```bash
REPOSITORY_DIR=/srv/ofisnye-dveri/repository
DEPLOY_SCRIPTS="$REPOSITORY_DIR/deploy/scripts"
read -r -p 'Полный согласованный Git SHA: ' RELEASE_SHA
[[ "$RELEASE_SHA" =~ ^[0-9a-f]{40}$ ]] || { echo 'STOP: нужен полный Git SHA'; exit 1; }
runuser -u deploy -- git -C "$REPOSITORY_DIR" fetch --prune origin
runuser -u deploy -- git -C "$REPOSITORY_DIR" cat-file -e "$RELEASE_SHA^{commit}"
runuser -u deploy -- git -C "$REPOSITORY_DIR" merge-base --is-ancestor "$RELEASE_SHA" origin/main
runuser -u deploy -- git -C "$REPOSITORY_DIR" status --short
runuser -u deploy -- git -C "$REPOSITORY_DIR" show --stat --oneline "$RELEASE_SHA"
```

При ошибке или неожиданных локальных изменениях canonical checkout остановись. Не применяй `reset --hard`/принудительный checkout для их удаления.

Проверь также **всю разницу между действующим production и целевым release**, а не только последний commit задачи:

```bash
BASELINE_PRODUCTION_RELEASE="$(readlink -f /srv/ofisnye-dveri/production/current)"
test -f "$BASELINE_PRODUCTION_RELEASE/.release.env"
BASELINE_PRODUCTION_SHA="$(sed -n 's/^GIT_COMMIT=//p' "$BASELINE_PRODUCTION_RELEASE/.release.env" | head -1)"
[[ "$BASELINE_PRODUCTION_SHA" =~ ^[0-9a-f]{40}$ ]] || { echo 'STOP: не определён действующий production SHA'; exit 1; }
runuser -u deploy -- git -C "$REPOSITORY_DIR" diff --name-status "$BASELINE_PRODUCTION_SHA" "$RELEASE_SHA"
runuser -u deploy -- git -C "$REPOSITORY_DIR" log --oneline "$BASELINE_PRODUCTION_SHA..$RELEASE_SHA"
```

Если production пропустил несколько шагов, в release войдут и их изменения/зависимости. Они тоже должны быть приняты на staging и отражены в плане. При release не поверх текущей линии истории, например возврате на старую ветку, отдельно разбери совместимость; одного успешного Git diff недостаточно.

Скрипты исполняются из canonical checkout, а файлы приложения берутся из выбранного SHA через `git archive`. Поэтому версия операционных скриптов должна быть отдельно проверена. Если задача меняет `deploy/scripts`, см. раздел 10 **до изменения общего checkout**. Не заменяй проверку процедуры безусловным `git pull` до последнего HEAD.

Для этого обычного пути предполагаются уже установленные, совместимые с release операционные скрипты. Если их нужно обновить, это дополнительная инфраструктурная часть шага.

### 5.3. Staging: backup, предусловия, release

```bash
bash "$DEPLOY_SCRIPTS/check-environment-inventory.sh" /etc/ofisnye-dveri/staging-inventory.env
bash "$DEPLOY_SCRIPTS/check-host.sh" /etc/ofisnye-dveri/staging-inventory.env
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-backup.env local
```

Запиши путь **только что успешно завершившегося** backup. Не продолжай при ошибке backup/restore-test. Выполни действия «до deploy» из паспорта шага, если они нужны и совместимы со старым кодом.

```bash
bash "$DEPLOY_SCRIPTS/deploy-environment.sh" staging "$RELEASE_SHA" /etc/ofisnye-dveri/staging-inventory.env
```

Для закрытого staging скрипт запросит Basic Auth `user:password` скрытым вводом. Не передавай credentials обычной строкой с паролем в shell history. Не используй `SKIP_EXTERNAL_SMOKE=true` для обычного release.

После успеха выполни действия «после deploy», затем:

```bash
bash "$DEPLOY_SCRIPTS/verify-wordpress-environment.sh" /etc/ofisnye-dveri/staging-inventory.env
bash "$DEPLOY_SCRIPTS/healthcheck.sh" http://127.0.0.1:3001/api/health staging
```

Если затронуты конфигурации дверей/Registry/policies, дополнительно:

```bash
bash "$DEPLOY_SCRIPTS/verify-door-configuration-readiness.sh" /etc/ofisnye-dveri/staging-inventory.env true
```

`true` требует выключенных fallback modes и валидных опубликованных дверей. При провале выясни причину, а не переключай fallback ради зелёной проверки. WP code-contract verifier сам по себе не является strict readiness.

Пройди ручную acceptance задачи и регрессии раздела 12. Сохрани значение `RELEASE_SHA` как полный принятый `APPROVED_SHA`, выполненные data/config actions и результат. Если после этого менялся код или значимая настройка, повтори затронутые проверки и обнови acceptance.

### 5.4. Production: тот же SHA и текущая production DB

При новой SSH-сессии повторно задай `REPOSITORY_DIR`/`DEPLOY_SCRIPTS`, введи **принятый staging SHA**, выполни проверку Git из 5.2. Перед production не заменяй его новым `origin/main`.

```bash
bash "$DEPLOY_SCRIPTS/check-environment-inventory.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/check-host.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/backup-wordpress.sh" /etc/ofisnye-dveri/wordpress-production-backup.env
bash "$DEPLOY_SCRIPTS/verify-backup-restore.sh" /etc/ofisnye-dveri/wordpress-production-backup.env local
```

Этот backup создаётся из **нынешнего production**, не доставляется со staging. Offsite restore-test выполняется по принятому operational cycle и перед операциями, для которых он предусмотрен планом. Проверка `local` импортирует данные в отдельную restore-test DB, не в рабочую DB. WordPress backup не включает `/etc/ofisnye-dveri`, active Nginx/systemd configs, все секреты и весь VDS: для env/инфраструктурной части отдельно сохрани нужные действующие файлы в защищённом месте.

Сверь текущие production-значения с предусловиями паспорта. Если с момента staging acceptance продавец/редактор изменил нужный товар/поле, разреши конфликт до записи. Выполни только согласованные действия «до deploy».

```bash
bash "$DEPLOY_SCRIPTS/deploy-environment.sh" production "$RELEASE_SHA" /etc/ofisnye-dveri/production-inventory.env
```

Обычный release не меняет режим публикации: **сохраняй фактический** `SITE_INDEXING_ENABLED` production и его Nginx mode. В публичном production не включаются повторно Basic Auth/noindex; если production ещё prelaunch, он остаётся закрытым. Наличие реальных данных в DB само по себе не говорит, какой из этих режимов сейчас используется.

После deploy — адресные действия «после deploy», проверки задачи и:

```bash
bash "$DEPLOY_SCRIPTS/verify-wordpress-environment.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/healthcheck.sh" http://127.0.0.1:3000/api/health production
bash "$DEPLOY_SCRIPTS/verify-wordpress-origin.sh" /etc/ofisnye-dveri/production-inventory.env
bash "$DEPLOY_SCRIPTS/record-production-state.sh" /etc/ofisnye-dveri/production-inventory.env
```

При изменениях дверной конфигурации повтори strict readiness с production inventory. Если данные менялись уже после combined smoke, повтори затронутые проверки storefront: ранний smoke не подтверждает более позднюю запись в DB.

Combined deploy устанавливает managed MU-code, проверяет WP contract, собирает Next, переключает release, проверяет SHA parity и внешний smoke. Он **не импортирует DB, не переносит uploads, не устанавливает серверные `.example`, не запускает универсальную migration и не создаёт полный DB backup автоматически**. При этом новый PHP/plugin может выполнять записи через свои hooks: отсутствие SQL import не доказывает отсутствие любых DB writes. Их нужно учитывать при review кода шага.

## 6. Если менялись только значения, контент или media

Новый code release для поддерживаемых существующим кодом значений обычно не нужен.

1. Определи согласованное редакторское изменение и точные production-объекты. Значения Local/Staging часто тестовые; переносится требуемый результат задачи, не всё состояние редактора.
2. На staging проверь способ изменения и поведение. Для нового production-контента используй его реальные значения и URL.
3. Сохрани прежние значения затрагиваемых полей/статусов/связей. Перед массовыми изменениями и controlled migrations создай свежий production backup и restore-test; для небольшой редакторской правки используй доступную историю/точный snapshot и проверь действующие backup. Не считай WP revisions универсальной копией ACF/options/Woo meta.
4. Непосредственно перед записью перечитай текущее значение. Если оно изменилось другим оператором, останови перезапись и согласуй актуальный результат.
5. Запиши только нужные поля через WP/Woo admin или подготовленный API/migration. Учитывай, что форма admin может сохранять несколько полей сразу; не отправляй давно открытую форму поверх более свежих правок.
6. Проверь REST и отрендеренный результат, затем запиши итог. Смена Git SHA при этом не обязательна; укажи действующий code SHA и факт отдельного изменения данных.

Примеры:

- **SEO title/description/OG/Canonical:** редактируется конкретная production-сущность. Отсутствующий Canonical обычно оставляет автоматическую логику; заполненный вручную требует проверки целевой страницы. Глобальный режим индексации release не переключает.
- **Порядок/видимость атрибутов PDP:** меняются только нужные настройки production Registry. Label атрибута проверяется в Woo, а не подменяется импортированным label другого окружения.
- **Новая картинка hero:** Git asset из `public` требует build; WP media требует загрузки attachment в production и целевой привязки. Не переносится весь каталог uploads со staging.
- **Новая цена/остаток товара:** меняется текущий production-товар через Woo. Исторические суммы заказов не пересчитываются; взаимодействие со складами/интеграциями проверяется отдельно.

Страницы, продукты, menu, SEO и sitemap могут обновляться через разные кеши. Сначала проверь свежий REST целевого WP, затем HTML/UI, robots/sitemap при необходимости. Учитывай существующий TTL/ISR; автоматическая немедленная инвалидация при каждом WP save не гарантируется. Не удаляй все server caches и не рестартуй MySQL/PHP наугад. Если принято пересобрать тот же SHA, это выполняется обычным release-путём.

## 7. ACF definitions и Door Configuration manifest

### 7.1. Не путать definition и value

Если поле зарегистрировано PHP в managed MU-plugin, definition продвигается с кодом. Его value, attachment ID и связанные `_field_name` reference meta находятся в DB конкретного WP.

Если группа создана только в ACF admin, сначала установи, где её authoritative definition. Экспорт одной согласованной группы или перенос definitions в PHP/JSON — отдельная часть задачи, а не автоматически установленная способность deploy. Не создавай дубль группы с другими field keys только потому, что её нет среди файлов repository. Проверь location rules, types, REST exposure и доступность прежних values.

Для программной записи ACF используй проверенный механизм ACF нужной версии, корректные field keys и формат значения. Сырые SQL-записи в postmeta, особенно для новых полей, serialized arrays, relationships и image IDs, не являются универсальным способом продвижения.

### 7.2. В проекте уже есть Export / Import Door Configuration

В [door-product-configuration.php](../../wordpress/mu-plugins/door-product-configuration.php) существует admin-страница **Товары → Конфигурация дверей → Export / Import**. Export использует taxonomy, category paths, family slugs и SKU для переносимых ссылок. REST `GET /wp-json/od/v1/door-configuration/manifest` требует права `manage_woocommerce`; это не открытый endpoint и не команда импорта.

**Import является записью, а не dry-run и не частичным patch.** В текущем `import_manifest()`:

- проверяются schema version, целевые сущности и ссылки;
- записываются Attribute Registry, Option Registry и fallback modes;
- вызывается очистка хранилища policies, затем восстанавливаются policies из переданного manifest;
- выполняется итоговая проверка; при обнаруженных variant errors код пытается вернуть сохранённое состояние.

Следовательно, **усечённый manifest тоже опасен**: отсутствующие policies не означают «оставить как было». Полный manifest Local/Staging может заменить реальные production-настройки или убрать production policies, которых не было в источнике. Внутренняя проверка/возврат при части ошибок не заменяют backup и не обеспечивают защиту от всех сбоев/конкурентных правок.

Для изменения одного параметра выбирай точечную admin-настройку или специально подготовленную migration. Если задача действительно требует manifest import:

1. Зафиксируй текущий **целевой production export** и свежий backup.
2. Составь отдельный проверяемый документ: какие registry entries/policies должны измениться, какие сохраняются; сравни все разделы manifest, не только нужный фрагмент.
3. Сформируй полный согласованный target manifest на основе актуального целевого состояния. Не удаляй из JSON «лишние» production policies ради компактности.
4. Проверь существование и уникальность переносимых ссылок. Import не заменяет предварительное создание нужных Woo entities.
5. Протестируй процедуру на staging, включая production-подобные policies, отсутствующие в исходном Local. Не переноси для этого реальные клиентские данные без отдельной подготовки.
6. На время операции исключи конкурентное редактирование соответствующей конфигурации; при необходимости предусмотрите окно для затрагиваемого оформления заказа. Повтори сверку target export перед записью.
7. Импортируй только принятый manifest и пройди strict readiness, REST, каталог/SEO/PDP/checkout checks. Сохрани результат и план адресного возврата.

Автоматического Git → DB sync всех Registry/ACF/контентных значений в combined deploy нет. Этот существующий manifest относится к конфигурации дверей, не является полным WordPress backup и не переносит заказы.

## 8. Если нужна migration данных или структуры DB

Migration — отдельный проверяемый артефакт/план конкретной задачи. Текущий общий orchestrator не является универсальным migration runner. Не придумывай для него несуществующие `--migrate`, `--dry-run` или `--rollback-db`.

Для production migration до её выполнения должны быть определены:

| Условие | Что требуется |
| --- | --- |
| Scope | Точные объекты, поля/options/tables и ожидаемое количество затронутых записей |
| Identity | Mapping SKU/slug/path → реальные target IDs; никаких local IDs в качестве production IDs |
| Предусловия | Ожидаемая версия кода/схемы и текущее значение/состояние |
| Предпросмотр | Реальный read-only план или поддерживаемый самой migration dry-run; название режима не придумывается |
| Повторный запуск | Идемпотентность либо явный отказ при уже выполненной операции; нет дублей |
| Конкуренция | Обработка записи заказов/редактирования во время migration, зависших jobs и повторов |
| Сохранность | Не затрагиваются другие поля, старые order records и новые данные, появившиеся после backup |
| Backup | Production backup, его конкретный путь и успешная проверка восстановления; отдельный snapshot меняемых значений |
| Применение | Известная команда/API/admin-процедура, контекст пользователя, транзакции/блокировки при необходимости |
| Проверка | Invariants и точечные сравнения после записи; не только exit code |
| Возврат | Проверенная адресная обратная операция либо исправление вперёд; учёт новых записей |

Предпочитай WP/Woo APIs, когда они нужны для hooks, индексов и согласованности связанных таблиц. Структурные SQL-изменения требуют собственного плана с учётом времени блокировок; нельзя обещать нулевую остановку записи без проверки.

Не переносить в production целиком `options`, `posts`, `postmeta`, user/order tables или «все таблицы кроме заказов»: связи, настройки и записи Woo могут находиться в разных местах. Фактическое HPOS/legacy storage и другие параметры определяются на целевом Woo, а не выводятся из названия таблицы или состояния Local.

Если migration касается заказов/клиентов/платежей, это прямо указывается в scope и требует отдельного согласованного сценария. Выполненная локальная fixture-проверка не является готовой production migration.

## 9. Если менялись env, ключи или режим сайта

Изменение Git `.env.example` само по себе не меняет `/etc/ofisnye-dveri/staging.env` и `/etc/ofisnye-dveri/production.env`.

1. Выпиши новые/изменённые имена переменных и смысл, без секретов в паспорте.
2. Подготовь разные реальные значения для окружений; сохрани предыдущий env в защищённом месте. Не копируй весь staging env в production.
3. Проверь потребление переменной кодом: build time, runtime или оба. `NEXT_PUBLIC_*` и настройки, участвующие в статическом rendering, требуют нового build. При отсутствии доказанной runtime-only схемы используй новый build нужного SHA.
4. Валидируй env и функциональный сценарий. Если настройка нужна build, внеси её до release; если это включение несовместимой функции, соблюдай порядок раздела 4.
5. Зафиксируй изменение отдельно от code SHA; при возврате учитывай и env, и build, и доступность прежних credentials.

Пример **только проверки** production env в отдельном subshell от root:

```bash
(
  set -a
  source /etc/ofisnye-dveri/production.env
  set +a
  /usr/local/bin/node /srv/ofisnye-dveri/repository/scripts/validate-deploy-env.mjs
)
```

Он не выводит env и не доказывает работоспособность Woo keys. Это подтверждается REST и нужным BFF-сценарием.

При ротации Woo keys сначала подготовь новые production credentials и проверь переключение всех потребителей; старые отзыви в согласованный момент. Возврат старого env не оживляет уже отозванный ключ. Не публикуй `WC_*`, `BFF_SECURITY_SECRET`, restic passwords или Basic Auth в Git/отчёте.

`SITE_INDEXING_ENABLED` и Nginx public/prelaunch mode не переключаются вместе с обычной задачей. Если задача **явно** состоит в открытии сайта, используй отдельный launch-раздел [первого запуска VDS](vds-from-scratch-to-production.md): build, барьер Nginx, внешний smoke и план возврата. Он не даёт основания повторять DB bootstrap/import на действующем production.

`NEXT_IMMUTABLE_RELEASE_RUNTIME=true` задаёт deploy в `.release.env`; его не переносят в постоянный build env. TLS verification на VDS не отключают.

## 10. Если менялись инфраструктура или deploy-механизм

### Что app deploy не устанавливает

`deploy/nginx/*.example`, `deploy/systemd/*.example`, sudoers, backup/restic configs, inventory и системные runtime требуют отдельного применения. Файл в Git и активный файл `/etc/...` — разные состояния. Наличие шаблона не доказывает, что он установлен на VDS.

Для каждого изменённого файла укажи: активный target path, текущий diff, backup активной версии, способ применения, проверку до reload/restart, ожидаемое влияние и возврат. Не копируй весь `deploy/` в `/etc` и не перезаписывай заполненные env/inventory новым `.example`.

| Изменение | До активации | После активации |
| --- | --- | --- |
| Nginx | Сохранить active config; посмотреть diff; `nginx -t` | Контролируемый reload, внешний smoke и WP origin проверки |
| systemd service/timer | Сохранить active unit/drop-ins; проверить paths, user, env и writable scope | `daemon-reload`; restart нужной службы или применение timer; status/journal/health |
| sudoers | Проверить точный разрешённый scope и `visudo -cf` файла | Проверить нужные команды от `deploy`; не расширять до общего root shell |
| Backup/restic | Сохранить config/секреты; проверить разделение DB/repositories и retention | Новый backup, isolated restore-test и фактические timers/logs |
| Node/PHP/MySQL | Проверить совместимость, версии, ресурсы, зависимости и scope обоих контуров | Соответствующие рестарты/сборки и проверки staging **и** production |
| Deploy shell scripts | Review, `bash -n`, проверка сценария без влияния на рабочие jobs | Проверить сам release/rollback и службы, вызывающие эти scripts |

### Общий canonical checkout влияет на оба окружения

`/srv/ofisnye-dveri/repository` — один checkout. Backup, restore-test и maintenance units вызывают scripts по путям этого checkout; deploy/health/rollback scripts тоже не являются отдельной установленной копией для каждого application release. Production cron отдельно вызывает установленный `/usr/local/bin/wp` с production WP path; его active unit меняется при установке конфигурации, а не от правки `.example` в Git.

Поэтому checkout нового commit со сменой `deploy/scripts` может изменить следующий запуск production backup **до app deploy production**. Переключение Git обратно тоже влияет на общие scripts. Нельзя обещать изоляцию такого изменения только потому, что первый аргумент команды deploy — `staging`.

Для инфраструктурного шага заранее выбери и проверь безопасный способ испытания: отдельный каталог/стенд с корректными test paths либо согласованное применение общего operational code. Если скрипт имеет жёсткие production paths или его невозможно проверить изолированно, остановись и согласуй влияние на работающие службы до его активации. Не отключай без плана все production backup timers ради теста.

После изменения общего Nginx snippet, systemd template, Node/PHP или операционных scripts повтори проверки **обоих** окружений. App SHA parity не подтверждает версию всех активных `/etc` файлов и общего checkout.

## 11. Если менялись WP core, Woo, ACF или сторонние plugins/themes

Managed MU-code deploy не обновляет WordPress core, весь `wp-content/plugins`, themes и внешние PHP dependencies. Изменённый/добавленный файл в поддиректории `wordpress/mu-plugins` также не устанавливается текущим механизмом автоматически: он выбирает верхнеуровневые `*.php`. Если новый MU-plugin требует include-файлы, это отдельное изменение deployment contract, которое нужно решить до выпуска.

Для обновления WP/Woo/ACF/plugin:

1. Зафиксируй исходные/целевые версии, источник пакета и причины обновления.
2. Проверь на staging совместимость REST/BFF/domain contract, media, cron и checkout, а также наличие vendor DB upgrade.
3. Для production подготовь fresh backup и restore-test, исходные файлы и план перехода DB. Проверь реальные активные plugins, HPOS и очередь задач.
4. Примени upgrade выбранным проверенным способом с учётом permissions. Не делай весь WP root writable ради кнопки обновления.
5. Выполни нужные vendor migration/cron шаги по их процедуре и проверь реальные рабочие сценарии.

Возврат старых plugin-файлов после DB upgrade может быть несовместим. Не считай `rollback-release.sh` откатом WooCommerce/ACF или их DB migrations. Если изменяются внешние интеграции, проверь production-only credentials и исключи отправку тестовых уведомлений/платежей.

## 12. Какие проверки нужны по итогам шага

Проверки выбираются по затронутому поведению и зависимостям. Успешный `build` не заменяет нужные данные; зелёный health не доказывает правильность заказа.

| Затронуто | Обязательная предметная проверка |
| --- | --- |
| Layout/style/assets | Изменённые desktop/mobile страницы, media, ссылки, console errors |
| PHP/REST/ACF definitions | Нужные поля/schema/типы, fallback, пустые и существующие values, фактические REST-ответы |
| Каталог/фильтры/Registry | Выдача и counts, terms, routes, SEO landing, readiness, отсутствие лишнего noindex/Canonical |
| PDP/options/accessories/prices | Варианты, цена сервера, валидность конфигурации, корзина, переданные order meta |
| Checkout/BFF/idempotency | Валидная и ошибочная заявка, повтор того же запроса с тем же key без дубля, правильный target Woo |
| Панели | Выбор панели и создание проектной заявки, данные в правильном окружении |
| SEO/content | Title/description/OG/Twitter, canonical target, `seo_noindex`, robots/sitemap, отсутствие Local/Staging URLs в production |
| Env/infra/versions | Health, нужный внешний smoke, TLS, active services/timers, журналы, проверка обоих контуров при shared change |
| Data migration | Предусловия/постусловия и точные изменённые объекты; существующие реальные записи не повреждены |

На staging тестовые заказы и fixtures допустимы в рамках задачи. **Production-проверки с записью выполняй только по согласованному сценарию**: известный тестовый объект/маркер, отсутствие неожиданных платежей и отправок, адресная обработка результата. Локальные mutating test scripts, seed и SEO roundtrip fixtures не запускаются на production как универсальная проверка.

Существующие реальные заказы проверяй чтением по известным ID и invariant-полям. Общий count заказов может расти во время release; равенство count «до/после» не является требованием сохранности работающего магазина. Не меняй реальные заказы ради smoke и не удаляй тестовые данные массовым SQL.

Для внешнего smoke после отдельной data/config операции выбери **фактический** режим:

Публичный production, без сохранённых Basic Auth credentials:

```bash
unset CURL_USER CURL_RESOLVE SKIP_EXTERNAL_SMOKE
bash /srv/ofisnye-dveri/repository/deploy/scripts/smoke-test.sh https://ofisnyedveri.ru production '' true
```

Закрытый staging:

```bash
read -r -s -p 'Staging Basic Auth user:password: ' CURL_USER
printf '\n'
export CURL_USER
bash /srv/ofisnye-dveri/repository/deploy/scripts/smoke-test.sh https://staging.ofisnyedveri.ru staging '' false
unset CURL_USER
```

Для production prelaunch используется production URL, `production` и ожидаемое `false` с его собственным Basic Auth. Не применяй публичный smoke и не меняй режим, чтобы подогнать его под пример. Разовый smoke должен идти к реальному домену VDS; `CURL_RESOLVE` нужен лишь для отдельно предусмотренного DNS-сценария.

Если менялся REST contract, обнови соответствующую документацию/inventory и обозначь, какие примеры сняты с реального окружения и когда. Нельзя выдавать старый JSON snapshot за подтверждение нового состояния.

## 13. Как возвращаться после неудачного шага, сохранив реальные данные

### Ошибка только в коде

До release запиши предыдущие Next release ID, Git SHA и WP code state. Используй сохранённый **совместимый** код через project scripts; проверь WP/Next parity, REST, health и внешний smoke. Combined orchestrator при ошибке пытается откатить компоненты, но успешность возврата нужно подтвердить. Компонентные locks не превращают все действия release в единую транзакцию.

Если данные уже изменились и старый код их не понимает, безусловный code rollback может усугубить проблему. Выбери совместимую версию или исправляющий release. Runtime env/Nginx/сторонние plugins не возвращаются автоматически вместе с `current`.

### Ошибка в отдельных настройках или контенте

Верни **только затронутые поля/связи** по snapshot, когда текущее значение всё ещё соответствует записанному этим шагом. Если после шага их уже менял редактор или интеграция, сначала разреши конфликт; не перезаписывай новые правки старым snapshot.

Не восстанавливай всю строку `options` с большим JSON/serialized registry ради одного ключа без проверки других изменений внутри неё. Для Door Configuration не считай partial manifest адресной обратной операцией: его import заменяет набор policies, как описано в разделе 7.

### Ошибка env/инфраструктуры

Верни соответствующий active config/доступный secret и совместимый build, проверь конфигурацию до reload/restart. Учитывай, что отозванные ключи, сменённый runtime и shared scripts могут влиять на оба окружения. Проверяй фактический режим индексации и внешнюю доступность, не только статус systemd.

### Повреждение данных

**Наличие production backup не означает, что его можно просто импортировать поверх текущего production.** После момента backup могли появиться реальные заказы, новые пользователи, оплаты, остатки, заявки и контент. Полный restore вернёт и их состояние назад.

Сначала останови дальнейшее повреждение в нужном scope, сохрани текущее состояние и журнал операций, определи повреждённые объекты и более новые реальные данные. Предпочтение — адресное восстановление из production backup или исправляющая migration с сохранением новых записей.

Полное восстановление рабочей DB — отдельное решение по инциденту: окно остановки записи и фоновых jobs, выбранная production-копия, план сохранения/восстановления более новых данных и проверка после запуска. **Local/Staging dump никогда не используется как замена боевой DB.** Даже production backup нельзя выбирать без учёта момента его создания и последующих записей.

`verify-backup-restore.sh` — тест отдельной restore-test DB, не live restore и не DB rollback. Готовой общей команды live restore в текущих deploy scripts нет. Подробности — [операционный справочник](deployment-operations.md).

В старых feature-specific runbooks упоминание «восстановить DB из backup» не является разрешением на полный restore работающего production после каждого изменения Registry. При реальных данных применяется этот порядок: адресное исправление, проверка конфликтов, сохранение новых записей; полный restore — только по отдельному incident plan.

## 14. Когда шаг действительно продвинут

Шаг завершён, когда зафиксированы:

- принятый SHA кода или факт, что он не менялся;
- адресные data/config/infra actions, применённые именно в нужном окружении;
- сохранность реальных production-данных и отсутствие переноса Local/Staging DB;
- успешные проверки нужного contract и пользовательских сценариев, включая кешируемый результат;
- фактические release ID, WP/Next parity, штатный режим индексации;
- backup/snapshot, понятный способ возврата и результаты наблюдения после изменения.

Рабочий production content не обязан побайтно совпадать со staging. Должны совпасть принятый код, требуемый contract и согласованные настройки задачи; реальные цены/остатки/заказы/контент определяются самим production.

### Примеры решения для конкретной задачи

| Результат задачи | Правильное продвижение |
| --- | --- |
| Исправлены отступы карточки | Проверки frontend → combined staging → acceptance → тот же SHA production; DB сохраняется |
| Добавлены PHP SEO fields и TS mapping | Combined release → проверить доступность и fallback → адресно заполнить нужные production SEO values, если они входят в задачу |
| В admin поменяли SEO title без изменения кода | Проверить значение/результат → изменить нужную production-сущность → учесть кеш; без DB import и обязательного нового commit |
| Локально настроили четыре PDP presentation параметра | Если поддержка кода уже есть — адресно повторить нужные параметры Registry; если код новый — сначала совместимый release; полный manifest не импортируется |
| Добавлена обязательная новая категория для build | Проверить совместимость со старым кодом → создать нужную category в target → проверить mapping → release; при несовместимости нужен переход |
| Изменён env example | Заполнить реальные env каждого окружения отдельно → validation → нужный build/runtime update → функциональная проверка |
| Изменён backup shell script | Отдельно проверить shared operational code: общий checkout затрагивает production backup до app deploy; проверить backup/restore-test и timers обоих контуров |
| Удалён старый формат order meta | Не выполнять как обычный cleanup; сначала обеспечить чтение реальной истории и согласовать migration/совместимость |

Связанные инструкции:

- [Операции deploy, backup, restore-test и rollback](deployment-operations.md).
- [Текущий deploy contract](../README.md).
- [Local → Staging без DB transfer](local-to-staging-no-db.md).
- [Staging → Production без DB transfer](local-to-production-no-db.md).
- [WP-driven SEO](wp-driven-seo-metadata.md).
- [Полный первый запуск VDS](vds-from-scratch-to-production.md) — только bootstrap нового окружения; не повторять DB import на действующем production.
