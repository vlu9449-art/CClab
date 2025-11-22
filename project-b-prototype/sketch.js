let pv;
let s = 30;
function preload() {
  pv = loadImage("assets/promotion video substitute.jpg");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function doubleClicked() {
  pv.loadPixels();
  for (let x = 0; x < pv.width; x += s) {
    for (let y = 0; y < pv.height; y += s) {
      let i = (y * pv.width + x) * 4; //i as index
      let r = pv.pixels[i + 0];
      let g = pv.pixels[i + 1];
      let b = pv.pixels[i + 2];

      push();
      let z = map(b, 0, 255, mouseY, 0);
      translate(-width / 2, -height / 2, z);
      fill(r, g, b)
      noStroke();
      rect(0, 0, s, s);
      pop();
    }
  }
}

function draw() {
  background(255, 10);
  image(pv, 0, 0, width, height);


}