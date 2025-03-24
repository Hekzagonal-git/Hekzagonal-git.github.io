// 2D Grid Neighbours Demo
// Luke P-F
// 3/24/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize;
const GRID_WIDTH = 7;
const GRID_HEIGHT = 14;

const COLOURS = [255, 0];

let grid = generateGrid(GRID_WIDTH, GRID_HEIGHT);

            
function setup() {
  createCanvas(windowWidth, windowHeight);
  determineCellSize();
}

function determineCellSize() {
  if (windowWidth * GRID_WIDTH < windowHeight * GRID_HEIGHT) {
    cellSize = windowWidth / GRID_WIDTH;
  }
  else {
    cellSize = windowHeight / GRID_HEIGHT;
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  toggleCell(y, x);
  toggleCell(y + 1, x);
  toggleCell(y - 1, x);
  toggleCell(y, x + 1);
  toggleCell(y, x - 1);

}

function toggleCell(y, x) {
  if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function generateRandomGrid() {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(Math.floor(Math.random() * 2));
    }
  }
  return newGrid;
}

function generateGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function determineNeighbours(x, y) {
  if (x <= 0) {

  }
}

function keyPressed() {
  if (key === 'c') {
    grid = generateRandomGrid(GRID_WIDTH, GRID_HEIGHT);
  }
  else if (key === 'e') {
    grid = generateGrid(GRID_WIDTH, GRID_HEIGHT);
  }
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      fill(COLOURS[grid[y][x]]);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
