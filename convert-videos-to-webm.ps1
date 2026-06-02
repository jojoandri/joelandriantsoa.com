# Convert MP4 videos in public/videos to WebM using ffmpeg
# Requires ffmpeg installed and available in PATH

$videosDir = "public/videos"
if (!(Test-Path $videosDir)) {
    Write-Error "Directory $videosDir not found"
    exit 1
}

$mp4Files = Get-ChildItem $videosDir -Filter "*.mp4"

if ($mp4Files.Count -eq 0) {
    Write-Host "No MP4 files found in $videosDir"
    exit 0
}

foreach ($file in $mp4Files) {
    $input = $file.FullName
    $output = Join-Path $videosDir ($file.BaseName + ".webm")

    Write-Host "Converting $($file.Name) -> $([IO.Path]::GetFileName($output))"

    # Example ffmpeg command: VP9 + Opus (good compression/quality). Adjust CRF for quality.
    # ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -c:a libopus output.webm

    $args = "-i `"$input`" -c:v libvpx-vp9 -b:v 0 -crf 30 -c:a libopus `"$output`""
    $process = Start-Process -FilePath "ffmpeg" -ArgumentList $args -NoNewWindow -Wait -PassThru

    if ($process.ExitCode -ne 0) {
        Write-Warning "Conversion failed for $($file.Name) (exit code $($process.ExitCode))"
    } else {
        Write-Host "Converted: $output"
    }
}

Write-Host "Done. WebM files are in $videosDir"