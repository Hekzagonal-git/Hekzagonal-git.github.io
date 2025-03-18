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

// Graphics constants
const BOARD_LEFT = 0;
const BOARD_TOP = 0;
const BOARD_HEIGHT = 200;
const BOARD_WIDTH = 200;
const SLOT_MARGIN = 0;

// Board
let columnXBoundaries;
let chipSlotDiameter;


function setup() {

}

function draw() {

}

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

// Currently a MESS
function determineBoundaries() {
  // Based on the game width, finds the diameter of one chip slot.
  // Then, creates a 2D array where each row contains one minimum/maximum X Coordinate pairing for the board's columns
  chipSlotDiameter = (BOARD_WIDTH / GAME_WIDTH - (SLOT_MARGIN + SLOT_MARGIN / GAME_WIDTH));
  columnXBoundaries = [];
  
  for (let j = 0; j < GAME_WIDTH; j++) {

    // Left X Boundary for a column
    let x1 = j * (chipSlotDiameter + SLOT_MARGIN) + SLOT_MARGIN;
    let x2 = x1 + chipSlotDiameter;

    columnXBoundaries.push([x1, x2]);
  }
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
    if ((currentY >= 0 && currentY <= GAME_HEIGHT) && (currentX >= 0 && currentX <= GAME_WIDTH) && arr[currentY][currentX] === origin) {
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
    if ((currentY >= 0 && currentY <= GAME_HEIGHT) && (currentX >= 0 && currentX <= GAME_WIDTH) && arr[currentY][currentX] === origin) {
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

}

function dropChip(arr, x) {
  for (let y = arr.length - 1; y > 0; y--) {
    if (arr[y][x] === 0) {
      return y;
    }
  }
  return -1;
}

// Currently unfinished and also a MESS
function drawChips() {
  let y;
  let x;

  for (let i = 0; i < GAME_HEIGHT; i++) {
    y = (i + 0.5) * (BOARD_HEIGHT / GAME_HEIGHT);
    for (let j = 0; j < GAME_WIDTH; j++) {
      x = (j + 0.5) * (BOARD_WIDTH / GAME_WIDTH); 
    }
  }
}