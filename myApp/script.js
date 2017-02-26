var playerHand = document.getElementById("playerHand");
var compHand = document.getElementById("compHand");
var message = document.getElementById("message");
var playerScore = document.getElementById("playerScore");
var compScore = document.getElementById("compScore");
var compHandMsg = document.getElementById("compHandMsg");
var randHand = {0:["img/rock.png","Rock"], 1:["img/paper.png","Paper"], 2:["img/scissors.png","Scissors"]};
var playScoreCount = 0;
var compScoreCount = 0;
var playHandVal = 0;
var compHandVal = 0;
var winner = "Choose your Hand!";

function rock() {
  playerHand.src = "img/rock.png";
  playHandVal = 0;
  message.innerHTML = "You choose Rock!";
}

function paper() {
  playerHand.src = "img/paper.png";
  playHandVal = 1;
  message.innerHTML = "You choose Paper!";
}

function scissors() {
  playerHand.src = "img/scissors.png";
  playHandVal = 2;
  message.innerHTML = "You choose Scissors!";
}

function randomness() {
  var random = Math.floor(Math.random()*3);
  compHand.src = randHand[random][0];
  compHandVal = random;
  compHandMsg.innerHTML = "Randomness picks " + randHand[random][1] +"!";
}

function winCheck(playerHand,compHand) {
  if (playerHand === 0) {
    if (compHandVal === 1) {
      winner = "Randomness wins!";
      compScoreCount += 1;
    } else if (compHandVal ===2) {
      winner = "You win!";
      playScoreCount += 1;
    } else {
      winner = "Nobody wins!";
    }
  }
  if (playerHand === 1) {
    if (compHandVal === 2) {
      winner = "Randomness wins!";
      compScoreCount += 1;
    } else if (compHandVal === 0) {
      winner = "You win!";
      playScoreCount += 1;
    } else {
      winner = "Nobody wins!";
    }
  }
  if (playerHand === 2) {
    if (compHandVal === 0) {
      winner = "Randomness wins!";
      compScoreCount += 1;
    } else if (compHandVal === 1) {
      winner = "You win!";
      playScoreCount += 1;
    } else {
      winner = "Nobody wins!";
    }
  }
}

function run() {
  randomness();
  winCheck(playHandVal,compHandVal);
  message.innerHTML = winner;
  playerScore.innerHTML = "Score: " + playScoreCount;
  compScore.innerHTML = "Score: " + compScoreCount;
}
