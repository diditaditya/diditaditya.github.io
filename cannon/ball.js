class Ball {
  constructor(originX, originY, mouseX, mouseY, initVelocity) {
    this.isFired = true;
    this.radius = 10;
    this.originX = originX;
    this.originY = originY;
    this.posX = originX;
    this.posY = originY;
    this.initVelocity = initVelocity;

    this.angle = atan((mouseY - originY)/(mouseX - originX));
  }

  update() {
    if (this.posX < width && this.posX > 0 && this.posY < this.originY + this.radius) {
      counter ++;
      this.posX = this.posX + cos(this.angle)*this.initVelocity;
      this.posY = this.posY + sin(this.angle)*this.initVelocity + 0.5*gravity*pow(counter, 2);

      ellipse(this.posX, this.posY,this.radius, this.radius);

    } else {
      ball = { isFired: false };
      counter = 0;
    }
  }

  drawBall() {
    ellipse(this.posX, this.posY, this.radius, this.radius);
  }

}
