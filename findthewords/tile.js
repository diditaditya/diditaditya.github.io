class Tile {
    constructor(event) {
        this.event = event;
        this.letter = null;
        this.isSelected = false;
        this.isFound = false;
        this.x = 0;
        this.y = 0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setLetter(letter) {
        this.letter = letter;
    }

    select() {
        if (!this.isFound) {
            this.isSelected = !this.isSelected;
        }
        if (this.isSelected) {
            this.event.emit('selectLetter', this.letter);
        }
    }

    unSelect() {
        this.isSelected = false;
    }

    found() {
        this.isFound = true;
    }

    reset() {
        this.isSelected = false;
        this.isFound = false;
    }
}