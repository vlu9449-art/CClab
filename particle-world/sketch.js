// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 3; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 500; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100);

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(50);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    //circle(0, 0, this.dia);

    let h = map(frameCount * 0.01, 0, 100, 10, 70);
    let bs = map(frameCount * 0.02, 0, 100, 70, 100);
    let t = map(frameCount * 0.02, 0, 100, 70, 90);
    stroke(h, 20, bs, t);
    strokeWeight(1.5);
    let c = map(cos(frameCount * 0.008), -1, 1, 0, 100);
    let s = frameCount * 0.01 % 30;
    let b = frameCount * 0.1;
    if (b > 100) {
      b = 100;
    }
    fill(c, s, b, 20);

    //creature
    beginShape();
    for (let i = 0; i < n; i++) {
      //creature transformation with mouse
      let f = map(d, 0, width, 0.8, 0.1);
      let spikes = map(d, 0, width, 1, 20);
      angle = map(i, 0, n, -2 * PI, 2 * PI);
      let offset = map(i, 0, n, -spikes * PI, spikes * PI);

      //spinning speed decreases with mouse distance
      let sp = map(d, 0, width, 0.001, 0.02);

      //size & breathing animation of the creature
      let p = 100 + 10 * sin(frameCount * 0.05);
      let r = p + 10 * sin(frameCount * f * sp + offset);

      let xs = 0;
      let ys = 0;

      x = xs + r * cos(angle);
      y = ys + r * sin(angle);

      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
