var config = {
  apiKey: "AIzaSyCzJ_T4KGmaRHgcetXid7No5VBShBbQIng",
  authDomain: "rps-project-6dc82.firebaseapp.com",
  databaseURL: "https://rps-project-6dc82.firebaseio.com",
  projectId: "rps-project-6dc82",
  storageBucket: "rps-project-6dc82.appspot.com",
};

var playerID = 0;
var opp = null;
var ref = null;

firebase.initializeApp(config);
var database = firebase.database();

// connect to database and see if any children, then assign playerID and set initial game variables
database.ref().once('value').then(function(snap) {

  // 1 child per player, set ID's accordingly
  if (snap.numChildren() === 0) {
    playerID = 1;
    opp = "player2";
  } else if (snap.numChildren() === 1) {
    playerID = 2;
    opp = "player1";
  } 
  // set variables for game logic
}).then(function(){
  database.ref().child('player' + playerID).set({
    move: 0,
    wins: 0,
    chat: 0

  })
}).then(function(){
  // set a listener for move of each player
  database.ref('/player' + playerID + '/move').on('value', function(snap){
    if (snap.val() === 0) {
      return;
    }
    //console.log(snap.val());
  })
  
}).then(function(){
  // remove player child on disconnect
  database.ref('player' + playerID).onDisconnect().remove()
}).then(function() {
  console.log("You are player" + playerID + " and your opponent is " + opp);
})

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
  statusWindow.textContent = "PLAYER " + playerID + " CHOOSES ROCK";
  database.ref('/player' + playerID + '/move').set("rock").then(result());
});

paperButton.addEventListener('click', function () {
  if (int) {
    clearInterval(int);
    statusWindow.style.visibility = 'visible';
    statusWindow.textContent = "WAITING FOR PLAYER...";
  }
  statusWindow.textContent = "PLAYER " + playerID + " CHOOSES PAPER";
  database.ref('/player' + playerID + '/move').set("paper").then(result());
});

scissorsButton.addEventListener('click', function () {
  if (int) {
    clearInterval(int);
    statusWindow.style.visibility = 'visible';
    statusWindow.textContent = "WAITING FOR PLAYER...";
  }
  statusWindow.textContent = "PLAYER " + playerID + " CHOOSES SCISSORS";
  database.ref('/player' + playerID + '/move').set("scissors").then(result());
});

function appendChat(text) {
  var chat = document.getElementById("chat-box");
  var ele = document.createElement("div");
  ele.setAttribute("class", "chat-text");
  ele.textContent = "Player 1: " + text;
  chat.appendChild(ele);
}

function result() {
  var p1_move, p2_move;
  database.ref().once('value', function(snap) {
    p1_move = snap.val().player1.move;
    p2_move = snap.val().player2.move;
  }).then(function() {
    if(p1_move === p2_move) {
      console.log("tie");
      resetMoves()
      return;
    }
    if (p1_move === "rock" && p2_move === "paper") {
      console.log("player 2 wins");
      resetMoves()
      return;
    }
    if (p1_move === "rock" && p2_move === "scissors") {
      console.log("player 1 wins");
      resetMoves()
      return;
    }
    if (p1_move === "paper" && p2_move === "rock") {
      console.log("player 1 wins");
      resetMoves()
      return;
    }
    if (p1_move === "paper" && p2_move === "scissors") {
      console.log("player 2 wins");
      resetMoves()
      return;
    }
    if (p1_move === "scissors" && p2_move === "rock") {
      console.log("player 2 wins");
      resetMoves()
      return;
    }
    if (p1_move === "scissors" && p2_move === "paper") {
      console.log("player 1 wins");
      resetMoves()
      return;
    }
  });
}

function resetMoves() {
  database.ref('player1/move').set('0');
  database.ref('player2/move').set('0');
}