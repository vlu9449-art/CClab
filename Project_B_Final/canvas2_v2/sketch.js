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
let p1;
let p2;

let cameraMode = false;

function preload() {
  bg = loadImage("assets/Yulan.JPG");
  for (let i = 1; i < 29; i++) {
    let fileName = 'assets/' + i + '.jpg';
    img.push(loadImage(fileName));
  }
  handPose = ml5.handPose(options);
}

function setup() {
  //let canvas = createCanvas(windowWidth * 1.2, windowHeight * 1.36);
  let w = windowWidth * 1.2;
  let h = windowHeight * 1.36;

  let canvas = createCanvas(w, h);
  // make the whole document at least as wide as the canvas
  document.body.style.width = w + 'px';
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
  video.size(windowWidth, windowHeight);
  video.hide();
  cameraMode = true;
  //Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function hideVideo() {
  push();
  translate(width / 2, height / 2);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();
}

function draw() {
  background(225);
  if (cameraMode) {
    hideVideo();
  }
  image(bg, width / 2, height / 2, width, height);

  for (let i = 0; i < img.length; i++) {
    pix[i].update();
    pix[i].display();
  }

  // Draw all tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      p1 = hand.keypoints[8];
      p2 = hand.keypoints[7];
      fill(120, 140, 180);
      noStroke();
      circle(p1.x, p1.y, 10);
      circle(p2.x, p2.y, 10);
    }
  }
}