class View {
  constructor(doc) {
    this._doc = doc;
    this._board = board;
    this._boardView = new BoardView(doc);
    this._msgView = new MessageView(doc);
    this._hintBtnView = new HintButtonView(doc);
  }

  get boardView() {
    return this._boardView;
  }

  get messageView() {
    return this._msgView;
  }

  draw(board, worm) {
    this._boardView.drawBoard(board);
    this._boardView.drawWorm(worm, board);
  }

  updateHintQuota(quota) {
    this._hintBtnView.updateHintQuota(quota);
  }

  reset() {
    this._boardView.reset();
  }
}

class BoardView {
  constructor(doc) {
    this._doc = doc;
    this._id = 'container';
    this._board = doc.getElementById(this._id);
    this._tiles = [];
    this._letters = [];
  }

  _clearWormTrace() {
    for (let i = 0; i < this._tiles.length; i += 1) {
      for (let j = 0; j < this._tiles[i].length; j += 1) {
        this._tiles[i][j].style.backgroundColor = 'white';
        this._tiles[i][j].style.border = '1px solid whitesmoke';
      }
    }
  }

  _getBoardDimensions() {
    const width = this._board.offsetWidth;
    const height = this._board.offsetHeight;
    return { width, height };
  }

  _createRow(idx) {
    const row = this._doc.createElement('div');
    row.id = idx;
    row.className = 'row';
    return row;
  }

  _createRows(ver) {
    for (let iv = 0; iv < ver; iv += 1) {
      const row = this._createRow(iv);
      this._tiles.push([]);
      this._board.appendChild(row);
    }
  }

  _createTiles(hor, ver, tiles) {
    const rows = this._board.children;
    for (let iv = 0; iv < ver; iv += 1) {
      for (let ix = 0; ix < hor; ix += 1) {
        const id = `${iv}-${ix}`;
        const tile = this._createTile(id, hor, tiles[id]);
        this._tiles[iv].push(tile);
        rows[iv].appendChild(this._tiles[iv][ix]);
      }
    }
  }

  _createTile(id, hor, data) {
    const tile = this._doc.createElement('div');
    tile.id = id;
    tile.className = 'tile';
    tile.style.width = this._calculateTileWidth(hor);
    tile.innerHTML = " ";
    if (data.letter && !data.isLetterEaten) {
      tile.innerHTML = `${data.letter}`;
    }
    return tile;
  }

  _updateTiles(hor, ver, tiles) {
    const rows = this._board.children;
    for (let iv = 0; iv < ver; iv += 1) {
      for (let ix = 0; ix < hor; ix += 1) {
        const id = `${iv}-${ix}`;
        const tile = this._doc.getElementById(id);
        const data = tiles[id];
        if (data.letter && data.isLetterEaten) {
          tile.innerHTML = " ";
        } else if (data.letter) {
          tile.innerHTML = `${data.letter}`;
        }
      }
    }
  }

  _calculateTileWidth(horCount) {
    return `${100/horCount}%`;
  }

  drawBoard(board) {
    this._clearWormTrace();
    this._board.style.border = '1px solid gray';
    const { size: { hor, ver } } = board;
    if (!this._board.children || this._board.children.length === 0) {
      this._createRows(ver);
      this._createTiles(hor, ver, board.tiles);
    } else {
      this._updateTiles(hor, ver, board.tiles);
    }
  }

  _drawWormSegment(segment) {
    const { posx, posy } = segment;
    const isYValid = posy >= 0 && posy < this._tiles.length;
    const isXValid = posx >= 0 && posx < this._tiles[0].length;
    if (isXValid && isYValid) {
      const tile = this._tiles[posy][posx];
      if (tile) tile.style.backgroundColor = 'gray';
    }
  }

  _drawMoves(worm) {
    const moves = worm._moves;
    const ids = Object.keys(moves);
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      const [posy, posx] = id.split('-');
      const tile = this._tiles[posy][posx];
      if (tile) tile.style.border = '1px solid black';
    }
  }

  drawWorm(worm) {
    const { segments, length } = worm;
    for (let i = 0; i < length; i += 1) {
      this._drawWormSegment(segments[i]);
    }

    // this._drawMoves(worm);
  }

  reset() {
    for (let i = 0; i < this._tiles.length; i += 1) {
      for (let j = 0; j < this._tiles[i].length; j += 1) {
        this._tiles[i][j].style.backgroundColor = 'white';
        this._tiles[i][j].style.border = '1px solid whitesmoke';
        this._tiles[i][j].innerHTML = " ";
      }
    }
  }
}

class MessageView {
  constructor(doc) {
    this._id = "message";
    this._div = doc.getElementById(this._id);
    this._div.style.marginTop = '1%';
  }

  draw(message) {
    this._div.innerHTML = message;
  }
}

class HintButtonView {
  constructor(doc) {
    this._id = "hintBtn";
    this._btn = doc.getElementById(this._id);
    this._btn.innerHTML = 'Hint';
  }

  updateHintQuota(quota) {
    this._btn.innerHTML = `Hint - ${quota}`;
  }
}