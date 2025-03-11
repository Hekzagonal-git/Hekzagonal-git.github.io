// Perlin Noise Demo
// Moving a circle
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill("black");
  x = noise(time) * width;
  y = noise(100, time) * height;
  circle(x,  y, 50);

  time += 0.01;
}
