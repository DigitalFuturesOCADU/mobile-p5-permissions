// Multi-Touch Drawing Example
// Demonstrates multi-finger touch input without any device permissions

let fingerTrails = {}; // Store trails for each finger
let touchColors = []; // Colors for each finger

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB, 360, 100, 100);
  
  // Set up drawing style
  noFill();
  strokeWeight(3);
  
  // Pre-generate colors for up to 10 fingers
  for (let i = 0; i < 10; i++) {
    touchColors.push((i * 36) % 360); // Evenly spaced hues
  }
}

function draw() {
  // Fade background slightly for trail effect
  fill(0, 20);
  rect(0, 0, width, height);
  
  // Handle multi-touch drawing
  if (touches && touches.length > 0) {
    // Process each active touch
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      let touchId = i; // Use index as touch ID
      
      // Initialize trail for this finger if it doesn't exist
      if (!fingerTrails[touchId]) {
        fingerTrails[touchId] = [];
      }
      
      // Add current position to this finger's trail
      fingerTrails[touchId].push({
        x: touch.x,
        y: touch.y,
        time: millis()
      });
      
      // Remove old trail points (older than 2 seconds)
      fingerTrails[touchId] = fingerTrails[touchId].filter(point => 
        millis() - point.time < 2000
      );
      
      // Draw this finger's trail
      let trail = fingerTrails[touchId];
      if (trail.length > 1) {
        for (let j = 1; j < trail.length; j++) {
          let prev = trail[j - 1];
          let curr = trail[j];
          
          // Use finger-specific color with time variation
          let hue = (touchColors[touchId % touchColors.length] + (curr.time * 0.05)) % 360;
          stroke(hue, 80, 100);
          strokeWeight(3);
          
          // Draw line segment
          line(prev.x, prev.y, curr.x, curr.y);
        }
      }
      
      // Draw current touch point
      fill(touchColors[touchId % touchColors.length], 80, 100);
      noStroke();
      circle(touch.x, touch.y, 25);
    }
  } else if (mouseIsPressed) {
    // Fallback for single touch/mouse (desktop testing)
    let touchId = 'mouse';
    
    if (!fingerTrails[touchId]) {
      fingerTrails[touchId] = [];
    }
    
    fingerTrails[touchId].push({
      x: mouseX,
      y: mouseY,
      time: millis()
    });
    
    fingerTrails[touchId] = fingerTrails[touchId].filter(point => 
      millis() - point.time < 2000
    );
    
    let trail = fingerTrails[touchId];
    if (trail.length > 1) {
      for (let j = 1; j < trail.length; j++) {
        let prev = trail[j - 1];
        let curr = trail[j];
        
        let hue = (curr.time * 0.1) % 360;
        stroke(hue, 80, 100);
        strokeWeight(3);
        
        line(prev.x, prev.y, curr.x, curr.y);
      }
    }
    
    fill(0, 0, 100);
    noStroke();
    circle(mouseX, mouseY, 25);
  }
  
  // Clean up trails for fingers that are no longer touching
  cleanupInactiveTrails();
  
  // Instructions
  let activeTouches = touches ? touches.length : (mouseIsPressed ? 1 : 0);
  if (activeTouches === 0 && Object.keys(fingerTrails).length === 0) {
    fill(0, 0, 100, 60);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Use multiple fingers to draw", width/2, height/2);
    textSize(16);
    text("Each finger gets its own color!", width/2, height/2 + 35);
    text("Double tap to clear", width/2, height/2 + 65);
  }
  
  // Show active finger count
  if (activeTouches > 0) {
    fill(0, 0, 100, 80);
    textAlign(LEFT, TOP);
    textSize(18);
    text(`Fingers: ${activeTouches}`, 20, 20);
  }
}

function cleanupInactiveTrails() {
  // Remove trails that haven't been updated recently (inactive fingers)
  let currentTime = millis();
  let activeTrails = {};
  
  for (let touchId in fingerTrails) {
    let trail = fingerTrails[touchId];
    if (trail.length > 0) {
      let lastPoint = trail[trail.length - 1];
      // Keep trail if it was updated within last 100ms or has recent points
      if (currentTime - lastPoint.time < 100 || trail.some(point => currentTime - point.time < 2000)) {
        activeTrails[touchId] = trail.filter(point => currentTime - point.time < 2000);
      }
    }
  }
  
  fingerTrails = activeTrails;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Clear canvas on double tap
function doubleClicked() {
  background(0);
  fingerTrails = {};
  return false;
}