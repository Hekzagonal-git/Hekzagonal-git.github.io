// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MATRIX_WIDTH = 10;
const MATRIX_HEIGHT = 20;

let tetrominoFigures;
let tetrominoOffsetData;
let levelGravities;

let tasks = [];
// {timer = Timer(), onExpiry, ...parameters};

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

  image(rotationDifference = 0) {
    return tetrominoFigures[this.type][(this.rotation + rotationDifference) % 4];
  }
}

class Tetris {
  constructor() {
    // Stats
    this.score = 0,
    this.level = 0,
    this.linesCleared = 0,

    // Tetromino Placement
    this.activePiece = null,
    this.heldPiece = null,
    this.queue = [],
    this.matrix = createNewMatrix(),
    
    // Movement
    this.holdUsed = false,
    this.lockDelay = false,
    this.droppingHard = false,
    this.droppingSoft = false,

    this.delayedAutoStart = false,
    this.autoRepeat = true,

    // 
    this.active = true;
  }

  createNewMatrix() {
    let newMatrix = [];
    for (let i = 0; i < MATRIX_HEIGHT; i++) {
      newMatrix.push([]);
      for (let j = 0; j < MATRIX_WIDTH; i++) {
        newMatrix[i].push(null);
      }
    }
    return newMatrix;
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

function checkTimers() {
  for (let task of tasks) {
    // In any case it should be onExpiry(..args), right? then the onExpiry function can redirect to whatever object you need. That sounds right.
    if (task.timer.expired()) {
      // do something
    }
  }
}

// IJLOSTZ