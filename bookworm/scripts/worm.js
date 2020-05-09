const DIR = {
  RIGHT: 'right',
  LEFT: 'left',
  UP: 'up',
  DOWN: 'down',
};

class Worm {
  constructor(board, length = 3) {
    this._board = board;
    this._length = length;
    this._head = null;
    this._segments = [];
    this._direction = DIR.RIGHT;
    this._counter = 0;
    this._moves = {};
    this._init();
  }

  get head() { return this._head; }

  get segments() { return this._segments; }

  get length() { return this._length; }

  get direction() { return this._direction; }

  set direction(dir) {
    const { posx, posy } = this._head;

    const id = `${posy}-${posx}`;
    if (this._moves[id]) return;

    this._direction = dir;  
    this._moves[id] = dir;
  }

  reset(length = 3) {
    this._segments = [];
    this._counter = 0;
    this._length = length;
    this._head = null;
    this._direction = DIR.RIGHT;
    this._moves = {};
    this._init();
  }

  _init() {
    const headx = this._length - 1;
    const id = this._counter++;
    const head = new Segment(null, headx, 0, id);
    this._head = head;
    this._segments.push(head);

    for (let x = headx - 1; x >= 0; x -= 1) {
      const lastChild = head.lastChild;
      const id = this._counter++;
      const segment = new Segment(lastChild, x, 0, id);
      this._segments.push(segment);
    }

    const { posy, posx } = this._head;
    this._moves[`${posy}-${posx}`] = this._direction;
  }

  addSegment() {
    const tail = this._head.lastChild;
    const dir = tail.dir;
    const id = this._counter++;
    let posx = tail.posx;
    let posy = tail.posy;
    switch (dir) {
      case DIR.RIGHT:
        posx -= 1;
        break;
      case DIR.LEFT:
        posx += 1;
        break;
      case DIR.UP:
        posy += 1;
        break;
      case DIR.DOWN:
        posy -= 1;
        break;
      default:
        break;
    }
    const segment = new Segment(tail, posx, posy, id);

    this._segments.push(segment);
    this._length += 1;
  }

  move() {
    this._head.move(this._moves);
  }
}

class Segment {
  constructor(parent, posx = 0, posy = 0, id) {
    this._id = id;
    this._parent = parent || null;
    this._child = null;
    this._dir = null;
    this._posx = posx;
    this._posy = posy;

    if (parent) parent.child = this;
  }

  set parent(parent) {
    this._parent = parent;
  }

  get id() { return this._id; }

  get dir() { return this._dir; }

  set dir(dir) { this._dir = dir; }

  get posx() { return this._posx; }

  get posy() { return this._posy; }

  set posx(posx) {
    this._posx = posx;
  }

  set posy(posy) {
    this._posy = posy;
  }

  set child(child) {
    if (this._child) {
      this._child.child = child;
      return;
    }
    this._child = child;
    return;
  }

  get lastChild() {
    if (!this._child) return this;
    return this._child.lastChild;
  }

  move(moves) {
    const id = `${this._posy}-${this._posx}`;
    if (moves[id]) {
      this._dir = moves[id];
      if (!this._child) {
        delete moves[id];
      }
    } else if (!this._dir) {
      const parentPosx = this._parent.posx;
      const parentPosy = this._parent.posy;

      if (parentPosx === this._posx) {
        const diff = parentPosy - this._posy;
        this._dir = diff > 0 ? DIR.DOWN : DIR.UP;
      } else {
        const diff = parentPosx - this._posx;
        this._dir = diff < 0 ? DIR.LEFT : DIR.RIGHT;
      }
    }

    switch (this._dir) {
      case DIR.RIGHT:
        this._posx += 1;
        break;
      case DIR.LEFT:
        this._posx -= 1;
        break;
      case DIR.UP:
        this._posy -= 1;
        break;
      case DIR.DOWN:
        this._posy += 1;
        break;
      default:
        break;
    }
    if (this._child) {
      this._child.move(moves);
    }
  }
}