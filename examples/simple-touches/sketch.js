// Simple Multi-Touch Counter
// Shows how many fingers are touching the screen simultaneously

// Color scheme - using RGB values instead of hex strings
let backgroundColor, touchColor;

// Touch counting
let currentTouchCount = 0;
let maxTouchCount = 10;

// Visual elements
let circleSize = 60;

// On-screen console for mobile debugging
let consoleMessages = [];
let maxMessages = 5;

function logToScreen(message) {
  consoleMessages.push(new Date().toLocaleTimeString() + ': ' + message);
  if (consoleMessages.length > maxMessages) {
    consoleMessages.shift(); // Remove oldest message
  }
  console.log(message); // Also log to browser console
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize colors properly
  backgroundColor = color(44, 62, 80); // Dark blue-gray
  touchColor = color(231, 76, 60); // Red
  
  // Only call lockGestures if it exists
  if (typeof lockGestures === 'function') {
    lockGestures();
    logToScreen('lockGestures() called successfully');
  } else {
    logToScreen('lockGestures() function not found');
  }
  
  textAlign(CENTER, CENTER);
  noStroke();
  
  logToScreen('Multi-touch detection ready!');
}

function draw() {
  background(backgroundColor);
  
  try {
    // Update touch count with error checking
    currentTouchCount = (touches && touches.length) ? touches.length : 0;
    
    // Title
    fill(255);
    textSize(32);
    text('MULTI-TOUCH COUNTER', width / 2, 80);
    
    // Instructions
    textSize(18);
    fill(255, 200);
    if (currentTouchCount === 0) {
      text('Place multiple fingers on the screen!', width / 2, 120);
    } else if (currentTouchCount === 1) {
      text('Add more fingers to see multi-touch!', width / 2, 120);
    } else {
      text('Great! You have ' + currentTouchCount + ' fingers touching!', width / 2, 120);
    }
    
    // Draw value circles showing touch count
    drawTouchCountCircles();
    
    // Draw actual touch points
    drawTouchPoints();
    
    // Display current touch count (large)
    fill(255);
    textSize(72);
    text(currentTouchCount, width / 2, height - 200);
    
    textSize(20);
    text('Active Touches', width / 2, height - 150);
    
    // Show max recorded touches
    textSize(16);
    fill(255, 150);
    text('Try using up to 10 fingers!', width / 2, height - 120);
    
    // Draw on-screen console (commented out)
    // drawConsole();
    
  } catch (error) {
    logToScreen('Error in draw(): ' + error.message);
    fill(255, 0, 0);
    textSize(16);
    text('ERROR: ' + error.message, width / 2, height / 2);
  }
}

function drawConsole() {
  // Draw on-screen console for mobile debugging
  if (consoleMessages.length > 0) {
    // Console background
    fill(0, 0, 0, 150);
    noStroke();
    let consoleHeight = consoleMessages.length * 20 + 20;
    rect(10, height - consoleHeight - 10, width - 20, consoleHeight, 5);
    
    // Console messages
    fill(0, 255, 0); // Green text
    textAlign(LEFT, CENTER);
    textSize(12);
    for (let i = 0; i < consoleMessages.length; i++) {
      text(consoleMessages[i], 15, height - consoleHeight + i * 20 + 10);
    }
    
    // Reset text alignment
    textAlign(CENTER, CENTER);
  }
}

function drawTouchCountCircles() {
  try {
    // Draw circles representing the current touch count
    let circlesY = height / 2;
    let totalWidth = min(maxTouchCount * 70, width - 60);
    let startX = width / 2 - totalWidth / 2;
    
    for (let i = 0; i < maxTouchCount; i++) {
      let x = startX + i * (totalWidth / maxTouchCount) + (totalWidth / maxTouchCount) / 2;
      
      if (i < currentTouchCount) {
        // Filled circle
        fill(touchColor);
        circle(x, circlesY, circleSize);
        
        // Inner highlight
        fill(255, 255, 255, 100);
        circle(x, circlesY, circleSize * 0.6);
        
        // Touch number
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textSize(16);
        text(i + 1, x, circlesY);
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
  } catch (error) {
    logToScreen('Error in drawTouchCountCircles: ' + error.message);
  }
}

function drawTouchPoints() {
  try {
    // Draw visual indicators where fingers are actually touching
    if (touches && touches.length > 0) {
      stroke(touchColor);
      strokeWeight(4);
      fill(red(touchColor), green(touchColor), blue(touchColor), 100);
      
      for (let i = 0; i < touches.length; i++) {
        let touch = touches[i];
        
        // Check if touch object exists and has x,y properties
        if (touch && typeof touch.x === 'number' && typeof touch.y === 'number') {
          // Touch circle
          circle(touch.x, touch.y, 50);
          
          // Touch number
          fill(255, 255, 255);
          textAlign(CENTER, CENTER);
          textSize(18);
          text(i + 1, touch.x, touch.y);
          
          // Ripple effect
          noFill();
          stroke(red(touchColor), green(touchColor), blue(touchColor), 100);
          strokeWeight(2);
          circle(touch.x, touch.y, 80);
          circle(touch.x, touch.y, 110);
          
          fill(red(touchColor), green(touchColor), blue(touchColor), 100);
          stroke(touchColor);
          strokeWeight(4);
        } else {
          logToScreen('Invalid touch object at index ' + i);
        }
      }
      
      noStroke();
    }
  } catch (error) {
    logToScreen('Error in drawTouchPoints: ' + error.message);
  }
}

// Touch event handlers
function touchStarted() {
  try {
    let touchCount = touches ? touches.length : 0;
    logToScreen('Touch started. Total: ' + touchCount);
    return false; // Prevent default
  } catch (error) {
    logToScreen('Error in touchStarted: ' + error.message);
    return false;
  }
}

function touchMoved() {
  try {
    // Just prevent default
    return false; // Prevent default
  } catch (error) {
    logToScreen('Error in touchMoved: ' + error.message);
    return false;
  }
}

function touchEnded() {
  try {
    let touchCount = touches ? touches.length : 0;
    logToScreen('Touch ended. Remaining: ' + touchCount);
    return false; // Prevent default
  } catch (error) {
    logToScreen('Error in touchEnded: ' + error.message);
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}