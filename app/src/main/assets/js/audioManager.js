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
