param(
    [string]$OutputPath = 'deploy/docs/rest-api-contracts.md'
)
$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$outputFull = [IO.Path]::GetFullPath($OutputPath)
if (-not [IO.File]::Exists($outputFull)) { throw 'Нужен существующий REST API Markdown со списком запросов.' }
$source = [IO.File]::ReadAllText($outputFull, [Text.Encoding]::UTF8)
$seed = [Collections.Generic.List[string]]::new()
foreach ($match in [regex]::Matches($source, '(?m)^### \d{2}\. GET (?<path>/wp-json/\S+)\r?$')) {
    $path = $match.Groups['path'].Value
    if (-not $seed.Contains($path)) { $seed.Add($path) }
}
if ($seed.Count -lt 29) { throw "В Markdown найдено лишь $($seed.Count) запросов WP и Woo." }
$extra = @(
    '/wp-json/wp/v2/pages?slug=glavnaya&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=o-nas&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=kontakty&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=zamery&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=oplata&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=dostavka&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=ustanovka&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=podryadchikam&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=arkhitektoram&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=uhod-i-obsluzhivanie&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=garantiya&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=stenovye-paneli&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=novosti-i-stati&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/pages?slug=portfolio&status=publish&_embed=wp:featuredmedia',
    '/wp-json/wp/v2/posts?per_page=20&status=publish&orderby=date&order=desc&_embed=wp:featuredmedia,wp:term',
    '/wp-json/wp/v2/portfolio_project?per_page=20&status=publish&orderby=date&order=desc&_embed=wp:featuredmedia,wp:term',
    '/wp-json/od/v1/door-seo-landings',
    '/wp-json/od/v1/door-seo-landings/877/products',
    '/wp-json/od/v1/door-catalog-products?base_category_id=77&tsvet-dveri=72',
    '/wp-json/od/v1/door-product-configuration/265',
    '/wp-json/od/v1/door-product-configuration/264',
    '/wp-json/od/v1/door-product-configuration/263',
    '/wp-json/od/v1/door-product-configuration/262',
    '/wp-json/od/v1/door-product-configuration/261',
    '/wp-json/wc/v3/products/265',
    '/wp-json/wc/v3/products/264',
    '/wp-json/wc/v3/products/263',
    '/wp-json/wc/v3/products/262',
    '/wp-json/wc/v3/products/261',
    '/wp-json/wc/v3/products/106',
    '/wp-json/wc/v3/products/288',
    '/wp-json/wc/v3/products?status=publish&category=18&per_page=24&page=1&orderby=date&order=desc',
    '/wp-json/wc/v3/products?status=publish&include=288,695,696,726,727,728&per_page=6&page=1',
    '/wp-json/wc/v3/products?status=publish&include=270,274,275,276,278,280,913,914,925&per_page=9&page=1',
    '/wp-json/wc/v3/products?status=publish&slug=stenovaya-panel-dka01-hpl-sinyaya&per_page=20&page=1'
)
foreach ($path in $extra) { if (-not $seed.Contains($path)) { $seed.Add($path) } }
$envPath = Join-Path $root '.env.local'
$envValues = @{}
foreach ($line in [IO.File]::ReadAllLines($envPath, [Text.Encoding]::UTF8)) {
    if ($line -match '^(WC_CONSUMER_KEY|WC_CONSUMER_SECRET)=(.*)$') {
        $envValues[$Matches[1]] = $Matches[2].Trim().Trim('"').Trim("'")
    }
}
if (-not $envValues.WC_CONSUMER_KEY -or -not $envValues.WC_CONSUMER_SECRET) {
    throw 'В .env.local нет локальных ключей Woo для GET.'
}
$basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(
    [string]::Concat($envValues.WC_CONSUMER_KEY, ':', $envValues.WC_CONSUMER_SECRET)
))
$outputFull = [IO.Path]::GetFullPath($OutputPath)
$old = if ([IO.File]::Exists($outputFull)) { [IO.File]::ReadAllText($outputFull) } else { '' }
$bffStart = $old.IndexOf('## Next.js BFF', [StringComparison]::Ordinal)
if ($bffStart -lt 0) { $bffStart = $old.IndexOf('## 3. Next.js BFF', [StringComparison]::Ordinal) }
$bff = if ($bffStart -ge 0) { $old.Substring($bffStart).Replace('## Next.js BFF', '## 3. Next.js BFF') } else { '' }
$builder = [Text.StringBuilder]::new()
function AddLine([string]$value = '') { [void]$script:builder.AppendLine($value) }
AddLine '# REST API проекта: полные запросы и ответы'
AddLine
AddLine 'Этот файл предназначен для обсуждения архитектуры с ChatGPT без доступа к Codex и репозиторию. Ответы GET получены заново с локального WordPress и WooCommerce, а не скопированы из прежнего примера.'
AddLine
AddLine ([string]::Concat('Источник: https://ofisnye-dveri.test. Дата снимка: ', (Get-Date -Format 'dd.MM.yyyy'), '. Значения ID, цены и контент относятся к этому окружению. JSON сохраняется целиком, без удаления полей и элементов массивов. Не публикуйте файл, если контент локальной базы содержит непубличные данные.'))
AddLine
AddLine 'Запросы охватывают все REST-маршруты, вызываемые текущим кодом витрины, и варианты параметров для каталога, страниц, контента и конфигурации двери. Это конечный набор репрезентативных вызовов: бесконечные комбинации фильтров и ID перечислять невозможно.'
AddLine
AddLine 'Правило обновления: после шага, меняющего REST-ответ, повторить нужный GET и заменить соответствующий блок, указав дату. Для полной пересборки запустить: pwsh -NoProfile -File scripts/generate-rest-api-corpus.ps1. Ключи Woo остаются в .env.local и в документ не записываются.'
AddLine
AddLine '## 1. Карта маршрутов'
AddLine
AddLine '| Группа | Назначение | Авторизация |'
AddLine '| --- | --- | --- |'
AddLine '| wp/v2 | Страницы, меню, медиа, статьи, портфолио | Публичные GET |'
AddLine '| wc/v3 | Категории и товары | Серверные ключи Woo; в примерах скрыты |'
AddLine '| od/v1 | Схема двери, конфигурация, фильтры и SEO-подборки | Публичные GET; manifest требует права администратора |'
AddLine '| Next.js /api | Каталог, health, оформление заказа и заявка на панели | Сведения по коду ниже; POST создаёт заказ |'
AddLine
AddLine '## 2. Реальные ответы local WP и Woo'
$index = 0
$success = 0
foreach ($path in $seed) {
    $index++
    $url = [string]::Concat('https://ofisnye-dveri.test', $path)
    $tempBody = [IO.Path]::GetTempFileName()
    $tempHeaders = [IO.Path]::GetTempFileName()
    try {
        $args = [Collections.Generic.List[string]]::new()
        foreach ($arg in @('--noproxy', '*', '-k', '--silent', '--show-error', '--location', '--max-time', '35', '--dump-header', $tempHeaders, '--output', $tempBody, '--write-out', '%{http_code}')) { $args.Add($arg) }
        if ($path.Contains('/wc/v3/')) { $args.Add('-H'); $args.Add([string]::Concat('Authorization: Basic ', $basic)) }
        $args.Add($url)
        $status = (& curl.exe @args).Trim()
        $rawBody = [IO.File]::ReadAllText($tempBody, [Text.Encoding]::UTF8).Trim()
        if ([string]::IsNullOrEmpty($rawBody)) { throw 'Пустой ответ' }
        $document = [System.Text.Json.JsonDocument]::Parse($rawBody)
        try {
            $options = [System.Text.Json.JsonSerializerOptions]::new()
            $options.WriteIndented = $true
            $options.Encoder = [System.Text.Encodings.Web.JavaScriptEncoder]::UnsafeRelaxedJsonEscaping
            $pretty = [System.Text.Json.JsonSerializer]::Serialize($document.RootElement, $options)
        } finally { $document.Dispose() }
        $headers = [IO.File]::ReadAllText($tempHeaders)
        $total = ([regex]::Match($headers, '(?im)^x-wp-total:\s*(\d+)')).Groups[1].Value
        $pages = ([regex]::Match($headers, '(?im)^x-wp-totalpages:\s*(\d+)')).Groups[1].Value
        AddLine
        AddLine ([string]::Format('### {0:d2}. GET {1}', $index, $path))
        AddLine
        AddLine 'Запрос:'
        AddLine
        AddLine '~~~http'
        AddLine ([string]::Concat('GET ', $path, ' HTTP/1.1'))
        AddLine 'Host: ofisnye-dveri.test'
        AddLine 'Accept: application/json'
        if ($path.Contains('/wc/v3/')) { AddLine 'Authorization: Basic <локальные серверные ключи Woo>' }
        AddLine '~~~'
        AddLine
        $statusLine = [string]::Concat('Ответ: HTTP ', $status)
        if ($total) { $statusLine += [string]::Concat('; X-WP-Total: ', $total) }
        if ($pages) { $statusLine += [string]::Concat('; X-WP-TotalPages: ', $pages) }
        AddLine $statusLine
        AddLine
        AddLine '~~~json'
        AddLine $pretty
        AddLine '~~~'
        $success++
        Write-Output ([string]::Format('{0:d2}/{1:d2} HTTP {2} {3}', $index, $seed.Count, $status, $path))
    } catch {
        AddLine
        AddLine ([string]::Format('### {0:d2}. GET {1}', $index, $path))
        AddLine
        AddLine ([string]::Concat('Не удалось получить полный JSON: ', $_.Exception.Message))
        Write-Output ([string]::Format('{0:d2}/{1:d2} ERROR {2}', $index, $seed.Count, $path))
    } finally {
        Remove-Item -LiteralPath $tempBody, $tempHeaders -ErrorAction SilentlyContinue
    }
}
if ($bff) { AddLine; AddLine $bff }
[IO.File]::WriteAllText($outputFull, $builder.ToString(), [Text.UTF8Encoding]::new($false))
Write-Output ([string]::Format('Итого: {0}/{1} ответов, {2} байт, файл {3}', $success, $seed.Count, ([IO.FileInfo]::new($outputFull)).Length, $outputFull))