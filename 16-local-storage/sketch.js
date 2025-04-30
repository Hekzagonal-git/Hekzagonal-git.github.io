// Local Storage Demo
// Luke P-F
// 4/30/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let numberOfClicks =  0;
let highestClickEver = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (getItem("highClick")) {
    highestClickEver = getItem("highClick");
  }
}

function mousePressed() {
  numberOfClicks++;
  if (numberOfClicks > highestClickEver) {
    highestClickEver = numberOfClicks;
    storeItem("highClick", highestClickEver);
  }
}

function displayClicks() {
  fill("black");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(numberOfClicks, width/2, height/2);
}

function displayHighest() {
  fill("green");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(highestClickEver, width/2, height/2 - 200);
}

function draw() {
  background(220);

  displayClicks();
  displayHighest();
}