// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let terrain = [];
const NUMBER_OF_RECTS = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  spawnRectangle();
  time += 10;
}

function generateTerrain() {
  for (let i = 0; i < NUMBER_OF_RECTS; i++) {
    terrain.push(spawnRectangle(i * widthOfRect; random(height), widthOfRect))
  }
}
function spawnRectangle(leftSide, rectHeight, rectWidth) {
  let theRect = {
    x: leftSide,
    w: rectWidth,
    h: rectHeight,
  }
}