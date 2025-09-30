# Mobile p5.js Permissions

[![CI](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/workflows/CI/badge.svg)](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/actions)
[![npm version](https://badge.fury.io/js/mobile-p5-permissions.svg)](https://badge.fury.io/js/mobile-p5-permissions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Demo-Live%20Examples-blue)](https://digitalfuturesocadu.github.io/mobile-p5-permissions/)

**Easy-to-use permission handling for mobile p5.js projects**

A lightweight library that handles device permissions and gesture blocking for mobile web applications built with p5.js. It simplifies the management of iOS permission requests, Android compatibility issues, or unwanted browser gestures.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
  - [CDN (Recommended)](#cdn-recommended)
  - [Basic Setup](#basic-setup)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [Status Variables](#status-variables)
  - [lockGestures()](#lockgestures)
  - [Motion Sensor Activation](#motion-sensor-activation)
  - [Microphone Activation](#microphone-activation)
  - [Debug System](#debug-system)
- [Mobile CSS Optimizations](#mobile-css-optimizations)
- [Examples](#examples)
- [Installation Options](#installation-options)
- [Browser Compatibility](#browser-compatibility)
- [About](#about)
- [License](#license)

## Features

- Cross-platform compatibility - Works on iOS and Android
- Comprehensive gesture blocking - Prevents unwanted mobile browser behaviors
- Simple implemtation in P5
- On-screen debug system with timestamps
- Interactive examples and demos

## Quick Start

### CDN (Recommended)

```html
<!-- Complete mobile p5.js solution (minified) -->
<script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/dist/p5.mobile-permissions.min.js"></script>

<!-- Or development version (unminified) -->
<script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/dist/p5.mobile-permissions.js"></script>
```

### Basic Setup

#### Index HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mobile p5.js App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.10/p5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/dist/p5.mobile-permissions.min.js"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <script src="sketch.js"></script>
</body>
</html>
```

#### CSS

```css
/* Mobile-optimized CSS for p5.js projects */
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

::-webkit-scrollbar {
    display: none;
}

body {
    -webkit-overflow-scrolling: touch;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

#### p5.js

```javascript
function setup() {
  // Show debug panel FIRST to catch setup errors
  showDebug();
  
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

// Status variables (check these in your code)
window.sensorsEnabled     // Boolean: true when motion sensors are active
window.micEnabled         // Boolean: true when microphone is active

// Debug system (enhanced in v1.3.0)
showDebug()       // Show on-screen debug panel with automatic error catching
hideDebug()       // Hide debug panel
toggleDebug()     // Toggle panel visibility
debug(...args)    // Console.log with on-screen display and timestamps
debugError(...args) // Display errors with red styling
debugWarn(...args)  // Display warnings with yellow styling
debug.clear()     // Clear debug messages
```

**📋 p5.js Namespace Support**: All functions are also available as `p5.prototype` methods:
```javascript
// You can use either syntax:
lockGestures();          // Global function (recommended)
this.lockGestures();     // p5.js instance method

// Both approaches work identically
enableGyroTap('Tap to start');
this.enableGyroTap('Tap to start');
```

### Status Variables

**Purpose:** Check whether permissions have been granted and sensors are active.

**Variables:**
- `window.sensorsEnabled` - Boolean indicating if motion sensors are active
- `window.micEnabled` - Boolean indicating if microphone is active

**Usage:**
```javascript
function draw() {
  // Always check before using sensor data
  if (window.sensorsEnabled) {
    // Safe to use rotationX, rotationY, accelerationX, etc.
    let tilt = rotationX;
  }
  
  if (window.micEnabled) {
    // Safe to use microphone
    let audioLevel = mic.getLevel();
  }
}

// You can also use them for conditional UI
function setup() {
  enableGyroTap('Tap to enable motion');
  
  // Show different instructions based on status
  if (!window.sensorsEnabled) {
    debug("Motion sensors not yet enabled");
  }
}
```

### lockGestures()

**Purpose:** Prevents unwanted mobile browser gestures that can interfere with your p5.js app.

**When to use:** Call once in your `setup()` function after creating the canvas.

**What it blocks:**
- **Pinch-to-zoom** - Prevents users from accidentally zooming the page
- **Pull-to-refresh** - Stops the browser refresh gesture when pulling down
- **Swipe navigation** - Disables back/forward swipe gestures
- **Long-press context menus** - Prevents copy/paste menus from appearing
- **Text selection** - Stops accidental text highlighting on touch and hold
- **Double-tap zoom** - Eliminates double-tap to zoom behavior

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  lockGestures(); // Essential for smooth mobile interaction
}
```

### Motion Sensor Activation

**Purpose:** Enable device motion and orientation sensors with user permission handling.

**Commands:**
- `enableGyroTap(message)` - Tap anywhere on screen to enable sensors
- `enableGyroButton(text)` - Creates a button with custom text to enable sensors

**Usage:**
```javascript
// Tap-to-enable (recommended)
enableGyroTap('Tap to enable motion sensors');

// Button-based activation
enableGyroButton('Enable Motion');
```

**Available p5.js Variables (when `window.sensorsEnabled` is true):**

| Variable | Description | Range/Units |
|----------|-------------|-------------|
| `rotationX` | Device tilt forward/backward | -180° to 180° |
| `rotationY` | Device tilt left/right | -180° to 180° |
| `rotationZ` | Device rotation around screen | -180° to 180° |
| `accelerationX` | Acceleration left/right | m/s² |
| `accelerationY` | Acceleration up/down | m/s² |
| `accelerationZ` | Acceleration forward/back | m/s² |
| `deviceShaken` | Shake detection event | true when shaken |
| `deviceMoved` | Movement detection event | true when moved |

**⚠️ Important:** All motion sensor variables, including `deviceShaken` and `deviceMoved`, are only available when `window.sensorsEnabled` is true. Always check this status before using any motion data.

**Example:**
```javascript
function draw() {
  // CRITICAL: Always check window.sensorsEnabled first
  if (window.sensorsEnabled) {
    // Tilt-controlled circle
    let x = width/2 + rotationY * 3;
    let y = height/2 + rotationX * 3;
    circle(x, y, 50);
    
    // Shake detection - only works when sensors are enabled
    if (deviceShaken) {
      background(random(255), random(255), random(255));
    }
    
    // Movement detection - also requires sensors to be enabled
    if (deviceMoved) {
      fill(255, 0, 0);
    }
  } else {
    // Show fallback when sensors not enabled
    text('Tap to enable motion sensors', 20, 20);
  }
}
```

### Microphone Activation

**Purpose:** Enable device microphone with user permission handling for audio-reactive applications.

**Commands:**
- `enableMicTap(message)` - Tap anywhere on screen to enable microphone
- `enableMicButton(text)` - Creates a button with custom text to enable microphone

**Usage:**
```javascript
// Tap-to-enable (recommended)
enableMicTap('Tap to enable microphone');

// Button-based activation
enableMicButton('Enable Audio');
```

**Available p5.js Variables (when `window.micEnabled` is true):**

| Variable | Description | Range |
|----------|-------------|-------|
| `mic.getLevel()` | Current audio input level | 0.0 to 1.0 |

**Example:**
```javascript
function draw() {
  if (window.micEnabled) {
    // Audio-reactive visualization
    let level = mic.getLevel();
    let size = map(level, 0, 1, 10, 200);
    
    background(level * 255);
    circle(width/2, height/2, size);
  }
}
```

### Debug System

**Purpose:** Essential on-screen debugging system for mobile development where traditional browser dev tools aren't accessible. Provides automatic error catching, timestamped logging, and color-coded messages.

**Why use it:** Mobile browsers often hide JavaScript errors, making debugging difficult. This system displays all errors, warnings, and custom messages directly on your mobile screen with timestamps and color coding.

**Commands:**

| Function | Purpose | Example |
|----------|---------|---------|
| `showDebug()` | Show debug panel and enable error catching | `showDebug()` |
| `hideDebug()` | Hide debug panel | `hideDebug()` |
| `toggleDebug()` | Toggle panel visibility | `toggleDebug()` |
| `debug(...args)` | Log messages (white text) | `debug("App started", frameRate())` |
| `debugError(...args)` | Display errors (red text) | `debugError("Connection failed")` |
| `debugWarn(...args)` | Display warnings (yellow text) | `debugWarn("Low battery")` |
| `debug.clear()` | Clear all messages | `debug.clear()` |

**Key Features:**
- **Automatic Error Catching** - JavaScript errors automatically displayed with red styling
- **Error Location** - Shows filename and line number for easy debugging
- **Timestamps** - All messages include precise timestamps
- **Color Coding** - Errors (red), warnings (yellow), normal messages (white)
- **Mobile Optimized** - Touch-friendly interface that works on small screens
- **Keyboard Shortcuts** - Press 'D' to toggle, 'C' to clear (when debug is enabled)

**Critical Setup:**
```javascript
function setup() {
  // IMPORTANT: Call showDebug() FIRST to catch setup errors
  showDebug();
  
  createCanvas(windowWidth, windowHeight);
  // Any errors after this point will be automatically caught and displayed
}
```

**Usage Examples:**
```javascript
// Basic logging
debug("Touch at:", mouseX, mouseY);
debug("Sensors enabled:", window.sensorsEnabled);

// Error handling
debugError("Failed to load image");
debugWarn("Frame rate dropping:", frameRate());

// Objects and arrays
debug("Touch points:", touches);
debug({rotation: rotationX, acceleration: accelerationX});
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
    <script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.3.0/dist/p5.mobile-permissions.min.js"></script>
    
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

## About

This library was created by Nick Puckett [https://github.com/npuckett](https://github.com/npuckett).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

