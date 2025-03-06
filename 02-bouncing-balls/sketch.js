// Bouncing Ball Object Demo
// Luke P-F
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(220);

  for (let ball of ballArray) {
    moveBall(ball);
    displayBall(ball);
  }
}

function moveBall(ball) {
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Teleport ball around edge of screen
  if  (ball.x + ball.radius < 0) {
    ball.x = width + ball.radius;
  }
  else if (ball.x - ball.radius > width) {
    ball.x = -ball.radius;
  }
  if (ball.y + ball.radius < 0) {
    ball.y = height + ball.radius;
  }
  else if (ball.y - ball.radius > height) {
    ball.y = -ball.radius;
  }
}

function displayBall(ball) {
  // display each ball in ballArray
  noStroke();
  fill("red");
  circle(ball.x, ball.y, ball.radius * 2);
}

function mousePressed() {
  spawnBall();
}

function spawnBall() {
  let someBall = {
    x: random(width),
    y: random(height),
    radius: random(30, 80),
    dx: random(-10, 10),
    dy: (-10, 10),
  };
  ballArray.push(someBall);
}