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
        for (var i = 0; i < this.rowAmount; i++) {
            var row = [];
            for (var j = 0; j < this.colAmount; j++) {
                var tile = new Tile(this.event);
                tile.setPosition(i, j);
                row.push(tile);
            }
            this.board.push(row);
        }
    }

    _reverse(word) {
        var revd = "";
        for (var i = word.length-1; i >=0; i--) {
            revd += word[i];
        }
        return revd;
    }

    _randomBool() {
        var bools = [true, false];
        var idx = Math.floor(Math.random()*bools.length);
        return bools[idx];
    }

    _randomlySelectWord() {
        var notOnBoard = Object.keys(this.data).filter(word => {
            return !this.data[word].isOnBoard;
        });
        var luckyNumber = Math.floor(Math.random()*notOnBoard.length);
        var word = notOnBoard[luckyNumber];
        var words = notOnBoard.filter(item => {
            return item !== word;
        })
        return {word, words};
    }

    _randomlyPlaceOneWord(word) {
        var len = word.length;
        var pos = null;
        var dirs = ['x', 'y'];
        var dir = dirs[Math.floor(Math.random()*dirs.length)];
        if (dir == 'x') {
            pos = Math.floor(Math.random()*this.rowAmount);
        } else {
            pos = Math.floor(Math.random()*this.colAmount);
        }
        var space = this._getAvailableSpace(pos, dir);
        var fit = space.filter(avail => {
            if (avail.length >= len) { return avail };
        });
        var wordToPlace = this._randomBool() ? this._reverse(word) : word;
        if (fit.length > 0) {
            var luck = Math.floor(Math.random()*fit.length);
            var venue = fit[luck];
            var pad = venue.length - len;
            pad = Math.floor(Math.random()*pad);
            var start = venue.start+pad;
            var end = venue.start+len+pad;
            for (var i = start; i < end; i++) {
                if (dir === 'x') {
                    var tile = this.board[pos][i];
                    tile.setLetter(wordToPlace[i - start]);
                    this.data[word].tiles.push(tile);
                } else {
                    var tile = this.board[i][pos];
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
            var rolled = this._randomlySelectWord();
            var word = rolled.word;
            this._randomlyPlaceOneWord(word);
        }
    }

    fillEmpties() {
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        chars.split();
        for (var i = 0; i < this.rowAmount; i++) {
            for (var j = 0; j < this.colAmount; j++) {
                var tile = this.board[i][j];
                if (tile.letter === null) {
                    var idx = Math.floor(Math.random()*chars.length);
                    var filler = chars[idx];
                    tile.setLetter(filler);
                }
            }
        }
    }

    _getAvailableSpace(pos, dir) {
        var available = [];
        if (dir === 'x') {
            var space = { dir, pos, start: null, end: null, length: 0, indices: []};
            for (var i = 0; i < this.board[pos].length; i++) {
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
            var space = { dir, pos, start: null, end: null, length: 0, indices: []};
            for (var i = 0; i < this.rowAmount; i++) {
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