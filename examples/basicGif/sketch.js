// ============================================
// BASIC GIF TEMPLATE - Mobile p5.js
// A well-commented template for mobile p5.js projects
// ============================================

// Global variables
let gif; // Variable to store the loaded GIF
let isGifLoaded = false; // Flag to track if GIF has loaded successfully

// ============================================
// SETUP FUNCTION - Runs once at the start
// ============================================
function setup() {
    // Create full-screen canvas
    createCanvas(windowWidth, windowHeight);
    
    // Debug: Log that setup has started
    debug("🚀 Setup function started");
    debug("Canvas size:", windowWidth + "x" + windowHeight);
    
    // STEP 1: Enable debug console for mobile development
    // This shows debug messages on the mobile screen
    showDebug();
    debug("📱 Debug console enabled");
    
    // STEP 2: Lock mobile gestures to prevent browser interference
    // This prevents swipe gestures, zoom, refresh, etc.
    lockGestures();
    debug("🔒 Mobile gestures locked");
    
    // STEP 3: Load the GIF file
    // Use preload() for better loading, but this works too
    debug("📁 Loading GIF file...");
    gif = loadImage('image/kindleEvo.gif', 
        // Success callback
        function() {
            isGifLoaded = true;
            debug("✅ GIF loaded successfully!");
            debug("GIF dimensions:", gif.width + "x" + gif.height);
        },
        // Error callback
        function() {
            debug("❌ Error loading GIF file");
            debug("Check that image/kindleEvo.gif exists");
        }
    );
    
    // Set initial background
    background(50);
    
    debug("🎯 Setup complete - waiting for GIF to load");
}

// ============================================
// DRAW FUNCTION - Runs continuously (60fps by default)
// ============================================
function draw() {
    // Clear the background with a dark color
    background(50, 50, 60);
    
    // Only draw if GIF has loaded
    if (isGifLoaded && gif) {
        
        // Calculate position to center the GIF
        let x = (width - gif.width) / 2;
        let y = (height - gif.height) / 2;
        
        // Draw the GIF at the calculated position
        image(gif, x, y);
        
        // Optional: Draw a frame around the GIF
        noFill();
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        rect(x - 2, y - 2, gif.width + 4, gif.height + 4);
        
    } else {
        // Show loading message while GIF loads
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Loading GIF...", width/2, height/2);
        
        // Show a spinning loading indicator
        push();
        translate(width/2, height/2 + 50);
        rotate(frameCount * 0.1);
        stroke(255);
        strokeWeight(3);
        noFill();
        arc(0, 0, 30, 30, 0, PI + frameCount * 0.2);
        pop();
    }
    
    // Debug info in corner (only show first few seconds to avoid spam)
    if (frameCount < 180) { // Show for first 3 seconds (60fps * 3)
        if (frameCount % 60 === 0) { // Update once per second
            debug("🎬 Frame count:", frameCount);
            debug("📊 Frame rate:", Math.round(frameRate()) + " fps");
        }
    }
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
function windowResized() {
    // Resize canvas when device orientation changes
    resizeCanvas(windowWidth, windowHeight);
    debug("📱 Window resized to:", windowWidth + "x" + windowHeight);
}

// ============================================
// TOUCH/CLICK INTERACTION EXAMPLES
// ============================================

// Touch started (finger down)
function touchStarted() {
    debug("👆 Touch started at:", mouseX + ", " + mouseY);
    
    // Example: Change background color on touch
    background(random(100, 255), random(100, 255), random(100, 255));
    
    // Prevent default browser behavior
    return false;
}

// Touch ended (finger up)
function touchEnded() {
    debug("🖐️ Touch ended");
    return false;
}

// Double tap detection
function doubleClicked() {
    debug("👆👆 Double tap detected!");
    
    // Example: Reset to original background
    background(50, 50, 60);
    
    return false;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to toggle debug console visibility
function keyPressed() {
    if (key === 'd' || key === 'D') {
        toggleDebug();
        debug("🔧 Debug console toggled");
    }
    
    if (key === 'c' || key === 'C') {
        debug.clear();
        debug("🧹 Debug console cleared");
    }
}

// ============================================
// TEMPLATE USAGE NOTES:
// ============================================

/*
HOW TO USE THIS TEMPLATE:

1. SETUP CHECKLIST:
   ✅ p5.js library loaded
   ✅ Mobile permissions library loaded
   ✅ Debug console enabled
   ✅ Mobile gestures locked
   ✅ GIF file loaded with error handling

2. CUSTOMIZATION:
   - Replace 'image/kindleEvo.gif' with your own GIF file
   - Modify the draw() function for your specific needs
   - Add your own interaction functions
   - Customize the styling in index.html

3. DEBUG FEATURES:
   - Press 'D' to toggle debug console
   - Press 'C' to clear debug messages
   - Debug messages show loading status, touch events, etc.

4. MOBILE FEATURES:
   - Gestures are locked (no zoom, swipe, refresh)
   - Touch events are handled properly
   - Responsive canvas that adapts to screen size
   - Debug console visible on mobile screen

5. NEXT STEPS:
   - Add motion sensor support with enableGyroTap()
   - Add microphone support with enableMicTap()
   - Implement your creative interactive features
   - Test on actual mobile devices

6. COMMON PATTERNS:
   - Use setup() for initialization
   - Use draw() for continuous animation
   - Use touchStarted/touchEnded for interactions
   - Use windowResized() for orientation changes
   - Use debug() instead of console.log() for mobile
*/