//View pix
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

//ppl pix
class PixP {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.x0 = x;
        this.y0 = y;
        this.imgH = random(180, 240);
        this.imgW = (img.width / img.height) * this.imgH;
        this.growth = 4;
        this.walkPass = false;
    }
    update() {
        this.x = lerp(this.x0, this.x0 - 600, 0.1);
        this.y = lerp(this.y0, this.y0 + 300, 0.1);
        this.imgH += this.growth;
        this.imgW += (this.img.width / this.img.height) * this.growth;

        if (this.imgH > 400 || this.imgW > 600) {
            this.walkPass = true;
        }
    }
    display() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.imgW, this.imgH);
    }
}

// food pix
class PixF {
    constructor(img, x, y) {
        this.img = img;
        this.pos = createVector(x, y);
        this.pos.y = y;
        this.size = 250;
        this.remove = false;
    }
    update(mouthOpen, mouthPos) {
        if (mouthOpen && mouthPos) {
            //move to mouth
            this.pos.lerp(mouthPos, 0.1);
            //shrink
            this.size *= 0.9;
            //disappear
            if (this.size < 10) {
                this.remove = true;
            }
        }
    }
    display(mouthOpen) {
        image(this.img, this.pos.x, this.pos.y, this.size, this.size)
    }
}
