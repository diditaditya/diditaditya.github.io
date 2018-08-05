class Board {
    constructor(setup, event) {
        this.event = event;
        this.board = [];
        this.data = setup.data;
        this.padding = 2;
        this.rowAmount = setup.maxLength + this.padding;
        this.colAmount = setup.maxLength + this.padding;
        this._generateEmptyBoard();
        this.placeWords();
        this.fillEmpties();
    }

    _generateEmptyBoard() {
        for (let i = 0; i < this.rowAmount; i++) {
            let row = [];
            for (let j = 0; j < this.colAmount; j++) {
                let tile = new Tile(this.event);
                tile.setPosition(i, j);
                row.push(tile);
            }
            this.board.push(row);
        }
    }

    _reverse(word) {
        let revd = "";
        for (let i = word.length-1; i >=0; i--) {
            revd += word[i];
        }
        return revd;
    }

    _randomBool() {
        let bools = [true, false];
        let idx = Math.floor(Math.random()*bools.length);
        return bools[idx];
    }

    _randomlySelectWord() {
        let notOnBoard = Object.keys(this.data).filter(word => {
            return !this.data[word].isOnBoard;
        });
        let luckyNumber = Math.floor(Math.random()*notOnBoard.length);
        let word = notOnBoard[luckyNumber];
        let words = notOnBoard.filter(item => {
            return item !== word;
        })
        return {word, words};
    }

    _randomlyPlaceOneWord(word) {
        let len = word.length;
        let pos = null;
        let dirs = ['x', 'y'];
        let dir = dirs[Math.floor(Math.random()*dirs.length)];
        if (dir == 'x') {
            pos = Math.floor(Math.random()*this.rowAmount);
        } else {
            pos = Math.floor(Math.random()*this.colAmount);
        }
        let space = this._getAvailableSpace(pos, dir);
        let fit = space.filter(avail => {
            if (avail.length >= len) { return avail };
        });
        let wordToPlace = this._randomBool() ? this._reverse(word) : word;
        if (fit.length > 0) {
            let luck = Math.floor(Math.random()*fit.length);
            let venue = fit[luck];
            let pad = venue.length - len;
            pad = Math.floor(Math.random()*pad);
            let start = venue.start+pad;
            let end = venue.start+len+pad;
            for (let i = start; i < end; i++) {
                if (dir === 'x') {
                    let tile = this.board[pos][i];
                    tile.setLetter(wordToPlace[i - start]);
                    this.data[word].tiles.push(tile);
                } else {
                    let tile = this.board[i][pos];
                    tile.setLetter(wordToPlace[i - start]);
                    this.data[word].tiles.push(tile);
                }
            }
            this.data[word].isOnBoard = true;
        }
    }

    _checkWordsLeft() {
        return Object.keys(this.data).filter(item => {
            return !this.data[item].isOnBoard;
        });
    }

    placeWords() {
        while (this._checkWordsLeft().length > 0) {
            let rolled = this._randomlySelectWord();
            let word = rolled.word;
            this._randomlyPlaceOneWord(word);
        }
    }

    fillEmpties() {
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        chars.split();
        for (let i = 0; i < this.rowAmount; i++) {
            for (let j = 0; j < this.colAmount; j++) {
                let tile = this.board[i][j];
                if (tile.letter === null) {
                    let idx = Math.floor(Math.random()*chars.length);
                    let filler = chars[idx];
                    tile.setLetter(filler);
                }
            }
        }
    }

    _getAvailableSpace(pos, dir) {
        let available = [];
        if (dir === 'x') {
            let space = { dir, pos, start: null, end: null, length: 0, indices: []};
            for (let i = 0; i < this.board[pos].length; i++) {
                if ( i === this.board[pos].length - 1) {
                    space.end = i-1;
                    space.length = space.indices.length;
                    available.push(space);
                    space = { dir, pos, start: null, end: null, length: 0, indices: []};
                } else if ( this.board[pos][i].letter === null) {
                    if (space.start === null) {
                        space.start = i;
                    }
                    space.indices.push(i);
                } else {
                    space.end = i-1;
                    space.length = space.indices.length;
                    available.push(space);
                    space = { dir, pos, start: null, end: null, length: 0, indices: []};
                }
            }
        } else {
            let space = { dir, pos, start: null, end: null, length: 0, indices: []};
            for (let i = 0; i < this.rowAmount; i++) {
                if (i === this.rowAmount - 1) {
                    space.end = i-1;
                    space.length = space.indices.length;
                    available.push(space);
                    space = { dir, pos, start: null, end: null, length: 0, indices: []};
                } else if (this.board[i][pos].letter === null) {
                    if (space.start === null) {
                        space.start = i;
                    } 
                    space.indices.push(i);
                } else {
                    space.end = i-1;
                    space.length = space.indices.length;
                    available.push(space);
                    space = { dir, pos, start: null, end: null, length: 0, indices: []};
                }
            }
        }
        return available;
    }
}