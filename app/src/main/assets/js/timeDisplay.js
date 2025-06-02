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
