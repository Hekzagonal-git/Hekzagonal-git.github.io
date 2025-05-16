// Object Inheritance Demo
// Luke P-F
// 5/16/2023

let shapes = [];

class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  display() {
    // placeholder display function
    noStroke();
    fill(this.color);
    rect(this.x, this.y, 30, 60);
  }
}

class Circle extends Shape {
  constructor(x, y, color, radius) {
    super(x, y, color);
    this.radius = radius;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }
}

class Square extends Shape {
  constructor(x, y, color, size) {
    super(x, y, color);
    this.size = size;
  }

  display() {
    noStroke();
    fill(this.color);
    square(this.x, this.y, this.size);
  }
}
 
class Triangle extends Shape {
  constructor(x, y, color, x1, y1, x2, y2) {
    super(x, y, color);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  display() {
    noStroke();
    fill(this.color);
    triangle(this.x, this.y, this.x1, this.y1, this.x2, this.y2);
  }
}

class MovingCircle extends Circle {
  constructor(x, y, color, radius, speed) {
    super(x, y, color, radius);
    this.speed = speed;
  }

  update() {
    this.x += this.speed;

    if (this.x > width) {
      this.x = -this.radius;
    }
  }

  display() {
    this.update();
    super.display();
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);

    let r = random(255);
    let g = random(255);
    let b = random(255);
    let someColor = color(r, g, b);

    let choice = random(100);
    if (choice < 25) {
      let radius = random(33);
      let someCircle = new Circle(x, y, someColor, radius);
      shapes.push(someCircle);
    }
    else if (choice < 50) {
      let size = random(33);
      let someSquare = new Square(x, y, someColor, size);
      shapes.push(someSquare);
    }
    else if (choice < 75) {
      let x1 = random(width);
      let x2 = random(width);
      let y1 = random(height);
      let y2 = random(height);
      let someTriangle = new Triangle(x, y, someColor, x1, y1, x2, y2);
      shapes.push(someTriangle);
    }
    else {
      let radius = random(33);
      let speed = random(-10, 10);
      let someMovingCircle = new MovingCircle(x, y, someColor, radius, speed);
      shapes.push(someMovingCircle);
    }
  }
}

function draw() {
  background(220);

  for (let oneShape of shapes) {
    oneShape.display();
  }
}
