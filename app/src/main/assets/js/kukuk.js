document.addEventListener('DOMContentLoaded', () => {
    const kukuTime = document.getElementById('kuku_time');
    const kukuMessage = document.getElementById('kuku_message');
    const alarmSelector = document.getElementById('alarmSelector');
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    let intervalId;

    let audio = new Audio('file:///android_asset/sounds/keukuk03.mp3');
    console.log("Audio source:", audio.src);
    audio.addEventListener('error', (e) => {
        console.error("Audio error:", e.target.error);
    });
    audio.addEventListener('canplay', () => {
        console.log("Audio is ready to play");
    });

    let isPlaying = false;
    let alternateImages = false;
    let imageIntervalId;

    // Update time
    const updateTime = () => {
        const now = new Date();
        kukuTime.textContent = now.toLocaleTimeString();
    };

    // Path clock/pendulum images
    const kukuImages = {
        left: 'images/kuku10Left.png',
        right: 'images/kuku10Right.png'
    };

    // Swing the pendulum
    const toggleImages = () => {
        if (!isPlaying) {  // Only toggle if not playing sound
            const kukuImage = kukuMessage.querySelector('.kuku-image');
            alternateImages = !alternateImages;
            kukuImage.src = alternateImages ? kukuImages.left : kukuImages.right;
            kukuImage.style.display = 'block';
        }
    };

    // Show Kuku message
    const showKukuMessage = () => {
        return new Promise(resolve => {
            const kukuText = kukuMessage.querySelector('span');
            const kukuImage = kukuMessage.querySelector('.kuku-image');

            // Hide the image and show Kuku! text
            clearInterval(imageIntervalId); // Stop pendulum image alternation
            kukuImage.style.display = 'none';
            kukuText.style.visibility = 'visible';
            kukuText.style.opacity = '1';
            setTimeout(() => {
                kukuText.style.visibility = 'hidden';
                kukuText.style.opacity = '0';
                resolve();
            }, 1000);
        });
    };

    // Play Kuku sound
    const playKukuSound = async (times = 1) => {
        if (isPlaying) return; // Avoid playing multiple sounds at the same time
        isPlaying = true;

        const kukuImage = kukuMessage.querySelector('.kuku-image');
        kukuImage.style.display = 'none'; // Hide image during sound play

        for (let i = 0; i < times; i++) {
            audio.currentTime = 0; // Reset the audio to the start
            await audio.play().catch(error => console.error('Audio playback failed:', error));
            await showKukuMessage(); // Show Kuku message and wait for it to finish
            await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 200ms before the next Kuku
        }

        isPlaying = false;
        kukuImage.style.display = 'block';
        imageIntervalId = setInterval(toggleImages, 1000); // Resume pendulum image alternation
    };

    // Minutely alarms
    const minutelyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();

        if (currentSecond === 0) {
            const lastDigit = currentMinute % 10;
            const times = lastDigit === 0 ? 10 : lastDigit;
            playKukuSound(times);
            console.log(`Minutely alarm sounded ${times} time(s) at: ${now.toLocaleTimeString()}.\n`);
        }
    };

    // Quarterly alarms
    const quarterlyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();

        if (currentSecond === 0 && [15, 30, 45].includes(currentMinute)) {
            playKukuSound(1);
            console.log(`Quarterly alarm sounded 1 time at: ${now.toLocaleTimeString()}.\n`);
        }
    };

    // Hourly alarms
    const hourlyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();
        const currentHour = now.getHours();

        if (currentSecond === 0 && currentMinute === 0) {
            const times = (currentHour % 12) || 12;
            playKukuSound(times);
            console.log(`Hourly alarm sounded ${times} time(s) at: ${now.toLocaleTimeString()}.\n`);
        }
    };

    // Alarms callback
    const alarmsCallback = () => {
        const selectedAlarm = alarmSelector.value;

        if (selectedAlarm === 'minutely') {
            minutelyAlarms();
        } else if (selectedAlarm === 'quarterly_hourly') {
            quarterlyAlarms();
            hourlyAlarms();
        } else if (selectedAlarm === 'hourly') {
            hourlyAlarms();
        }
    };

    // Start updating the time immediately
    updateTime();
    setInterval(updateTime, 1000);

    // Start alternating images every second
    imageIntervalId = setInterval(toggleImages, 1000);

    // Handle Start Kuku button click
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none'; // Hide the start screen

        // Set the alarm mode to "Hours and fifteen minutes" by default
        alarmSelector.value = 'quarterly_hourly';
        intervalId = setInterval(alarmsCallback, 1000);
        
        // Trigger the alarm callback to start Kuku-ing if needed
        alarmsCallback();
    });

    // Allow users to change modes later:
    alarmSelector.addEventListener('change', () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(alarmsCallback, 1000);
    });
});
