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

var hosts = ["WIN-HOST-1", "WIN-HOST-2", "WIN-HOST-3"];

var btn1 = document.getElementById("btn1");
btn1.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  for (var i = 0; i < hosts.length; i++) {
    sendCommand(hosts[i], "powershell -command Start-ScheduledTask -TaskName Start-1C");
  }
});

var btn4 = document.getElementById("btn4");
btn4.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  for (var i = 0; i < hosts.length; i++) {
    sendCommand(hosts[i], "powershell -command Start-ScheduledTask -TaskName CleanCache-1C");
  }
});

var btn5 = document.getElementById("btn5");
btn5.addEventListener("click", function() {
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  var messageInput = document.getElementById("message-input");
  var message = messageInput.value || "Сообщение";
  for (var i = 0; i < hosts.length; i++) {
    sendCommand(hosts[i], "powershell -command msg /server:localhost * /v " + message);
  }
});
