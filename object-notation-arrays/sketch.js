// Object Notation and Arrays Assignment
// Connect Four
// Luke Pawle-Fahy
// 3/12/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MATRIX_WIDTH = 6;
const MATRIX_HEIGHT = 6;
const WIN_LENGTH = 4;
let winner = Math.floor(Math.random() * 2);

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function titleScreen() {

}


function createNewMatrix() {
  let newMatrix = [];

  // Game is stored as [row][column] rather than [column][row].
  for (let i = 0; i < MATRIX_WIDTH; i++) {
    let column = [];
    for (let j = 0; j < MATRIX_HEIGHT; j++) {
      column.push(0);
    }
    newMatrix.push(column);
  }
  
  return newMatrix;
}

function createNewMatch() {
  let newMatch = {
    matrix: createNewMatrix(),
    turn: winner
  };
  return newMatch;
}

function winDetection() {
  let doRows;
  let doColumns;
  // let doPositiveSlope;
  let origin;

  // Iterate through columns
  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    
    // RangeError prevention
    if (i + WIN_LENGTH - 1 > MATRIX_HEIGHT) {
      doColumns = false;
    }

    // Iterate through rows
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      
      origin = match.matrix[i][j];
      // Move onto next space if current is empty
      if (origin === 0) {
        break;
      }

      // RangeError prevention
      if (j + WIN_LENGTH - 1 > MATRIX_WIDTH) {
        doRows = false;
      }

      // Vertical win detection
      if (doColumns) {
        // Check for a series, length WIN_LENGTH, of values equal to that of the origin.
        for (let k = 0; k < WIN_LENGTH - 1; k++) {
          if (matrix[i + k][j] !== origin) {
            break;
          }
          // If k is equal to WIN_LENGTH, then the game is won.
          else if (k === WIN_LENGTH - 1) {
            // win
          }
        }
      }

      // Horizontal win detection
      if (doRows) {
        // Check for a series, length WIN_LENGTH, of values equal to that of the origin.
        for (let k = 0; k < WIN_LENGTH - 1; k++) {
          if (matrix[i][j + k] !== origin) {
            break;
          }
          // If k is equal to WIN_LENGTH, then the game is won.
          else if (k === WIN_LENGTH - 1) {
            // win
          }
        }
      }

      // Diagonal (Negative Slope) win detection
      if (doColumns && doRows) {

      }
    }
  }
}

function draw() {
  // background(220);
}

function drawFrame() {
  // art
}

function drawPieces() {
  // reads stuff from match
}