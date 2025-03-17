// Object Notation and Arrays Assignment
// Connect Four
// Luke Pawle-Fahy
// 3/12/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const WIN_LENGTH = 4;
const GAME_WIDTH = 7;
const GAME_HEIGHT = 6;

function setup() {

}

function draw() {

}

function winDetect(arr, originX, originY) {
  if (arr[originX][originY] !== 0) {
    
  }
  else {

  }
}

function createNewMatch() {
  let match = {
    matrix: createNewMatrix(),

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