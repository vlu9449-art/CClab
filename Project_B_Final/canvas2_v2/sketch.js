let sections = [];
let sbg = [];
let page = 0;

let bg;
let pix = [];
let img = [];
let imgH, imgW;
let autoScrollSpeed = 3;
let scrollZone = 150;

// let handPose;
// let video;
// let hands = [];
// let options = { maxHands: 1, flipped: true };
// let p1;
// let p2;

let cameraMode = false;

function preload() {
  bg = loadImage("assets/Yulan.JPG");
  for (let i = 1; i < 29; i++) {
    let fileName = 'assets/' + i + '.jpg';
    img.push(loadImage(fileName));
  }
  sbg[0] = loadImage("assets/view.jpg");
  sbg[1] = loadImage("assets/ppl.jpg");
  sbg[2] = loadImage("assets/food.jpg");
  //  handPose = ml5.handPose(options);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  if (page === 0) {
    setupIndex();
  }
  // let numRows = 3;
  // let rowSpacing = height / 3;

  // for (let i = 0; i < img.length; i++) {
  //   let r = i % numRows;
  //   let y = height / 5 + r * rowSpacing;
  //   let x = random(-width, width);
  //   let baseSpeed = 0.3 + i * 0.05;
  //   pix.push(new Pix(img[i], x, y, baseSpeed));
  // }

  // video = createCapture(VIDEO);
  // video.size(windowWidth, windowHeight);
  // video.hide();
  // cameraMode = true;
  // //Start detecting hands from the webcam video
  // handPose.detectStart(video, gotHands);
}

// // Callback function for when handPose outputs data
// function gotHands(results) {
//   // Save the output to the hands variable
//   hands = results;
// }

// function hideVideo() {
//   push();
//   translate(width / 2, height / 2);
//   scale(-1, 1);
//   image(video, 0, 0, width, height);
//   pop();
// }

function draw() {
  //background(225);
  if (page === 0) {
    drawIndexPage();
  }
  // if (cameraMode) {
  //   hideVideo();
  // }
  // image(bg, width / 2, height / 2, width, height);

  // for (let i = 0; i < img.length; i++) {
  //   pix[i].update();
  //   pix[i].display();
  // }

  // // Draw all tracked hand points
  // for (let i = 0; i < hands.length; i++) {
  //   let hand = hands[i];
  //   for (let j = 0; j < hand.keypoints.length; j++) {
  //     p1 = hand.keypoints[4];
  //     p2 = hand.keypoints[8];
  //     fill(120, 140, 180);
  //     noStroke();
  //     circle(p1.x, p1.y, 10);
  //     circle(p2.x, p2.y, 10);
  //   }
  // }
}

function setupIndex() {
  let sectionWidth = width / 3;

  //sections start to appear
  sections.push({
    x: 0,
    w: sectionWidth,
    text: "View",
    alpha: 0,
    startFrame: 0,
    img: sbg[0]
  });

  sections.push({
    x: sectionWidth,
    w: sectionWidth,
    text: "People",
    alpha: 0,
    startFrame: 50,  //start later
    img: sbg[1]
  });

  sections.push({
    x: sectionWidth * 2,
    w: sectionWidth,
    text: "Food",
    alpha: 0,
    startFrame: 100,
    img: sbg[2]
  });
}

function drawIndexPage() {
  background(0);
  for (let i = 0; i < sections.length; i++) {
    let s = sections[i];

    //fade in using alpha
    let fadeSpeed = 3;
    if (frameCount > s.startFrame && s.alpha < 255) {
      s.alpha += fadeSpeed;
      s.alpha = min(s.alpha, 255);
    }

    //draw section images
    if (s.img) {
      push();
      tint(255, s.alpha); //fade image in
      image(s.img, s.x + s.w / 2, height / 2, s.w, height);
      pop();
    }

    //draw thin deviding line between sections
    if (i < sections.length - 1) {
      stroke(240, s.alpha);
      strokeWeight(3);
      line(s.x + s.w, 0, s.x + s.w, height);
    }

    //guide of section choice (box + text)
    fill(45, 85);
    noStroke();
    rect(width / 2 - 240, 65, 650, 40);
    rect(width / 2 + 150, 135, 800, 40);

    fill(230, s.alpha);
    textFont("Serif");
    textSize(30);
    stroke(45);
    strokeWeight(2);
    text('I have divided my memories into different sections.', width / 2 - 240, 65);
    text('Please choose a specific type of moment you would like to see...', width / 2 + 150, 135);

    //draw text boxes
    push();
    let img = s.img; //section images
    img.loadPixels();

    let h = 3 * height / 4 + 8 * sin(frameCount * 0.05);

    //pixel index
    let px = floor(s.x + s.w / 2);
    let py = floor(h);
    let idx = (px + py * img.width) * 4;
    //define color according to pixel index
    let r = img.pixels[idx];
    let g = img.pixels[idx + 1];
    let b = img.pixels[idx + 2];
    //define opacity according to mouse position
    let inTextBox = mouseX >= s.x + s.w / 2 - 100 && mouseX <= s.x + s.w / 2 + 100 && mouseY >= h - 40 && mouseY <= h + 40;
    let o = 90;
    if (inTextBox) {
      o = 220;
    }
    fill(r, g, b, o);
    noStroke();
    rect(s.x + s.w / 2, h, 200, 80);
    //draw text
    textFont('Serif');
    fill(250, s.alpha);
    textSize(65);
    stroke(70);
    strokeWeight(3);
    text(s.text, s.x + s.w / 2, h);
    pop();
  }
}

function drawDay() {

}

function drawEve() {

}

function drawNight() {

}

function drawFood() {

}