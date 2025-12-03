let bg, pv;
// let sounds = [];
// let regions = [];
let ship, wind, wave, bell;
let s = 30;
function preload() {
  bg = loadImage("assets/SH-bg-painting.JPG");
  pv = createVideo("assets/SH-pv.mp4");
  ship = loadSound("assets/ships.mp3");
  wave = loadSound("assets/wave.mp3");
  wind = loadSound("assets/flag.mp3");
  bell = loadSound("assets/DongfangHong.mp3");
  crowd = loadSound("assets/crowd.mp3");
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  imageMode(CENTER);

  pv.hide();
  pv.size(720, 440);
  pv.elt.volume = 1.0;
}

function keyPressed() {
  if (keyCode === ENTER) {
    pv.play();
  } else if (keyCode === SHIFT) {
    pv.pause();
  } else if (keyCode === LEFT_ARROW) {
    pv.stop();
  }
}

function setAmbientVolume(v) {
  ship.setVolume(v);
  wave.setVolume(v);
  wind.setVolume(v - 0.2);
  bell.setVolume(v);
  crowd.setVolume(v - 0.3);
}

function draw() {
  image(bg, width / 2, height / 2, width, height + 100);
  image(pv, width / 2, height / 2 + 80);
  let pvPlaying = pv && !pv.elt.paused;

  if (!pv.elt.paused) {
    setAmbientVolume(0);
  } else {
    setAmbientVolume(0.7);
  }

  //sound trigger in different areas
  //river
  let inRiverRegion1 = mouseX >= windowWidth * 160 / 1710 && mouseX <= windowWidth * 500 / 1710 && mouseY >= 390 && mouseY <= 580;
  let inRiverRegion2 = mouseX >= windowWidth * 1210 / 1710 && mouseX <= windowWidth * 1600 / 1710 && mouseY >= 360 && mouseY <= 560;
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
  let inWindRegion = mouseX >= windowWidth * 230 / 1710 && mouseX <= windowWidth * 350 / 1710 && mouseY >= 185 && mouseY <= 250;

  if (inWindRegion && !wind.isPlaying()) {
    wind.loop();
  }

  if (!inWindRegion && wind.isPlaying()) {
    wind.stop();
  }

  //bell tower
  let inBellTower = mouseX >= windowWidth * 165 / 1710 && mouseX <= windowWidth * 315 / 1710 && mouseY >= 550 && mouseY <= height;

  if (inBellTower && !bell.isPlaying()) {
    bell.play();
  }
  if (!inBellTower && bell.isPlaying()) {
    bell.stop();
  }

  //crowd
  let inCrowd1 = mouseX >= windowWidth * 316 / 1710 && mouseX <= windowWidth && mouseY >= height / 2 + 305 && mouseY <= height;
  let inCrowd2 = mouseX >= windowWidth * 550 / 1710 && mouseX <= windowWidth * 1300 / 1710 && mouseY >= height / 2 - 190 && mouseY <= height / 2 - 145;
  let crowdShouldPlay = inCrowd1 || inCrowd2;

  if (crowdShouldPlay && !crowd.isPlaying()) {
    crowd.loop();
  }
  if (!crowdShouldPlay && crowd.isPlaying()) {
    crowd.stop();
  }
}

function mousePressed() {
  userStartAudio();
}

