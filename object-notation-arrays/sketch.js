// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// up to 32 players can participate in up to 16 games at once
let users = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
let matches = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Match class outlines individual matches of connect 4
class Match {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;

    this.turn = Math.round(Math.random());
    this.active = true;

  }
}

function createMatch() {
  if (matches.indexOf(0) !== 0) {
    
  }
  else {
  }
}

function draw() {
  background(220);
}
