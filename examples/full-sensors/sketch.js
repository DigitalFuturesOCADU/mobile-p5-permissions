// Full Sensor Demo
// Demonstrates all available inputs: touch, motion sensors, and microphone

let mic;
let particles = [];
let centerShape = [];
let audioLevel = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create microphone input
  mic = new p5.AudioIn();
  
  // Initialize particles
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0,
      size: random(5, 15),
      hue: random(360)
    });
  }
  
  // Create center shape vertices
  for (let i = 0; i < 8; i++) {
    let angle = (i / 8) * TWO_PI;
    centerShape.push({
      angle: angle,
      baseRadius: 50,
      radius: 50
    });
  }
  
  colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
  background(0, 0, 5, 0.1);
  
  if (window.sensorsEnabled || window.micEnabled) {
    drawFullDemo();
  } else {
    showWaitingScreen();
  }
}

function drawFullDemo() {
  // Get sensor data
  let tiltX = rotationY || 0;
  let tiltY = rotationX || 0;
  
  if (window.micEnabled) {
    audioLevel = mic.getLevel();
  }
  
  // Draw central responsive shape
  drawCenterShape();
  
  // Update and draw particles based on motion
  updateParticles(tiltX, tiltY);
  
  // Draw touch trails
  drawTouchTrails();
  
  // Draw sensor data display
  drawSensorDisplay();
}

function drawCenterShape() {
  push();
  translate(width/2, height/2);
  
  // Update shape based on audio
  let audioInfluence = audioLevel * 100;
  let hue = (millis() * 0.05) % 360;
  
  for (let vertex of centerShape) {
    vertex.radius = lerp(vertex.radius, vertex.baseRadius + audioInfluence, 0.1);
  }
  
  // Draw shape
  fill(hue, 80, 100, 0.6);
  stroke(hue, 100, 100, 0.8);
  strokeWeight(2);
  
  beginShape();
  for (let vertex of centerShape) {
    let x = cos(vertex.angle) * vertex.radius;
    let y = sin(vertex.angle) * vertex.radius;
    vertex(x, y);
  }
  endShape(CLOSE);
  
  // Inner glow based on audio
  for (let i = 0; i < 3; i++) {
    let alpha = map(i, 0, 2, 0.3, 0.1);
    fill(hue, 60, 100, alpha * audioLevel * 2);
    noStroke();
    beginShape();
    for (let vertex of centerShape) {
      let x = cos(vertex.angle) * (vertex.radius + i * 10);
      let y = sin(vertex.angle) * (vertex.radius + i * 10);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  
  pop();
}

function updateParticles(tiltX, tiltY) {
  for (let particle of particles) {
    // Apply tilt forces
    particle.vx += tiltX * 0.1;
    particle.vy += tiltY * 0.1;
    
    // Audio influence - pull towards center when loud
    if (audioLevel > 0.05) {
      let dx = width/2 - particle.x;
      let dy = height/2 - particle.y;
      let distance = sqrt(dx*dx + dy*dy);
      
      if (distance > 0) {
        particle.vx += (dx/distance) * audioLevel * 2;
        particle.vy += (dy/distance) * audioLevel * 2;
      }
    }
    
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Bounce off edges
    if (particle.x < 0 || particle.x > width) {
      particle.vx *= -0.7;
      particle.x = constrain(particle.x, 0, width);
    }
    
    if (particle.y < 0 || particle.y > height) {
      particle.vy *= -0.7;
      particle.y = constrain(particle.y, 0, height);
    }
    
    // Apply friction
    particle.vx *= 0.95;
    particle.vy *= 0.95;
    
    // Draw particle
    let size = particle.size + audioLevel * 20;
    fill(particle.hue, 80, 100, 0.7);
    noStroke();
    circle(particle.x, particle.y, size);
    
    // Inner highlight
    fill(particle.hue, 40, 100, 0.4);
    circle(particle.x, particle.y, size * 0.5);
  }
}

function drawTouchTrails() {
  if (mouseIsPressed) {
    // Draw touch indicator
    let touchHue = (millis() * 0.2) % 360;
    
    for (let i = 0; i < 5; i++) {
      let alpha = map(i, 0, 4, 0.8, 0.1);
      fill(touchHue, 100, 100, alpha);
      noStroke();
      circle(mouseX, mouseY, 30 + i * 10);
    }
    
    // Ripple effect
    let rippleSize = (millis() % 1000) / 1000 * 100;
    noFill();
    stroke(touchHue, 80, 100, 1 - rippleSize/100);
    strokeWeight(3);
    circle(mouseX, mouseY, rippleSize);
  }
}

function drawSensorDisplay() {
  // Data display panel
  let panelWidth = 200;
  let panelHeight = 160;
  let panelX = 10;
  let panelY = 10;
  
  // Panel background
  fill(0, 0, 0, 0.7);
  stroke(0, 0, 100, 0.3);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 10);
  
  // Text
  fill(0, 0, 100);
  textAlign(LEFT, TOP);
  textSize(14);
  
  let y = panelY + 15;
  let lineHeight = 20;
  
  text("SENSOR DATA", panelX + 10, y);
  y += lineHeight * 1.5;
  
  if (window.sensorsEnabled) {
    text("Tilt X: " + (rotationY || 0).toFixed(1), panelX + 10, y);
    y += lineHeight;
    text("Tilt Y: " + (rotationX || 0).toFixed(1), panelX + 10, y);
    y += lineHeight;
  } else {
    text("Motion: Not enabled", panelX + 10, y);
    y += lineHeight * 2;
  }
  
  if (window.micEnabled) {
    text("Audio: " + (audioLevel * 100).toFixed(0) + "%", panelX + 10, y);
    y += lineHeight;
  } else {
    text("Audio: Not enabled", panelX + 10, y);
    y += lineHeight;
  }
  
  text("Touch: " + (mouseIsPressed ? "Active" : "None"), panelX + 10, y);
  
  // Instructions
  textAlign(CENTER, BOTTOM);
  textSize(12);
  fill(0, 0, 100, 0.7);
  text("Tilt device • Make noise • Touch screen", width/2, height - 10);
}

function showWaitingScreen() {
  fill(0, 0, 100, 0.7);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Waiting for permissions...", width/2, height/2);
  textSize(16);
  text("This demo uses motion sensors + microphone", width/2, height/2 + 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}