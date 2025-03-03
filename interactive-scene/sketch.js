// slider stuff
let sliderSize = 160;
let sliders = [];

// state variables
let userInterfacesActive = 0;
let activeTool = 0;
let colourSlidersVisible = false;
let toolWidth = 10;

// mouse position storage
let timePreviousMouseX = 0;
let timePreviousMouseY = 0;
let dragOriginX;
let dragOriginY;

let rectXUsed;
let rectYUsed;

function setup() {
  createCanvas(400, 400);
  background(220);

  initializeSliders();
  
  // button
  let colourButton = createButton('Change Colour');
  colourButton.position(0, height);
  colourButton.mousePressed(changeColourSliderVisibility);
  
  let clearButton = createButton("Clear");
  clearButton.position(0, height + colourButton.height);
  clearButton.mousePressed(clearScreen);

  let toolCycleButton = createButton("Change Tool");
  toolCycleButton.position(0, height + 2 * clearButton.height);
  toolCycleButton.mousePressed(changeActiveTool);


}

function initializeSliders() {
  
  for (let i = 0; i <= 2; i++) {
    sliders[i] = createSlider(0, 255, 0, 0);
    sliders[i].size(sliderSize);
    sliders[i].position(width / 2 - sliderSize / 2, height / 2 + (i - 1) * 30);
    sliders[i].hide();
  }
  
}

function changeColourSliderVisibility() {
  colourSlidersVisible = !colourSlidersVisible;
  
  if (!colourSlidersVisible) {
    userInterfacesActive -= 1;
    sliders[0].hide();
    sliders[1].hide();
    sliders[2].hide();
  }
  
  else {
    userInterfacesActive += 1;
    sliders[0].show();
    sliders[1].show();
    sliders[2].show();
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


