// Simple Integer Slider
// Clean, mobile-friendly slider that outputs integer values 0-10

// Color scheme
let backgroundColor = '#2c3e50'; // Dark blue-gray
let sliderColor = '#3498db'; // Blue

// Slider properties
let sliderValue = 5; // Current slider value (0-10)
let sliderMin = 0;
let sliderMax = 10;
let sliderX, sliderY;
let sliderWidth = 300;
let sliderHeight = 40;
let isDragging = false;

// Visual elements
let circleSize = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Calculate slider position
  updateLayout();
  
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(backgroundColor);
  
  // Title
  fill(255);
  textSize(32);
  text('INTEGER SLIDER', width / 2, 80);
  
  // Instructions
  textSize(18);
  fill(255, 200);
  text('Drag the slider to select a value (0-10)', width / 2, 120);
  
  // Draw slider
  drawSlider();
  
  // Draw value visualization
  drawValueCircles();
  
  // Display current value
  fill(255);
  textSize(48);
  text(sliderValue, width / 2, height - 120);
  
  textSize(20);
  text('Current Value', width / 2, height - 80);
}

function drawSlider() {
  // Slider track (background)
  fill(255, 255, 255, 100);
  rect(sliderX, sliderY, sliderWidth, sliderHeight, sliderHeight / 2);
  
  // Calculate slider handle position
  let handleX = map(sliderValue, sliderMin, sliderMax, sliderX + 20, sliderX + sliderWidth - 20);
  
  // Slider fill (shows progress)
  fill(sliderColor);
  rect(sliderX, sliderY, handleX - sliderX + 20, sliderHeight, sliderHeight / 2);
  
  // Slider handle shadow
  fill(0, 0, 0, 50);
  circle(handleX + 2, sliderY + sliderHeight / 2 + 2, 35);
  
  // Slider handle
  fill(255);
  if (isDragging) {
    fill(255, 255, 0); // Yellow when dragging
  }
  circle(handleX, sliderY + sliderHeight / 2, 35);
  
  // Handle indicator
  fill(sliderColor);
  circle(handleX, sliderY + sliderHeight / 2, 15);
  
  // Tick marks
  drawTickMarks();
}

function drawTickMarks() {
  stroke(255, 150);
  strokeWeight(2);
  textAlign(CENTER, CENTER);
  fill(255, 150);
  textSize(14);
  
  for (let i = 0; i <= sliderMax; i++) {
    let tickX = map(i, sliderMin, sliderMax, sliderX + 20, sliderX + sliderWidth - 20);
    let tickY = sliderY + sliderHeight + 10;
    
    // Tick mark
    line(tickX, tickY, tickX, tickY + 8);
    
    // Number label
    text(i, tickX, tickY + 25);
  }
  
  noStroke();
}

function drawValueCircles() {
  // Draw circles representing the current value
  let circlesY = height / 2 + 50;
  let totalWidth = min(sliderMax * 70, width - 60);
  let startX = width / 2 - totalWidth / 2;
  
  for (let i = 0; i < sliderMax; i++) {
    let x = startX + i * (totalWidth / sliderMax) + (totalWidth / sliderMax) / 2;
    
    if (i < sliderValue) {
      // Filled circle
      fill(sliderColor);
      circle(x, circlesY, circleSize);
      
      // Inner highlight
      fill(255, 255, 255, 100);
      circle(x, circlesY, circleSize * 0.6);
    } else {
      // Empty circle
      fill(255, 255, 255, 50);
      circle(x, circlesY, circleSize);
      
      // Border
      stroke(255, 255, 255, 100);
      strokeWeight(2);
      noFill();
      circle(x, circlesY, circleSize);
      noStroke();
    }
  }
}

function isSliderPressed(x, y) {
  return x >= sliderX && 
         x <= sliderX + sliderWidth &&
         y >= sliderY - 20 && 
         y <= sliderY + sliderHeight + 20;
}

function updateSliderValue(x) {
  let newValue = map(x, sliderX + 20, sliderX + sliderWidth - 20, sliderMin, sliderMax);
  newValue = constrain(newValue, sliderMin, sliderMax);
  sliderValue = round(newValue);
  
  console.log('Slider value:', sliderValue);
}

// Touch events for mobile
function touchStarted() {
  if (touches.length === 1 && isSliderPressed(touches[0].x, touches[0].y)) {
    isDragging = true;
    updateSliderValue(touches[0].x);
    return false;
  }
}

function touchMoved() {
  if (isDragging && touches.length === 1) {
    updateSliderValue(touches[0].x);
    return false;
  }
}

function touchEnded() {
  isDragging = false;
  return false;
}

// Mouse events for desktop
function mousePressed() {
  if (isSliderPressed(mouseX, mouseY)) {
    isDragging = true;
    updateSliderValue(mouseX);
    return false;
  }
}

function mouseDragged() {
  if (isDragging) {
    updateSliderValue(mouseX);
    return false;
  }
}

function mouseReleased() {
  isDragging = false;
}

function updateLayout() {
  sliderX = width / 2 - sliderWidth / 2;
  sliderY = 200;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateLayout();
}