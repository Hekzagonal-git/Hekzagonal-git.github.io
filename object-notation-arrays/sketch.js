// Object Notation and Arrays Assignment
// Connect Four
// Luke Pawle-Fahy
// 3/12/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Gameplay constants
const WIN_LENGTH = 4;
const GAME_WIDTH = 10;
const GAME_HEIGHT = 6;

// Board
let BOARD = {
  left: 0,
  top: 0,
  height: 200,
  width: 200,
};

const EMPTY_SLOT_COLOUR = [255, 255, 255];
const BOARD_COLOUR = [10, 10, 90];
const COLOURS = [EMPTY_SLOT_COLOUR, [255, 0, 0], [0, 0, 255],];

// Board
let columnXBoundaries = [];
let chipDiameter;
let zoom;

// Game
let activeMatch;
let active;

// Program setup
function setup() {
  zoom = determineZoom();
  createCanvas(zoom * BOARD.width, zoom * BOARD.height);
  background(30);
  activeMatch = createNewMatch();
  determineBoardLayout();

  zoom = determineZoom();
  active = true;
}

// Match Setup
function createNewMatch() {
  let match = {
    matrix: createNewMatrix(),
    turn: Math.floor(Math.random() * 2),
    players: 2,
  };
  return match;
}

function createNewMatrix() {
  let newMatrix = [];

  for (let i = 0; i < GAME_HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < GAME_WIDTH; j++) {
      row.push(0);
    }
    newMatrix.push(row);
  }
  
  return newMatrix;
}

function determineZoom() {
  if (windowWidth < windowHeight) {
    let zoom = 0.9 * windowWidth / BOARD.width;
    return zoom;
  }
  else {
    let zoom = 0.9 * windowHeight / BOARD.height;
    return zoom;
  }
}

function determineBoardLayout() {
  // Chip Diameter
  if (GAME_HEIGHT > GAME_WIDTH) {
    chipDiameter = 0.9 * BOARD.height / GAME_HEIGHT;
  }
  else {
    chipDiameter = 0.9 * BOARD.width / GAME_WIDTH;
  }

  // Mouse Click Areas
  for (let i = 0; i < GAME_WIDTH + 1; i++) {
    columnXBoundaries.push(i * (BOARD.width / GAME_WIDTH));
  }
}

// Game Loop
function mousePressed() {
  if (active) {
    for (let i = 0; i < GAME_WIDTH; i++) {
      if (mouseX > zoom * columnXBoundaries[i] && mouseX < zoom * columnXBoundaries[i + 1]) {
        let y = dropChip(activeMatch.matrix, i);
        if (y !== -1) {
          activeMatch.matrix[y][i] = activeMatch.turn + 1;
          activeMatch.turn = (activeMatch.turn + 1) % activeMatch.players;
          winDetect(activeMatch.matrix, i, y);
          break;
        }
        else {
          // You can't do that!! or something
        }
      }
    }
  }
}

function dropChip(arr, x) {
  for (let y = GAME_HEIGHT - 1; y >= 0; y -= 1) {
    if (arr[y][x] === 0) {
      return y;
    }
  }
  return -1;
}

function winDetect(arr, originX, originY) {
  let origin = arr[originY][originX];
  let chipsInARow = 0;
  let fullRows = 0;

  if (origin === 0) {
    return -1;
  }

  // Horizontal Win Detection
  chipsInARow = 0;
  for (let i = 0; i < WIN_LENGTH * 2 - 1; i++) {
    let currentX = originX - (WIN_LENGTH - 1) + i;
    console.log("Horiz win current X:" + currentX);

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentX >= 0 && currentX < GAME_WIDTH && arr[originY][currentX] === origin) {
      console.log("horiz win check chips += 1 chips:" + chipsInARow);
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      console.log("horiz win");
      endGame(origin);
      break;
    }
  }

  // Vertical Win Detection
  chipsInARow = 0;
  for (let i = 0; i < WIN_LENGTH * 2 - 1; i++) {
    let currentY = originY - (WIN_LENGTH - 1) + i;
    console.log("Vert win current Y:" + currentY);
    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY < GAME_HEIGHT && arr[currentY][originX] === origin) {
      console.log("vert win check chips += 1 chips:" + chipsInARow);
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      console.log("vert win");
      endGame(origin);
      break;
    }
  }

  // Diagonal (Positive Slope) Win Detection
  chipsInARow = 0;
  for (let i = 0; i < WIN_LENGTH * 2 - 1; i++) {
    let currentX = originX - (WIN_LENGTH - 1) + i;
    let currentY = originY - (WIN_LENGTH - 1) + i;
    console.log("Pos Diag win current X:" + currentX);
    console.log("Pos Diag win current Y:" + currentY);


    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY < GAME_HEIGHT && (currentX >= 0 && currentX < GAME_WIDTH) && arr[currentY][currentX] === origin) {
      console.log("positive slope win check chips += 1 chips:" + chipsInARow);
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      console.log("diag win pos");
      endGame(origin);
      break;
    }
  }

  // Diagonal (Negative Slope) Win Detection
  chipsInARow = 0;
  for (let i = 0; i < WIN_LENGTH * 2 - 1; i++) {
    let currentX = originX + (WIN_LENGTH - 1) - i;
    let currentY = originY - (WIN_LENGTH - 1) + i;
    console.log("Neg Diag win current X:" + currentX);
    console.log("Neg Diag win current Y:" + currentY);

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY < GAME_HEIGHT && (currentX >= 0 && currentX < GAME_WIDTH) && arr[currentY][currentX] === origin) {
      console.log("diag negative slope win check chips += 1 chips:" + chipsInARow);
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      console.log("diag win neg");
      endGame(origin);
      break;
    }
  }

  // Tie Detection
  fullRows = 0;
  for (let i = 0; i < GAME_HEIGHT; i++) {
    if (arr[i].indexOf(0) === -1) {
      fullRows += 1;
    }
    else {
      break;
    }
  }
  if (fullRows === GAME_HEIGHT) {
    endGame(-1);
  }

}

function endGame(winner) {
  console.log("game ended");
  active = 0;
  fill(255);

  if (winner === -1) {
    text("Tie", 100, 100);
  }
  else {
    text("Victory!", 100, 100);
  }
}

// Graphics
function drawChips(arr) {
  let y;
  let x;

  for (let i = 0; i < GAME_HEIGHT; i++) {
    y = (i + 0.5) * (BOARD.height / GAME_HEIGHT);
    for (let j = 0; j < GAME_WIDTH; j++) {
      x = (j + 0.5) * (BOARD.width / GAME_WIDTH);
      fill(...COLOURS[arr[i][j]]);
      circle(zoom * (BOARD.left + x), zoom * (BOARD.top + y), zoom * chipDiameter);
    }
  }
}

function drawBoard(arr) {
  fill(BOARD_COLOUR);
  rect(zoom * BOARD.left, zoom * BOARD.top, zoom * BOARD.width, zoom * BOARD.height);
}

function draw() {
  drawBoard(activeMatch.matrix);
  drawChips(activeMatch.matrix);
}