class View {
    constructor(el) {
        this._mainElement = null;
        this._children = [];
        this.setMainElement(el);
    }

    setMainElement(el) {
        console.log('setting the main element..');
        if (el.id) {
            this._mainElement = document.getElementById(el.id);
        } else if (el.name) {
            this._mainElement = document.getElementsByName(el.name);
        } else {
            this._mainElement = el;
        }
    }

    get mainElement() {
        return this._mainElement;
    }
}
