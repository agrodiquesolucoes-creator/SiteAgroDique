# Gera copias com a logo oficial, sem modificar as artes originais.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$assets = Join-Path $root 'assets'
$output = Join-Path $assets 'padronizadas'
[System.IO.Directory]::CreateDirectory($output) | Out-Null
$logo = [System.Drawing.Image]::FromFile((Join-Path $assets 'logo-agrodique.png.png'))
# Remove apenas as margens vazias da imagem da logo.
$logoSource = New-Object System.Drawing.RectangleF ([single]($logo.Width * .02)), ([single]($logo.Height * .18)), ([single]($logo.Width * .96)), ([single]($logo.Height * .66))
$artes = @(
  @{ File='-agrodique.png.png'; Name='sobre-agrodique'; Boxes=@(@(.12,.09,.77,.37)) },
  @{ File='agroindustriais.png.png'; Name='agroindustriais'; Boxes=@(@(.03,.025,.56,.16)) },
  @{ File='aplicacao-geomembrana.png.png'; Name='aplicacao-geomembrana'; Boxes=@(@(.06,.035,.38,.17)) },
  @{ File='bacia-contencao.png.png'; Name='bacia-contencao'; Boxes=@(@(.065,.04,.39,.18)) },
  @{ File='estrutura-agroindustrial.png.png'; Name='estrutura-agroindustrial'; Boxes=@(@(.045,.035,.36,.15)) },
  @{ File='geomembrana.png.png'; Name='geomembrana'; Boxes=@(@(.06,.015,.61,.17)) },
  @{ File='impermeabilizacao.png.png'; Name='impermeabilizacao'; Boxes=@(@(.28,.02,.51,.13)) },
  @{ File='piscicultura.jpg.jpeg'; Name='piscicultura'; Boxes=@(@(.0,.03,.35,.16),@(.72,.025,.27,.39)) },
  @{ File='reservatorio-rural.png.png'; Name='reservatorio-rural'; Boxes=@(@(.05,.025,.34,.16)) },
  @{ File='reservatorio.png.png'; Name='reservatorio'; Boxes=@(@(.13,.055,.71,.16)) },
  @{ File='tanque-armazenamento.png.png'; Name='tanque-armazenamento'; Boxes=@(@(.06,.04,.39,.175)) },
  @{ File='viveiro-piscicultura.png.png'; Name='viveiro-piscicultura'; Boxes=@(@(.04,.025,.44,.18)) },
  @{ File='viveiro.jpg.jpeg'; Name='viveiro'; Boxes=@(@(.0,.025,.40,.15),@(.65,.03,.34,.36)) }
)
try {
  foreach ($arte in $artes) {
    $source = [System.Drawing.Image]::FromFile((Join-Path $assets $arte.File))
    $bitmap = New-Object System.Drawing.Bitmap $source.Width, $source.Height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)
      $boxes = $arte.Boxes
      if ($boxes[0] -isnot [array]) { $boxes = ,$boxes }
      foreach ($box in $boxes) {
        $x = [single]($box[0] * $source.Width)
        $y = [single]($box[1] * $source.Height)
        $w = [single]($box[2] * $source.Width)
        $h = [single]($box[3] * $source.Height)
        $graphics.FillRectangle([System.Drawing.Brushes]::White, $x, $y, $w, $h)
        $padding = [single]([Math]::Min($w, $h) * .09)
        $scale = [Math]::Min(($w - 2*$padding)/$logoSource.Width, ($h - 2*$padding)/$logoSource.Height)
        $dw = [single]($logoSource.Width * $scale)
        $dh = [single]($logoSource.Height * $scale)
        $dest = New-Object System.Drawing.RectangleF ([single]($x+($w-$dw)/2)), ([single]($y+($h-$dh)/2)), $dw, $dh
        $graphics.DrawImage($logo, $dest, $logoSource, [System.Drawing.GraphicsUnit]::Pixel)
      }
      $bitmap.Save((Join-Path $output ($arte.Name + '.png')), [System.Drawing.Imaging.ImageFormat]::Png)
      Write-Output ($arte.Name + '.png')
    } finally {
      $graphics.Dispose()
      $bitmap.Dispose()
      $source.Dispose()
    }
  }
} finally {
  $logo.Dispose()
}
