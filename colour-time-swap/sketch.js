let someTime = 2000;
let isWhite = true;
let backgroundColour = 255;
let lastSwitchedTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function swapStateIfNeeded() {
  if (millis() > lastSwitchedTime + someTime) {
    isWhite = !isWhite;
    lastSwitchedTime = millis();
  }
}

function showBackground() {
  if (isWhite) {
    background(255);
  }
  else {
    background(0);
  }
}

function draw() {
  swapStateIfNeeded();
  showBackground();
}