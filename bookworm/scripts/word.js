class Words {
  constructor() {
    this._words = {};
    this._currentWord = null;
    this._alternatives = [];
    this._counter = {};
    this._init();
  }

  get current() { return this._currentWord; }

  clearCurrent() { this._currentWord = null; }

  getPoolCount(length) {
    return this._counter[length];
  }

  reset() {
    this._currentWord = null;
    this._alternatives = [];
  }

  _init() {
    const vocab = VOCAB.split('\n');
    for (let i = 0; i < vocab.length; i += 1) {
      const length = vocab[i].length;
      if (!this._words[length]) {
        this._words[length] = {};
        this._counter[length] = 0;
      }
      const id = this._counter[length];
      const word = new Word(vocab[i], id);
      this._words[length][id] = word;
      this._counter[length] += 1;
    }
  }

  _checkLetterCount(altWord, current) {
    const checker = { ...current.letterCount };
    const checked = altWord.letterCount;
    const { word } = altWord;
    const letters = Object.keys(checked);
    for (let i = 0; i < letters.length; i += 1) {
      const c = letters[i];
      if (!checker[c]) return false;
      if (checker[c] === checked[c]) delete checker[c];
    }
    if (Object.keys(checker).length > 0) return false;
    return true;
  }

  _findAlternatives(length, current) {
    this._alternatives = [];
    const pool = this._words[length];

    const keys = Object.keys(pool);
    for (let i = 0; i < keys.length; i += 1) {
      const word = pool[keys[i]];
      const isAlt = this._checkLetterCount(word, current)
      if (isAlt) this._alternatives.push(word);
    }
  }


  selectWord(length) {
    const poolCount = this._counter[length];
    let word = null;
    while (!word) {
      const randomKey = Math.floor(Math.random()*poolCount);
      word = this._words[length][randomKey];
    }
    if (word) {
      this._currentWord = word;
      this._findAlternatives(length, word);
    }
    return word;
  }

  _checkAlternatives(attempt) {
    for (let i = 0; i < this._alternatives.length; i += 1) {
      const word = this._alternatives[i];
      if (word.check(attempt)) return true;
    }
  }

  check(attempt) {
    const ok = this._checkAlternatives(attempt);
    if (ok) {
      this._alternatives = [];
      const length = attempt.length;
      this._counter[length] -= 1;
      const id = this._currentWord.id;
      this._currentWord = null;
      delete this._words[length][id];
      return true;
    }
    return false;
  }
}

class Word {
  constructor(word, id) {
    this._id = id;
    this._word = word.toUpperCase();
    this._letters = {};
    this._letterCount = {};
    this._length = word.length;

    this._init();
  }

  get id() { return this._id; }

  get word() { return this._word; }

  get letters() { return this._letters; }

  get letterCount() { return this._letterCount; }

  _init() {
    for (let i = 0; i < this._word.length; i += 1) {
      const c = this._word[i];
      this._letters[i] = {
        char: c,
        eaten: false,
      }

      if (!this._letterCount[c]) this._letterCount[c] = 0;
      this._letterCount[c] += 1;
    }
  }

  check(attempt) {
    if (attempt === this._word) return true;
    return false;
  }
}