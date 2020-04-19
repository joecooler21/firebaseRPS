var config = {

    apiKey: "AIzaSyDitAXjuCRaclQJVq-u8Lj5hXKu376wo0Y",
    authDomain: "wisc-lc-cd1c2.firebaseapp.com",
    databaseURL: "https://wisc-lc-cd1c2.firebaseio.com",
    projectId: "wisc-lc-cd1c2",
    storageBucket: "wisc-lc-cd1c2.appspot.com",
  };

  var rockButton = document.getElementById("rock");
  var paperButton = document.getElementById("paper");
  var scissorsButton = document.getElementById("scissors");

  rockButton.addEventListener('click', function () {
  });

  paperButton.addEventListener('click', function () {
  });

  scissorsButton.addEventListener('click', function () {
  });

function appendChat(text) {
    var chat = document.getElementById("chat-box");
    var ele = document.createElement("div");
    ele.setAttribute("class", "chat-text");
    ele.textContent = "Player 1: " + text;
    chat.appendChild(ele);
}

firebase.initializeApp(config);
var database = firebase.database();