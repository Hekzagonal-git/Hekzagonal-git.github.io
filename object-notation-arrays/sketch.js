// Object Notation and Arrays Assignment
// Connect Four
// Luke Pawle-Fahy
// 3/12/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// up to 32 players can participate in up to 16 games at once
let users = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
let matches = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
const MATRIX_WIDTH = 6;
const MATRIX_HEIGHT = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Unused
function createPlayer() {
  let player = {
    wins: 0,
    playing: false,
    spectating: false,
    position: users.indexOf(0),
  };

  users[position] = player;
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

class Match {
  constructor(local = false, p1, p2) {
    if (local) {
      this.players = [p1, p2];
      this.matrix = createNewMatrix();
    }
    else {

    }
  }
}

function createNewMatch(p1, p2, local = false) {
  let newMatch = {

  };
  if (local) {
    newMatch.
  }
  else {

  }
}

function draw() {
  background(220);
}
