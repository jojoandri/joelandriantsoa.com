# Script PowerShell pour convertir les images en WebP
# Nécessite d'installer cwebp.exe (Google WebP tools)

# Créer le dossier de sortie
$outputDir = "public/images/webp"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Convertir toutes les images
$images = Get-ChildItem "public/images" -Include "*.jpg", "*.jpeg", "*.png" -Recurse

foreach ($image in $images) {
    $outputFile = Join-Path $outputDir ($image.BaseName + ".webp")
    $inputFile = $image.FullName
    
    Write-Host "Converting $($image.Name) to WebP..."
    
    # Commande de conversion (ajustez la qualité selon vos besoins)
    cwebp -q 85 "$inputFile" -o "$outputFile"
}

Write-Host "Conversion terminée ! Images WebP dans : $outputDir"
