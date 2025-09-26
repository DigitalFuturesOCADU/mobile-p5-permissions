// ============================================
// BASIC GIF TEMPLATE - Mobile p5.js
// A well-commented template for mobile p5.js projects
// ============================================

// Configuration variables
const SHOW_DEBUG = true; // Set to false to hide mobile debug console

// Global variables
let gif; // Variable to store the loaded GIF

// GIF display variables (calculated once in setup)
let gifScale;
let gifWidth, gifHeight;
let gifX, gifY;

// ============================================
// PRELOAD FUNCTION - Runs before setup()
// ============================================
function preload() {
    // Load the GIF file before setup() runs
    // This ensures the GIF is ready when we need it
    gif = loadImage('image/kindleEvo.gif');
}

// ============================================
// SETUP FUNCTION - Runs once at the start
// ============================================
function setup() {
  // Create a portrait canvas that adapts to window size
  createCanvas(windowWidth, windowHeight);
  
  // Calculate GIF display properties once
  calculateGifDisplay();
  
  // Lock device orientation changes to prevent unwanted behavior
  lockGestures();
  
  // Show debug console if enabled
  if (SHOW_DEBUG) {
    showDebug();
  }
}

function calculateGifDisplay() {
  // Calculate scale to fill GIF to canvas while maintaining aspect ratio
  let scaleX = width / gif.width;
  let scaleY = height / gif.height;
  gifScale = max(scaleX, scaleY); // Use larger scale to fill canvas
  
  // Calculate actual display dimensions
  gifWidth = gif.width * gifScale;
  gifHeight = gif.height * gifScale;
  
  // Center the GIF on the canvas
  gifX = (width - gifWidth) / 2;
  gifY = (height - gifHeight) / 2;
}

// ============================================
// DRAW FUNCTION - Runs continuously (60fps by default)
// ============================================
function draw() 
{
    // Clear the background with a dark color
    background(50, 50, 60);
    
    // Display the GIF using pre-calculated dimensions and position
    image(gif, gifX, gifY, gifWidth, gifHeight);
    
    // Debug info in corner (only show first few seconds to avoid spam)
    if (SHOW_DEBUG && frameCount < 180) { // Show for first 3 seconds (60fps * 3)
        if (frameCount % 60 === 0) { // Update once per second
            debug("Frame count:", frameCount);
            debug("Frame rate:", Math.round(frameRate()) + " fps");
        }
    }
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
function windowResized() {
    // Resize canvas to match window dimensions
    resizeCanvas(windowWidth, windowHeight);
    
    // Recalculate GIF display properties for new canvas size
    calculateGifDisplay();
    
    if (SHOW_DEBUG) {
        debug("Window resized to:", windowWidth + "x" + windowHeight);
    }
}


// ============================================
// TEMPLATE USAGE NOTES:
// ============================================

/*
HOW TO USE THIS TEMPLATE:

1. CONFIGURATION:
   - Set SHOW_DEBUG to true/false to enable/disable mobile debug console
   - This single variable controls all debug output

2. SETUP CHECKLIST:
   - p5.js library loaded
   - Mobile permissions library loaded
   - GIF file loaded with preload()
   - Debug console enabled (if SHOW_DEBUG is true)
   - Mobile gestures locked

3. CUSTOMIZATION:
   - Replace 'image/kindleEvo.gif' with your own GIF file
   - Modify the draw() function for your specific needs
   - Add your own interaction functions
   - Customize the styling in index.html

4. DEBUG FEATURES (when SHOW_DEBUG = true):
   - Press 'D' to toggle debug console visibility
   - Press 'C' to clear debug messages
   - Debug messages show loading status, touch events, etc.
   - All debug output can be disabled by setting SHOW_DEBUG = false

5. MOBILE FEATURES:
   - Gestures are locked (no zoom, swipe, refresh)
   - Touch events are handled properly
   - Responsive canvas that adapts to screen size
   - Debug console visible on mobile screen (when enabled)

6. NEXT STEPS:
   - Add motion sensor support with enableGyroTap()
   - Add microphone support with enableMicTap()
   - Implement your creative interactive features
   - Test on actual mobile devices

7. COMMON PATTERNS:
   - Use preload() for loading assets (images, sounds, etc.)
   - Use setup() for initialization
   - Use draw() for continuous animation
   - Use touchStarted/touchEnded for interactions
   - Use windowResized() for orientation changes
   - Use debug() instead of console.log() for mobile (when SHOW_DEBUG = true)
*/