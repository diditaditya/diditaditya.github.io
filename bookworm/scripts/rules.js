class Rules {
  constructor(board) {
    this._minX = 0;
    this._maxX = board.size.hor;
    this._minY = 0;
    this._maxY = board.size.ver;
    this._level = 1;
    this._currentCorrect = 0;
    this._cumulativeCorrect = 0;
    this._correctLimit = 3;
    this._maxLevel = 10;
  }

  get level() { return this._level; }

  set level(level) { this._level = level; }

  get currentCorrect() { return this._currentCorrect; }

  reset() {
    this._level = 1;
    this._currentCorrect = 0;
    this._cumulativeCorrect = 0;
    this._correctLimit = 1;
    this._maxLevel = 10;
  }

  correct() {
    this._currentCorrect += 1;
    this._cumulativeCorrect += 1;
  }

  levelUp() {
    const isNotMaxLevel = this._level < this._maxLevel;
    const isLimitReached = this._currentCorrect === this._correctLimit;
    if (isNotMaxLevel && isLimitReached) {
      this._level += 1;
      this._currentCorrect = 0;
      return true;
    }
    return false;
  }

  isWon() {
    const isMaxLevel = this._level === this._maxLevel;
    const isLimitReached = this._currentCorrect === this._correctLimit;
    if (isMaxLevel && isLimitReached) return true;
    return false;
  }

  checkIfLetterEaten(worm, board) {
    const { head: { posx, posy } } = worm;
    const tileId = `${posy}-${posx}`;
    const tile = board.tiles[tileId];

    if (tile && tile.letter && !tile.isLetterEaten) {
      tile.letterEaten();
      return tile.letter;
    }
  }

  checkBoardCollision(worm) {
    const { head } = worm;
    if (head.posx >= this._maxX) return true;
    if (head.posx < this._minX) return true;
    if (head.posy >= this._maxY) return true;
    if (head.posy < this._minY) return true;
    return false;
  }

  checkOwnBodyCollision(worm) {
    const { head, segments } = worm;
    for (let i = 1; i < segments.length; i += 1) {
      const segment = segments[i];
      if (segment.id !== head.id) {
        const collideX = segment.posx === head.posx;
        const collideY = segment.posy === head.posy;
        if (collideX && collideY) return true;
      }
    }
    return false;
  }
}