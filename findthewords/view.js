class View {
    constructor(document, board, event) {
        this.event = event;
        this.doc = document;
        this.tiles = board.board;
        this.data = board.data;
        this.rowAmount = board.rowAmount;
        this.colAmount = board.colAmount;
        this.container = this.doc.getElementById("container");
        this.wordsList = this.doc.getElementById("words");
        this._createRows();
        this.createTiles();
        this.showWordsList();
        this.createSubscription();
    }

    createSubscription() {
        var self = this;
        this.event.subscribe("wordFound", (data) => {
            self.strikeWord(data);
        });
        this.event.subscribe("resetTileColor", () => {
            self.resetTileColor();
        });
        this.event.subscribe("showHint", () => {
            self.showHint();
        });
    }

    clear() {
        while (this.container.lastChild) {
            this.container.removeChild(this.container.lastChild);
        }
        while (this.wordsList.lastChild) {
            this.wordsList.removeChild(this.wordsList.lastChild);
        }
    }

    strikeWord(word) {
        var el = this.doc.getElementById(word);
        el.innerHTML = null;
        var struck = this.doc.createElement("strike");
        struck.innerHTML = word;
        el.appendChild(struck); 
    }

    resetTileColor() {
        var rows = this.container.childNodes;
        for (var i = 0; i < rows.length; i++) {
            var cards = rows[i].childNodes;
            for (var j = 0; j < cards.length; j++) {
                var card = cards[j];
                var tile = this.tiles[i][j];
                if (!tile.isFound) {
                    card.style.backgroundColor = "gray";
                }
            }
        }
    }

    showHint() {
        var words = Object.keys(this.data);
        var unFound = words.filter(word => !this.data[word].isFound);
        var idx = Math.floor(Math.random()*unFound.length);
        var word = unFound[idx];
        this.data[word].tiles.forEach(tile => {
            tile.card.style.backgroundColor = "white";
            setTimeout(() => {
                tile.card.style.backgroundColor = "gray"
            }, 250);
        });
    }

    showWordsList() {
        var numOfDivs = 2;
        for (var i = 0; i < numOfDivs; i++) {
            var div = this.doc.createElement("div");
            div.style.width = "50%";
            div.style.float = "left";
            div.style.textAlign = "center";
            this.wordsList.appendChild(div);
        }
        var words = Object.keys(this.data);
        var numOfWords = Math.floor(words.length/numOfDivs);
        var start = 0;
        for (var i = 0; i < numOfDivs; i++) {
            var list = this.doc.createElement("ul");
            list.style.listStyleType = "none";
            for (var j = start; j < start+numOfWords; j++) {
                if (words[j]) {
                    var item = this.doc.createElement("li");
                    item.innerHTML = words[j];
                    item.id = words[j];
                    list.appendChild(item);
                }
            }
            start = numOfWords;
            this.wordsList.childNodes[i].appendChild(list);
        }
    }

    _calcWidth(margin, colAmount) {
        return `${100/colAmount}%`
    }

    _addCardListener(card, tile) {
        card.addEventListener("mouseenter", function() {
            card.style.backgroundColor = "lightgray";
        });
        card.addEventListener("click", function() {
            this.isSelecting = !this.isSelecting;
            tile.select();
            if (tile.isSelected) {
                card.style.backgroundColor = "lightgray";
            } else {
                card.style.backgroundColor = "gray";
            }
        });
        card.addEventListener("mouseleave", function() {
            if (!tile.isSelected) {
                card.style.backgroundColor = "gray";
            }
        });
    }

    _createTile(row, col) {
        var id = `${row}-${col}`;
        var tile = this.tiles[row][col];
        var card = this.doc.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("id", id);
        card.style.width = this._calcWidth(this.margin, this.colAmount);
        card.style.cursor = 'pointer';
        this._addCardListener(card, tile);
        card.innerHTML = `${tile.letter}`;
        tile["card"] = card;
        return card;
    }

    _createRows() {
        for (var row = 0; row < this.rowAmount; row++) {
            var id = `row-${row}`;
            var rowDiv = this.doc.createElement("div");
            rowDiv.setAttribute("id", id);
            this.container.appendChild(rowDiv);
        }
    }

    createTiles() {
        var rows = this.container.children;
        for (var row = 0; row < this.rowAmount; row++) {
            for (var col = 0; col < this.colAmount; col++) {
                rows[row].appendChild(this._createTile(row, col));
            }
        }
    }
}