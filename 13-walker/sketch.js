// Walker OOP Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class Walker {
  constructor(x = 0, y = 0, theColor = "red") {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 30;
    this.radius = 15;
  }
  
  move() {
    let choice = random(100);
    if (choice < 25) {
      // up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      // down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // left
      this.x -= this.speed;
    }
    else if (choice < 100) {
      // right
      this.x += this.speed;
    }
  }
  
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }
}

// yay!!!!!
// let luke;
// aww
let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // luke = new Walker(width / 2, height / 2, "blue");
  // lukeAgain = new Walker(width / 2, height / 2, "red");
}

function mousePressed() {
  spawnWalker(mouseX - mouseX % (15 * 2), mouseY - mouseY % (15 * 2));
}

function spawnWalker(x, y) {
  // Generate random color
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColor = color(r, g, b);

  let someWalker = new Walker(x, y, someColor);
  walkers.push(someWalker);
}
function draw() {
  // background(220);
  // luke.display();
  // lukeAgain.display();
  // luke.move();
  // lukeAgain.move();
  for (let walker of walkers) {
    walker.display();
  }
  for (let walker of walkers) {
    walker.move();
  }
}
