Add-Type -AssemblyName PresentationFramework

$loadingWindow = New-Object -TypeName System.Windows.Window
$loadingWindow.Title = "Переподключение сканера        "
$loadingWindow.SizeToContent = "WidthAndHeight"
$loadingWindow.WindowStartupLocation = "CenterScreen"
$loadingWindow.ResizeMode = "NoResize"
$loadingWindow.WindowStyle = "ToolWindow"
$loadingWindow.Topmost = $true

$loadingLabel = New-Object -TypeName System.Windows.Controls.Label
$loadingLabel.Content = "Пожалуйста, подождите..."
$loadingLabel.HorizontalAlignment = "Center"
$loadingLabel.VerticalAlignment = "Center"
$loadingLabel.FontSize = 20

$loadingWindow.Content = $loadingLabel

$loadingWindow.Show()

# Ваш остальной код
$computerName = $env:computername
$headers = @{ "Content-Type" = "application/json" }
$body = @{
    "host" = $computerName
    "command" = "powershell -command Disable-PnpDevice -InstanceId (Get-PnpDevice -Class Image).DeviceID -Confirm:`$false; Start-Sleep 3; Enable-PnpDevice -InstanceId (Get-PnpDevice -Class Image).DeviceID -Confirm:`$false; Restart-Service stisvc"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://sender:55555/execute" -Method POST -Headers $headers -Body $body
$response

$loadingWindow.Close()

[System.Windows.MessageBox]::Show('Сканер был успешно переподключён', 'Переподключение сканера', 'OK', 'Information')
