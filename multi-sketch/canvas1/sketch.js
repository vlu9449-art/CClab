let bg, pv;
// let sounds = [];
// let regions = [];
let ship, wind;
let s = 30;
function preload() {
  bg = loadImage("assets/SH-bg-painting.JPG");
  pv = loadImage("assets/promotion video substitute.jpg");
  ship = loadSound("assets/ships.mp3");
  wind = loadSound("assets/flag.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
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

  let inShipRegion1 = mouseX >= 180 && mouseX <= 400 && mouseY >= 400 && mouseY <= 630;
  let inShipRegion2 = mouseX >= 1000 && mouseX <= 1330 && mouseY >= 360 && mouseY <= 640;
  let shipShouldPlay = inShipRegion1 || inShipRegion2;

  let inWindRegion = mouseX >= 220 && mouseX <= 400 && mouseY >= 185 && mouseY <= 260;
  // regions = [
  //   { x: 50, y: 200, w: 50, h: 100, soundIndex: 0 },
  //   { x: 800, y: 200, w: 100, h: 120, soundIndex: 0 },
  //   { x: 50, y: 120, w: 20, h: 15, soundIndex: 1 }
  // ];
  if (shipShouldPlay && !ship.isPlaying()) {
    ship.loop();
  }
  if (!shipShouldPlay && ship.isPlaying()) {
    ship.stop();
  }

  if (inWindRegion && !wind.isPlaying()) {
    wind.loop();
  }
  if (!inWindRegion && wind.isPlaying()) {
    wind.stop();
  }
}

function mousePressed() {
  userStartAudio();
}

