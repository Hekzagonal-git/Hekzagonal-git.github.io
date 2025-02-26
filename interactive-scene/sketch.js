let userInterfacesActive = 0;
let colourSlidersVisible = false;
let sliderSize = 160;
let sliders = [];
let brushWidth = 10;
let previousMouseX = 0;
let previousMouseY = 0;

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

function mousePressed() {
  // fill(sliders[0].value(), sliders[1].value(), sliders[2].value())
  // circle(mouseX, mouseY, brushWidth)
}

function mouseReleased() {
  
}

function paintBrush() {
  if (mouseIsPressed && userInterfacesActive === 0) {
    stroke(sliders[0].value(), sliders[1].value(), sliders[2].value());
    strokeWeight(brushWidth);
    line(previousMouseX, previousMouseY, mouseX, mouseY);
  }
}

function clearScreen() {
  background(220);
}

function draw() {
  paintBrush();
  previousMouseX = mouseX;
  previousMouseY = mouseY;
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