// Object Notation and Arrays Assignment
// Connect Four
// Luke Pawle-Fahy
// 3/12/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MATRIX_WIDTH = 6;
const MATRIX_HEIGHT = 6;
let winner = Math.floor(Math.random() * 2);

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function titleScreen() {

}

function createNewMatrix() {
  let newMatrix = [];
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
  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      let origin = match.matrix[i][j];
      // Column Detection
      if (0 !== origin && origin === match.matrix[i + 1][j] && origin === match.matrix[i + 2][j] && origin === match.matrix[i][j]) {

      }
      // Row Detection
      else if (0 !== origin && origin === match.matrix[i][j + 1] && origin === match.matrix[i][j + 2] && origin === match.matrix[i][j + 3]) {

      }
      // Diagonal (Pos. Slope) Detection

      // Diagonal (Neg. Slope) Detection
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

