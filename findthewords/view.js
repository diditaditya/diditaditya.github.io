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
        let self = this;
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
        let el = this.doc.getElementById(word);
        el.innerHTML = null;
        let struck = this.doc.createElement("strike");
        struck.innerHTML = word;
        el.appendChild(struck); 
    }

    resetTileColor() {
        let rows = this.container.childNodes;
        for (let i = 0; i < rows.length; i++) {
            let cards = rows[i].childNodes;
            for (let j = 0; j < cards.length; j++) {
                let card = cards[j];
                let tile = this.tiles[i][j];
                if (!tile.isFound) {
                    card.style.backgroundColor = "gray";
                }
            }
        }
    }

    showHint() {
        let words = Object.keys(this.data);
        let unFound = words.filter(word => !this.data[word].isFound);
        let idx = Math.floor(Math.random()*unFound.length);
        let word = unFound[idx];
        for (let tile of this.data[word].tiles) {
            tile.card.style.backgroundColor = "white";
            setTimeout(() => {
                tile.card.style.backgroundColor = "gray"
            }, 250);
        }
    }

    showWordsList() {
        let numOfDivs = 2;
        for (let i = 0; i < numOfDivs; i++) {
            let div = this.doc.createElement("div");
            div.style.width = "50%";
            div.style.float = "left";
            div.style.textAlign = "center";
            this.wordsList.appendChild(div);
        }
        let words = Object.keys(this.data);
        let numOfWords = Math.floor(words.length/numOfDivs);
        let start = 0;
        for (let i = 0; i < numOfDivs; i++) {
            let list = this.doc.createElement("ul");
            list.style.listStyleType = "none";
            for (let j = start; j < start+numOfWords; j++) {
                if (words[j]) {
                    let item = this.doc.createElement("li");
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
        let id = `${row}-${col}`;
        let tile = this.tiles[row][col];
        let card = this.doc.createElement("div");
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
        for (let row = 0; row < this.rowAmount; row++) {
            let id = `row-${row}`;
            let rowDiv = this.doc.createElement("div");
            rowDiv.setAttribute("id", id);
            this.container.appendChild(rowDiv);
        }
    }

    createTiles() {
        let rows = this.container.children;
        for (let row = 0; row < this.rowAmount; row++) {
            for (let col = 0; col < this.colAmount; col++) {
                rows[row].appendChild(this._createTile(row, col));
            }
        }
    }
}