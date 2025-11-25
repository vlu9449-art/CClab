let p = [];
let d = 10;
let back = false;
let img;
function preload() {
  img = loadImage("assets/hokusai.jpg");
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("p5-canvas-container");
  img.loadPixels(); //very important!!
  //creating grids
  for (let x = 0; x < img.width; x += d) {
    for (let y = 0; y < img.height; y += d) {
      let i = (y * img.width + x) * 4;
      let r = img.pixels[i + 0];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];

      p.push(new Particle(x, y, d, color(r, g, b)));
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < p.length; i++) {
    //always update before display
    if (mouseIsPressed) {
      back = false;
      p[i].update();
    }
    if (back) {
      p[i].putBack();
    }
    p[i].display();
  }
}

function keyPressed() {
  if (key == "b") {
    back = true;
  }
}

class Particle {
  constructor(x, y, s, c) {
    this.x = x;
    this.y = y;
    this.x0 = x; //store original values
    this.y0 = y;
    this.s = s;
    this.c = c;
    this.accX = 0;
    this.accY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.away = 0.3; //change this to make it go further

  }

  display() {
    noStroke();
    fill(this.c);
    push();
    translate(this.s / 2, this.s / 2); //to make the first line of circles be seen entirely (不translate会从 (0, 0)开始，圆被卡成一半)
    circle(this.x, this.y, this.s);
    pop();
  }

  update() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (d < 25) { //radius of the circle
      this.accX = (mouseX - this.x) * -this.away;
      this.accY = (mouseY - this.y) * -this.away;
      this.speedX += this.accX;
      this.speedY += this.accY;
    }
    this.speedX = this.speedX * 0.9; // 10% less per frame
    this.speedY = this.speedY * 0.9; // 10% less per frame

    this.x += this.speedX;
    this.y += this.speedY;
  }

  putBack() {
    this.x = lerp(this.x, this.x0, 0.1);
    this.y = lerp(this.y, this.y0, 0.1);
    this.accX = 0;
    this.accY = 0;
    this.speedX = 0;
    this.speedY = 0;
  }
}