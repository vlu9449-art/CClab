let x = 0;
let y = 0;
function setup() {
  let canvas = createCanvas(700, 600);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
  fill(0)
  circle(x, y,50)
  
  if(mouseIsPressed == true){   
    x = lerp(x, mouseX, 0.1);
    y = lerp(y, mouseY, 0.1);
  }
}