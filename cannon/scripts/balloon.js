class Balloon {
  constructor() {
    this.width = 10;
    this.height = 15;
    this.ropeLength = 10;
    this.balloons = [];
  }

  createBalloons(minX, maxX, minY, maxY, amount = 5) {
    let self = this;
    for (let i = 0; i < amount; i++) {
      let posX = random(minX, maxX);
      let posY = random(minY, maxY);
      let balloon = {
        width: self.width,
        height: self.height,
        posX: posX,
        posY: posY,
        rope: {
          startX: posX,
          startY: posY + self.height/2,
          endX: posX,
          endY: posY + self.height/2 + self.ropeLength,
        }
      }
      self.balloons.push(balloon);
    }
  }

  moveBalloons() {
    this.balloons.map((balloon) => {

    });
  }

  isBalloonHit(ballX, ballY, ballRadius, balloonX, balloonY, balloonWidth, balloonHeight) {
    let centerDist = dist(ballX, ballY, balloonX, balloonY);
    if (centerDist < balloonHeight/2 + ballRadius) {
      return true;
    }
    return false;
  }

  updateBalloons(ballX, ballY, ballRadius) {
    this.balloons.map((balloon, index) => {
      if (this.isBalloonHit(ballX, ballY, ballRadius, balloon.posX, balloon.posY, balloon.width, balloon.height)) {
        this.balloons.splice(index, 1);
        blopSound.play();
        hitCounter ++;
      }
    });
  }

  showBalloons() {
    stroke(0);
    fill(255, 0, 0);
    this.balloons.map((balloon) => {
      ellipse(balloon.posX, balloon.posY, balloon.width, balloon.height);
      line(balloon.rope.startX, balloon.rope.startY, balloon.rope.endX, balloon.rope.endY);
    });
  }

}
