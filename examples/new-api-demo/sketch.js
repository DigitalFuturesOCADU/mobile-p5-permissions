// New API Demo - Clean, simple permissions handling
// Demonstrates the refactored permission functions

let mic;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Lock gestures immediately - no UI needed!
  lockGestures();
  
  // Create microphone object
  mic = new p5.AudioIn();
  
  // Enable permissions - choose your style:
  
  // Option 1: Button interface (uncomment to try)
  // enableGyroButton('START SENSORS', 'Enabling motion sensors...');
  // enableMicButton('START MIC', 'Enabling microphone...');
  
  // Option 2: Tap interface (currently active)
  enableGyroTap('Tap to enable tilt controls');
  enableMicTap('Tap to enable microphone');
  
  // Initialize particles
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0,
      size: random(10, 30),
      hue: random(360)
    });
  }
  
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0, 0, 10, 0.1);
  
  // Show what's enabled
  drawStatus();
  
  // Use gyroscope if available
  if (window.sensorsEnabled) {
    updateParticlesWithTilt();
  }
  
  // Use microphone if available
  if (window.micEnabled) {
    updateParticlesWithAudio();
  }
  
  // Draw particles
  drawParticles();
  
  // Touch interaction
  if (mouseIsPressed) {
    drawTouchEffect();
  }
}

function drawStatus() {
  fill(360, 0, 100, 0.8);
  textAlign(LEFT, TOP);
  textSize(16);
  
  let y = 20;
  text("🔒 Gestures: " + (window.gesturesLocked ? "Locked" : "Unlocked"), 20, y);
  y += 25;
  text("📱 Motion: " + (window.sensorsEnabled ? "Enabled" : "Disabled"), 20, y);
  y += 25;
  text("🎵 Audio: " + (window.micEnabled ? "Enabled" : "Disabled"), 20, y);
  
  if (window.sensorsEnabled) {
    y += 35;
    text("Tilt X: " + (rotationY || 0).toFixed(1), 20, y);
    y += 20;
    text("Tilt Y: " + (rotationX || 0).toFixed(1), 20, y);
  }
}

function updateParticlesWithTilt() {
  let tiltX = rotationY || 0;
  let tiltY = rotationX || 0;
  
  for (let particle of particles) {
    particle.vx += tiltX * 0.1;
    particle.vy += tiltY * 0.1;
  }
}

function updateParticlesWithAudio() {
  let level = mic.getLevel();
  let audioForce = level * 5;
  
  for (let particle of particles) {
    // Pull towards center when loud
    if (level > 0.1) {
      let dx = width/2 - particle.x;
      let dy = height/2 - particle.y;
      let distance = sqrt(dx*dx + dy*dy);
      
      if (distance > 0) {
        particle.vx += (dx/distance) * audioForce;
        particle.vy += (dy/distance) * audioForce;
      }
    }
    
    // Make particles bigger with sound
    particle.targetSize = particle.size + level * 50;
  }
}

function drawParticles() {
  for (let particle of particles) {
    // Update physics
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= 0.95;
    particle.vy *= 0.95;
    
    // Bounce off edges
    if (particle.x < 0 || particle.x > width) {
      particle.vx *= -0.7;
      particle.x = constrain(particle.x, 0, width);
    }
    
    if (particle.y < 0 || particle.y > height) {
      particle.vy *= -0.7;
      particle.y = constrain(particle.y, 0, height);
    }
    
    // Draw particle
    let currentSize = particle.targetSize || particle.size;
    fill(particle.hue, 80, 100, 0.8);
    noStroke();
    circle(particle.x, particle.y, currentSize);
    
    // Inner glow
    fill(particle.hue, 40, 100, 0.4);
    circle(particle.x, particle.y, currentSize * 0.6);
  }
}

function drawTouchEffect() {
  let hue = (millis() * 0.2) % 360;
  
  // Ripple effect
  for (let i = 0; i < 5; i++) {
    let alpha = map(i, 0, 4, 0.8, 0.1);
    fill(hue, 100, 100, alpha);
    noStroke();
    circle(mouseX, mouseY, 50 + i * 20);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Optional: Listen for permission events
window.addEventListener('permissionsReady', (event) => {
  console.log('Permissions ready!', event.detail);
});

// This function gets called when permissions are ready
function userSetupComplete() {
  console.log('All permissions setup complete!');
}