class Player {
    constructor(opt) {
        this.x = opt.x;
        this.y = opt.y;
        this.speed = opt.speed;
        this.facingRight = opt.facing ? (opt.facing === 'right' ? true: false) : true;
        this.headSize = opt.headSize;
        this.bodySize = opt.bodySize;
        this.armSize = opt.armSize;
        this.legSize = opt.legSize;
        this.layer = this._createLayer();
        this.head = this._createHead();
        this.face = this._createFace();
        this.body = this._createBody();
        this.rightArm = this._createRightArm();
        this.leftArm = this._createLeftArm();
        this.rightLeg = this._createRightLeg();
        this.leftLeg = this._createLeftLeg();
        this.facingRight ? null : this._flipFace();
        this._addPartsToLayer();
    }

    _flipFace() {
        let children = this.face.children;
        for (let child of children) {
            let newPoints = child.attrs.points.map((point, idx) => {
                if (idx%2 === 0) {
                    return this.x + (this.x - point);
                } else {
                    return point;
                }
            });
            child.attrs.points = newPoints;
        }
    }

    _flipBody() {
        if (this.facingRight) {
            this.leftArm.moveDown();
            this.leftLeg.moveDown();
            this.rightArm.moveUp();
            this.rightLeg.moveUp();
        } else {
            this.leftArm.moveUp();
            this.leftLeg.moveUp();
            this.rightArm.moveDown();
            this.rightLeg.moveDown();
        }
    }

    setCenter(x, y) {
        this.x = x;
        this.y = y;
    }

    _createLayer() {
        return new Konva.Layer();
    }

    _createHead() {
        let headSize = this.headSize;
        let head = new Konva.Circle({
            x: this.x,
            y: this.y - headSize,
            radius: headSize,
            fill: 'blue',
            stroke: 'black'
        });
        this.layer.add(head);
        return head;
    }

    _createFace() {
        let face = new Konva.Group();
        let eyes = new Konva.Line({
            points: [this.x, this.y-this.headSize, this.x+this.headSize, this.y-this.headSize],
            stroke: 'black',
        });
        let midEyes = (this.x + this.headSize/2);
        let nose = new Konva.Line({
            points: [midEyes, this.y-this.headSize, midEyes, this.y],
            stroke: 'black',
        });
        face.add(eyes);
        face.add(nose);
        return face;
    }

    _createBody() {
        let bodyHeight = this.bodySize.height;
        let bodyWidth = this.bodySize.width;
        let body = new Konva.Rect({
            x: this.x - bodyWidth/2,
            y: this.y,
            width: bodyWidth,
            height: bodyHeight,
            fill: 'red',
            stroke: 'black'
        });
        return body;
    }

    _createLeftArm() {
        let bodyWidth = this.bodySize.width;
        let armLength = this.armSize.length;
        let armWidth = this.armSize.width;
        let leftArm = new Konva.Rect({
            x: this.x + bodyWidth/2,
            y: this.y,
            width: armWidth,
            height: armLength,
            fill: 'gray',
            stroke: 'black',
            rotation: -15
        });
        return leftArm;
    }

    _createRightArm() {
        let bodyWidth = this.bodySize.width;
        let armLength = this.armSize.length;
        let armWidth = this.armSize.width;
        let rightArm = new Konva.Rect({
            x: this.x - bodyWidth/2 - armWidth,
            y: this.y,
            width: armWidth,
            height: armLength,
            fill: 'gray',
            stroke: 'black',
            rotation: 15
        });
        return rightArm;
    }

    _createLeftLeg() {
        let bodyWidth = this.bodySize.width;
        let bodyHeight = this.bodySize.height;
        let legLength = this.legSize.length;
        let legWidth = this.legSize.width;
        let leftLeg = new Konva.Rect({
            x: this.x + bodyWidth/2 - legWidth,
            y: this.y + bodyHeight,
            width: legWidth,
            height: legLength,
            fill: 'gray',
            stroke: 'black',
            rotation: -15
        });
        return leftLeg;
    }

    _createRightLeg() {
        let bodyWidth = this.bodySize.width;
        let bodyHeight = this.bodySize.height;
        let legLength = this.legSize.length;
        let legWidth = this.legSize.width;
        let rightLeg = new Konva.Rect({
            x: this.x - bodyWidth/2,
            y: this.y + bodyHeight,
            width: legWidth,
            height: legLength,
            fill: 'gray',
            stroke: 'black',
            rotation: 15
        });
        return rightLeg;
    }

    _addPartsToLayer() {
        if (this.facingRight) {
            this.layer.add(this.leftArm);
            this.layer.add(this.leftLeg);
            this.layer.add(this.body);
            this.layer.add(this.head);
            this.layer.add(this.face);
            this.layer.add(this.rightArm);
            this.layer.add(this.rightLeg);
        } else {
            this.layer.add(this.rightArm);
            this.layer.add(this.rightLeg);
            this.layer.add(this.body);
            this.layer.add(this.head);
            this.layer.add(this.face);
            this.layer.add(this.leftArm);
            this.layer.add(this.leftLeg);
        }
    }
}