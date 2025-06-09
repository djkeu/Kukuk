# Changelog
Changelog for Kukuk 2

## [2.0.6] - 2025-06-09
### Fixed
- prevent reload of app after turning the phone from portrait to landscape (and vice versa) and/or after loading about.html
### Changed
- improved color scheme

---

## [2.0.5] - 2025-06-03
### Changed
- replace kuku text header with drawing of text
- replace kuku text message with drawing of text
### Removed
- Google fonts

---

## [2.0.4] - 2025-06-02
### Changed
- move about.js to ./js/
- modularize kukuk.js into the added modules below
- move Minutely Alarms option in kukuk.html to third place
### Added
- audioManager.js - Sound handling
- imageManager.js - Kuku clock image alternating and display
- messageDisplay.js - Kuku text message showing and hiding
- alarmScheduler.js - Alarm timing logic
- timeDisplay.js - Clock display
- kukuClock.js - Main orchestrator
- main.js - Entry point
- LICENCE
### Removed
- remove kukuk.js

---

## [2.0.3] - 2025-06-01
### Fixed
- simultaneous play of sound and message in alarms
### Added
- app icons
### Changed
- swap css color names for hex codes
- restore Start button/screen
- remove purple ActionBar from theme.xml

---

## [2.0.2] - 2025-05-30
### Fixed
- setJavaScriptEnabled XSS vulnerabilities fixed
- restrict dangerous file loading settings
- enable loading of about.json
- enable loading of keukuk03.mp3
### Removed
- 'whatsnew'-files

---

## [2.0.1] - 2025-05-29
### Fixed
- Sound missing in alarms
### Added
- README.md, CHANGELOG.md, TODO.md
- 'about'-files, 'whatsnew'-files
### Removed
- from kukuk.js: startScreen and startButton, to fix sound issues

---

## [2.0.0] - 2025-05-27
### Changed
- Convert kukuk-js 1.3 to Kukuk 2.0.0

---


# About Changelog.md

## [2.x.x]-date  // MAJOR.MINOR.PATCH-date
### Added
- (New features, modules, or UI elements).
### Changed
- (Existing functionality updates).
### Fixed
- (Bug fixes).
### Removed
- (Deprecated or removed features).

---
