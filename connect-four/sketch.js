// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let users = [];
let matches = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

class User {
  
}

// Match class outlines individual matches of connect 4
class Match {
  constructor(player1, player2) {
    this.id = generateID(matches);
    
    this.player1 = player1;
    this.player2 = player2;

    this.turn = Math.round(Math.random());
    this.active = true;

    matches.push(this.id);
  }
}

// Generates a random number 0-255 that doesn't already exist in array
function generateID(array) {
  let id;
  while (true) {
    id = Math.floor(Math.random() * 256);
    if (!(id in array)) {
      return id;
    }
  }
}

function draw() {
  background(220);
}
