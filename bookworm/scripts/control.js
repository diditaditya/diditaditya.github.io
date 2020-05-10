class Controller {
  constructor(worm) {
    this._worm = worm;
    this._touchStartX = null;
    this._touchStartY = null;
    this._touchDir = null;
    this._init();
  }

  _init() {
    window.onkeyup = (event) => {
      const { key } = event;
      const dir = this._keyToDir(key);
      if (dir) this._worm.direction = dir;
    };

    window.ontouchstart = (event) => {
      const { clientX, clientY } = event.touches[0];
      this._touchStartX = clientX;
      this._touchStartY = clientY;
    }

    window.ontouchmove = (event) => {
      const { clientX, clientY } = event.touches[0];
      this._touchDir = this._touchToDir(clientX, clientY);
    }

    window.ontouchend = () => {
      if (this._touchDir) this._worm.direction = this._touchDir;
      this._touchStartX = null;
      this._touchStartY = null;
      this._touchDir = null;
    }
  }

  _touchToDir(clientX, clientY) {
    const treshold = 25;
    const xdiff = clientX - this._touchStartX;
    const ydiff = clientY - this._touchStartY;

    const xdiffRatio = Math.abs(xdiff) / this._touchStartX;
    const ydiffRatio = Math.abs(ydiff) / this._touchStartY;

    if (xdiffRatio * 100 > treshold) {
      if (xdiff > 0) {
        return DIR.RIGHT;
      } else {
        return DIR.LEFT;
      }
    }
    if (ydiffRatio * 100 > treshold) {
      if (ydiff > 0) {
        return DIR.DOWN;
      } else {
        return DIR.UP;
      }
    }
    return null;
  }

  _keyToDir(key) {
    let dir = null;
    const currentDir = this._worm.direction;

    const isGoingUp = currentDir === DIR.UP;
    const isGoingDown = currentDir === DIR.DOWN;
    const isGoingRight = currentDir === DIR.RIGHT;
    const isGoingLeft = currentDir === DIR.LEFT;

    const isMovingVer = isGoingUp || isGoingDown;
    const isMovingHor = isGoingRight || isGoingLeft;

    switch (key) {
      case 'ArrowUp':        
        if (!isMovingVer) dir = DIR.UP;
        break;
      case 'ArrowDown':
        if (!isMovingVer) dir = DIR.DOWN;
        break;
      case 'ArrowRight':
        if (!isMovingHor) dir = DIR.RIGHT;
        break;
      case 'ArrowLeft':
        if (!isMovingHor) dir = DIR.LEFT;
        break;
      default:
        dir = null;
        break;
    }

    return dir;
  }
}