# TODO
This is the Kukuk todo file

## FixMe

## ToDo
- [ ] Modularize kukuk.js
  1. [ ] AudioManager.js - Sound handling
  2. [ ] ImageManage.js - Image alernation and display
  3. [ ] MessagDisplay.js - Text message showing/hiding
  4. [ ] AlarmScheduler.js - Alarm timing logic
  5. [ ] TimeDisplay.js - Clock display
  6. [ ] KukuClock.js - Main orchestrator
  7. [ ] main.js - Entry point
  8. [ ] kukuk.html - Usage in HTML


## In Progress
- [ ] Update information in about.json
- [*] README.md: About Kuku section

## Abandoned
- [-] Message of the day
- [-] User notification for About / What's new
- [-] What's new
- [-] Dark theme
- [-] Show bird when kuku-ing
- [-] Analogue clock inside drawing
- [-] Continuous play when not active on mobile device, see ./doc/continuousPlay.md for explanation and sample code
- [-] Stress test app / kukuk.js for sound issues when:
  - [-] `setTimeout(resolve, 800);`  // Reduced from 1000ms to 800ms
  - [*] `if (i < times - 1) await new Promise(resolve => setTimeout(resolve, 150));`  // Reduced from 200 to 150

## Done
- [*] Convert from Netlify to Android WebView app
- [*] Sound
  - [*] Sound on physical device (phone)
  - [*] Sound in emulator
- [*] Menu button
  - [*] About
  - [-] What's new
  - [-] Dark theme 
- [*] about.js: about.json not loading
- [*] MainActivity:
  - [*] W: setJavaScriptEnabled XSS vulnerabilities
  - [*] W: Call to 'printStackTrace()' should probably be replaced with more robust logging
  - [*] W: Result of 'InputStream.read()' is ignored
  - [*] W: StandardCharsets.UTF_8 can be used instead
  - [*] W: Method 'playKukuSound()' is never used
  - [*] W: Method 'getAboutData()' is never used
  - [*] W: It's possible to extract method returning 'fallbackData' from a long surrounding method
- [*] App icons
- [*] Simultaneous play/show kuku sound and kuku message
- [*] Restore start screen/button to assure correct playing of alarms
- [*] Replace dotted hamburger menu with dashed menu for readability
