var timer = document.getElementById('timer');
var scoreElem = document.getElementById('score');

var isTimed = false;
var isTimeUp = false;
var isGameOver = false;
var gameTimer;

var counterInitVal = 60;
var counter = counterInitVal;
var interval = 1000;
var score = 0;

// function to show initial score and timer
function initScoreAndTimer() {
  timer.innerHTML = `Time left: ${counter}`;
  scoreElem.innerHTML = `Score: ${score}`;
  timer.style.fontSize = "22px";
  scoreElem.style.fontSize = "22px";
}

//function to count down if the counter is > 0
var count = () => {
  if (counter > 0) {
    isTimed = true;
    counter --;
    timer.innerHTML = `Time left: ${counter}`;
  } else {
    timer.innerHTML = 'Time is up!';
    isTimeUp = true;
    postTimeIsUp();
  }
}

//function to start the timer count down if it is not yet timed
var startCount = () => {
  if (!isTimed) {
    // console.log('counter is initiated!');
    isTimed = true;
    gameTimer = setInterval(count, interval);
  }
}

//function to stop the countdown interval
var stopCount = () => {
  clearInterval(gameTimer);
  isTimed = false;
}

//function to show something when the time is up
function postTimeIsUp() {
  if (!isGameOver) {
    if (isTimeUp) {
      isGameOver = true;
      stopCount();
  	  container.style.display = "none";
  	  var messagePar = document.createElement("p");
  	  var messageText = document.createTextNode("You are not quick enough!");
  	  messagePar.appendChild(messageText);
  	  message.appendChild(messagePar);
      newButton();
    }
  }
}

//function to update score
function updateScore() {
  scoreElem.innerHTML = `Score: ${score}`
}

function resetTimerAndScore() {
  counter = counterInitVal;
  score = 0;
}
