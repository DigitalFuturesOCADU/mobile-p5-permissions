// ============================================
// BASIC GIF TEMPLATE - Mobile p5.js
// A well-commented template for mobile p5.js projects
// ============================================

// Configuration variables
const SHOW_DEBUG = true; // Set to false to hide mobile debug console
window.SHOW_DEBUG = SHOW_DEBUG; // Make it globally accessible for error handler

// Global variables
let gif; // Variable to store the loaded GIF

// GIF display variables (calculated once in setup)
let gifScale;
let gifWidth, gifHeight;
let gifX, gifY;

// ============================================
// PRELOAD FUNCTION - Runs before setup()
// ============================================

// Success callback for GIF loading
function onGifLoadSuccess(img) {
    console.log('✅ GIF loaded successfully:', img.width + 'x' + img.height);
    // Store success message for later display
    window._gifLoadStatus = { success: true, message: 'GIF loaded: ' + img.width + 'x' + img.height };
}

// Error callback for GIF loading
function onGifLoadError(error) {
    console.error('❌ Failed to load GIF: image/kindleEvo.gif');
    // Store error for later display when debug panel is ready
    window._gifLoadStatus = { 
        success: false, 
        message: 'Failed to load GIF: image/kindleEvo.gif',
        details: 'Check that the file exists and path is correct'
    };
}

function preload() {
    // Load the GIF file before setup() runs with error handling
    gif = loadImage('image/kindleEvo.gif', onGifLoadSuccess, onGifLoadError);
}

// ============================================
// SETUP FUNCTION - Runs once at the start
// ============================================
function setup() {
  // Show debug console FIRST if enabled - before anything that might error
  if (SHOW_DEBUG) {
    showDebug();
  }
  
  // Check and display GIF loading status
  if (window._gifLoadStatus) {
    if (window._gifLoadStatus.success) {
      debug(window._gifLoadStatus.message);
    } else {
      debugError(window._gifLoadStatus.message);
      if (window._gifLoadStatus.details) {
        debugError(window._gifLoadStatus.details);
      }
    }
  }
  
  // Create a portrait canvas that adapts to window size
  createCanvas(windowWidth, windowHeight);
  
  // Calculate GIF display properties once
  calculateGifDisplay();
  
  // Lock device orientation changes to prevent unwanted behavior
  lockGestures();
}

function calculateGifDisplay() {
  // Check if GIF loaded properly
  if (!gif || gif.width === 1 || gif.height === 1) {
    debugError('GIF not loaded or failed to load');
    debugError('Cannot calculate display properties without valid GIF');
    return;
  }
  
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
function draw() {
    // Clear the background with a dark color
    background(50, 50, 60);
    
    // Only draw GIF if it loaded properly
    if (gif && gif.width > 1 && gif.height > 1 && gifWidth && gifHeight) {
        // Display the GIF using pre-calculated dimensions and position
        image(gif, gifX, gifY, gifWidth, gifHeight);
    } else {
        // Show error message on canvas
        fill(255, 100, 100);
        textAlign(CENTER, CENTER);
        textSize(16);
        text("GIF Failed to Load", width/2, height/2);
        text("Check debug panel for details", width/2, height/2 + 25);
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
// TOUCH/INTERACTION HANDLERS
// ============================================

/**
 * Handle touch/click events
 */
function touchStarted() {
    // Don't process touches that are on the debug panel area
    if (SHOW_DEBUG) {
        const debugPanel = document.getElementById('mobile-debug-panel');
        if (debugPanel && debugPanel.style.display !== 'none') {
            const rect = debugPanel.getBoundingClientRect();
            if (touchX >= rect.left && touchX <= rect.right && 
                touchY >= rect.top && touchY <= rect.bottom) {
                return; // Allow debug panel interaction
            }
        }
    }
    
    // Add your touch handling code here
    if (SHOW_DEBUG) {
        debug("Touch detected at:", touchX, touchY);
    }
    
    // Prevent default behavior (zooming, etc.)
    return false;
}

/**
 * Keyboard shortcuts for debug control
 */
function keyPressed() {
    if (SHOW_DEBUG) {
        if (key === 'd' || key === 'D') {
            toggleDebug();
        } else if (key === 'c' || key === 'C') {
            debug.clear();
        }
    }
}


// ============================================
// TEMPLATE USAGE NOTES:
// ============================================

/*
HOW TO USE THIS TEMPLATE:

1. CONFIGURATION:
   - Set SHOW_DEBUG to true/false to enable/disable mobile debug console
   - Replace 'image/kindleEvo.gif' with your own GIF file path

2. DEBUG FEATURES (when SHOW_DEBUG = true):
   - Automatic error catching and display in debug panel
   - Use debug() for normal messages, debugWarn() for warnings, debugError() for errors
   - Press 'D' to toggle debug console visibility
   - Press 'C' to clear debug messages
   - GIF loading errors automatically caught and displayed

3. MOBILE FEATURES:
   - Gestures are locked (no zoom, swipe, refresh)
   - Touch events handled properly with debug panel interaction
   - Responsive canvas that adapts to screen size
   - Debug console visible on mobile devices

4. NEXT STEPS:
   - Add motion sensor support with enableGyroTap() or enableGyroButton()
   - Add microphone support with enableMicTap() or enableMicButton()
   - Implement your creative interactive features in touchStarted()
   - Test on actual mobile devices

5. COMMON PATTERNS:
   - Use preload() for loading assets (images, sounds, etc.)
   - Use setup() for initialization
   - Use draw() for continuous animation
   - Use touchStarted() for interactions
   - Use windowResized() for orientation changes
   - Use debug() instead of console.log() for mobile debugging
*/