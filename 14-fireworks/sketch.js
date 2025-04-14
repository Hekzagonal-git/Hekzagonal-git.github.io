// Fireworks OOP Demo
// Luke P-F
// 4/14/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const FIREWORK_SPAWN_AMOUNT = 100;
const OPACITY_FADE = 5;

class Particle {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 2;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= OPACITY_FADE;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  for (let i = 0; i < FIREWORK_SPAWN_AMOUNT; i++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}

function draw() {
  background(0);

  for (let firework of theFireworks) {
    if (firework.isDead()) {
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    else {
      firework.update();
      firework.display();
    }
  }
}
