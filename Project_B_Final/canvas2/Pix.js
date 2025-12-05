class Pix {
    constructor(img, x, y, baseSpeed) {
        this.pix = img;
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.baseSpeed = baseSpeed;

        this.imgH = random(180, 240);
        this.imgW = (img.width / img.height) * this.imgH;
    }

    display() {
        image(this.pix, this.x, this.y, this.imgW, this.imgH);
    }

    update() {
        let rl = map(mouseX, 0, width, -2, 2);
        this.x += rl * this.baseSpeed;

        let ud = map(mouseY, 0, height, -0.6, 0.6);
        let wobble = ud * 20; // how far it can move up/down from its row
        this.y = this.baseY + wobble;

        if (this.x > width + this.imgW / 2) {
            this.x = -this.imgW / 2;
        } else if (this.x < -this.imgW / 2) {
            this.x = width + this.imgW / 2
        }
    }
}

