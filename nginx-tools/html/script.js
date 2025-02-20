function openVNCLink() {
  var iframeSrc = document.querySelector('iframe').getAttribute('src');
  window.open(iframeSrc, '_blank', 'width="1280",height="720"');
}

function sendCommand(host, command) {
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
   var resultDiv = document.getElementById("result");
   var formattedText = this.responseText.replace(/\n/g, "<br>").replace(/^\s+|\s+$/g, "");
           resultDiv.innerHTML += "<pre>" + formattedText + "</pre>";
       }
   };
   var data = {host: host, command: command};
   xhr.open("POST", "http://tools.domain.com/execute");
   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhr.send(JSON.stringify(data));
   }

   var btn1 = document.getElementById("btn1");
   btn1.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "powershell -command Start-ScheduledTask -TaskName Start-1C");
   });

   var btn2 = document.getElementById("btn2");
   btn2.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "powershell -command Disable-PnpDevice -InstanceId (Get-PnpDevice -Class Ports).DeviceID -Confirm:$false; Start-Sleep 3; Enable-PnpDevice -InstanceId (Get-PnpDevice -Class Ports).DeviceID -Confirm:$false");
   });

   var btn3 = document.getElementById("btn3");
   btn3.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "powershell -command Disable-PnpDevice -InstanceId (Get-PnpDevice -Class Image).DeviceID -Confirm:$false; Start-Sleep 3; Enable-PnpDevice -InstanceId (Get-PnpDevice -Class Image).DeviceID -Confirm:$false; Restart-Service stisvc");
   });

   var btn4 = document.getElementById("btn4");
   btn4.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "powershell -command Start-ScheduledTask -TaskName CleanCache-1C");
   });

   var btn5 = document.getElementById("btn5");
   btn5.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     var messageInput = document.getElementById("message-input");
     var message = messageInput.value || "Сообщение";
     sendCommand(document.title, "msg /server:localhost * /v " + message);
   });

   var btn6 = document.getElementById("btn6");
   btn6.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "taskkill /F /IM intercust.exe && powershell -command Start-ScheduledTask -TaskName Start-InterCust");
   });

   var btn7 = document.getElementById("btn7");
   btn7.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "powershell -command Start-ScheduledTask -TaskName Lockscreen");
   });

   var btn8 = document.getElementById("btn8");
   btn8.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "powershell -command Stop-Process -name 'powershell' -Force");
   });

   var btn9 = document.getElementById("btn9");
   btn9.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     resultDiv.innerHTML = "";
     sendCommand(document.title, "powershell -command Start-ScheduledTask -TaskName Doremi");
   });

   var btn10 = document.getElementById("btn10");
   btn10.addEventListener("click", function() {
     var resultDiv = document.getElementById("result");
     sendCommand(document.title, "taskkill /F /IM sbis3plugin.exe && powershell -command Restart-Service Transport; Start-Sleep 10; Start-ScheduledTask -TaskName start-sbisplugin");
   });
