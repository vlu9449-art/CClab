/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let rectSize = 5;
let ss = 100;
let xc, yc, d;
let x_ini, y_ini;
let R = 0;
let c, s, b;
let cb, sb, bb;
let wb, lb;
let ex, ey;
let cx, cy;
let cr, sr, br;
let n = 50;
let x, y;
let angle;
let xe1, xe2;
let x1, x2;
let xS, yS;
let we, le;
let w, l;
let sgrid = 30;
let xl, yl;
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    colorMode(HSB, 100);
    ex = width/3;
    ey = height - height/3;
    cx = ex;
    cy = ey;
}

function draw() { 
  
  //water surface
   for(let y = 0; y < height; y += rectSize){
    let h = map(y, 0, width, 56, 67);
    sb = map(sin(frameCount*0.01), -1, 1, 55, 65);
    bb = map(sin(frameCount*0.01), -1, 1, 56, 68);
    let op = map(sin(frameCount*0.1), -1, 1, 0, 95);
    fill(h, sb, bb, op);
    noStroke();
    rect(0, y, width, rectSize);
   }
  
  //ripples
  drawRipple(350, 100, 450);
  drawRipple(90, height/2-50, 270);
  drawRipple(260, 420, 450);
  drawRipple(-290, 400-58, 450);
  drawRipple(-70, 0.005, 450);
  
  //stars
  fill(random(13,16), 70, 100, 70);
  circle(random(0,width), random(0,height),random(1,4));
  
  //moon
  fill(0, 0, 100, 75);
  stroke(0, 0, 100, 20);
  strokeWeight(2);
  x = 100 + cos(frameCount*0.0005) * 600;
  y = -50 + sin(frameCount*0.0005) * 600;
  arc(x, y, 65, 65, -PI/3, 2*PI/3);
  
  //shooting star
  if(mouseIsPressed){
    xl = width+80 - frameCount%280 * 6;
    yl = frameCount%280 * 3.9;
    shootingStar(xl, yl);
  }
  
  //circles in the back
  for (let i = 0; i < width; i+=sgrid) {
    for (let j = 0; j < width; j+=sgrid) {
      let d = dist(xS, yS, i, j);
      d = constrain(d, 0, 200);
      let f = map(d, 0, 200, 20, 0);
      push();
      translate(i,j);
      stroke(0, 0, 98, 75);
      noFill();
      strokeWeight(0.05);
      circle(0, 0, s*f);
      pop();
    }
  }

  xS = map(noise(frameCount*0.004), 0, 1, 50, width);
  yS = map(noise(frameCount*0.003), 0, 1, 50, height);
  
  //wings
  if(keyIsDown(88)){       
      let s = mouseX * 0.25;
      drawWings1(xS, yS-42, s);
      drawWings2(xS, yS-42, s);
  }

  //creature
  drawCreature(xS, yS);
  
  //circles
  drawBackground(xS, yS);
  
  //arms
  if(keyIsDown(67)){
    drawArm1(xS-65, yS+12);
    drawArm2(xS+70, yS+7);
  }
}


function drawCreature(x, y) {
  let d = dist(x,y, mouseX, mouseY);
  push();
  translate(x, y);

  //creature color
  stroke(16, 20, 98);
  strokeWeight(1.5);
  cr = map(cos(frameCount*0.008),-1,1,0,100);
  sr = frameCount*0.01%30;
  br = frameCount*0.1;
    if(br > 100){
      br = 100;
    }
  fill(cr,sr,br);

  //creature
  beginShape();
  
  //interactive creature
  for(let i=0; i< n; i++){
    //creature transformation with mouse
    let f = map(d, 0, width,0.8, 0.1);
    let spikes = map(d, 0, width, 1, 20);
    angle = map(i, 0, n, -2*PI, 2*PI);
    let offset = map(i, 0, n, -spikes*PI, spikes*PI);
    
    //spinning speed decreases with mouse distance
    let sp = map(d, 0, width, 0.001, 0.02);
    
    //size & breathing animation of the creature
    let p = 100 + 10 * sin(frameCount*0.05);
    let r = p + 10 * sin(frameCount*f*sp + offset);
    
    let xs = 0;
    let ys = 0;

    x = xs + r * cos(angle);
    y = ys + r * sin(angle);

    curveVertex(x, y);
  }
  endShape(CLOSE);
    

  if(keyIsPressed == false){
    //eyes closed
    stroke(0);
    strokeWeight(1);
    noFill();
    arc(xe1, y-2, we, le/2, 0, PI);
    arc(xe2, y-2, we, le/2, 0, PI);
    
    //eyelash
    stroke(16, 20, 98);
    strokeWeight(2.5);
    noFill();
    arc(xe1, y, we+2, le/2, PI/10, 9*PI/10);
    arc(xe2, y, we+2, le/2, PI/10, 9*PI/10);
  }
  
  if(keyIsDown(90)){
    //eyes open
    strokeWeight(0.6);
    fill(20);
    xe1 = x * 0.6 - 78;
    xe2 = x * 0.6 - 23;
    we = 15 + sin(frameCount*0.05);
    le = 30 + 3 * sin(frameCount*0.05);
    ellipse(xe1, y+10, we, le);
    ellipse(xe2, y+10, we, le);
  
    //eye light
    noStroke();
    fill(100);
    w = 8 + 2 * sin(frameCount*0.05);
    l = 12 + sin(frameCount*0.05);
    ellipse(xe1, y+5, w, l);
    ellipse(xe2, y+5, w, l);
  }
 
  pop();
}

function drawWings1(x, y, s){
  push();
  translate(x, y);
  angle = map(sin(frameCount*0.08), -1, 1, -PI/10, PI/10);
  
  stroke(16, 20, 98);
  beginShape();
  let lineLength = s;
  for(let i= -lineLength; i <= lineLength; i += lineLength/10){
    let v = s*0.1*sin(frameCount*0.1-i/(s*0.1));
    fill(100);
    strokeWeight(s*0.08);
    curveVertex(i, v);
  }
  rotate(angle);
  endShape();
  
  pop();
}

function drawWings2(x, y, s){
  push();
  translate(x, y);
  angle = map(cos(frameCount*0.08), -1, 1, -PI/2, PI/2);
  
  stroke(16, 20, 98);
  beginShape();
  let lineLength = s;
  for(let i= -lineLength; i <= lineLength; i += lineLength/10){
    let v = s*0.1*sin(frameCount*0.1-i/(s*0.1));
    fill(100);
    strokeWeight(s*0.08);
    curveVertex(i, v);
  }
  rotate(angle);
  endShape();
  
  pop();
}

function drawArm1(x, y){
  push();
  translate(x, y);
  angle = map(cos(frameCount*0.08), -1, 1, PI/3, 9*PI/10);
  
  stroke(40);
  beginShape();
  let lineLength = 38 + 2*sin(frameCount*0.08);
  for(let i= 0; i < lineLength; i += lineLength/20){
    let v = lineLength*0.02*sin(frameCount*0.01-i/(lineLength*0.1));
    strokeWeight(4);
    curveVertex(i, v);
  }
  rotate(angle);
  endShape();
  
  pop();
}

function drawArm2(x, y){
  push();
  translate(x, y);

  angle = map(cos(frameCount*0.08), -1, 1, 4*PI/7, 4*PI/5);
  
  stroke(40);
  beginShape();
  let lineLength = 36 + 2*sin(frameCount*0.08);
  for(let i= 0; i < lineLength; i += lineLength/18){
    let v = lineLength*0.02*sin(frameCount*0.01-i/(lineLength*0.1));
    strokeWeight(4);
    curveVertex(i, v);
  }
  rotate(angle);
  endShape();
  
  pop();
}

function drawBackground(x_ini, y_ini) {

  let d = dist(x_ini,y_ini, mouseX, mouseY);
  //spiral movement
 
  d = constrain(d, 0, 300);
  let sp = map(d, 0, 300, 0.03, 0.01); 
  let xc = x_ini + cos(frameCount*sp) * R;
  let yc = y_ini + sin(frameCount*sp) * R;
  let xc2 = x_ini + sin(frameCount*sp) * R;
  let yc2 = y_ini + cos(frameCount*sp) * R;
  R = map(sin(frameCount*0.01), -1, 1, 120, 180);
  
  //creating circles
  d = map(sin(frameCount*0.08), -1, 1, 15, 40);
  stroke(16, 20, 98);
  strokeWeight(0.9);
  c = map(sin(frameCount*0.008), -1, 1, 0, 50);
  s = map(cos(frameCount*0.02), -1, 1, 8, 10);
  b = map(cos(frameCount*0.03), -1, 1, 80, 95);
  fill(c, s, b);
  circle(xc, yc, d);
  
  let c2 = map(sin(frameCount*0.008), -1, 1, 50, 100);
  fill(c2, s, b);
  circle(xc2, yc2, d);
  
}

function drawRipple(x, y, lineLength){
  push();
  translate(x, y);
  let d = 
  stroke(95);
  strokeWeight(0.7);
  noFill();
  beginShape();
  for(let i = 0; i <= lineLength; i += lineLength/15){
    let v = 4*sin(frameCount*0.08-i);
    vertex(i, v);
  }
  endShape();
  pop();

  push();
  translate(x, y);
  noStroke();
  fill(60, 80, 35);
  beginShape();
  let l = lineLength + 40
  for(let i = 0; i <= l; i += lineLength/15){
    let v = 6*sin(frameCount*0.08-i);
    vertex(i-5, v+5);
  }
  endShape();
  pop();

}

function shootingStar(xl, yl){
  for (let a = 0; a < 2 * PI; a += PI/5) {
    let angle = map(noise(frameCount+a), 0, 1, -3*PI/4, 0);
    let r = map(noise(frameCount+a), 0, 1, 70, 230);
    // let xl = width/6-10;
    // let yl = 4*height/5+20;

    let x = 4*width/7 + r * cos(a+angle);
    let y = 2*height/5 + r * sin(a+angle);

    
  //lines
  strokeWeight(0.1);
  let c = random(65, 80);
  stroke(c, 45, 100);
  line(xl, yl, x, y);
  }

  for (let a2 = 0; a2 < 2 * PI; a2 += PI/5) {
    let angle2 = map(noise(frameCount+a2), 0, 1, 0, 3*PI/4);
    let r2 = map(noise(frameCount+a2), 0, 1, 90, 270);
    // let xl = width/6-10;
    // let yl = 4*height/5+20;

    let x1 = 5*width/7 + r2 * cos(a2+angle2);
    let y1 = 3*height/7-100 + r2 * sin(a2+angle2);

    
  //lines
  strokeWeight(0.12);
  let c2 = random(12, 17);
  stroke(c2, 50, 93);
  line(xl, yl, x1, y1);
  }
  
}

