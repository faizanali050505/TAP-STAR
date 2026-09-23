Add-Type -AssemblyName System.Drawing

$inputPath = "d:\TAP STAR\lando-norris-clone\assets\images\tapstar-logo.png"
$outputPath = "d:\TAP STAR\lando-norris-clone\assets\images\tapstar-logo-transparent.png"
$emblemPath = "d:\TAP STAR\lando-norris-clone\assets\images\tapstar-emblem.png"

$bmp = [System.Drawing.Bitmap]::new($inputPath)
$width = $bmp.Width
$height = $bmp.Height

$out = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Lock bits for high-speed processing
$rect = [System.Drawing.Rectangle]::new(0, 0, $width, $height)
$srcData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $out.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = [Math]::Abs($srcData.Stride) * $height
$rgbValues = [byte[]]::new($bytes)
$outValues = [byte[]]::new($bytes)

[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $rgbValues, 0, $bytes)

for ($i = 0; $i -lt $bytes; $i += 4) {
    $b = $rgbValues[$i]
    $g = $rgbValues[$i + 1]
    $r = $rgbValues[$i + 2]
    
    $minVal = [Math]::Min($r, [Math]::Min($g, $b))
    
    if ($minVal -gt 242) {
        $outValues[$i] = 0
        $outValues[$i + 1] = 0
        $outValues[$i + 2] = 0
        $outValues[$i + 3] = 0
    } elseif ($minVal -gt 215) {
        $alpha = [byte](255 * (242 - $minVal) / 27.0)
        $outValues[$i] = $b
        $outValues[$i + 1] = $g
        $outValues[$i + 2] = $r
        $outValues[$i + 3] = $alpha
    } else {
        $outValues[$i] = $b
        $outValues[$i + 1] = $g
        $outValues[$i + 2] = $r
        $outValues[$i + 3] = 255
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($outValues, 0, $dstData.Scan0, $bytes)

$bmp.UnlockBits($srcData)
$out.UnlockBits($dstData)

$out.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Also create a cropped emblem (just the circle icon, top 60% of image)
$emblemCrop = [System.Drawing.Rectangle]::new(180, 50, 680, 580)
$emblemBmp = $out.Clone($emblemCrop, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$emblemBmp.Save($emblemPath, [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$out.Dispose()
$emblemBmp.Dispose()

Write-Host "Transparent images created successfully!"
