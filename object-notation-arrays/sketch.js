// Object Notation and Arrays Assignment
// Connect Four
// Luke Pawle-Fahy
// 3/12/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Gameplay constants
const WIN_LENGTH = 4;
const GAME_WIDTH = 7;
const GAME_HEIGHT = 6;

// Board
const BOARD = {
  left: 0,
  top: 0,
  height: 200,
  width: 200,
};

const EMPTY_SLOT_COLOUR = [255, 255, 255];
const COLOURS = [EMPTY_SLOT_COLOUR, [255, 0, 0], [0, 0, 255],];

// Board
let columnXBoundaries;
let chipDiameter;
let activeMatch;
let active;

// Program setup
function setup() {
  createNewMatch();
  determineBoardLayout();

  active = true;
}

// Match Setup
function createNewMatch() {
  let match = {
    matrix: createNewMatrix(),
    turn: Math.floor(Math.random() * 2),
  };
  return match;
}

function createNewMatrix() {
  let newMatrix = [];

  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      row.push(0);
    }
    newMatrix.push(row);
  }
  
  return newMatrix;
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
  for (let i = 0; i < GAME_WIDTH; i++) {
    columnXBoundaries.push(i * BOARD.width / GAME_WIDTH);
  }
}

// Game Loop
function mousePressed(arr) {
  if (active) {
    for (let i = 0; i < GAME_WIDTH; i++) {
      if (mouseX > columnXBoundaries[i] && mouseX < columnXBoundaries[i + 1]) {
        let y = dropChip(activeMatch.matrix, i);
        if (y !== -1) {
          arr[y][i] = activeMatch.turn + 1;
          activeMatch.turn = (activeMatch.turn + 1) % activeMatch.players;
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
  for (let y = 0; y < GAME_HEIGHT; y++) {
    if (arr[y][x] === 0) {
      return y;
    }
  }
  return -1;
}

function winDetect(arr, originX, originY) {
  let origin = arr[originY][originX];
  let chipsInARow = 0;

  if (origin === 0) {
    return -1;
  }

  // Horizontal Win Detection
  for (let i = 0; i < (WIN_LENGTH - 1) * 2; i++) {
    let currentX = originX - (WIN_LENGTH - 1) + i;

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentX >= 0 && currentX <= GAME_WIDTH && arr[originY][currentX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      // return something meaning a win
      break;
    }
  }

  // Vertical Win Detection
  for (let i = 0; i < (WIN_LENGTH - 1) * 2; i++) {
    let currentY = originY - (WIN_LENGTH - 1) + i;

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY <= GAME_HEIGHT && arr[currentY][originX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      // return something meaning a win
      break;
    }
  }

  // Diagonal (Positive Slope) Win Detection
  for (let i = 0; i < (WIN_LENGTH - 1) * 2; i++) {
    let currentX = originX - (WIN_LENGTH - 1) + i;
    let currentY = originY - (WIN_LENGTH - 1) + i;

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY <= GAME_HEIGHT && (currentX >= 0 && currentX <= GAME_WIDTH) && arr[currentY][currentX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      // return something meaning a win
      break;
    }
  }

  // Diagonal (Negative Slope) Win Detection
  for (let i = 0; i < (WIN_LENGTH - 1) * 2; i++) {
    let currentX = originX + (WIN_LENGTH - 1) - i;
    let currentY = originY - (WIN_LENGTH - 1) + i;

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY <= GAME_HEIGHT && (currentX >= 0 && currentX <= GAME_WIDTH) && arr[currentY][currentX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      // return something meaning a win
      break;
    }
  }

  // Tie Detection
  if (!(0 in arr)) {
    // tie
  }

}

function endGame(winner) {
  if (winner === -1) {

  }
  else {
    
  }
}

// Graphics (note: spread operator (...) may be unreliable?)
function drawChips(arr) {
  let y;
  let x;

  for (let i = 0; i < GAME_HEIGHT; i++) {
    y = (i + 0.5) * (BOARD.height / GAME_HEIGHT);
    for (let j = 0; j < GAME_WIDTH; j++) {
      x = (j + 0.5) * (BOARD.width / GAME_WIDTH);
      fill(...COLOURS[arr[i][j]]);
      circle(x, y, chipDiameter);
    }
  }
}

function draw() {

}