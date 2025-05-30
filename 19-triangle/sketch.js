/* eslint-disable indent */
// Sierpinski Triangle Demo
// Recursion -- But Visual

let scale = 5;
let theDepth = 1;
let maxDepth = 5;

let initialTriangle = [
  {x: scale * 150, y: scale * 5},
  {x: scale * 130, y: scale * 45},
  {x: scale * 170, y: scale * 45}
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  
}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x) / 2;
  let midY = (point1.y + point2.y) / 2;
  return {x: midX, y: midY};
}

function sierpinski(points, depth) {
  console.log("i'm pinskiing it");
  // Shell Triangle
  triangle(points[0].x, points[0].y,
           points[1].x, points[1].y,
           points[2].x, points[2].y);

  // Pattern
  if (depth > 0) {
    let mid1 = midpoint(points[0], points[1]);
    let mid2 = midpoint(points[1], points[2]);
    let mid3 = midpoint(points[0], points[2]);
    
    sierpinski([{x: mid1.x, y: mid1.y}, {x: points[0].x, y: points[0].y}, {x: mid3.x, y: mid3.y}], depth - 1);
    sierpinski([{x: mid1.x, y: mid1.y}, {x: points[1].x, y: points[1].y}, {x: mid2.x, y: mid2.y}], depth - 1);
    sierpinski([{x: mid2.x, y: mid2.y}, {x: points[2].x, y: points[2].y}, {x: mid3.x, y: mid3.y}], depth - 1);
  }

  
}

function mousePressed() {
  if (theDepth > maxDepth) {
    return 0;
  }
  theDepth++;
  background(220);
  console.log("im mousing it");
  sierpinski(initialTriangle, theDepth);
}