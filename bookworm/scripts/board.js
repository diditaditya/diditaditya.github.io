class Board {
  constructor(hor, ver, tiler) {
    this._size = {
      hor: hor || 5,
      ver: ver || 10,
    }
    this._tiler = tiler;
    this._tiles = {};

    this._wormed = {};

    this._init();
  }

  reset() {
    this._tiles = {};
    this._wormed = {};
    this._init();
  }

  _init() {
    const { hor, ver } = this._size;
    for (let iv = 0; iv < ver; iv += 1) {
      for (let ix = 0; ix < ver; ix += 1) {
        const id = `${iv}-${ix}`;
        this._tiles[id] = this._tiler.create(ix, iv);
      }
    }
  }

  get tiles() {
    return this._tiles;
  }

  get size() {
    return this._size;
  }

  clearLetters() {
    const ids = Object.keys(this._tiles);
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      this._tiles[id].resetLetter();
    }
  }

  setLetters(word) {
    const { ver, hor } = this._size;
    for (let i = 0; i < word.length; i += 1) {
      const c = word[i];
      let tile = null;
      while (!tile || tile.letter) {
        const randVer = Math.floor(Math.random() * ver);
        const randHor = Math.floor(Math.random() * hor);
        const randId = `${randVer}-${randHor}`;
        const candidate = this._tiles[randId];
        if (candidate.isEmpty) tile = candidate;
      }
      tile.letter = c;
    }
  }

  wormed(worm) {
    const wormed = {};
    for (let i = 0; i < worm.segments.length; i += 1) {
      const { posy, posx } = worm.segments[i];
      const id = `${posy}-${posx}`;
      const tile = this._tiles[id];
      if (tile) { wormed[id] = 1 }
    }

    const ids = Object.keys(this._tiles);
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      if (wormed[id]) {
        this._tiles[id].wormed();
      } else {
        this._tiles[id].unWormed();
      }
    }
    
  }
}