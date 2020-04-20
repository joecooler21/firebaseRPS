var config = {
  apiKey: "AIzaSyCzJ_T4KGmaRHgcetXid7No5VBShBbQIng",
  authDomain: "rps-project-6dc82.firebaseapp.com",
  databaseURL: "https://rps-project-6dc82.firebaseio.com",
  projectId: "rps-project-6dc82",
  storageBucket: "rps-project-6dc82.appspot.com",
};

firebase.initializeApp(config);
var database = firebase.database();

resetAll();

var gameState = false;

var rockButton = document.getElementById("rock");
var paperButton = document.getElementById("paper");
var scissorsButton = document.getElementById("scissors");

var statusWindow = document.getElementById("status-text");
var flag = false;

var int = setInterval(function(){

  if (!flag) {
  statusWindow.style.visibility = 'visible';
  flag = true;
  } else {
    statusWindow.style.visibility = 'hidden';
    flag = false;
  }

}, 1000);

rockButton.addEventListener('click', function () {
  if (int) {
    clearInterval(int);
    statusWindow.style.visibility = 'visible';
    statusWindow.textContent = "WAITING FOR PLAYER...";
  }
  if (!gameState) {
    setGameState(true);
  }
  statusWindow.textContent = "PLAYER CHOOSES ROCK";
  database.ref('/p1_move').set("rock");
});

paperButton.addEventListener('click', function () {
  if (int) {
    clearInterval(int);
    statusWindow.style.visibility = 'visible';
    statusWindow.textContent = "WAITING FOR PLAYER...";
  }
  if (!gameState) {
    setGameState(true);
  }
  statusWindow.textContent = "PLAYER CHOOSES PAPER";
  database.ref('/p1_move').set("paper");
});

scissorsButton.addEventListener('click', function () {
  if (int) {
    clearInterval(int);
    statusWindow.style.visibility = 'visible';
    statusWindow.textContent = "WAITING FOR PLAYER...";
  }
  if (!gameState) {
    setGameState(true);
  }
  statusWindow.textContent = "PLAYER CHOSES SCISSORS";
  database.ref('/p1_move').set("scissors");
});


// change gameState flag to the value in database
database.ref('/game_state').on('value', function (snap) {
  gameState = snap.val();

});

function setGameState (state) {
  database.ref('/game_state').set(state);
}

function appendChat(text) {
  var chat = document.getElementById("chat-box");
  var ele = document.createElement("div");
  ele.setAttribute("class", "chat-text");
  ele.textContent = "Player 1: " + text;
  chat.appendChild(ele);
}

function resetAll() {
  database.ref().set({
    current_player:0,
    game_state:false,
    p1_move:0,
    p2_move:0,
    current_player:0
  });
}