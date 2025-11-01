let c;
function setup() {
  //createCanvas(400, 400);
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  c = new Cloud(width / 2, height / 2); //we store an object in the variable
}

function draw() {
  background(220);
  c.display();
  c.move();
}

class Cloud {
  //constructor = setup()
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.s = 100;
  }

  //methods = functions
  display() {
    push();
    translate(this.x, this.y);

    //arm left
    beginShape();
    let lineLength = this.s * 0.5;
    noFill();
    for (let i = -lineLength * 2; i <= lineLength; i += lineLength / 20) {
      strokeWeight(this.s * 0.1);
      let v = this.s * 0.1 * sin(frameCount * 0.1 - i / (this.s * 0.1));
      vertex(i, v);
    }
    endShape();

    //arm right
    push();
    scale(-1, 1);//flip
    beginShape();
    lineLength = this.s * 0.5;
    noFill();
    for (let i = -lineLength * 2; i <= lineLength; i += lineLength / 20) {
      strokeWeight(this.s * 0.1);
      let v = this.s * 0.1 * sin(PI + frameCount * 0.1 - i / (this.s * 0.1));
      vertex(i, v);
    }
    endShape();
    pop();

    //main body
    noStroke();
    fill(255);
    circle(0, 0, this.s);
    //circles around the body
    for (let a = 0; a < 2 * PI; a += PI / 6) {
      push();
      rotate(a);
      circle(this.s * 0.5, this.s * 0.3, this.s * 0.5);
      pop();
    }
    //face
    fill(0);
    circle(-this.s * 0.3, 0, this.s * 0.05);
    circle(this.s * 0.3, 0, this.s * 0.05);
    arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
    pop();
  }

  move() {
    //this.y = height * noise(frameCount * 0.01);

    //move in a circle
    this.x = width / 2 + 50 * cos(frameCount * 0.05);
    this.y = height / 2 + 50 * sin(frameCount * 0.05);
    this.s = map(sin(frameCount * 0.1), -1, 1, 70, 100);
  }
}


//original codes
// function move() {
//   y = height * noise(frameCount * 0.01);
// }

// function drawCloud(u, v, this.s) {
//   push();
//   translate(u, v);
//   noStroke();
//   circle(0, 0, this.s);
//   //circles around the body
//   for (let a = 0; a < 2 * PI; a += PI / 6) {
//     push();
//     rotate(a);
//     circle(this.s * 0.5, this.s * 0.3, this.s * 0.5);
//     pop();
//   }
//   //face
//   fill(0);
//   circle(-this.s * 0.3, 0, this.s * 0.05);
//   circle(this.s * 0.3, 0, this.s * 0.05);
//   arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
//   pop();
// }