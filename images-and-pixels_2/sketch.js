//Pixel Array
let img;
let cam;
let t = 10;
let colorToTrack;
let firstPixel = false;
function preload() {
  img = loadImage("assets/hokusai.jpg");
}
function mousePressed() {
  cam.loadPixels();
  colorToTrack = cam.get(mouseX, mouseY);
  console.log(colorToTrack);
}

function setup() {
  let canvas = createCanvas(600, 400); //WEBGL);
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO);
  cam.hide();
  colorToTrack = color(0, 0, 0);
}

//let s = 10;

function findColor(input, c, t) {
  let cr = c[0];
  let cg = c[1];
  let cb = c[2];
  let cx = 0;
  let cy = 0;
  input.loadPixels();
  for (let x = 0; x < input.width; x++) {
    for (let y = 0; y < input.height; y++) {
      let i = (y * img.width + x) * 4; //i as index
      let r = input.pixels[i + 0];
      let g = input.pixels[i + 1];
      let b = input.pixels[i + 2];

      //if the color we are scanning 
      if (r > cr - t && r < cr + t &&
        g > cg - t && g < cg + t &&
        b > cb - t && b < cb + t) {
        cx = x; //positions for the color that is found
        cy = y;
        fill(colorToTrack);
        //noStroke();
        circle(cx, cy, 30);
      }
    }
  }
}

function draw() {
  background(0);
  image(cam, 0, 0);
  if (firstPixel != undefined) {
    fill(colorToTrack);
    strokeWeight(2);
    stroke(255);
    circle(cx, cy, 30);
  }
  console.log(firstPixel);
  findColor(cam, colorToTrack, t);
  //

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
  // cam.loadPixels(); //very important!
  // for (let x = 0; x < cam.width; x += s) {
  //   for (let y = 0; y < cam.height; y += s) {
  //     let i = (y * cam.width + x) * 4; //i as index
  //     let r = cam.pixels[i + 0];
  //     let g = cam.pixels[i + 1];
  //     let b = cam.pixels[i + 2];
  //     //brightness of the pixel
  //     let br = (r + g + b) / 3;
  //     let z = map(b, 0, 255, 500, 0);
  //     push();
  //     translate(-width / 2, -height / 2, z);
  //     fill(r, g, b)
  //     noStroke();
  //     rect(x, y, s);
  //     pop();
  //   }
  // }
}