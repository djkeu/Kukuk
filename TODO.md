# TODO
This is the Kukuk todo file

## FixMe

## ToDo
- [ ] App icons

## In Progress
- [ ] `Warning:` kukuk.js: needs testing
  - [*] `setTimeout(resolve, 800);`  // Reduced from 1000ms to 800ms
  - [*] `if (i < times - 1) await new Promise(resolve => setTimeout(resolve, 150));`  // Reduced from 200 to 150
- [ ] About, What's new
  - [ ] Update information in about.json
  - [-] Update information in whatsnew.json
- [ ] README.md: About Kuku section

## Abandoned
- [-] Message of the day
- [-] User notification about What's new
- [-] Dark theme
- [-] Show bird when kuku-ing
- [-] Analogue clock inside drawing
- [-] Continuous play when not active on mobile device, see ./doc/continuousPlay.md for explanation and sample code

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
