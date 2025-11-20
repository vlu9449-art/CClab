//Pixel Array
let img;
let cam;
function preload() {
  img = loadImage("assets/hokusai.jpg");
}

function setup() {
  let canvas = createCanvas(600, 400, WEBGL);
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO);
  cam.hide();
}
let s = 10;
function draw() {
  background(0);

  //make picture 3D
  // img.loadPixels(); //very important!
  // for (let x = 0; x < img.width; x += s) {
  //   for (let y = 0; y < img.height; y += s) {
  //     let i = (y * img.width + x) * 4; //i as index
  //     let r = img.pixels[i + 0];
  //     let g = img.pixels[i + 1];
  //     let b = img.pixels[i + 2];
  //     let z = map(b, 0, 255, mouseY, 0);
  //     push();
  //     translate(-width / 2, -height / 2, z);
  //     fill(r, g, b)
  //     noStroke();
  //     rect(x, y, s);
  //     pop();
  //   }
  // }


  // for (let n = 0; n < 100; n++) {
  //   //paint circles with color from the picture
  //   let x = int(random(cam.width)); //int or floor
  //   let y = int(random(cam.height));
  //   let s = random(5, 30);

  //   let i = (y * cam.width + x) * 4;
  //   let r = cam.pixels[i + 0];
  //   let g = cam.pixels[i + 1];
  //   let b = cam.pixels[i + 2];
  //   fill(r, g, b);
  //   noStroke();
  //   circle(x, y, s);
  // }


  // let i = (height / 2 * width / 2 + width / 2) * 4; //i as index
  // let r = cam.pixels[i + 0];
  // let g = cam.pixels[i + 1];
  // let b = cam.pixels[i + 2];
  // background(r, g, b);

  //show image in pixels
  cam.loadPixels(); //very important!
  for (let x = 0; x < cam.width; x += s) {
    for (let y = 0; y < cam.height; y += s) {
      let i = (y * cam.width + x) * 4; //i as index
      let r = cam.pixels[i + 0];
      let g = cam.pixels[i + 1];
      let b = cam.pixels[i + 2];
      let z = map(b, 0, 255, 500, 0);
      push();
      translate(-width / 2, -height / 2, z);
      fill(r, g, b)
      noStroke();
      rect(x, y, s);
      pop();
    }
  }
}