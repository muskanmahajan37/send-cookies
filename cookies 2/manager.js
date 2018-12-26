var allCookies = [];
chrome.cookies.getAll({}, function(cookies){
  console.log(cookies);
  cookies.forEach(function(data){
      allCookies.push({
        "domain" : data.domain,
        "name" : data.name,
        "value" : data.value
      });
      
  });
  setCookiesCount();
});

function setCookiesCount(){
  document.getElementById("filter_count").innerHTML = allCookies.length;
  displayAllCookies();
}

function displayAllCookies(){
  var table = initTable();
  
  allCookies.forEach(function (cookie){
      var row = table.insertRow(-1);
      row.insertCell(0).innerHTML = cookie.name;
      row.insertCell(0).innerHTML = cookie.domain;
      //ele.appendHTML("<tr><td>"+cookie.name+"</td><td>"+cookie.value+"</td></tr>");
  })
}

function initTable(){
  var table = document.getElementById("cookies");
  return table;
}

function getCurrentCookies(){
  var table = initTable();
  table.innerHTML = "";
  allCookies = [];
  chrome.windows.getCurrent({}, function(cookies){
    allCookies.forEach(function(data){
      var row = table.insertRow(-1);
      row.insertCell(0).innerHTML = cookie.name;
      row.insertCell(0).innerHTML = cookie.domain;
      //console.log(data);
    });
    console.log(allCookies);
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#show_current').addEventListener('click', connect);
  document.getElementById('sendMessage').addEventListener(
    'click', sendNativeMessage);
  
});

var port = null;

function connect() {
  var hostName = "com.postman.cookiesend";
  //console.log("connected");
  port = chrome.runtime.connectNative(hostName);
  if(port){
      console.log("connected to the host");
      port.onMessage.addListener(onNativeMessage);
      //port.onDisconnect.addListener(onDisconnected);
  }
  else{
    console.log("disconnected");
  }

}


function appendMessage(text) {
  document.getElementById('response').innerHTML += "<p>" + text + "</p>";
}

function sendNativeMessage() {
  message = {"text": document.getElementById('msg').value};
  connect();
  if(port){
  if(port.postMessage(message)){
    console.log("message sent");
  }
  else{
    console.log("message not sent");
  }
}
else{
  console.log("port not connected");
}
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
}

function onNativeMessage(message) {
  appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
}


