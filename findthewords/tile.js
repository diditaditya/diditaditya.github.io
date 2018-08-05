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

    printLetter(letter) {
        console.log(letter);
        return letter;
    }

    select() {
        if (!this.isFound) {
            this.isSelected = !this.isSelected;
        }
        if (this.isSelected) {
            this.event.emit('printLetter', this.letter);
        }
    }

    found() {
        this.isFound = true;
    }

    reset() {
        this.isSelected = false;
        this.isFound = false;
    }
}