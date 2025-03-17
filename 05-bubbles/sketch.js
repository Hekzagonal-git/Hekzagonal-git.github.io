// Bubble Object Notation and Arrays Demo
// Luke P-F
// 3/17/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < 10; i++) {
    spawnBubble();
  }

  // Spawn a new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);

  for (let bubble of theBubbles) {
    // Jitter bubble
    bubble.dx = random(-5, 5);
    bubble.dy = random(-5, 5);
    
    // Move bubble
    moveBubble(bubble);

    // Display bubble
    displayBubble(bubble);
  }
}

function spawnBubble() {
  let someBubble = {
    x: random(width),
    y: random(height),
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(40, 80),
    r: random(255),
    g: random(255),
    b: random(255),
  };
  theBubbles.push(someBubble);
}

function mouseClicked() {
  for (let bubble of theBubbles) {
    if (mouseX > bubble.x - bubble.radius && mouseX < bubble.x + bubble.radius && mouseY > bubble.y - bubble.radius && mouseY < bubble.y + bubble.radius) {
      theBubbles.splice(theBubbles.indexOf(bubble), 1);
    }
  }
}

function moveBubble(someBubble) {
  someBubble.x += someBubble.dx;
  someBubble.y += someBubble.dy;
}

function displayBubble(someBubble) {
  fill(someBubble.r, someBubble.g, someBubble.b);
  circle(someBubble.x, someBubble.y, someBubble.radius * 2);
}