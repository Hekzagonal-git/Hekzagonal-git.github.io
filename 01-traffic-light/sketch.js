// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let activeLight = 0;
let lastChanged = 0;
const LIGHT_DURATIONS = [2000, 2000, 2000]; // G, Y, R

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  lightTimer();
  fillActiveLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function fillActiveLight() {
  if (activeLight === 0) {
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  if (activeLight === 1) {
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }
  if (activeLight === 2) {
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}

function lightTimer() {
  if (millis() > lastChanged + LIGHT_DURATIONS[activeLight]) {
    activeLight = (activeLight + 1) % 3;
    lastChanged = millis();
  }
}