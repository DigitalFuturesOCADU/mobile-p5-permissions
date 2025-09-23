# 🚀 New API Reference - Mobile p5.js Permissions

The refactored `permissionsAll.js` provides a clean, simple API for handling mobile permissions in p5.js projects. No more dealing with HTML buttons or complex setup!

## 📋 Quick Start

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/DigitalFuturesOCADU/mobile-p5-permissions@main/src/permissionsAll.js"></script>

<script>
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Lock gestures immediately
  lockGestures();
  
  // Enable sensors with button
  enableGyroButton();
  
  // Or enable with tap
  // enableGyroTap();
}
</script>
```

## 🎯 Core Functions

### 🔒 Gesture Locking

```javascript
lockGestures()
```
- **What it does**: Prevents mobile browser gestures (back swipe, pinch zoom, etc.)
- **When to call**: In your `setup()` function
- **Requirements**: None - works immediately
- **Example**:
```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  lockGestures(); // Call this first!
}
```

### 📱 Motion Sensor Functions

#### Button Interface
```javascript
enableGyroButton(buttonText, statusText)
```
- **What it does**: Creates a button users click to enable motion sensors
- **Parameters**:
  - `buttonText` (optional): Button text (default: "ENABLE MOTION SENSORS")
  - `statusText` (optional): Loading message (default: "Requesting motion sensors...")
- **Example**:
```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  lockGestures();
  enableGyroButton("START TILT CONTROLS", "Activating gyroscope...");
}
```

#### Tap Interface
```javascript
enableGyroTap(message)
```
- **What it does**: User taps anywhere on screen to enable motion sensors
- **Parameters**:
  - `message` (optional): Instruction text (default: "Tap screen to enable motion sensors")
- **Example**:
```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  lockGestures();
  enableGyroTap("Tap to start tilt game!");
}
```

### 🎵 Microphone Functions

#### Button Interface
```javascript
enableMicButton(buttonText, statusText)
```
- **What it does**: Creates a button users click to enable microphone
- **Requirements**: Create `mic = new p5.AudioIn();` before calling
- **Example**:
```javascript
let mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn(); // Create mic object first!
  
  lockGestures();
  enableMicButton("ENABLE SOUND", "Starting microphone...");
}
```

#### Tap Interface
```javascript
enableMicTap(message)
```
- **What it does**: User taps anywhere to enable microphone
- **Requirements**: Create `mic = new p5.AudioIn();` before calling
- **Example**:
```javascript
let mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  
  lockGestures();
  enableMicTap("Tap to enable sound input");
}
```

## 🌟 Complete Example

```javascript
let mic;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 1. Lock gestures first
  lockGestures();
  
  // 2. Create microphone object
  mic = new p5.AudioIn();
  
  // 3. Choose your permission style
  enableGyroButton("START SENSORS");
  enableMicTap("Tap for microphone");
  
  // 4. Initialize your sketch
  initializeParticles();
}

function draw() {
  background(0, 20);
  
  // Check if permissions are ready
  if (window.sensorsEnabled) {
    // Use rotationX, rotationY, rotationZ
    updateWithTilt();
  }
  
  if (window.micEnabled) {
    // Use mic.getLevel()
    updateWithSound();
  }
  
  drawParticles();
}

// This function is called when permissions are ready
function userSetupComplete() {
  console.log("All permissions enabled!");
}
```

## 📊 Global State Variables

Check these variables to see what's enabled:

```javascript
// Gesture locking
window.gesturesLocked    // true/false

// Motion sensors  
window.sensorsEnabled    // true/false
// Use: rotationX, rotationY, rotationZ
// Use: accelerationX, accelerationY, accelerationZ

// Microphone
window.micEnabled        // true/false
// Use: mic.getLevel()
```

## 🎮 Event Handling

### Permission Ready Callback
```javascript
function userSetupComplete() {
  // Called when permissions are granted
  console.log("Ready to use sensors and mic!");
}
```

### Custom Event Listener
```javascript
window.addEventListener('permissionsReady', (event) => {
  console.log('Permissions status:', event.detail);
  // event.detail contains: { sensors: bool, microphone: bool, gestures: bool }
});
```

## 🔄 Backward Compatibility

The new API is fully backward compatible! Old HTML-based projects still work:

```html
<button id="startButton">START</button>
<div id="statusText" class="hidden">Loading...</div>
```

But the new API is much cleaner:

```javascript
// Old way (still works)
// Requires HTML elements

// New way (recommended)
lockGestures();
enableGyroButton();
enableMicTap();
```

## 🎨 UI Customization

### Button Styles
The generated buttons use modern styling:
- Gradient backgrounds
- Smooth animations
- Mobile-friendly sizing
- Hover effects

### Tap Overlays
The tap interfaces create:
- Full-screen overlays
- Blur effects
- Clear instructions
- Smooth transitions

## 🐛 Troubleshooting

### Common Issues

1. **Microphone not working**:
   ```javascript
   // Make sure to create mic object first
   mic = new p5.AudioIn();
   enableMicButton();
   ```

2. **Sensors not responding**:
   ```javascript
   // Check the global flag
   if (window.sensorsEnabled) {
     // Use rotationX, rotationY here
   }
   ```

3. **Gestures still interfering**:
   ```javascript
   // Call lockGestures() first in setup()
   function setup() {
     createCanvas(windowWidth, windowHeight);
     lockGestures(); // Must be first!
   }
   ```

## 🚀 Migration Guide

### From Old API to New API

**Before**:
```html
<button id="startButton">START</button>
<div id="statusText" class="hidden">Loading...</div>
```

**After**:
```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  lockGestures();
  enableGyroButton();
  enableMicButton();
}
```

**Benefits**:
- ✅ No HTML required
- ✅ Cleaner code
- ✅ More flexible
- ✅ Better styling
- ✅ Still backward compatible

---

**Ready to create amazing mobile p5.js experiences! 🎉**