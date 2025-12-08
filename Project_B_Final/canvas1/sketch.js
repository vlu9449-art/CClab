let bg, pv;
// let sounds = [];
// let regions = [];
let ship, wind, wave, bell, crowds, trees, rings, bike;
let s = 30;
let bellTriggered = false;
function preload() {
  bg = loadImage("assets/SH-bg-painting.JPG");
  pv = createVideo("assets/SH-pv.mp4");
  ship = loadSound("assets/ships.mp3");
  wave = loadSound("assets/wave.mp3");
  wind = loadSound("assets/flag.mp3");
  bell = loadSound("assets/DongfangHong.mp3");
  crowd = loadSound("assets/crowd.mp3");
  birds = loadSound("assets/birds.mp3");
  trees = loadSound("assets/trees.mp3");
  rings = loadSound("assets/rings.mp3");
  bike = loadSound("assets/bike.mp3");
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
  if (keyCode === SPACE) {
    pv.play();
  } else if (keyCode === SHIFT) {
    pv.pause();
  } else if (keyCode === LEFT_ARROW) {
    pv.stop();
  }
}

function reminder() {

}

function setAmbientVolume(v) {
  ship.setVolume(v - 0.1);
  wave.setVolume(v);
  wind.setVolume(v);
  bell.setVolume(v + 0.4);
  crowd.setVolume(v - 0.2);
  birds.setVolume(v - 0.2);
  trees.setVolume(v + 0.5);
  rings.setVolume(v);
  bike.setVolume(v - 0.4);
}

function draw() {
  image(bg, width / 2, height / 2, width, height + 100);
  image(pv, width / 2, height / 2 + 80);

  if (!pv.elt.paused) {
    setAmbientVolume(0);
  } else {
    setAmbientVolume(0.5);
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
  if (riverShouldPlay) {
    noFill();
    stroke(30, 100, 255, 40);
    strokeWeight(8);
    rect(windowWidth * 160 / 1710, 390, 340 * windowWidth / 1710, 190);
    rect(windowWidth * 1210 / 1710, 360, 390 * windowWidth / 1710, 200);
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
  let inBellTower = mouseX >= windowWidth * 175 / 1710 && mouseX <= windowWidth * 305 / 1710 && mouseY >= 560 && mouseY <= height;

  if (inBellTower && !bell.isPlaying() && !bellTriggered) {
    bell.play();
    bellTriggered = true;

  }
  if (!pv.elt.paused && bell.isPlaying() && mouseY > height) {
    bell.stop();
    bellTriggered = false;
  }
  if (inBellTower) {
    noFill();
    stroke(255, 255, 50, 100);
    strokeWeight(5);
    rect(windowWidth * 175 / 1710, 560, 130 * windowWidth / 1710, height - 560);
  }

  //crowd
  let inCrowd1 = mouseX >= windowWidth * 316 / 1710 && mouseX <= windowWidth && mouseY >= height / 2 + 305 && mouseY <= height;
  let inCrowd2 = mouseX >= windowWidth * 550 / 1710 && mouseX <= windowWidth * 1300 / 1710 && mouseY >= height / 2 - 190 && mouseY <= height / 2 - 145;
  let crowdShouldPlay = inCrowd1 || inCrowd2;

  if (crowdShouldPlay && !crowd.isPlaying()) {
    crowd.loop();
  }
  if (!crowdShouldPlay && crowd.isPlaying() && mouseY > height) {
    crowd.stop();
  }

  //nature
  let inNature1 = mouseX >= windowWidth * 20 / 1710 && mouseX <= windowWidth * 170 / 1710 && mouseY >= 420 && mouseY <= 630;
  let inNature2 = mouseX >= windowWidth * 310 / 1710 && mouseX < windowWidth / 2 - 360 && mouseY >= 570 && mouseY <= height / 2 + 280;
  let natureShouldPlay = inNature1 || inNature2;

  if (natureShouldPlay && !birds.isPlaying() && !trees.isPlaying() && !rings.isPlaying() && !bike.isPlaying()) {
    birds.loop();
    trees.loop();
    rings.loop();
    bike.loop();
  }
  if (!natureShouldPlay && birds.isPlaying() && trees.isPlaying() && trees.isPlaying() && bike.isPlaying()) {
    birds.stop();
    trees.stop();
    rings.stop();
    bike.stop();
  }
  if (natureShouldPlay) {
    noFill();
    stroke(120, 255, 120, 90);
    strokeWeight(7);
    rect(windowWidth * 20 / 1710, 420, 150 * windowWidth / 1710, 210);
    rect(windowWidth * 310 / 1710, 570, windowWidth / 2 - 360 - windowWidth * 310 / 1710, height / 2 - 290);
  }
}

function mousePressed() {
  userStartAudio();
}

