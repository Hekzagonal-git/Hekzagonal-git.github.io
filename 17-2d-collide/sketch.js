// 2D Collide Library Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let hit = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  collideDebug(true);
}

function draw() {
  background(255);
  line(200, 300, 100, 150);
  circle(mouseX, mouseY, 50);

  hit = collideLineCircle(200, 300, 100, 150, mouseX, mouseY, 50);

  if (hit) {
    stroke("red");
  }
  else {
    stroke("black");
  }
  
  print('colliding?', hit);
}