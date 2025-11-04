// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 5; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 200; // Decide the maximum number of particles.

let particles = [];
let n = 50;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100);

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(60, width - 60), random(60, height - 60));
  }
}

function draw() {
  background(30);

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
  constructor(x, y) {
    // properties (variables): particle's characteristics
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
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

    let h = map(cos(frameCount * 0.05), -1, 1, 10, 70);
    let bs = map(frameCount * 0.02, 0, 100, 70, 100);
    let t = map(frameCount * 0.02, 0, 100, 80, 90);
    stroke(h, 20, bs, t);
    strokeWeight(1.5);
    let c = map(cos(frameCount * 0.01), -1, 1, 0, 100);
    let s = frameCount * 0.01 % 30;
    let b = map(frameCount * 0.1, 0, 100, 60, 90);
    fill(c, s, b, 20);

    //particle
    beginShape();
    for (let i = 0; i < n; i++) {
      //particle
      let freq = map(frameCount * 0.05, 0, width, 0.1, 0.8);
      let spikes = map(frameCount * 0.05, 0, height, 1, 10);
      let angle = map(i, 0, n, -2 * PI, 2 * PI);
      let offset = map(i, 0, n, -spikes * PI, spikes * PI);

      //spinning speed
      let sp = map(cos(frameCount * 0.005), 0, 1, 0.05, 0.02);

      //size & breathing animation of the particle
      let p = this.dia + 2 * sin(frameCount * 0.05);
      let r = p + sin(frameCount * freq * sp + offset);

      this.x = this.x0 + r * cos(angle);
      this.y = this.y0 + r * sin(angle);

      curveVertex(this.x, this.y);
    }
    endShape(CLOSE);
    pop();
  }
}
