document.addEventListener('DOMContentLoaded', () => {
    const kukuTime = document.getElementById('kuku_time');
    const kukuMessage = document.getElementById('kuku_message');
    const alarmSelector = document.getElementById('alarmSelector');
    let intervalId;
    let isPlaying = false;
    let alternateImages = false;
    let imageIntervalId;

    // Define image paths
    const kukuImages = {
        left: 'images/kuku10Left.png',
        right: 'images/kuku10Right.png'
    };

    // Function to update the time
    const updateTime = () => {
        const now = new Date();
        kukuTime.textContent = now.toLocaleTimeString();
    };

    // Function to alternate images every second
    const toggleImages = () => {
        if (!isPlaying) {
            const kukuImage = kukuMessage.querySelector('.kuku-image');
            if (kukuImage) {
                alternateImages = !alternateImages;
                kukuImage.src = alternateImages ? kukuImages.left : kukuImages.right;
                kukuImage.style.display = 'block';
            }
        }
    };

    // Function to show the Kuku message
    const showKukuMessage = () => {
        return new Promise(resolve => {
            const kukuText = kukuMessage.querySelector('span');
            const kukuImage = kukuMessage.querySelector('.kuku-image');

            if (kukuText && kukuImage) {
                clearInterval(imageIntervalId);
                kukuImage.style.display = 'none';
                kukuText.style.visibility = 'visible';
                kukuText.style.opacity = '1';

                setTimeout(() => {
                    kukuText.style.visibility = 'hidden';
                    kukuText.style.opacity = '0';
                    resolve();
                }, 1000);
            } else {
                resolve();
            }
        });
    };

    // Function to play the Kuku sound
    const playKukuSound = async (times = 1) => {
        if (isPlaying) return;
        isPlaying = true;
        clearInterval(imageIntervalId);

        try {
            for (let i = 0; i < times; i++) {
                await showKukuMessage();

                // Use Android interface for secure audio playback
                if (window.AndroidInterface && window.AndroidInterface.playKukuSound) {
                    window.AndroidInterface.playKukuSound();
                } else {
                    // Fallback to HTML audio if Android interface not available
                    try {
                        const audio = new Audio('file:///android_asset/sounds/keukuk03.mp3');
                        audio.volume = 1.0;
                        audio.play().catch(e => console.error("Audio play error:", e));
                    } catch (e) {
                        console.error("HTML audio error:", e);
                    }
                }

                // Wait for sound to finish
                await new Promise(resolve => setTimeout(resolve, 800));

                if (i < times - 1) {
                    await new Promise(resolve => setTimeout(resolve, 150));
                }
            }
        } catch (e) {
            console.error("Error in playKukuSound:", e);
        } finally {
            isPlaying = false;
            imageIntervalId = setInterval(toggleImages, 1000);
        }
    };

    // Alarm functions
    const minutelyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();

        if (currentSecond === 0) {
            const lastDigit = currentMinute % 10;
            const times = lastDigit === 0 ? 10 : lastDigit;
            playKukuSound(times);
        }
    };

    const quarterlyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();

        if (currentSecond === 0 && [15, 30, 45].includes(currentMinute)) {
            playKukuSound(1);
        }
    };

    const hourlyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();
        const currentHour = now.getHours();

        if (currentSecond === 0 && currentMinute === 0) {
            const times = (currentHour % 12) || 12;
            playKukuSound(times);
        }
    };

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

    // Initialize clock and alarms
    updateTime();
    setInterval(updateTime, 1000);
    imageIntervalId = setInterval(toggleImages, 1000);
    alarmSelector.value = 'quarterly_hourly';
    intervalId = setInterval(alarmsCallback, 1000);

    // Alarm selector handler
    alarmSelector.addEventListener('change', () => {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(alarmsCallback, 1000);
    });
});
