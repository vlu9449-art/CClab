let bg, pv;
// let sounds = [];
// let regions = [];
let ship, wind, wave, bell;
let s = 30;
function preload() {
  bg = loadImage("assets/SH-bg-painting.JPG");
  pv = loadImage("assets/promotion video substitute.jpg");
  ship = loadSound("assets/ships.mp3");
  wave = loadSound("assets/wave.mp3");
  wind = loadSound("assets/flag.mp3");
  bell = loadSound("assets/DongfangHong.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  //canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  imageMode(CENTER);
}

// function doubleClicked() {
//   pv.loadPixels();
//   for (let x = 0; x < pv.width; x += s) {
//     for (let y = 0; y < pv.height; y += s) {
//       let i = (y * pv.width + x) * 4; //i as index
//       let r = pv.pixels[i + 0];
//       let g = pv.pixels[i + 1];
//       let b = pv.pixels[i + 2];

//       push();
//       let z = map(b, 0, 255, mouseY, 0);
//       translate(-width / 2, -height / 2, z);
//       fill(r, g, b)
//       noStroke();
//       rect(0, 0, s, s);
//       pop();
//     }
//   }
// }

function draw() {
  image(bg, width / 2, height / 2, width, height + 100);
  image(pv, width / 2, height / 2 + 80, 720, 450);

  //sound trigger in different areas
  //river
  let inRiverRegion1 = mouseX >= 160 && mouseX <= 500 && mouseY >= 390 && mouseY <= 580;
  let inRiverRegion2 = mouseX >= 1210 && mouseX <= 1600 && mouseY >= 360 && mouseY <= 560;
  let riverShouldPlay = inRiverRegion1 || inRiverRegion2;

  if (riverShouldPlay && !ship.isPlaying() && !wave.isPlaying()) {
    ship.loop();
    wave.loop();
  }
  if (!riverShouldPlay && ship.isPlaying() && wave.isPlaying()) {
    ship.stop();
    wave.stop();
  }

  //flag
  let inWindRegion = mouseX >= 230 && mouseX <= 350 && mouseY >= 185 && mouseY <= 250;

  if (inWindRegion && !wind.isPlaying()) {
    wind.loop();
  }

  if (!inWindRegion && wind.isPlaying()) {
    wind.stop();
  }

  //bell tower
  let inBellTower = mouseX >= 165 && mouseX <= 315 && mouseY >= 550 && mouseY <= height;

  if (inBellTower && !bell.isPlaying()) {
    bell.play();
  }
  if (!inBellTower && bell.isPlaying()) {
    bell.stop();
  }
}

function mousePressed() {
  userStartAudio();
}

