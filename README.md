# Mobile p5.js Permissions

[![CI](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/workflows/CI/badge.svg)](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/actions)
[![npm version](https://badge.fury.io/js/mobile-p5-permissions.svg)](https://badge.fury.io/js/mobile-p5-permissions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Demo-Live%20Examples-blue)](https://digitalfuturesocadu.github.io/mobile-p5-permissions/)

🚀 **Easy-to-use permission handling for mobile p5.js projects**

A lightweight library that handles device permissions and gesture blocking for mobile web applications built with p5.js. No more dealing with iOS permission requests, Android compatibility issues, or unwanted browser gestures!

## ✨ Features

- 📱 **Cross-platform compatibility** - Works on iOS and Android
- 🎯 **Modular design** - Include only what you need
- 🛡️ **Comprehensive gesture blocking** - Prevents unwanted mobile browser behaviors
- 🔧 **Zero configuration** - Just include and go
- 📚 **Well documented** - Clear examples and usage patterns
- 🎮 **Live examples** - [Try the interactive demos](https://digitalfuturesocadu.github.io/mobile-p5-permissions/)

## 🚀 Quick Start

### Option 1: CDN (Recommended)

```html
<!-- Choose one based on your project needs -->

<!-- Touch input only (no permissions required) -->
<script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionsGesture.js"></script>

<!-- Motion sensors (gyroscope + accelerometer) -->
<script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionsGyro.js"></script>

<!-- Microphone input -->
<script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionMic.js"></script>

<!-- Everything (motion sensors + microphone) -->
<script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionsAll.js"></script>
```

### Option 2: Download and Host

1. Download the files from the `src/` directory
2. Include in your HTML before your sketch.js file

```html
<script src="path/to/permissionsGesture.js"></script>
<script src="sketch.js"></script>
```

## 📋 Module Overview

| Module | Permissions | Available Data | Use Case |
|--------|-------------|----------------|----------|
| `permissionsGesture.js` | None | Touch input | Drawing apps, simple games |
| `permissionsGyro.js` | Motion sensors | Gyroscope, accelerometer, touch | Tilt-based interactions |
| `permissionMic.js` | Microphone | Audio input, touch | Sound-reactive visuals |
| `permissionsAll.js` | Motion + microphone | Everything | Full-featured apps |

## 🎯 Usage Examples

### Basic Touch App

```html
<!DOCTYPE html>
<html>
<head>
  <title>Touch Drawing App</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionsGesture.js"></script>
</head>
<body>
  <button id="startButton">START</button>
  <div id="statusText" class="hidden">Loading...</div>
  
  <script>
    function setup() {
      createCanvas(windowWidth, windowHeight);
    }
    
    function draw() {
      if (mouseIsPressed) {
        circle(mouseX, mouseY, 50);
      }
    }
  </script>
</body>
</html>
```

### Motion Sensor App

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tilt Ball Game</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionsGyro.js"></script>
</head>
<body>
  <button id="startButton">START</button>
  <div id="statusText" class="hidden">Requesting permissions...</div>
  
  <script>
    let ballX, ballY;
    
    function setup() {
      createCanvas(windowWidth, windowHeight);
      ballX = width / 2;
      ballY = height / 2;
    }
    
    function draw() {
      background(220);
      
      // Use device orientation to move ball
      if (window.sensorsEnabled) {
        ballX += rotationY * 0.5;
        ballY += rotationX * 0.5;
        
        // Keep ball on screen
        ballX = constrain(ballX, 25, width - 25);
        ballY = constrain(ballY, 25, height - 25);
      }
      
      circle(ballX, ballY, 50);
    }
  </script>
</body>
</html>
```

### Microphone App

```html
<!DOCTYPE html>
<html>
<head>
  <title>Sound Visualizer</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/addons/p5.sound.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionMic.js"></script>
</head>
<body>
  <button id="startButton">START</button>
  <div id="statusText" class="hidden">Requesting permissions...</div>
  
  <script>
    let mic;
    
    function setup() {
      createCanvas(windowWidth, windowHeight);
      mic = new p5.AudioIn();
    }
    
    function draw() {
      background(0);
      
      if (window.micEnabled) {
        let level = mic.getLevel();
        let diameter = map(level, 0, 1, 10, 300);
        
        fill(255, 100, 100);
        circle(width/2, height/2, diameter);
      }
    }
  </script>
</body>
</html>
```

## 🛡️ What Gets Blocked

All modules include essential gesture blocking:

- **Back/forward navigation** - Prevents accidental browser navigation
- **Edge swipes** - Stops iOS/Android edge gestures
- **Pull-to-refresh** - Prevents refresh on scroll
- **Pinch zoom** - Disables zoom gestures
- **Double-tap zoom** - Prevents double-tap zoom
- **Long-press menus** - Blocks context menus
- **p5.js event conflicts** - Ensures proper touch handling

## 📱 Required HTML Elements

Your HTML must include these elements for the permission system to work:

```html
<button id="startButton">START</button>
<div id="statusText" class="hidden">Requesting permissions...</div>
```

And basic CSS to hide/show them:

```css
.hidden { display: none; }
```

## 🔧 Available Global Variables

After permissions are granted, these variables become available:

### Touch Input (All modules)
- `mouseX`, `mouseY` - Current touch/mouse position
- `touchX`, `touchY` - Touch position
- `touches[]` - Array of all touch points
- `mouseIsPressed` - Whether screen is being touched

### Motion Sensors (`permissionsGyro.js`, `permissionsAll.js`)
- `rotationX`, `rotationY`, `rotationZ` - Device rotation
- `accelerationX`, `accelerationY`, `accelerationZ` - Device acceleration
- `window.sensorsEnabled` - Boolean indicating sensor availability

### Microphone (`permissionMic.js`, `permissionsAll.js`)
- `mic.getLevel()` - Current audio input level (0-1)
- `window.micEnabled` - Boolean indicating microphone availability

## 🎨 CSS Template

For a complete mobile experience, include this CSS:

```css
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
}

canvas {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
}

#startButton {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 60px;
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  z-index: 10000;
}

#statusText {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  font-family: Arial, sans-serif;
  text-align: center;
  z-index: 9999;
}

.hidden {
  display: none;
}
```

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for educational use with p5.js
- Designed for mobile-first creative coding
- Inspired by the need for simple, reliable mobile web app development

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [live examples](https://digitalfuturesocadu.github.io/mobile-p5-permissions/)
2. Review the [issues](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/issues) page
3. Create a new issue with a clear description

## 📦 Installation Options

### CDN (Recommended)
```html
<script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionsAll.js"></script>
```

### npm
```bash
npm install mobile-p5-permissions
```

### Download
Download the latest release from [GitHub Releases](https://github.com/DigitalFuturesOCADU/mobile-p5-permissions/releases)

---

**Made with ❤️ for the creative coding community**