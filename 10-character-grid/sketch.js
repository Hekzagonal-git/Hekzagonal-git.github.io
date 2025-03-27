// Character Grid Demo
// Luke P-F
// 3/27/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const CELL_SIZE = 50;
const COLOURS = [255, 0, "red",];
let grid;
let cols;
let rows;

const OPEN_TILE = 0;
const OCCUPIED_TILE = 1;
const PLAYER = 2;
let thePlayer = {
  x: 2,
  y: 2,
};

let grassImg;
let rockImg;
let sprites = [grassImg, rockImg, ];
function preload() {
  grassImg = loadImage("grass.png");
  rockImg = loadImage("rock.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(windowWidth / CELL_SIZE);
  rows = Math.floor(windowHeight / CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  // Add the player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function generateGrid(cols, rows) {
  let newGrid = [];
  for (let i = 0; i < rows; i++) {
    newGrid.push([]);
    for (let j = 0; j < cols; j++) {
      newGrid[i].push(OPEN_TILE);
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

function keyPressed() {
  switch (key) {
  case 'w':
    movePlayer(0, - 1, thePlayer);
    break;
  case 's':
    movePlayer(0, 1, thePlayer);
    break;
  case 'a':
    movePlayer(-1, 0, thePlayer);
    break;
  case 'd':
    movePlayer(1, 0, thePlayer);
    break;
  default:
    break;
  }
}

function movePlayer(dx, dy, victim) {
  if (sanityCheck(victim.x + dx, victim.y + dy) && grid[victim.y + dy][victim.x + dx] === OPEN_TILE) {
    grid[victim.y][victim.x] = OPEN_TILE;

    victim.x += dx;
    victim.y += dy;

    grid[victim.y][victim.x] = PLAYER;
  }
}

function sanityCheck(x, y) {
  return y >= 0 && y <= rows - 1 && x >= 0 && x <= cols - 1;
}
function mousePressed() {
  let x = Math.floor(mouseX / CELL_SIZE);
  let y = Math.floor(mouseY / CELL_SIZE);

  toggleCell(y, x);

}

function toggleCell(y, x) {
  if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = OCCUPIED_TILE;
    }
    else if (grid[y][x] === OCCUPIED_TILE) {
      grid[y][x] = OPEN_TILE;
    }
  }
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
      // fill(COLOURS[grid[i][j]]);
      // square(x, y, CELL_SIZE);

      if (grid[i][j] === OPEN_TILE) {
        image(grassImg, x, y, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[i][j] === OCCUPIED_TILE) {
        image(rockImg, x, y, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[i][j] === PLAYER) {
        fill("red");
        square(x, y, CELL_SIZE);
      }
    }
  }
}