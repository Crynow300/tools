Add-Type -AssemblyName System.Windows.Forms

[System.Windows.Forms.Application]::EnableVisualStyles()

$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$form = New-Object System.Windows.Forms.Form
$form.Text = "Warning"
$form.StartPosition = "Manual"
$form.Location = New-Object System.Drawing.Point(0, 0)
$form.Size = New-Object System.Drawing.Size($screen.Width, $screen.Height)
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None
$form.WindowState = [System.Windows.Forms.FormWindowState]::Maximized
$form.TopMost = $true
$form.BackColor = [System.Drawing.Color]::Yellow

$label = New-Object System.Windows.Forms.Label
$label.Text = "онфюксиярю, онднфдхре. бедсряъ реумхвеяйхе пюанрш. ме рпнцюире йнлоэчреп!"
$label.AutoSize = $false
$label.Font = New-Object System.Drawing.Font("Arial", 72, [System.Drawing.FontStyle]::Bold)
$label.ForeColor = [System.Drawing.Color]::Red
$label.Size = New-Object System.Drawing.Size($screen.Width, $screen.Height)
$label.TextAlign = [System.Drawing.ContentAlignment]::MiddleCenter
$form.Controls.Add($label)

$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 2000
$timer.add_Tick({
    $label.Visible = !$label.Visible
})
$timer.Start()

$form.Add_FormClosing({
    $_.Cancel = $true
})

$form.Add_Shown({$form.Activate()})
$null = $form.ShowDialog()

