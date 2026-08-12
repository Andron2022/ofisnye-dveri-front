param(
    [Parameter(Mandatory = $true)]
    [string]$OutputPath,

    [string]$ProjectRoot = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

$inside = git -C $ProjectRoot rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0 -or $inside.Trim() -ne "true") {
    throw "ProjectRoot is not a Git worktree: $ProjectRoot"
}

$status = git -C $ProjectRoot status --porcelain
if ($LASTEXITCODE -ne 0) {
    throw "Unable to read Git status"
}

if ($status) {
    throw "Working tree is not clean. Commit the intended source state before creating clientN.zip."
}

$fullOutput = [System.IO.Path]::GetFullPath($OutputPath)
$parent = Split-Path -Parent $fullOutput
if ($parent) {
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
}

if (Test-Path $fullOutput) {
    Remove-Item -Force $fullOutput
}

git -C $ProjectRoot archive --format=zip --output=$fullOutput HEAD
if ($LASTEXITCODE -ne 0) {
    throw "git archive failed"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($fullOutput)
try {
    $forbidden = @($zip.Entries | Where-Object {
        $name = $_.FullName
        $base = [System.IO.Path]::GetFileName($name)
        ($base -eq ".env") -or
        (($base -like ".env.*") -and ($base -ne ".env.example")) -or
        ($base -eq "wp-config.php") -or
        ($base -like "*.pem") -or
        ($base -like "repomix-output*.md")
    })
} finally {
    $zip.Dispose()
}

if ($forbidden.Count -gt 0) {
    Remove-Item -Force $fullOutput
    $names = ($forbidden | ForEach-Object { $_.FullName }) -join ", "
    throw "Archive contained forbidden secret/private files and was deleted: $names"
}

Write-Host "Created tracked-source archive: $fullOutput"
Write-Host "Ignored/untracked secrets such as .env.local are not included."
