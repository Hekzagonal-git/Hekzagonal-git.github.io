// colour interface
let sliderSize = 160;
let sliders = [];
/* let textSize = 30;
let texts = []; */

// state variables
let userInterfacesActive = 0;
let activeTool = 0;
let colourSlidersVisible = false;
let toolWidth = 10;

// mouse position storage
let timePreviousMouseX = 0;
let timePreviousMouseY = 0;
let dragOriginX;

// variables for rectangle tool
let rectXUsed;
let rectYUsed;

let arrayToUpdate;
let matchIndex;

function setup() {
  createCanvas(400, 400);
  background(220);

  initializeSliders();
  // initializeTextInput();
  
  // button
  let colourButton = createButton('Change Colour');
  colourButton.position(0, height);
  colourButton.mousePressed(changeColourInterfaceVisibility);
  
  let clearButton = createButton("Clear");
  clearButton.position(colourButton.x + colourButton.width, height);
  clearButton.mousePressed(clearScreen);

  let toolCycleButton = createButton(`Change Tool`);
  toolCycleButton.position(clearButton.x + clearButton.width, height);
  toolCycleButton.mousePressed(changeActiveTool);


}

function initializeSliders() {
  
  for (let i = 0; i < 3; i++) {
    sliders[i] = createSlider(0, 255, 0, 0);
    sliders[i].size(sliderSize);
    sliders[i].position(width - sliderSize, 20 + height + i * 30);
    sliders[i].hide();

    // sliders[i].changed(matchTextToSliders);
  }
  
}
/*
function initializeTextInput() {
  for (let i = 0; i < 3; i++) {
    texts[i] = createInput('', 'number');
    texts[i].size(textSize);
    texts[i].position(sliders[i].x - 1.5 * textSize, sliders[i].y);
    texts[i].hide();

    texts[i].changed(matchSlidersToText);
  }
}


function matchSlidersToText() {
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].value = texts[i].value;
  }
}

function matchTextToSliders() {
  for (let i = 0; i < texts.length; i++) {
    texts[i].value = sliders[i].value;
  }
}
*/

function changeColourInterfaceVisibility() {
  colourSlidersVisible = !colourSlidersVisible;
  
  if (!colourSlidersVisible) {
    userInterfacesActive -= 1;
    sliders[0].hide();
    sliders[1].hide();
    sliders[2].hide();
    /*
    texts[0].hide();
    texts[1].hide();
    texts[2].hide(); */
  }
  
  else {
    userInterfacesActive += 1;
    sliders[0].show();
    sliders[1].show();
    sliders[2].show();
    /*
    texts[0].show();
    texts[1].show();
    texts[2].show(); */
  }

}

function mousePressed() {
  dragOriginX = mouseX;
  dragOriginY = mouseY;
}

function mouseReleased() {
  if (userInterfacesActive === 0) {
    useActiveTool();
  }
}

function mouseWheel(event) {
  if (event.delta > 0) {
    console.log(toolWidth);
    toolWidth -= 0.5;
  }
  else {
    console.log(toolWidth);
    toolWidth += 0.5;
  }

  if (toolWidth <= 0) {
    toolWidth = 63;
  }
  toolWidth = abs(toolWidth) % 64;
}

function changeActiveTool() {
  activeTool = (activeTool + 1) % 4;
}

function useActiveTool() {
  fill(sliders[0].value(), sliders[1].value(), sliders[2].value());
  stroke(sliders[0].value(), sliders[1].value(), sliders[2].value());
  strokeWeight(toolWidth);

  if (activeTool === 1) {
    if (mouseX < dragOriginX) {
      rectXUsed = mouseX;
    }
    else {
      rectXUsed = dragOriginX;
    }
    if (mouseY < dragOriginY) {
      rectYUsed = mouseY;
    }
    else {
      rectYUsed = dragOriginY;
    }

    rect(rectXUsed, rectYUsed, mouseX - dragOriginX, mouseY - dragOriginY);
  }
  
  else if (activeTool === 2) {
    circle(dragOriginX, dragOriginY, 2 * dist(mouseX, mouseY, dragOriginX, dragOriginY));
  }
  else if (activeTool === 3) {
    line(dragOriginX, dragOriginY, mouseX, mouseY);
  }
}

function paintBrush() {
  if (mouseIsPressed && activeTool === 0 && userInterfacesActive === 0) {
    stroke(sliders[0].value(), sliders[1].value(), sliders[2].value());
    strokeWeight(toolWidth);
    line(timePreviousMouseX, timePreviousMouseY, mouseX, mouseY);
  }
}

function clearScreen() {
  background(220);
}

function draw() {
  paintBrush();
  timePreviousMouseX = mouseX;
  timePreviousMouseY = mouseY;
}


