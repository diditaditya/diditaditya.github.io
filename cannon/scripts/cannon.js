var groundThickness = 25;
var initVelocity = 10;
var gravity = 0.004;
var groundFriction = 5;

var originX = 25;
var originY = 275;

var counter = 0;
var shotCounter = 0;
var missCounter = 0;
var hitCounter = 0;
var accuracy = 0;

var ball = { isFired: false };
var balloons = new Balloon();
let canvasWidth;
let cannonSound;
let blopSound;

function preload() {
  // error on web audio autoplay policy?
  // cannonSound = loadSound('sounds/Cannon.wav');
  // blopSound = loadSound('sounds/Blop.wav');
}

function setup() {
  if (window.innerWidth > 575) {
    canvasWidth = 575;
  } else {
    canvasWidth = window.innerWidth;
  }
  var canvas = createCanvas(canvasWidth - 25, 300);
  canvas.parent('#canvas-container');

  if (canvasWidth < 300) {
    initVelocity = 7.5;
    gravity = 0.004;
  }

  // cannonSound.setVolume(0.1);
}

function drawLine(originX, originY) {
  let x1 = originX;
  let y1 = originY;
  let diag = dist(x1, y1, mouseX, mouseY);

  let radius = 25;
  let x2 = x1 + (mouseX - x1)*(radius/diag);
  let y2 = y1 + (mouseY - y1)*(radius/diag);

  stroke(0);
  fill(0);
  if (mouseX > originX && mouseY < originY) {
    line(x1, y1, x2, y2);
  } else if (mouseY < originY) {
    line(x1, y1, x1, y1 - radius);
  } else if (mouseY > originY) {
    line(x1, y1, x1 + radius, y1);
  }

}

function drawGround(thickness) {
  noStroke();
  fill(0,104,10);
  var groundElev = height - thickness;
  rect(0, groundElev, width, thickness);
}

function draw(){
  background(135,206,235);

  drawGround(groundThickness);

  stroke(0);
  fill(0);
  textSize(12);
  text(`Shot: ${shotCounter}`, 25, 25);
  text(`Accuracy: ${accuracy} %`, 25, 40);


  if (balloons.balloons.length === 0) {
    if (!ball.isFired) {
      balloons.createBalloons(canvasWidth*0.5, width - 10, 25, height - 50, 10);
    }
  }
  balloons.showBalloons();

  stroke(0);
  fill(0);
  ellipse(originX, originY, 10, 10);
  drawLine(originX, originY);

  if (mouseIsPressed && mouseX > originX && mouseY < originY) {
    if (!ball.isFired) {
      ball = new Ball(originX, originY, mouseX, mouseY, initVelocity);
      // cannonSound.play();
      shotCounter ++;
    }
  }

  let prevHit = hitCounter;
  if (ball.isFired) {
    ball.update();
    balloons.updateBalloons(ball.posX, ball.posY, ball.radius);
    if (prevHit < hitCounter) {
      ball.hitCount ++;
    }
  }

}
