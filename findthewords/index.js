const words = [
    "banana",
    "papaya",
    "orange",
    "mango",
    "avocado",
    "soursop"
];

class Game {
    constructor(words, document) {
        this.event = new EventEmitter();
        this.setup = this._setup(words);
        this.board = new Board(this.setup, this.event);
        this.view = new View(
            document,
            this.board,
            this.event,
            this.isFinished
        );
        this.selected = "";
        this.isFinished = false;
        this.subscribe();
    }

    subscribe() {
        var self = this;
        this.event.subscribe('selectLetter', (letter) => {
            self.checkFoundWords();
        });
    }

    showHint() {
        this.event.emit("showHint");
    }

    clear() {
        this.view.clear();
    }

    checkFoundWords() {
        var words = Object.keys(this.setup.data);
        for (var i = 0; i < words.length; i++) {
            this._checkIfFound(words[i]);
        }
        var unFound = words.filter(word => {
            return !this.setup.data[word].isFound;
        });
        if (unFound.length === 0) {
            this.isFinished = true;
            this.event.emit("gameFinished");
        }
    }

    _checkIfFound(word) {
        if (!this.setup.data[word].isFound) {
            var unSelected = this.setup.data[word].tiles.filter(tile => {
                return !tile.isSelected
            });
            if (unSelected.length === 0) {
                this.setup.data[word].tiles.map(tile => {
                    tile.found();
                });
                this.setup.data[word].isFound = true;
                console.log(word, 'has been found!');
                this.event.emit("wordFound", word);
                this.event.emit("resetTileColor");
                return true;
            } else {
                return false;
            }
        }
    }

    _setup(words) {
        var maxLength = 0;
        var data = {};
        for (var i = 0; i < words.length; i++) {
            if (!data[words[i]]) {
                data[words[i]] = {
                    isOnBoard: false,
                    isFound: false,
                    length: words[i].length,
                    letters: words[i].split(),
                    tiles : []
                }
            }
            maxLength = words[i].length > maxLength? words[i].length: maxLength;
        }
        maxLength = maxLength > words.length ? maxLength : words.length;
        return { maxLength, data };
    }

    _reverse(word) {
        var revd = "";
        for (var i = word.length-1; i >=0; i--) {
            revd += word[i];
        }
        return revd;
    }

    isFound(letters) {
        var revd = this._reverse(letters);
        var words = Object.keys(this.setup.data);
        if (words.includes(letters)) {
            this.setup.data[letters].isFound = true;
        } else if (words.includes(revd)) {
            this.setup.data[revd].isFound = true;
        }   
    }
}

class App {
    constructor(words) {
        this.words = words;
        this.game = null;
    }

    start() {
        if (this.game !== null) {
            this.game.clear();
        }
        this.game = new Game(this.words, document);
    }

    restart() {
        this.clear();
        this.game = new Game(this.words, document);
    }

    clear() {
        this.game.clear();
        this.game = null;
    }

    hint() {
        this.game.showHint();
    }
}

console.log('welcome to Find the Words!');
var app = new App(words);