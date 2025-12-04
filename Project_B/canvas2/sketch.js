let bg;
let pix = [];
let img = [];
let imgH, imgW;
let autoScrollSpeed = 3;
let scrollZone = 150;
let handPose;
let video;
let hands = [];
let options = { maxHands: 1, flipped: false };
let p1 = 0;
let p2 = 0;

function preload() {
  bg = loadImage("assets/Yulan.png");
  for (let i = 1; i < 29; i++) {
    let fileName = 'assets/' + i + '.jpg';
    img.push(loadImage(fileName));
  }
  handPose = ml5.handPose(options);
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

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
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