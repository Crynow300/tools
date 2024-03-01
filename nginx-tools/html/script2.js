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
  xhr.open("POST", "http://tools:5000/execute");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}

var btn1 = document.getElementById("btn1");
btn1.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  sendCommand("mk-test", "powershell -command Start-ScheduledTask -TaskName Start-1C");
});

var btn2 = document.getElementById("btn2");
btn2.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  sendCommand("mk-test", "powershell -command Disable-PnpDevice -InstanceId (Get-PnpDevice -Class Ports).DeviceID -Confirm:$false; Start-Sleep 3; Enable-PnpDevice -InstanceId (Get-PnpDevice -Class Ports).DeviceID -Confirm:$false");
});

var btn3 = document.getElementById("btn3");
btn3.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  sendCommand("mk-test", "powershell -command Disable-PnpDevice -InstanceId (Get-PnpDevice -Class Image).DeviceID -Confirm:$false; Start-Sleep 3; Enable-PnpDevice -InstanceId (Get-PnpDevice -Class Image).DeviceID -Confirm:$false; Restart-Service stisvc");
});

var btn4 = document.getElementById("btn4");
btn4.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  sendCommand("mk-test", "powershell -command Start-ScheduledTask -TaskName CleanCache-1C");
});

var btn5 = document.getElementById("btn5");
btn5.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  var messageInput = document.getElementById("message-input");
  var message = messageInput.value || "Сообщение";
  sendCommand("mk-test", "msg /server:localhost * /v " + message);
});
