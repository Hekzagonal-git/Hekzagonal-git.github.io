// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theTimer; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  theTimer = new Timer (3000, true);
}

function draw() {
  background(220);
  if (theTimer.expired()) {
    background("red");
  }
}
