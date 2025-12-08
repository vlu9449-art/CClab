let sections = [];
let sbg = [];
let page = 0;
let viewInitialized = false;
let pplInitialized = false;
let foodInitialized = false;

let bg;
let pix = [];
let vimg = [];
let pimg = [];
let fimg = [];
let imgH, imgW;
let autoScrollSpeed = 3;
let scrollZone = 150;

let bx = 20;
let by = 830;
let bw = 100;
let bh = 40;

let cameraMode = false;

let pics = [];
let people;
let handPose;
let video;
let hands = [];
let options1 = { maxHands: 1, flipped: true };

let tipX, tipY, palmX, palmY;
let wave = false;
let prevWave = false;

let fd;
let faceMesh;
let faces = [];

let options2 = { maxFaces: 1, refineLandmarks: false, flipped: false };



function preload() {
  //index page
  sbg[0] = loadImage("assets/view.jpg");
  sbg[1] = loadImage("assets/ppl.jpg");
  sbg[2] = loadImage("assets/food.jpg");

  birds = loadSound("assets/birds.mp3");
  trees = loadSound("assets/trees.mp3");
  rings = loadSound("assets/rings.mp3");
  bike = loadSound("assets/bike.mp3");
  crowd = loadSound("assets/crowd.mp3");
  stew = loadSound("assets/stew.mp3");

  //view page
  bg = loadImage("assets/Yulan.JPG")
  for (let i = 1; i < 18; i++) {
    let fileName = 'assets/v' + i + '.JPG';
    vimg.push(loadImage(fileName));
  }

  //people page
  people = loadImage("assets/people.JPG");
  for (let i = 1; i < 9; i++) {
    let fileName = 'assets/p' + i + '.JPG';
    pimg.push(loadImage(fileName));
  }
  handPose = ml5.handPose(options1);

  //food page
  fd = loadImage("assets/SHFood.JPG");
  for (let i = 1; i < 3; i++) {
    let fileName = 'assets/f' + i + '.JPG';
    fimg.push(loadImage(fileName));
  }
  faceMesh = ml5.faceMesh(options2);
}

function setAmbientVolume(v) {
  birds.setVolume(v - 0.2);
  trees.setVolume(v + 0.5);
  rings.setVolume(v);
  bike.setVolume(v - 0.4);
  crowd.setVolume(v - 0.2);
  stew.setVolume(v + 0.4);
}


//shared setup
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  setupIndex();
}




function draw() {

  if (page === 0) {
    drawIndexPage();

  } else if (page === 1) {
    if (!viewInitialized) {
      pix = [];
      setupView();
      viewInitialized = true;
    }
    drawView()

  } else if (page === 2) {
    if (!pplInitialized) {
      pix = [];
      setupPpl();
      pplInitialized = true;
    }
    drawPpl();

  } else if (page === 3) {
    if (!foodInitialized) {
      pix = [];
      setupFood();
      foodInitialized = true;
    }
    drawFood();
  }
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
    img: sbg[0],
    page: 1,
  });

  sections.push({
    x: sectionWidth,
    w: sectionWidth,
    text: "People",
    alpha: 0,
    startFrame: 30,  //start later
    img: sbg[1],
    page: 2,
  });

  sections.push({
    x: sectionWidth * 2,
    w: sectionWidth,
    text: "Food",
    alpha: 0,
    startFrame: 60,
    img: sbg[2],
    page: 3,
  });
}

function drawIndexPage() {
  background(20);
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
    rect(width / 2 - 338, 185, 455, 30);

    fill(230, s.alpha);
    textFont("Serif");
    stroke(45);
    strokeWeight(2);
    textSize(30);
    text('I have divided my memories into different sections.', width / 2 - 240, 65);
    text('Please choose a specific type of moment you would like to see...', width / 2 + 150, 135);
    textFont("Times New Roman");
    textSize(15);
    strokeWeight(1);
    text('(Click the mouse and then move it around... wait, do you hear something?)', width / 2 - 338, 185);

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

  //add sound
  setAmbientVolume(0.6);
  let view = mouseX < width / 3;
  if (view && !birds.isPlaying() && !trees.isPlaying() && !bike.isPlaying() && !rings.isPlaying()) {
    birds.loop();
    trees.loop();
    bike.play();
    rings.play();
  }
  if (!view && birds.isPlaying() && trees.isPlaying() && bike.isPlaying() && rings.isPlaying()) {
    birds.stop();
    trees.stop();
    bike.stop();
    rings.stop();
  }
  let ppl = mouseX > width / 3 && mouseX < 2 * width / 3;
  if (ppl && !crowd.isPlaying()) {
    crowd.play();
  }
  if (!ppl && crowd.isPlaying()) {
    crowd.stop();
  }
  let food = mouseX > 2 * width / 3;
  if (food && !stew.isPlaying()) {
    stew.play();
  }
  if (!food && stew.isPlaying()) {
    stew.stop();
  }
}

function mousePressed() {
  userStartAudio();

  if (page === 0) {
    for (let i = 0; i < sections.length; i++) {
      let s = sections[i];

      // compute the same h as in drawIndexPage
      let h = 3 * height / 4 + 8 * sin(frameCount * 0.05);

      let inTextBox =
        mouseX >= s.x + s.w / 2 - 100 &&
        mouseX <= s.x + s.w / 2 + 100 &&
        mouseY >= h - 40 &&
        mouseY <= h + 40;

      if (inTextBox) {
        birds.stop();
        trees.stop();
        bike.stop();
        rings.stop();
        crowd.stop();
        stew.stop();

        //go to the corresponding page
        page = s.page;
      }
    }
  }
  if (page !== 0) {
    let inBackButton =
      mouseX >= bx && mouseX <= bx + bw &&
      mouseY >= by && mouseY <= by + bh;

    if (inBackButton) {
      page = 0;
      viewInitialized = false; //re-set
      pplInitialized = false;
      foodInitialized = false;

      //reset or re-run index setup if needed
      sections = [];
      setupIndex();
    }
  }
}


//page = 1: View page
function setupView() {
  pix = [];

  for (let i = 0; i < vimg.length; i++) {
    let y = random(height / 5, 4 * height / 5);
    let x = random(-width, width);
    let baseSpeed = 0.3 + i * 0.1;
    pix.push(new Pix(vimg[i], x, y, baseSpeed));
  }
}

function drawView() {
  image(bg, width / 2, height / 2, windowWidth, windowHeight * 1.28);
  for (let i = 0; i < pix.length; i++) {
    pix[i].update();
    pix[i].display();
  }
  textSize(24);
  fill(255, 220);
  stroke(10);
  strokeWeight(2);
  text('Try moving your mouse left & right or up & down, see how it goes!', 350, 40);
  drawBackButton();
}


//page = 2: People page
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


function setupPpl() {
  pix = [];

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  cameraMode = true;
  //Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  if (cameraMode) {
    hideVideo();
  }
}

function waving() {
  prevWave = wave; //remember last frame

  if (!cameraMode || hands.length === 0) {
    wave = false;
    return;
  }

  let hand = hands[0];

  let t = hand.keypoints[12];//tip of middle finger
  tipX = width - t.x;
  tipY = t.y;
  let p = hand.keypoints[1]//palm
  palmX = width - p.x;
  palmY = p.y;

  let fistD = dist(tipX, tipY, palmX, palmY);
  wave = (fistD > 80);

  if (wave && !prevWave) {
    let img = random(pimg);
    pics.push(new Picture(img, width / 2 + 200, height / 2 + 100));
  }
}

function drawPpl() {
  image(people, width / 2, height / 2 - 100, windowWidth, windowHeight * 1.4);

  //update waving
  waving();

  // update + draw all pictures
  for (let i = pics.length - 1; i >= 0; i--) {
    pics[i].update();
    pics[i].display();

    // remove big ones
    if (pics[i].walkPass) {
      pics.splice(i, 1);
    }
  }

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let p1 = hand.keypoints[12];
    let p2 = hand.keypoints[1];

    fill(255, 180);
    noStroke();
    circle(width - p1.x, p1.y, 20);
    circle(width - p2.x, p2.y, 20);
  }
  fill(80, 180);
  stroke(230, 180);
  rect(width / 2, 60, 600, 40)
  textSize(24);
  fill(20, 220);
  stroke(255);
  strokeWeight(3);
  text('Try opening your hand and then close it to make fists!', width / 2, 60);

  drawBackButton();
}



//page = 3: Food page
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

function mouthInfo() {
  if (faces.length === 0) {
    return null;
  }

  let face = faces[0];
  let p1 = face.keypoints[0];
  let p2 = face.keypoints[14];
  fill(255);
  stroke(0);
  strokeWeight(2);
  circle(width - p1.x, p1.y, 30);
  circle(width - p2.x, p2.y, 30);
  let openness = dist(p1.x, p1.y, p2.x, p2.y);

  let center = createVector(
    (p1.x + p2.x) / 2,
    (p1.y + p2.y) / 2
  );

  return { openness, center };
}

function setupFood() {
  pix = [];

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  cameraMode = true;
  faceMesh.detectStart(video, gotFaces);
  if (cameraMode) {
    hideVideo();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    let x = random(width);
    let y = random(height);
    let idx = floor(random(fimg.length))
    pix.push(new PixF(fimg[idx], x, y));
  }
}


function drawFood() {
  image(fd, width / 2, height / 2, windowWidth, windowHeight);
  let mouthOpen = false;
  let mouthPos = null;
  let mouth = mouthInfo();
  if (mouth) {
    mouthOpen = mouth.openness > 40; // adjust threshold
    mouthPos = mouth.center;
  }
  for (let i = pix.length - 1; i >= 0; i--) {

    pix[i].update(mouthOpen, mouthPos);
    pix[i].display();

    if (pix[i].remove) {
      pix.splice(i, 1);
    }
  }

  fill(80, 180);
  stroke(230, 180);
  strokeWeight(0.5);
  rect(width / 2, 60, 600, 40)
  textSize(24);
  fill(20, 220);
  stroke(255);
  strokeWeight(3);
  text('Press SPACE and open your mouth!', width / 2, 60);
  drawBackButton();
}

//back button to the index page
function drawBackButton() {
  push();
  rectMode(CORNER);
  fill(230, 150);
  noStroke();
  rect(bx, by, bw, bh);

  fill(255);
  stroke(30);
  strokeWeight(3);
  textAlign(CENTER, CENTER);
  textSize(16);
  textFont('Serif');
  text("Back", bx + bw / 2, by + bh / 2);
  pop();
}
