/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;
let t;
function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new VioletTorch(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class VioletTorch {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update() {
    this.x = width / 2 + 20 * cos(frameCount * 0.05);
    this.y = height / 2 + 15 + 30 * sin(frameCount * 0.1);
  }

  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ⬇️ draw your dancer from here ⬇️
    t = (frameCount * 0.5) % 60;
    let cycle = 500;
    let flashFrames = 200;

    // smooth ramp during the flash window
    let flashMix = 0;
    if ((frameCount % cycle) < flashFrames) {
      flashMix = (frameCount % cycle) / (flashFrames - 1);
      // 0 -> 1 across the flash
    }

    // size boost for flames while flashing
    let flameScale = map(sin(frameCount * 0.05), -1, 1, 1, 1 + 1.5 * flashMix);

    fill(143, 0, 255);
    stroke(255);
    strokeWeight(0.3);

    let xtl = map(cos(frameCount * 0.06), -1, 1, -8, -11);
    let xtr = map(cos(frameCount * 0.06), -1, 1, 8, 11);
    let yt = map(cos(frameCount * 0.1), -1, 1, 22, 42);
    triangle(0, 80, xtr, yt, xtl, yt);

    let xr = map(cos(frameCount * 0.06), -1, 1, -12, -15);
    let yr = map(cos(frameCount * 0.1), -1, 1, 8, 28);
    let w = map(cos(frameCount * 0.06), -1, 1, 24, 30);
    let l = map(cos(frameCount * 0.06), -1, 1, 6, 5.5);
    rect(xr, yr, w, l);

    if (frameCount % cycle < flashFrames) {
      xtl = -15;
      xtr = 15;
      yt = 18;
      xr = -20;
      yr = 4;
      w = 40;
      l = 8;
      triangle(0, 80, xtr, yt, xtl, yt);
      rect(xr, yr, w, l);
    }


    //flames
    // color blend: purple base -> hot orange when flashing
    let baseCol = color(143, 0, 255, 12);
    let hotCol = color(255, 180, 0, 8);
    let flameCol = lerpColor(baseCol, hotCol, flashMix);

    fill(flameCol);
    noStroke();

    //1
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 50, 0);
      let x = 25 * sin(frameCount * 0.05 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 60, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 10 + 23 * sin(frameCount * 0.05 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 18 * sin(frameCount * 0.05 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }

    //2
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 50, 0);
      let x = 25 * cos(frameCount * 0.05 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 60, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = -10 + 23 * cos(frameCount * 0.05 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 18 * cos(frameCount * 0.05 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }

    //add
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 25) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 20 * cos(frameCount * 0.05 + i * 0.02) - 20;
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 25) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 20 * sin(frameCount * 0.05 + i * 0.02) - 20;
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    // ⬆️ draw your dancer above ⬆️


    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    //this.drawReferenceShapes()

    pop();
  }

  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   strokeWeight(1);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/