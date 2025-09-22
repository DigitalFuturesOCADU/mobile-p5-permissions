// Basic Touch Drawing Example
// Demonstrates touch input without any device permissions

let trails = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  // Set up drawing style
  noFill();
  strokeWeight(3);
}

function draw() {
  // Fade background slightly for trail effect
  fill(0, 10);
  rect(0, 0, width, height);
  
  // Draw current touch position
  if (mouseIsPressed) {
    // Add current position to trail
    trails.push({
      x: mouseX,
      y: mouseY,
      time: millis()
    });
    
    // Remove old trail points (older than 2 seconds)
    trails = trails.filter(point => millis() - point.time < 2000);
    
    // Draw the trail
    for (let i = 1; i < trails.length; i++) {
      let prev = trails[i - 1];
      let curr = trails[i];
      
      // Color changes over time
      let hue = (curr.time * 0.1) % 360;
      stroke(hue, 80, 100);
      
      // Draw line segment
      line(prev.x, prev.y, curr.x, curr.y);
    }
    
    // Draw current touch point
    fill(255);
    noStroke();
    circle(mouseX, mouseY, 20);
    stroke(255);
    strokeWeight(1);
    noFill();
  }
  
  // Instructions
  if (!mouseIsPressed && trails.length === 0) {
    fill(255, 100);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Touch and drag to draw", width/2, height/2);
    textSize(16);
    text("No device permissions needed!", width/2, height/2 + 40);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Clear canvas on double tap
function doubleClicked() {
  background(0);
  trails = [];
  return false;
}