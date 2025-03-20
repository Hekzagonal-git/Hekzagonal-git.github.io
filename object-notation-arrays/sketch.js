// Object Notation and Arrays Assignment
// Connect Something
// Luke Pawle-Fahy
// 3/12/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Gameplay constants
const WIN_LENGTH = 2;
const GAME_WIDTH = 8;
const GAME_HEIGHT = 1;
const PLAYER_COUNT = 5; // Max of 5 currently

const BOARD = {
  left: 0,
  top: 0,
  height: 200,
  width: 200,
};

const COLOURS = {
  backgroundColour: [38, 43, 49],
  boardColour: [10, 10, 90],
  chipColours: [[225, 225, 225], [255, 0, 0], [0, 0, 255], [0, 255, 0], [255, 255, 0], [255, 0, 255], [0, 255, 255]], // 0th item is the colour of an empty slot
}

// non-constant board variables
let chipDiameter;
let zoom;

// Game State variables
let activeMatch;
let active;
let onTitleScreen;

// Program setup
function setup() {
  zoom = determineZoom();
  createCanvas(zoom * BOARD.width, zoom * BOARD.height);
  background(...COLOURS.backgroundColour);

  activeMatch = createNewMatch();
  active = true;
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

// Title screen
function titleScreen() {
  onTitleScreen = true;

}

// Match Setup
function createNewMatch() {
  let match = {
    matrix: createNewMatrix(),
    turn: Math.floor(Math.random() * 2),
    players: PLAYER_COUNT,

    clickAreas: determineClickAreas(),
    chipDiameter: determineChipDiameter(),

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

function determineClickAreas() {
  let newClickAreas = [];
  for (let i = 0; i < GAME_WIDTH + 1; i++) {
    newClickAreas.push(i * (BOARD.width / GAME_WIDTH));
  }
  return(newClickAreas);
}

function determineChipDiameter() {
  let newChipDiameter = 0;
  if (GAME_HEIGHT > GAME_WIDTH) {
    newChipDiameter = 0.9 * BOARD.height / GAME_HEIGHT;
  }
  else {
    newChipDiameter = 0.9 * BOARD.width / GAME_WIDTH;
  }
  return newChipDiameter;
}

// Gameplay
function mousePressed() {
  if (active) {
    for (let i = 0; i < GAME_WIDTH; i++) {
      if (mouseX > zoom * activeMatch.clickAreas[i] && mouseX < zoom * activeMatch.clickAreas[i + 1]) {
        let y = dropChip(i);
        if (y !== -1) {
          activeMatch.matrix[y][i] = activeMatch.turn + 1;
          activeMatch.turn = (activeMatch.turn + 1) % activeMatch.players;
          winDetect(i, y);
          break;
        }
        else {
          // You can't do that!! or something
        }
      }
    }
  }
}

function dropChip(x) {
  for (let y = GAME_HEIGHT - 1; y >= 0; y -= 1) {
    if (activeMatch.matrix[y][x] === 0) {
      return y;
    }
  }
  return -1;
}

function winDetect(originX, originY) {
  let origin = activeMatch.matrix[originY][originX];
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
    if (currentX >= 0 && currentX < GAME_WIDTH && activeMatch.matrix[originY][currentX] === origin) {
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
    if (currentY >= 0 && currentY < GAME_HEIGHT && activeMatch.matrix[currentY][originX] === origin) {
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
    if (currentY >= 0 && currentY < GAME_HEIGHT && (currentX >= 0 && currentX < GAME_WIDTH) && activeMatch.matrix[currentY][currentX] === origin) {
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
    if (currentY >= 0 && currentY < GAME_HEIGHT && (currentX >= 0 && currentX < GAME_WIDTH) && activeMatch.matrix[currentY][currentX] === origin) {
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
    if (activeMatch.matrix[i].indexOf(0) === -1) {
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
  fill(1, 1, 255);
  textSize(20);

  if (winner === -1) {
    text("Tie", 100, 100);
  }
  else {
    text("Victory!", 100, 100);
  }
}

// Graphics
function displayChips() {
  let y;
  let x;

  for (let i = 0; i < GAME_HEIGHT; i++) {
    y = (i + 0.5) * (BOARD.height / GAME_HEIGHT);
    for (let j = 0; j < GAME_WIDTH; j++) {
      x = (j + 0.5) * (BOARD.width / GAME_WIDTH);
      fill(...(COLOURS.chipColours[activeMatch.matrix[i][j]]));
      circle(zoom * (BOARD.left + x), zoom * (BOARD.top + y), zoom * activeMatch.chipDiameter);
    }
  }
}

function displayBoard() {
  fill(COLOURS.boardColour);
  rect(zoom * BOARD.left, zoom * BOARD.top, zoom * BOARD.width, zoom * BOARD.height, zoom * 10);
}

function displayMessage() {

}

function displayGameTitle() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(zoom * 10)
  text("Connect", zoom * BOARD.width / 2, zoom * 0.1 * BOARD.height,);
}

// Draw loop
function draw() {
  background(COLOURS.backgroundColour);
  displayBoard(activeMatch.matrix);
  displayChips(activeMatch.matrix);
  // displayGameTitle();
}