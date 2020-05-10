const words = new Words();

const tiler = new Tiler();

const board = new Board(15, 15, tiler);

const worm = new Worm(board);

const rules = new Rules(board);

const view = new View(this.document);

const control = new Controller(worm);

class App {
  constructor(board, view, worm, rules, control, words) {
    this._board = board;
    this._view = view;
    this._worm = worm;
    this._rules = rules;
    this._control = control;
    this._words = words;
    this._level = 1;
    this._length = this._level + 2;
    this._hintQuota = 1;
    this._hint = {};
    this._eaten = '';
    this._interval = null;
    this._timeInBetween = 500;
    this._isOver = false;
  }

  resetHint() {
    const quota = Math.ceil(this._level / 2);
    this._hintQuota = Math.max(quota, 1);
    this._hint = {};

    this._view.updateHintQuota(this._hintQuota);
  }

  adjustWormSegment() { 
    if (this._worm.length < this._length) {
      this._worm.addSegment();
    }
  }

  getWord() {
    if (!this._words.current) {
      this._level = this._rules.level;
      this._length = this._level + 2; 
      this._words.selectWord(this._length);
      this._board.setLetters(this._words.current.word);
    }
  }

  checkEaten(eaten) {
    this._eaten += eaten;
    this._view.messageView.draw(this._eaten);
    if (this._eaten.length === this._length) {
      if (this._words.check(this._eaten)) {
        this._rules.correct();
        this._view.messageView.draw(`correct word! ${this._eaten}`);
        const isLeveledUp = this._rules.levelUp();
        if (isLeveledUp) {
          this._level += 1;
          this._view.messageView.draw(`LEVEL ${this._level}!`);
        }
      } else {
        this._view.messageView.draw('incorrect word!!');
      }
      if (!this.checkIfWon()) {
        this._eaten = "";
        this._words.clearCurrent();
        this.getWord();
      }
      this.resetHint();
    }
  }

  checkIfWon() {
    if (this._rules.isWon()) {
      clearInterval(this._interval);
      this._view.messageView.draw('you won!');
      this._isOver = true;
      return true;
    }
    return false;
  }

  stop() {
    clearInterval(this._interval);
    this._interval = null;
  }

  checkCollision() {
    const collidingBoard = this._rules.checkBoardCollision(worm);
    const collidingBody = this._rules.checkOwnBodyCollision(worm);
    if (collidingBoard || collidingBody) {
      clearInterval(this._interval);
      this._interval = null;
      this._view.messageView.draw('GAME OVER');
      this._isOver = true;
      this._words.clearCurrent();
      return true;
    }
    return false;
  }

  start() {
    this._isOver = false;
    this._view.messageView.draw('Swipe or use arrow key to move. Create correct word!');

    this._board.wormed(this._worm);
    this.getWord();

    this._view.updateHintQuota(this._hintQuota);

    this._view.draw(this._board, this._worm);

    this._interval = setInterval(() => {
      if (this._isOver) return;
      this.adjustWormSegment();
      this._worm.move();
      
      this._board.wormed(this._worm);

      const eaten = this._rules.checkIfLetterEaten(this._worm, this._board);
      if (eaten) this.checkEaten(eaten);

      if (this.checkCollision()) return;

      this._view.draw(this._board, this._worm);

    }, this._timeInBetween);
  }

  _createHint(answer) {
    let hint = "";
    for (let i = 0; i < answer.length; i += 1) {
      let letter = "_";
      if (this._hint[i]) letter = this._hint[i];
      hint += letter; 
    }
    return hint;
  }

  hint() {
    const answer = this._words.current.word;

    if (this._hintQuota === 0) {
      const hint = this._createHint(answer);
      this._view.messageView.draw(`Hint: ${hint}`);
      return;
    }
    
    let done = false;
    while(!done) {
      const randIdx = Math.floor(Math.random() * answer.length);
      if (!this._hint[randIdx]) {
        this._hint[randIdx] = answer[randIdx];
        done = true;
      }
    }

    this._hintQuota -= 1;
    this._view.updateHintQuota(this._hintQuota);
    
    const hint = this._createHint(answer);
    this._view.messageView.draw(`Hint: ${hint}`);
  }

  restart() {
    this._level = 1;
    this._length = this._level + 2;
    this._eaten = '';
    this._interval = null;
    this._timeInBetween = 500;
    this._isOver = false;

    this.resetHint();

    this._rules.reset();
    this._words.reset();
    this._worm.reset();
    this._board.reset();
    this._view.reset();

    this.start();
  }
}

app = new App(board, view, worm, rules, control, words);