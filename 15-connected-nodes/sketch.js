// Connected Nodes OOP Demo
// Luke P-F
// 4/15/2025

let nodes = [];

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.color = color(random(255), random(255), random(255));
    this.reach = 100;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }

  connectTo(nodesArray) {
    for (let otherNode of nodesArray) {

      if (nodesArray.indexOf(this) < nodesArray.indexOf(otherNode)) {
        let distanceAway = dist(this.x, this.y, otherNode.x, otherNode.y);

        if (distanceAway < this.reach) {
          stroke(this.color);
          strokeWeight(5);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }

    }
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseDistance < this.reach) {
      this.radius = (this.reach - mouseDistance) / 2;
    }
    else {
      this.radius = 15;
    }
  }

  move() {
    // perlin noise movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale 0-1 to my movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += dx;
    this.y += dy;

    // add time
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    if (this.x < 0) {
      this.x += width;
    }
    if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    if (this.y > height) {
      this.y -= height;
    }
  }


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width / 2, height / 2);
  nodes.push(somePoint);
}

function mousePressed() {
  for (let i = 0; i < 10; i++) {
    let somePoint = new MovingPoint(mouseX, mouseY);
    nodes.push(somePoint);
  }
}

function draw() {
  background(255);

  for (let node of nodes) {
    node.update();
    node.connectTo(nodes);
    node.display();
  }
}
