// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tetrominoFigures;
let tetrominoOffsetData;
let levelGravities;

class Tetromino {
  constructor(type = 0) {
    this.type = type,
    this.rotation = 0;

    // Applies offset to I tetromino's spawning coordinates, aligning its position with the other 6 tetrominoes.
    if (this.type !== 0) {
      this.x = 3,
      this.y = 1;
    }
    else {
      this.x = 2,
      this.y = 0;
    }

  }

  image(rotationDifference) {
    return tetrominoFigures[this.type][(this.rotation + rotationDifference) % 4];
  }
}

class Tetris {
  constructor() {
    this.score = 0,
    this.level = 0,
    this.linesCleared = 0,

    this.activePiece = null,
    this.heldPiece = null,
    this.holdUsed = false,
    this.lockDelay = false
  }
}

function preload() {
  tetrominoFigures = loadJSON('/data-tables/tetromino-figures.json');
  tetrominoOffsetData = loadJSON('/data-tables/offset-data.json');
  levelGravities = loadJSON('/data-tables/level-gravities.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

// IJLOSTZ