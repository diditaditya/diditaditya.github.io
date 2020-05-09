class Tile {
  constructor(posHor, posVer) {
    this._id = `${posVer}-${posHor}`;
    this._pos = {
      hor: posHor,
      ver: posVer,
    }
    this._letter = null;
    this._letterEaten = false;
    this._isCrapped = false;
    this._isWormed = false;
  }

  get letter() {
    return this._letter;
  }

  set letter(letter) {
    this._letter = letter;
  }

  get isCrapped() {
    return this._isCrapped;
  }

  get isEmpty() {
    if (!this._letter && !this._isCrapped && !this._isWormed) {
      return true;
    }
    return false;
  }

  get isLetterEaten() { return this._letterEaten; }

  crap() {
    this._isCrapped = true;
  }

  unCrapped() {
    this._isCrapped = false;
  }

  wormed() {
    this._isWormed = true;
  }

  unWormed() {
    this._isWormed = false;
  }

  letterEaten() {
    this._letterEaten = true;
  }

  resetLetter() {
    this._letter = null;
    this._letterEaten = false;
  }
}

class Tiler {
  create(posHor, posVer) {
    return new Tile(posHor, posVer);
  }
}