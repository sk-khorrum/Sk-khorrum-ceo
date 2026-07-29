$files = Get-ChildItem -Path 'c:\protfoleo\src' -Recurse -Include *.tsx,*.jsx,*.js,*.css,*.ts -File
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content.Contains('#c9f731')) {
        $new = $content.Replace('#c9f731', '#f97316')
        [System.IO.File]::WriteAllText($file.FullName, $new)
        Write-Host "Updated: $($file.FullName)"
    }
}
Write-Host "Done replacing colors."
