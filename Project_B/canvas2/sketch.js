let bg;
let pix = [];
let img = [];
let imgH, imgW;
let autoScrollSpeed = 3;
let scrollZone = 150;

function preload() {
  bg = loadImage("assets/Yulan.png");
  for (let i = 1; i < 29; i++) {
    let fileName = 'assets/' + i + '.jpg';
    img.push(loadImage(fileName));
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight * 1.28);
  canvas.parent("p5-canvas-container");
  imageMode(CENTER);

  let numRows = 3;
  let rowSpacing = height / 3;

  for (let i = 0; i < img.length; i++) {
    let r = i % numRows;
    let y = height / 5 + r * rowSpacing;
    let x = random(-width, width);
    let baseSpeed = 0.3 + i * 0.05;
    pix.push(new Pix(img[i], x, y, baseSpeed));
  }
}

function draw() {
  background(225);
  tint(255, 100);
  image(bg, width / 2, height / 2, width, height);

  noTint();
  for (let i = 0; i < img.length; i++) {
    pix[i].update();
    pix[i].display();
  }
}