const stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth-10,
    height: 500
});

const groundLayer = new Konva.Layer();
const groundThickness = 50;
const ground = new Konva.Rect({
    x: 0,
    y: stage.getHeight() - groundThickness,
    width: stage.getWidth(),
    height: groundThickness,
    fill: 'green',
    stroke: 'brown'
});
groundLayer.add(ground);

let player = new Player({
    x: stage.getWidth()/2,
    y: stage.getHeight() - groundThickness - 40 - 40,
    headSize: 10,
    facing: 'right',
    speed: 5,
    bodySize: { height: 40, width: 20 },
    armSize: { length: 40, width: 5 },
    legSize: { length: 40, width: 8 }
});

let layer = new Konva.Layer();
const radius = 50;
const strokeWidth = 2;
let circle = new Konva.Circle({
    x: ground.x() + radius + strokeWidth,
    y: ground.y() - groundThickness,
    radius: radius,
    fill: 'red',
    stroke: 'black',
    strokeWidth: strokeWidth
});

layer.add(circle);

const container = stage.container();
container.tabIndex = 1;
container.focus();

const delta = 10;

function inBound(val, minVal, maxVal) {
    if (val < minVal) {
        return minVal;
    } else if (val > maxVal) {
        return maxVal;
    } else { return val }
}

let isJumping = false;
const jumpHeight = radius*2;
const jumpSpeed = 3;
let currentShapeY = 0;
const landing = new Konva.Animation(function(frame) {
    if (circle.y() < currentShapeY) {
        circle.setY(circle.y() + jumpSpeed);
    } else {
        isJumping = false;
        this.stop();
    }
}, layer);
const jumping = new Konva.Animation(function(frame) {
    if (circle.y() < currentShapeY - jumpHeight) {
        this.stop();
        landing.start();
    } else {
        circle.setY(circle.y() - jumpSpeed);
    }
}, layer);
function jump(shape) {
    let topY = currentShapeY - jumpHeight;
    let totalStep = parseInt(jumpHeight/jumpSpeed, 10);
    let step = totalStep;
    let newY = shape.y();
    jumping.start();
    if (shape.y() < topY) {
        jumping.stop();
    }
    landing.start();
    if (shape.y() >= ground.y()-groundThickness) {
        landing.stop();
    }
}

const maxX = stage.getWidth() - radius - 2;
const maxY = stage.getHeight() - radius - 2;
const minX = radius + 2;
const minY = radius + 2;

container.addEventListener('keydown', function(e) {
    if (e.keyCode === 37) {
        let newX = circle.x() - delta;
        circle.x(inBound(newX, minX, maxX));
    } else if (e.keyCode === 38) {
        if (!isJumping) {
            currentShapeY = circle.y();
            isJumping = true;
            jumping.start();
        }
    } else if (e.keyCode === 39) {
        let newX = circle.x() + delta;
        circle.x(inBound(newX, minX, maxX));
    } else if (e.keyCode === 40) {
        return;
    } else { return }
    e.preventDefault();
    layer.batchDraw();
});

stage.add(groundLayer);
stage.add(layer);
stage.add(player.layer);

layer.draw();