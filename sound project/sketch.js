let mySound;
let sound1, sound2;
let x = 25;
let speedX = 5;
function preload() {
  sound1 = loadSound("assets/kick.mp3");
  sound2 = loadSound("assets/beat.mp3");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
  fill(0);
  circle(x, height / 2, 50);
  x = x + speedX;
  // mySound.play();
  if (x <= 25) {
    speedX = -speedX;
    sound1.play();
  }
  if (x >= width - 25) {
    speedX = -speedX;
    sound2.play();
  }

  // function mousePressed() {
  //   if (mySound.isPlaying() == false) {
  //     mySound.play();
  //   } else {
  //     mySound.pause();
  //   }
  // }
}

