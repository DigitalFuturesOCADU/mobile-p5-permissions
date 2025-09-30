# Mobile p5.js Permissions

[![CI](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/workflows/CI/badge.svg)](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/actions)
[![npm version](https://badge.fury.io/js/mobile-p5-permissions.svg)](https://badge.fury.io/js/mobile-p5-permissions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Demo-Live%20Examples-blue)](https://digitalfuturesocadu.github.io/mobile-p5-permissions/)

**Easy-to-use permission handling for mobile p5.js projects**

A lightweight library that handles device permissions and gesture blocking for mobile web applications built with p5.js. No more dealing with iOS permission requests, Android compatibility issues, or unwanted browser gestures.

## Features

- Cross-platform compatibility - Works on iOS and Android
- Comprehensive gesture blocking - Prevents unwanted mobile browser behaviors
- Zero configuration - Just include and go
- On-screen debug system with timestamps
- Interactive examples and demos

## Quick Start

### CDN (Recommended)

```html
<!-- Complete mobile p5.js solution -->
<script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/src/permissionsAll.js"></script>
```

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mobile p5.js App</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/src/permissionsAll.js"></script>
</head>
<body>
  <script>
    function setup() {
      createCanvas(windowWidth, windowHeight);
      
      // Lock mobile gestures to prevent browser interference
      lockGestures();
      
      // Enable motion sensors with tap-to-start
      enableGyroTap('Tap to enable motion sensors');
      
      // Enable microphone with tap-to-start  
      enableMicTap('Tap to enable microphone');
    }
    
    function draw() {
      background(220);
      
      if (window.sensorsEnabled) {
        // Use device rotation and acceleration
        fill(255, 0, 0);
        circle(width/2 + rotationY * 5, height/2 + rotationX * 5, 50);
      }
    }
  </script>
</body>
</html>
```

## API Reference

### Core Functions

```javascript
// Essential mobile setup
lockGestures()  // Prevent browser gestures (call in setup())

// Motion sensor activation  
enableGyroTap(message)    // Tap anywhere to enable sensors
enableGyroButton(text)    // Button-based sensor activation

// Microphone activation
enableMicTap(message)     // Tap anywhere to enable microphone  
enableMicButton(text)     // Button-based microphone activation

// Debug system (enhanced in v1.3.0)
showDebug()       // Show on-screen debug panel with automatic error catching
hideDebug()       // Hide debug panel
toggleDebug()     // Toggle panel visibility
debug(...args)    // Console.log with on-screen display and timestamps
debugError(...args) // Display errors with red styling
debugWarn(...args)  // Display warnings with yellow styling
debug.clear()     // Clear debug messages
```

### Available Data

After permissions are enabled, these p5.js variables work on mobile:

```javascript
// Motion sensors (when window.sensorsEnabled is true)
rotationX, rotationY, rotationZ         // Device rotation
accelerationX, accelerationY, accelerationZ  // Device acceleration
deviceShaken                            // Shake detection
deviceMoved                             // Movement detection

// Touch input (always available)
touches[]                               // Array of touch points
mouseX, mouseY                          // Touch coordinates
mouseIsPressed                          // Touch state

// Microphone (when window.micEnabled is true)  
mic.getLevel()                          // Audio input level (0-1)
```

## Debug System

Version 1.3.0 includes a powerful on-screen debug system with **automatic error catching** - essential for mobile development where traditional browser dev tools aren't accessible:

```javascript
function setup() {
  // IMPORTANT: Call showDebug() FIRST to catch setup errors
  showDebug();
  
  createCanvas(windowWidth, windowHeight);
  // Any errors after this point will be automatically caught and displayed
  calculateSomething(); // If this errors, you'll see it on screen!
}

// Use like console.log but visible on mobile screen
debug("App started");
debug("Rotation:", rotationX, rotationY, rotationZ);
debug("Touch count:", touches.length);
debug({x: mouseX, y: mouseY});

// Manual error/warning messages
debugError("Something went wrong!");
debugWarn("This is a warning");

// Clear messages
debug.clear();

// Hide when done
hideDebug();
```

### Key Features

- **🚨 Automatic Error Catching**: JavaScript errors are automatically displayed with red styling
- **📍 Error Location**: Shows filename and line number for easy debugging
- **⏰ Timestamps**: All messages include precise timestamps
- **🎨 Color Coding**: Errors (red), warnings (yellow), normal messages (white)
- **📱 Mobile Optimized**: Touch-friendly interface that works on small screens
- **⌨️ Keyboard Shortcuts**: Press 'D' to toggle, 'C' to clear (when debug is enabled)

### Critical Setup Note

**Always call `showDebug()` at the very beginning of `setup()`** to catch errors that might occur during initialization. If you call it after an error occurs, you won't see that error in the debug panel.
```

## Mobile CSS Optimizations

For optimal mobile performance and behavior, add these CSS rules to your project. These work alongside the JavaScript permissions to provide comprehensive mobile control:

### Complete Mobile CSS Template

```css
/* ============================================
   MOBILE P5.JS STYLES
   Mobile-optimized CSS for p5.js projects
   ============================================ */

/* Reset all default styles and prepare for mobile */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    /* Disable text selection on mobile */
    -webkit-user-select: none;
    user-select: none;
    
    /* Remove tap highlights and callouts */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
}

/* Full-screen mobile setup */
html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    
    /* Disable all touch gestures that could interfere */
    touch-action: none;
    
    /* Set default background and font */
    background: #000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Position p5.js canvas */
canvas {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
}

/* Hide scrollbars completely on mobile */
::-webkit-scrollbar {
    display: none;
}

/* Additional mobile optimizations */
body {
    /* Prevent iOS bounce effect */
    -webkit-overflow-scrolling: touch;
    
    /* Prevent zoom on inputs (if you add any) */
    -webkit-text-size-adjust: 100%;
    
    /* Smooth font rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

### What Each CSS Rule Does

| CSS Property | Purpose | Effect |
|--------------|---------|---------|
| `touch-action: none` | **Disable all touch gestures** | Prevents pinch-zoom, swipe-refresh, pan scrolling |
| `-webkit-user-select: none` | **Disable text selection** | Prevents text highlighting on touch and hold |
| `-webkit-tap-highlight-color: transparent` | **Remove tap highlights** | Removes blue highlight when tapping elements |
| `-webkit-touch-callout: none` | **Disable callout menus** | Prevents copy/paste menu on long press |
| `overflow: hidden` | **Hide scrollbars** | Prevents scrolling and scrollbar appearance |
| `position: fixed` | **Lock viewport** | Prevents address bar hiding/showing behavior |
| `-webkit-text-size-adjust: 100%` | **Prevent zoom on inputs** | Stops auto-zoom when focusing form elements |

### CSS vs JavaScript Controls

**CSS handles:**
- UI/UX optimizations (highlights, selection, scrollbars)
- System-level behaviors (bounce effects, text adjustment)
- Immediate application (no permission requests)

**JavaScript handles:**
- Dynamic gesture control and sensor permissions
- Event-specific blocking and conditional interactions
- Device motion/orientation access

**Best practice:** Use both together for complete mobile optimization.

### Complete HTML Template

Here's a ready-to-use HTML template that combines everything - copy this into your `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile p5.js App</title>
    
    <!-- Load p5.js library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.10/p5.min.js"></script>
    
    <!-- Load mobile permissions library -->
    <script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/src/permissionsAll.js"></script>
    
    <!-- Mobile-optimized styles -->
    <style>
        /* Reset and mobile optimizations */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
        }
        
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: fixed;
            touch-action: none;
            background: #000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        canvas {
            display: block;
            position: fixed;
            left: 0;
            top: 0;
        }
        
        ::-webkit-scrollbar { display: none; }
        
        body {
            -webkit-overflow-scrolling: touch;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
</head>
<body>
    <script>
        function setup() {
            // Show debug panel FIRST to catch setup errors
            showDebug();
            
            // Create full-screen canvas
            createCanvas(windowWidth, windowHeight);
            
            // Lock mobile gestures
            lockGestures();
            
            // Enable motion sensors with tap
            enableGyroTap('Tap to enable motion sensors');
            
            debug("Mobile p5.js app started!");
        }
        
        function draw() {
            background(50);
            
            // Your creative code here
            fill(255);
            ellipse(mouseX, mouseY, 50, 50);
            
            // Show motion data if available
            if (rotationX) {
                debug("Rotation:", rotationX.toFixed(2), rotationY.toFixed(2));
            }
        }
        
        function touchStarted() {
            debug("Touch at:", touchX, touchY);
            return false; // Prevent default
        }
        
        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
        }
    </script>
</body>
</html>
```

This template includes:
- ✅ **Latest p5.js** (v1.11.10) from CDN
- ✅ **Mobile permissions library** from CDN  
- ✅ **Complete mobile CSS** inline for easy copying
- ✅ **Basic p5.js setup** with debug system
- ✅ **Motion sensor activation** with tap-to-start
- ✅ **Touch handling** and responsive canvas
- ✅ **Ready to run** - just save as `index.html` and open!

## Examples

### [Interactive Examples and Demos](https://digitalfuturesocadu.github.io/mobile-p5-permissions/)

Explore our comprehensive collection of examples demonstrating mobile interaction patterns:

**UX Comparison Examples:**
- Button Examples - Compare traditional buttons vs device capabilities (shake detection, movement, orientation)
- Slider Examples - Compare traditional sliders vs mobile interactions (rotation, acceleration, microphone, multi-touch, distance, angle)

**Other Demos:**
- Microphone Demo - Audio visualization using device microphone
- Gyroscope Demo - Tilt-based game using motion sensors

Each example includes QR codes for easy mobile testing and demonstrates both traditional UI patterns and mobile-specific interactions.

## Installation Options

### CDN (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/src/permissionsAll.js"></script>
```

### npm
```bash
npm install mobile-p5-permissions
```

### Download
Download from [GitHub Releases](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/releases)

## Browser Compatibility

- iOS 13+ (Safari)
- Android 7+ (Chrome)
- Chrome 80+
- Safari 13+
- Firefox 75+

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [Live Examples](https://digitalfuturesocadu.github.io/mobile-p5-permissions/)
- [GitHub Issues](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/issues)
- [npm Package](https://www.npmjs.com/package/mobile-p5-permissions)