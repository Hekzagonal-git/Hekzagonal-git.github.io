// Game of Life demo
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
let autoFrameAdvance = false;

            
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

// Key
function keyPressed() {
  if (key === 'r') {
    grid = generateRandomGrid(GRID_WIDTH, GRID_HEIGHT);
  }
  else if (key === 'e') {
    grid = generateGrid(GRID_WIDTH, GRID_HEIGHT);
  }
  else if (key === 'p') {
    autoFrameAdvance = !autoFrameAdvance;
  }
  else if (key === ' ') {
    applyRules(grid);
  }
}

function generateRandomGrid(cols, rows) {
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

// Mouse
function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  toggleCell(y, x);

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

// Game of Life rules
function applyRules(arr) {
  let updatedGrid = structuredClone(arr);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let cellState = arr[i][j];
      let neighbours = determineNeighbours(j, i, arr);
      if (cellState === 1) {
        if (neighbours < 2) {
          updatedGrid[i][j] = 0;
        }
        else if (neighbours > 3) {
          updatedGrid[i][j] = 0;
        }
        else {
          updatedGrid[i][j] = 1;
        }
      }

      else if (cellState === 0) {
        if (neighbours === 3) {
          updatedGrid[i][j] = 1;
        }
        else {
          updatedGrid[i][j] = 0;
        }
      }
    }
  }

  grid = updatedGrid;
}

function determineNeighbours(x, y, arr) {
  let neighbours = 0;
  for (let i = -1; i <= 1; i++) {
    let currentY = y + i;
    for (let j = -1; j <= 1; j++) {
      let currentX = x + j;
      // separate if statements for rangeError prevention
      if (checkRange(currentX, currentY, grid)) {
        if (arr[currentY][currentX] === 1) {
          neighbours += 1;
        }
      }
    }
  }
  // Subtract self from neighbours
  neighbours -= arr[y][x];

  return neighbours;
}

function checkRange(x, y, arr) {
  return x >= 0 && x < arr[0].length && y >= 0 && y < arr.length;
}

// Draw loop
function draw() {
  background(220);
  if (frameCount % 50 === 0 && autoFrameAdvance) {
    applyRules(grid);
  }
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
