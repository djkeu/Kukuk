# Recommended Module Structure

## 1. `Done:` **audioManager.js** - Sound handling
```javascript
export class AudioManager {
    constructor(soundPath) {
        this.audio = new Audio(soundPath);
        this.isPlaying = false;
    }

    async play() {
        this.audio.currentTime = 0;
        return this.audio.play().catch(error => 
            console.error('Audio playback failed:', error)
        );
    }

    setPlaying(state) {
        this.isPlaying = state;
    }

    getIsPlaying() {
        return this.isPlaying;
    }
}
```

## 2. `Done:` **imageManager.js** - Image alternation and display
```javascript
export class ImageManager {
    constructor(imageContainer, imagePaths) {
        this.container = imageContainer;
        this.images = imagePaths;
        this.alternateState = false;
        this.intervalId = null;
    }

    startAlternating() {
        this.intervalId = setInterval(() => this.toggle(), 1000);
    }

    stopAlternating() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    toggle() {
        const kukuImage = this.container.querySelector('.kuku-image');
        this.alternateState = !this.alternateState;
        kukuImage.src = this.alternateState ? this.images.left : this.images.right;
        kukuImage.style.display = 'block';
    }

    hideImage() {
        const kukuImage = this.container.querySelector('.kuku-image');
        kukuImage.style.display = 'none';
    }
}
```

## 3. `Done:` **messageDisplay.js** - Text message showing/hiding
```javascript
export class MessageDisplay {
    constructor(messageContainer) {
        this.container = messageContainer;
    }

    async show(duration = 1000) {
        return new Promise(resolve => {
            const kukuText = this.container.querySelector('span');
            
            kukuText.style.visibility = 'visible';
            kukuText.style.opacity = '1';
            
            setTimeout(() => {
                kukuText.style.visibility = 'hidden';
                kukuText.style.opacity = '0';
                resolve();
            }, duration);
        });
    }
}
```

## 4. `Done:` **alarmScheduler.js** - Alarm timing logic
```javascript
export class AlarmScheduler {
    static shouldTriggerMinutely() {
        const now = new Date();
        return now.getSeconds() === 0;
    }

    static shouldTriggerQuarterly() {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();
        
        return currentSecond === 0 && [15, 30, 45].includes(currentMinute);
    }

    static shouldTriggerHourly() {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();
        
        return currentSecond === 0 && currentMinute === 0;
    }

    static getMinutelyCount() {
        const currentMinute = new Date().getMinutes();
        const lastDigit = currentMinute % 10;
        return lastDigit === 0 ? 10 : lastDigit;
    }

    static getHourlyCount() {
        const currentHour = new Date().getHours();
        return (currentHour % 12) || 12;
    }
}
```

## 5. `Done:` **timeDisplay.js** - Clock display
```javascript
export class TimeDisplay {
    constructor(timeElement) {
        this.element = timeElement;
        this.intervalId = null;
    }

    start() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    update() {
        const now = new Date();
        this.element.textContent = now.toLocaleTimeString();
    }
}
```

## 6. `ToDo:` **kukuClock.js** - Main orchestrator
```javascript
import { AudioManager } from './audioManager.js';
import { ImageManager } from './imageManager.js';
import { MessageDisplay } from './messageDisplay.js';
import { AlarmScheduler } from './alarmScheduler.js';
import { TimeDisplay } from './timeDisplay.js';

export class KukuClock {
    constructor() {
        this.initializeElements();
        this.initializeManagers();
        this.setupEventListeners();
        this.alarmIntervalId = null;
    }

    initializeElements() {
        this.elements = {
            kukuTime: document.getElementById('kuku_time'),
            kukuMessage: document.getElementById('kuku_message'),
            alarmSelector: document.getElementById('alarmSelector'),
            startScreen: document.getElementById('startScreen'),
            startButton: document.getElementById('startButton')
        };
    }

    initializeManagers() {
        this.audioManager = new AudioManager('sounds/keukuk03.mp3');
        this.imageManager = new ImageManager(this.elements.kukuMessage, {
            left: 'images/kuku10Left.png',
            right: 'images/kuku10Right.png'
        });
        this.messageDisplay = new MessageDisplay(this.elements.kukuMessage);
        this.timeDisplay = new TimeDisplay(this.elements.kukuTime);
    }

    async playKukuSound(times = 1) {
        if (this.audioManager.getIsPlaying()) return;
        
        this.audioManager.setPlaying(true);
        this.imageManager.stopAlternating();

        try {
            for (let i = 0; i < times; i++) {
                const soundPromise = this.audioManager.play();
                const messagePromise = this.messageDisplay.show();

                await Promise.all([soundPromise, messagePromise]);

                if (i < times - 1) {
                    await new Promise(resolve => setTimeout(resolve, 150));
                }
            }
        } finally {
            this.audioManager.setPlaying(false);
            this.imageManager.startAlternating();
        }
    }

    handleAlarms() {
        const selectedAlarm = this.elements.alarmSelector.value;

        if (selectedAlarm === 'minutely' && AlarmScheduler.shouldTriggerMinutely()) {
            const times = AlarmScheduler.getMinutelyCount();
            this.playKukuSound(times);
            console.log(`Minutely alarm sounded ${times} time(s)`);
        }

        if (selectedAlarm === 'quarterly_hourly') {
            if (AlarmScheduler.shouldTriggerQuarterly()) {
                this.playKukuSound(1);
                console.log('Quarterly alarm sounded');
            }
            if (AlarmScheduler.shouldTriggerHourly()) {
                const times = AlarmScheduler.getHourlyCount();
                this.playKukuSound(times);
                console.log(`Hourly alarm sounded ${times} time(s)`);
            }
        }

        if (selectedAlarm === 'hourly' && AlarmScheduler.shouldTriggerHourly()) {
            const times = AlarmScheduler.getHourlyCount();
            this.playKukuSound(times);
            console.log(`Hourly alarm sounded ${times} time(s)`);
        }
    }

    start() {
        this.elements.startScreen.style.display = 'none';
        this.elements.alarmSelector.value = 'quarterly_hourly';
        
        this.timeDisplay.start();
        this.imageManager.startAlternating();
        this.alarmIntervalId = setInterval(() => this.handleAlarms(), 1000);
        
        this.handleAlarms(); // Check immediately
    }

    setupEventListeners() {
        this.elements.startButton.addEventListener('click', () => this.start());
        
        this.elements.alarmSelector.addEventListener('change', () => {
            if (this.alarmIntervalId) {
                clearInterval(this.alarmIntervalId);
                this.alarmIntervalId = setInterval(() => this.handleAlarms(), 1000);
            }
        });
    }
}
```

## 7. `ToDo:` **main.js** - Entry point
```javascript
import { KukuClock } from './kukuClock.js';

document.addEventListener('DOMContentLoaded', () => {
    new KukuClock();
});
```


## Benefits of This Structure

**Single Responsibility**: Each module handles one specific concern
- AudioManager: Only audio playback
- ImageManager: Only image display and alternation
- AlarmScheduler: Only timing logic
- etc.

**Easier Testing**: Each module can be tested independently

**Better Maintainability**: Changes to audio handling don't affect image logic

**Reusability**: Modules like AudioManager could be reused in other projects

**Cleaner Dependencies**: Clear imports show what each module needs

**Separation of Concerns**: Business logic (timing) is separate from UI logic (display)

## Usage in HTML
```html
<script type="module" src="main.js"></script>
```

This modular approach makes your code much more maintainable and follows modern JavaScript best practices!