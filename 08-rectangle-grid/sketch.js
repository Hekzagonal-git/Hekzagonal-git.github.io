// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const CELL_SIZE = 50;
const COLOURS = [255, 0];
let grid;
let cols;
let rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(windowWidth / CELL_SIZE);
  rows = Math.floor(windowHeight / CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function generateGrid(cols, rows) {
  let newGrid = [];
  for (let i = 0; i < rows; i++) {
    newGrid.push([]);
    for (let j = 0; j < cols; j++) {
      newGrid[i].push(0);
    }
  }
  return newGrid;
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let i = 0; i < rows; i++) {
    newGrid.push([]);
    for (let j = 0; j < cols; j++) {
      // toss a 0 or a 1 randomly
      newGrid[i].push(Math.floor(Math.random() * 2));
    }
  }
  return newGrid;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  let x;
  let y;

  for (let i = 0; i < rows; i++) {
    y = i * CELL_SIZE;
    for (let j = 0; j < cols; j++) {
      x = j * CELL_SIZE;
      fill(COLOURS[grid[i][j]]);
      square(x, y, CELL_SIZE);
    }
  }
}