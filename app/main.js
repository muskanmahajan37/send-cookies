var port = null;

function appendMessage(text) {
  document.getElementById('response').innerHTML += "<p>" + text + "</p>";
}

function updateUiState() {
  if (port) {
    document.getElementById('connect-button').style.display = 'none';
    document.getElementById('input-text').style.display = 'block';
    document.getElementById('send-message-button').style.display = 'block';
  } else {
    document.getElementById('connect-button').style.display = 'block';
    document.getElementById('input-text').style.display = 'none';
    document.getElementById('send-message-button').style.display = 'none';
  }
}

function sendNativeMessage() {
  var domain = document.getElementById('input-text').value;
  var domainObj = {"domain" : domain};
  message = getCookies(domainObj);
  console.log(message.toString);
  port.postMessage(JSON.stringify(message));
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
}

// function onNativeMessage(message) {
//   appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
// }

function onDisconnected() {
  appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  updateUiState();
}

function connect() {
  var hostName = "com.google.chrome.example.echo";
  appendMessage("Connecting to native messaging host")
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
  updateUiState();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('connect-button').addEventListener(
      'click', connect);
  document.getElementById('send-message-button').addEventListener(
      'click', sendCookies);
  updateUiState();
});

function getCookies(domainObj){
var allCookies=[];
chrome.cookies.getAll(domainObj, function(cookies){
  console.log(cookies);
  cookies.forEach(function(data){
      allCookies.push({
        "domain": data.domain,
        "expirationDate" : data.expirationDate,
        "hostOnly": data.hostOnly,
        "httpOnly": data.httpOnly,
        "name": data.name,
        "path": data.path,
        "sameSite": data.sameSite,
        "secure": data.secure,
        "session": data.session,
        "storeId": data.storeId,
        "value": data.value
      });
      
  });
  //setCookiesCount();
});
  return allCookies;
}
function setCookiesCount(){
  document.getElementById("cookie_count").innerHTML = allCookies.length;
  //displayAllCookies();
}


function sendCookies(){
  var domain = document.getElementById('input-text').value;
  var domainObj = {"domain" : domain};
  message = getCookies(domainObj);
  
  var allCookies=[];
  chrome.cookies.getAll(domainObj, function(cookies){
  console.log(cookies);
  cookies.forEach(function(data){
      allCookies.push({
        "domain": data.domain,
        "expirationDate" : data.expirationDate,
        "hostOnly": data.hostOnly,
        "httpOnly": data.httpOnly,
        "name": data.name,
        "path": data.path,
        "sameSite": data.sameSite,
        "secure": data.secure,
        "session": data.session,
        "storeId": data.storeId,
        "value": data.value
      });
      
  });
  //setCookiesCount();
  port.postMessage(message);
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
});

  console.log(message.toString);
  
}

function onNativeMessage(message){
  var domainObj = {"domain" : message.text};
  console.log(message.text);
  var allCookies=[];
  chrome.cookies.getAll(domainObj, function(cookies){
  console.log(cookies);
  console.log("cookies recieved : "+cookies);
  cookies.forEach(function(data){
      allCookies.push({
        "domain": data.domain,
        "expirationDate" : data.expirationDate,
        "hostOnly": data.hostOnly,
        "httpOnly": data.httpOnly,
        "name": data.name,
        "path": data.path,
        "sameSite": data.sameSite,
        "secure": data.secure,
        "session": data.session,
        "storeId": data.storeId,
        "value": data.value
      });
  });
  appendMessage("Recieved message: <b>" + JSON.stringify(allCookies) + "</b>");
});
}