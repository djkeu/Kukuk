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
        this.imageManager.hideImage(); // Hide the image completely

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
            this.imageManager.startAlternating(); // This will show and resume alternating
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
