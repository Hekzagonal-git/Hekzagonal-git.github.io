// Object Notation and Arrays Assignment
// Connect Something
// Luke Pawle-Fahy
// 3/19/2025
//
// Extra for Experts:
// - Heavily utilized 2D Arrays, spread (...) operator, some other things not directly taught like prompt().

// Gameplay constants
let WIN_LENGTH = 4;
let GAME_WIDTH = 7;
let GAME_HEIGHT = 6;
let PLAYER_COUNT = 2;

const BOARD = {
  left: 0,
  top: 0,
  height: 200,
  width: 200,
};

let colours = {
  backgroundColour: [38, 43, 49],
  boardColour: [10, 10, 90],
  chipColours: [[225, 225, 225], [255, 0, 0], [0, 0, 255], [0, 255, 0], [255, 255, 0], [255, 0, 255], [0, 255, 255]], // 0th item is the colour of an empty slot
};

// accounts for different display sizes
let zoom;

// Game State variables
let activeMatch;
let onTitleScreen;

// Program setup
function setup() {
  zoom = determineZoom();
  createCanvas(zoom * BOARD.width, zoom * BOARD.height);
  background(...colours.backgroundColour);

  let settingsButton = createButton("Change Game Settings");
  settingsButton.position(BOARD.left + 0, zoom * (BOARD.height + BOARD.top))
  settingsButton.mousePressed(changeGameValues);

  let resetButton = createButton("Reset Game");
  resetButton.position(BOARD.left + settingsButton.width, zoom * (BOARD.height + BOARD.top));
  resetButton.mousePressed(createNewMatch);

  // Temporary - Match Creation
  createNewMatch();
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

// Match Setup
function changeGameValues() {
  let test = [0, 0, 0, 0];

  while (true) {
    test = [Number(prompt("Connect: ")), Number(prompt("Width: ")), Number(prompt("Height: ")), Number(prompt("Players: "))];
    if (test.indexOf(0) === -1) {
      WIN_LENGTH = test[0];
      GAME_WIDTH = test[1];
      GAME_HEIGHT = test[2];
      PLAYER_COUNT = test[3];
      createNewMatch();
      break;
    }
    else {
      alert("Invalid input! All values must be over zero.");
    }
  }

}

function createNewMatch() {
  let match = {
    matrix: createNewMatrix(),
    turn: Math.floor(Math.random() * PLAYER_COUNT),
    players: PLAYER_COUNT,
    winner: undefined,

    clickAreas: determineClickAreas(),
    chipDiameter: determineChipDiameter(),

    active: true,

  };
  activeMatch = match;
  createNecessaryChipColours();
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
  return newClickAreas;
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

function createNecessaryChipColours() {
  // Ensures that there are as many potential chip colours as there are players.
  while (activeMatch.players > colours.chipColours.length - 1) {
    colours.chipColours.push([Math.random() * 256, Math.random() * 256, Math.random() * 256]);
  }
}

// Gameplay
function mousePressed() {
  if (activeMatch.active) {
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

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentX >= 0 && currentX < GAME_WIDTH && activeMatch.matrix[originY][currentX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      activeMatch.winner = origin;
      activeMatch.active = false;
      return(0);
    }
  }

  // Vertical Win Detection
  chipsInARow = 0;
  for (let i = 0; i < WIN_LENGTH * 2 - 1; i++) {
    let currentY = originY - (WIN_LENGTH - 1) + i;
    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY < GAME_HEIGHT && activeMatch.matrix[currentY][originX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      activeMatch.winner = origin;
      activeMatch.active = false;
      return 0;
    }
  }

  // Diagonal (Positive Slope) Win Detection
  chipsInARow = 0;
  for (let i = 0; i < WIN_LENGTH * 2 - 1; i++) {
    let currentX = originX - (WIN_LENGTH - 1) + i;
    let currentY = originY - (WIN_LENGTH - 1) + i;


    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY < GAME_HEIGHT && (currentX >= 0 && currentX < GAME_WIDTH) && activeMatch.matrix[currentY][currentX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      activeMatch.winner = origin;
      activeMatch.active = false;
      return 0;
    }
  }

  // Diagonal (Negative Slope) Win Detection
  chipsInARow = 0;
  for (let i = 0; i < WIN_LENGTH * 2 - 1; i++) {
    let currentX = originX + (WIN_LENGTH - 1) - i;
    let currentY = originY - (WIN_LENGTH - 1) + i;

    // Add 1 to count if chip is in bounds and matching origin. Reset count otherwise.
    if (currentY >= 0 && currentY < GAME_HEIGHT && (currentX >= 0 && currentX < GAME_WIDTH) && activeMatch.matrix[currentY][currentX] === origin) {
      chipsInARow += 1;
    }
    else {
      chipsInARow = 0;
    }

    // If win condition is met, win.
    if (chipsInARow === WIN_LENGTH) {
      activeMatch.winner = origin;
      activeMatch.active = false;
      return 0;
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
    activeMatch.winner = -1;
    activeMatch.active = false;
    return 0;
  }

}

// Graphics
function displayChips() {
  let y;
  let x;
  stroke(0);
  strokeWeight(4);

  for (let i = 0; i < GAME_HEIGHT; i++) {
    y = (i + 0.5) * (BOARD.height / GAME_HEIGHT);
    for (let j = 0; j < GAME_WIDTH; j++) {
      x = (j + 0.5) * (BOARD.width / GAME_WIDTH);
      fill(...colours.chipColours[activeMatch.matrix[i][j]]);
      circle(zoom * (BOARD.left + x), zoom * (BOARD.top + y), zoom * activeMatch.chipDiameter);
    }
  }
}

function displayBoard() {
  noStroke();
  fill(colours.boardColour);
  rect(zoom * BOARD.left, zoom * BOARD.top, zoom * BOARD.width, zoom * BOARD.height, zoom * 10);
}

function displayWinner() {
  noStroke();
  fill(colours.backgroundColour);
  rect(zoom * (BOARD.left + BOARD.width / 2) - zoom * 15, zoom * (BOARD.top + BOARD.height / 2) - zoom * 10,  zoom * 30,  zoom * 20, zoom * 3);
  formatText();
  if (activeMatch.winner === -1) {
    text("It's a Tie!", zoom * BOARD.width / 2 - zoom * 15, zoom * BOARD.height / 2 - zoom * 10,  zoom * 30,  zoom * 20);
  }
  else {
    text("Player " + activeMatch.winner + " wins!", zoom * BOARD.width / 2 - zoom * 15, zoom * BOARD.height / 2 - zoom * 10,  zoom * 30,  zoom * 20);
  }
}

function formatText() {
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(190);
  stroke(0);
  strokeWeight(3);
}

// Draw loop
function draw() {
  // background(COLOURS.backgroundColour);
  displayBoard(activeMatch.matrix);
  displayChips(activeMatch.matrix);
  if (!activeMatch.active && !onTitleScreen) {
    displayWinner();
  }
}