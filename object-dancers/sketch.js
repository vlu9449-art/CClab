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
    this.y = height / 2 + 15 + 30 * sin(frameCount * 0.08);
  }

  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ⬇️ draw your dancer from here ⬇️
    let cycle = 500;
    let flashFrames = 200;

    // smooth ramp during the flash window
    let flashMix = 0;
    if ((frameCount % cycle) < flashFrames) {
      flashMix = sin(((frameCount % cycle) / flashFrames) * PI);
      //ease in/out
    }


    //background small flames
    if ((frameCount % cycle) < flashFrames) {
      for (let R = 60; R < 100; R += 30) {
        for (let angle = -PI / 9; angle <= 8 * PI / 7; angle += PI / 5) {
          fill(255, 174, 66, 160);
          let x = map(cos(angle), -1, 1, -R, R);
          let y = map(cos(R * sin(angle)), -1, 1, -5 - R, 5 + R);
          let s = map(sin(frameCount * 0.07), 0, 2 * PI, 5, 20);
          ellipse(x, y, s - 4, s);
          ellipse(x - 0.6, y + 0.6, s - 4, s - 0.2);
          ellipse(x + 0.6, y + 0.6, s - 4, s - 0.2);
        }
      }
    }

    // size boost for flames while flashing
    let flameScale = map(sin(frameCount * 0.05), -1, 1, 1, 1 + 2.7 * flashMix);

    //normal torch body
    let n_yb = 80;
    let n_xtl = map(cos(frameCount * 0.06), -1, 1, -8, -11);
    let n_xtr = map(cos(frameCount * 0.06), -1, 1, 8, 11);
    let n_yt = map(cos(frameCount * 0.08), -1, 1, 22, 42);

    let n_xr = map(cos(frameCount * 0.06), -1, 1, -12, -15);
    let n_yr = map(cos(frameCount * 0.08), -1, 1, 8, 28);
    let n_w = map(cos(frameCount * 0.06), -1, 1, 24, 30);
    let n_l = map(cos(frameCount * 0.06), -1, 1, 6, 5.5);

    //expanded torch body
    let e_yb = 90;
    let e_xtl = -15;
    let e_xtr = 15;
    let e_yt = 18;
    let e_xr = -20;
    let e_yr = 3;
    let e_w = 40;
    let e_l = 8;

    //draw torch body
    let baseBodyCol = color(143, 0, 255);
    let whiteCol = color(255);
    let bodyCol = lerpColor(baseBodyCol, whiteCol, 0.8);

    fill(baseBodyCol);
    stroke(255);
    strokeWeight(0.3);
    triangle(0, n_yb, n_xtr, n_yt, n_xtl, n_yt);
    rect(n_xr, n_yr, n_w, n_l);

    if (frameCount % cycle < flashFrames) {
      fill(bodyCol);
      stroke(255);
      strokeWeight(1);
      triangle(0, e_yb, e_xtr, e_yt, e_xtl, e_yt);
      rect(e_xr, e_yr, e_w, e_l);
    }

    //arms & hands
    if ((frameCount % cycle) < flashFrames) {
      let x1 = map(cos(frameCount * 0.1), -1, 1, -40, -10);
      let y1 = map(sin(frameCount * 0.1), -1, 1, 20, 60);
      fill(255, 205, 205, 230);
      line(-10, 18, x1, y1);
      circle(x1, y1, 25);
      let x2 = map(sin(frameCount * 0.12), -1, 1, 10, 40);
      let y2 = map(cos(frameCount * 0.12), -1, 1, 20, 60);
      fill(255, 205, 205, 230);
      line(10, 18, x2, y2);
      circle(x2, y2, 25);
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
      let x = 25 * sin(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 60, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 10 + 23 * sin(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 18 * sin(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 25) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 20 * sin(frameCount * 0.06 + i * 0.02) - 20;
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }

    //2
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 50, 0);
      let x = 25 * cos(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 60, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = -10 + 23 * cos(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 28) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 18 * cos(frameCount * 0.06 + i * 0.02);
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 3, 25) * flameScale;
      let y = map(i, 0, 100, 38, 0);
      let x = 20 * cos(frameCount * 0.06 + i * 0.02) - 20;
      if (frameCount % cycle < flashFrames) {
        y = map(i, 0, 100, 48, 10);
      }
      circle(x, -12 - y, s);
    }

    //additional dancing flame
    fill(143, 0, 255, 8);
    stroke(255, 229, 180, 8);
    strokeWeight(0.3);
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 2, 12);
      let y = 15 + map(i, 0, 100, 6, 24);
      let x = 40 + 2 * sin(frameCount * 0.2 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 2, 10);
      let y = 15 + map(i, 0, 100, 12, 24);
      let x = 43 + 2 * sin(frameCount * 0.2 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 2, 10);
      let y = 15 + map(i, 0, 100, 12, 24);
      let x = 37 + 2 * sin(frameCount * 0.2 + i * 0.02);
      circle(x, y, s);
    }

    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 15);
      let y = 55 + map(i, 0, 100, 8, 24);
      let x = -38 + 4 * sin(frameCount * 0.15 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 12);
      let y = 55 + map(i, 0, 100, 12, 24);
      let x = -40 + 4 * sin(frameCount * 0.15 + i * 0.02);
      circle(x, y, s);
    }
    for (let i = 0; i < 100; i++) {
      let s = map(i, 0, 100, 4, 12);
      let y = 55 + map(i, 0, 100, 12, 24);
      let x = -35 + 4 * sin(frameCount * 0.15 + i * 0.02);
      circle(x, y, s);
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