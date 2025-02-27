// slider stuff
let sliderSize = 160;
let sliders = [];

// state variables
let userInterfacesActive = 0;
let activeTool = "brush";
let colourSlidersVisible = false;
let brushWidth = 10;

// mouse position storage
let timePreviousMouseX = 0;
let timePreviousMouseY = 0;
let dragOriginX;
let dragOriginY;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  // button
  let button = createButton('Change Colour');
  button.position(0, height);
  button.mousePressed(changeColourSliderVisibility);
  
  let clearButton = createButton("Clear");
  clearButton.position(0, height + button.height);
  clearButton.mousePressed(clearScreen);

  let toolCycleButton = createButton("Change Tool");
  toolCycleButton.position(0, height + clearButton.height);
  clearButton.mousePressed();
  
  initializeSliders();
  
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
  useActiveTool();
}

function useActiveTool() {
  if (activeTool === "rect") {
    rect(dragOriginX, dragOriginY, mouseX - dragOriginX, mouseY - dragOriginY);
  }
  else if (activeTool === "circle") {
    circle(dragOriginX, dragOriginY, dist(mouseX, mouseY, dragOriginX, dragOriginY));
  }
  else if (activeTool === "line") {
    line(dragOriginX. dragOriginY, mouseX, mouseY);
  }
}

function paintBrush() {
  if (mouseIsPressed && activeTool === "brush") {
    stroke(sliders[0].value(), sliders[1].value(), sliders[2].value());
    strokeWeight(brushWidth);
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


