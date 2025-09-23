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
<script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.2.0/src/permissionsAll.js"></script>
```

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mobile p5.js App</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.2.0/src/permissionsAll.js"></script>
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

// Debug system (new in v1.2.0)
showDebug()       // Show on-screen debug panel
hideDebug()       // Hide debug panel
toggleDebug()     // Toggle panel visibility
debug(...args)    // Console.log with on-screen display and timestamps
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

Version 1.2.0 includes a powerful on-screen debug system perfect for mobile development:

```javascript
// Show debug panel
showDebug();

// Use like console.log but visible on mobile screen
debug("App started");
debug("Rotation:", rotationX, rotationY, rotationZ);
debug("Touch count:", touches.length);
debug({x: mouseX, y: mouseY});

// Clear messages
debug.clear();

// Hide when done
hideDebug();
```

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
<script src="https://cdn.jsdelivr.net/npm/mobile-p5-permissions@1.2.0/src/permissionsAll.js"></script>
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