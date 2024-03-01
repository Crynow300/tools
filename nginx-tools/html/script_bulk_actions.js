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
   xhr.open("POST", "http://tools.pivtochka.com/execute");
   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhr.send(JSON.stringify(data));
}

var hosts = ["MK-1-PRDPRTV15", "MK-26VO7", "MK-8VO53", "MK-ABRAM21", "MK-ABRAM8", "MK-ABRAMOVA18",
 "MK-ALEKS75-1", "MK-ARTSLVSK21", "MK-AV-BLTK5", "MK-BBSHKN53", "MK-BELKUN6-1", "MK-BELKUN8",
 "MK-BGSLVSK6", "MK-BLSHVKV32", "MK-BLV9", "MK-BLYUH7-1", "MK-BOGAT55", "MK-BOLSH15", "MK-BTLRV11",
 "MK-BUHAR118-1", "MK-CHUGU1-2", "MK-DACH21-1", "MK-DACH9-1", "MK-DALN12", "MK-DYBEN24-1", "MK-EKTRNSK17",
 "MK-ELZRVSK15", "MK-EVRPSK9", "MK-GASH6", "MK-GRAZH43-2", "MK-GREBAL7", "MK-GRINA3", "MK-GRKVG24",
 "MK-GRKVG34", "MK-GRV27", "MK-GRV33", "MK-GRZDNSK117", "MK-GRZHDNSK66", "MK-GRZN27", "MK-HUDOSH43",
 "MK-ILYUSH1", "MK-INDUS9", "MK-ISKRVSK19", "MK-IZBOR1", "MK-IZMAI16", "MK-KARAV28-1", "MK-KARET5-1",
 "MK-KLMZHSK26", "MK-KLPNSK34", "MK-KMNDNTSK-64", "MK-KMNDNTSK24", "MK-KMNDNTSK59", "MK-KOLON10",
 "MK-KOLP32", "MK-KOMEN55-1", "MK-KOMEN67", "MK-KOROL21-1", "MK-KOROLEV27-1", "MK-KORZU34-1",
 "MK-KOSIG27-1", "MK-KRILK3-1", "MK-KRSNPUT14", "MK-KRVCHNK9", "MK-KUANG2", "MK-KUEVRO13-5",
 "MK-KUEVRO18", "MK-KUEVRO3", "MK-KUEVRO8", "MK-KULEN7", "MK-KUOBL3", "MK-KUPCH15", "MK-KUPRZ14",
 "MK-KUPRZ5", "MK-KUSHEL1-2", "MK-KZKV70", "MK-L-GLKV47", "MK-LENINS49", "MK-LENINS56", "MK-LENSOV70",
 "MK-LIHOL14-2", "MK-LNNSK72", "MK-LNNSK77", "MK-LNSVT23", "MK-M-ZKHRV21", "MK-MARSH12", "MK-METAL111",
 "MK-MORSKAYA35", "MK-MRKRV1", "MK-MRSHK10", "MK-MUBAL11", "MK-MUMEND10", "MK-MUNOV7", "MK-MUPRIV5",
 "MK-MURDOR-16-2", "MK-MURDOR61", "MK-MUSHU15", "MK-MUSHU5", "MK-MUSHUV25", "MK-MUVOR12", "MK-MUVOR14",
 "MK-MUVOR18", "MK-N-OPLCHN10", "MK-NALICH40", "MK-NAROD45", "MK-NAST35-1", "MK-NAST8-2", "MK-NAUKI24",
 "MK-NEVSKAYA7", "MK-NOVOCH40", "MK-NRND68", "MK-NVGRDSK6", "MK-NVZMLVSK13", "MK-OKTNAB118", "MK-OPTIK37",
 "MK-PARF1", "MK-PAYT8", "MK-PLESE16", "MK-PLNRN87", "MK-PRSHTN61", "MK-PRSVSHN36", "MK-PTRGFSK17",
 "MK-PULK-42-6", "MK-PULK15", "MK-PULK71-2", "MK-PZZHN14", "MK-RCHVSK13", "MK-RCHVSK4", "MK-REVOL17",
 "MK-RSNVSK18", "MK-RSTVSK24", "MK-SH-LVRK14", "MK-SH-LVRK63", "MK-SHERB11", "MK-SHGLV9", "MK-SHVLV18",
 "MK-SLAVY30", "MK-SLAVYA21", "MK-SOFKOV1", "MK-SOFSKYA57", "MK-SOLID9", "MK-SOVET36-1", "MK-SOVREMEN15",
 "MK-SRDNHTNSK25", "MK-SREGAT16-4", "MK-SRNV-B17", "MK-STRTL6", "MK-SVER1", "MK-SVETLA66", "MK-TREF22",
 "MK-TRFN-DOR15", "MK-UDAR30-1", "MK-URLSK21", "MK-USHIN25-1", "MK-UTOCHK6", "MK-V-MLNTS3", "MK-VETER183",
 "MK-VILKC4", "MK-VIT101-1", "MK-VLDSK6", "MK-VLRVSK6", "MK-VTRNV171K5", "MK-ZANEV23", "MK-ZRCHN42",
 "RM-NVTRV10", "RMK-SVERDLOVO1", "MK-VARSH43", "MK-DIMIT18", "MK-NVTRV17", "MK-RUSAN15", "MK-ROSTOV12", "MK-MUVOR12", "MK-BOLSHEV3",
 "MK-DYBENKO7", "MK-MURDOR8","MK-ENERG9", "mk-belova6", "MK-PLOTKINA16", "mk-strtl16", "mk-nvsmsk1", "MK-DVINSK6"];

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
