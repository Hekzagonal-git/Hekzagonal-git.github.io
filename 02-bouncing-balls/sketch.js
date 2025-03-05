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
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Teleport around edge of screen
    if  (ball.x - radius < 0) {
      ball.x += width + radius;
    }
    ball.x = ball.x % width;
    ball.y = ball.y % height;

    // Display ball
    fill("red");
    circle(ball.x, ball.y, ball.radius * 2);
  }
}

function mousePressed() {
  spawnBall();
}

function spawnBall() {
  let someBall = {
    x: random(width),
    y: random(height),
    radius: random(15, 40),
    dx: random(-5, 5),
    dy: (-5, 5),
  };
  ballArray.push(someBall);
}