class Rain {
  constructor(x, y, h) {
    this.x = x + random(-30, 30);
    this.y = y;
    this.h = h;
  }

  display() {
    stroke(this.h, 20, 100, 80);
    strokeWeight(2.5);
    line(this.x, this.y, this.x, this.y + 3);
  }

  update() {
    this.y += 10;
  }

  isOutCanvas() {
    if (this.y > height + 5) {
      return true;
    } else {
      return false;
    }
  }
}