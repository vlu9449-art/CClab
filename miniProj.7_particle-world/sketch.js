// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 10; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 50; // Decide the maximum number of particles.

let particles = [];
let n = 5;
let mic;
let sound1, sound2, sound3;

function preload() {
  sound1 = loadSound("assets/Big Fish.mp3");
  sound2 = loadSound("assets/Star Fish.mp3");
  sound3 = loadSound("assets/Fu-Guang.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100);
  mic = new p5.AudioIn();
  mic.start();

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

//Ensure audio context + mic start after user action
function ensureAudio() {
  if (getAudioContext().state !== "running") {
    userStartAudio();
  }
  mic.start();
}

function keyPressed() {
  ensureAudio();
  particles.push(new Particle(random(width), random(height)));
}

function mousePressed() {
  ensureAudio();
  if (mouseX < 330 && sound1.isPlaying() == false && sound2.isPlaying() == false && sound3.isPlaying() == false) {
    sound1.play();
  } else if (mouseX > 330 && mouseX < 660 && sound1.isPlaying() == false && sound2.isPlaying() == false && sound3.isPlaying() == false) {
    sound2.play();
  } else if (mouseX > 660 && sound1.isPlaying() == false && sound2.isPlaying() == false && sound3.isPlaying() == false) {
    sound3.play();
  } else if (sound1.isPlaying() == true || sound2.isPlaying() == true || sound3.isPlaying() == true) {
    sound1.pause();
    sound2.pause();
    sound3.pause();
  }
}

function draw() {
  background(62, 60, 25, 2);
  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    if (i % 3 === 0) {
      p.direction();
    } else {
      p.update();
    }
    p.display();

    // limit the number of particles
    if (particles.length > MAX_OF_PARTICLES) {
      particles.splice(0, 3); // remove the first (oldest) 
    }
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
    this.dia = random(4, 17);
    this.angle = radians(frameCount * 0.05);
  }

  // methods (functions): particle's behaviors
  update() {
    //voice control the speed
    let f = map(mic.getLevel(), 0, 1, 0.2, 0.8);
    this.angle += radians(0.5 * f * PI);
  }

  direction() {
    let f = map(mic.getLevel(), 0, 1, 0.2, 0.7);
    this.angle -= radians(0.5 * f * PI);
  }

  display() {
    // particle's appearance
    push();
    rotate(this.angle);
    translate(this.x, this.y);

    let h = map(cos(frameCount * 0.05), -1, 1, 10, 70);
    let bs = map(frameCount * 0.02, 0, 100, 70, 100);
    let t = map(frameCount * 0.02, 0, 100, 80, 90);
    stroke(h, 20, bs, t);
    strokeWeight(1.5);
    let c = map(cos(frameCount * 0.03), -1, 1, 0, 100);
    let s = frameCount * 0.01 % 30;
    let b = map(frameCount * 0.1, 0, 100, 60, 90);
    fill(c, s, b, 80);

    //particle: stars
    beginShape();
    for (let i = 0; i < n; i++) {
      let freq = map(frameCount * 0.05, 0, width, 0.4, 0.7);
      let spikes = map(frameCount * 0.08, 0, height, 3, 10);
      let angle = map(i, 0, n, -2 * PI, 2 * PI);
      let offset = map(i, 0, n, -spikes * 3 * PI, spikes * 3 * PI);

      //spinning speed
      let sp = map(cos(frameCount * 0.01), 0, 1, 0.05, 0.02);

      //size & breathing animation of the particle
      let p = this.dia + 0.5 * sin(frameCount * 0.0);
      let r = p + 0.5 + sin(frameCount * 0.05 * freq * sp + offset);

      this.x = this.x0 + r * cos(angle);
      this.y = this.y0 + r * sin(angle);

      curveVertex(this.x, this.y);

      //line(this.px, this.py, this.x, this.y);
    }
    endShape(CLOSE);
    pop();
  }

  //particle: 1/4 note
  // stroke(0);
  // strokeWeight(1.2);
  // ellipse(this.x0, this.y0, 13, 10);
  // // stroke(0);
  // // strokeWeight(1.5);
  // line(this.x0 + 7, this.y0 - 1, this.x0 + 13, this.y0 - 31);
  // arc(this.x0 + 16, this.y0 - 22, 10, 20, 255, 90);

  //particle: 1/8 notes
  // stroke(0);
  // strokeWeight(0.5);
  // ellipse(this.x0, this.y0, 13, 10);
  // ellipse(this.x0 + 28, this.y0 - 8, 13, 10);

  // strokeWeight(2);
  // line(this.x0 + 7, this.y0 - 30, this.x0 + 33, this.y0 - 38);
  // line(this.x0 + 7, this.y0 - 23, this.x0 + 23, this.y0 - 31);

  // stroke(0);
  // strokeWeight(1.5);
  // line(this.x0 + 6, this.y0, this.x0 + 6, this.y0 - 30);
  // line(this.x0 + 34, this.y0 - 8, this.x0 + 34, this.y0 - 38);

}