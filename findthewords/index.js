const words = [
    "rhino",
    "mesa",
    "valkyr",
    "limbo",
    "excalibur",
    "khora",
    "zephyr",
    "vauban",
    "octavia",
    "nidus"
];

class Game {
    constructor(words, document) {
        this.event = new EventEmitter();
        this.setup = this._setup(words);
        this.board = new Board(this.setup, this.event);
        this.view = new View(
            document,
            this.board,
            this.event
        );
        this.selected = "";
        this.isFinished = false;
        this.subscribe();
    }

    subscribe() {
        let self = this;
        this.event.subscribe('printLetter', (letter) => {
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
        let words = Object.keys(this.setup.data);
        for (let word of words) {
            this._checkIfFound(word);
        }
        let unFound = words.filter(word => {
            return !this.setup.data[word].isFound;
        });
        if (unFound.length === 0) {
            this.isFinished = true;
        }
    }

    _checkIfFound(word) {
        if (!this.setup.data[word].isFound) {
            let unSelected = this.setup.data[word].tiles.filter(tile => {
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
        let maxLength = 0;
        let data = {};
        for (let word of words) {
            if (!data[word]) {
                data[word] = {
                    isOnBoard: false,
                    isFound: false,
                    length: word.length,
                    letters: word.split(),
                    tiles : []
                }
            }
            maxLength = word.length > maxLength? word.length: maxLength;
        }
        maxLength = maxLength > words.length ? maxLength : words.length;
        return { maxLength, data };
    }

    selectLetter(letter) {
        this.selected += letter;
        console.log(Game.selected);
    }

    resetSelected() {
        this.selected = "";
    }

    _reverse(word) {
        let revd = "";
        for (let i = word.length-1; i >=0; i--) {
            revd += word[i];
        }
        return revd;
    }

    isFound(letters) {
        let revd = this._reverse(letters);
        let words = Object.keys(this.setup.data);
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
        console.log('in app start');
        let msg = document.getElementById("message");
        msg.innerHTML = "start!";
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
const app = new App(words);
app.start();