let x = [];
let y = [];
let s = [];
let speedX = [];
let n = 10;
function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  // x[0] = random(width);
  // y[0] = random(height);
  // s[0] = random(50, 150);
  // speedX[0] = map(s[0], 50, 150, 3, 0.5);
  // x[1] = random(width);
  // y[1] = random(height);
  // s[1] = random(50, 150);
  // speedX[1] = 3;
  //...

  //for loop version of the above setup
  // for (let i = 0; i < n; i++) {
  //   x[i] = random(width);
  //   y[i] = random(height);
  //   s[i] = random(50, 150);
  //   speedX[i] = map(s[i], 50, 150, 3, 0.5)
  // }
}

//if want others to decide how many clouds they want
function mousePressed() {
  x.push(mouseX);
  y.push(mouseY);
  s.push(random(50, 150));
  speedX.push(map(100, 50, 150, 3, 0.5));
}

function draw() {
  background(220);
  for (let i = 0; i < x.length; i++) {
    drawCloud(x[i], y[i], s[i]);
  }
  move();
  console.log[x.length];
}

function drawCloud(x, y, s) {
  fill(255, 230);
  push();
  noStroke();
  translate(x, y);
  //main circle
  circle(0, 0, s);
  //add circles around
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    let s2 = map(noise(angle), 0, 1, s * 0.1, s * 0.6);
    circle(s * 0.5, 0, s2);
    pop();
  }
  pop();
}

function move() {
  for (let i = 0; i < x.length; i++) {
    x[i] = x[i] + speedX[i];
    if (x[i] > width + 100) {
      x[i] = random(-width * 0.3, -width);
    }
    y[i] = height * noise(frameCount * 0.003);
  }
}

