# TODO
This is the Kukuk todo file

## FixMe

## ToDo
- [*] Menu
  - [*] About
  - [+] Change background color app
  - [-] What's new

## In Progress
- [ ] Update / expand README.md

## Abandoned
- [-] Message of the day
- [-] User notification for About / What's new
- [-] What's new
- [-] Dark theme
- [-] Show bird when kuku-ing
- [-] Analogue clock inside drawing
- [-] Continuous play when not active on mobile device, see ./doc/continuousPlay.md for explanation and sample code
- [-] Stress test app / kukuk.js for sound issues with:
  - [-] `setTimeout(resolve, 800);`  // Reduced from 1000ms to 800ms
  - [-] `if (i < times - 1) await new Promise(resolve => setTimeout(resolve, 150));`  // Reduced from 200 to 150

## Done / Fixed
- [*] Convert from Netlify to Android WebView app
- [*] Sound
  - [*] Sound on physical device (phone)
  - [*] Sound in emulator
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
- [*] Modularize kukuk.js
  See KUKU_MODULES.md
  1. [*] audioManager.js - Sound handling
  2. [*] imageManage.js - Image alternation and display
  3. [*] messageDisplay.js - Text message showing/hiding
  4. [*] alarmScheduler.js - Alarm timing logic
  5. [*] timeDisplay.js - Clock display
  6. [*] kukuClock.js - Main orchestrator
  7. [*] main.js - Entry point
  8. [*] kukuk.html - Usage in HTML
- [*] README.md: update About Kuku section
- [*] Remove purple header bar
- [*] Update information in about.json
- [*] Revamp app
  - [*] Heading: replace text with drawing
  - [*] Kuku message: replace text with drawing
  - [*] margins
  - [*] clock images left/right
