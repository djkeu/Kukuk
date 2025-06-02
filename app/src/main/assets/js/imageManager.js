export class ImageManager {
    constructor(imageContainer, imagePaths) {
        this.container = imageContainer;
        this.images = imagePaths;
        this.alternateState = false;
        this.intervalId = null;
    }

    startAlternating() {
        this.showImage(); // Make sure image is visible when starting
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

    showImage() {
        const kukuImage = this.container.querySelector('.kuku-image');
        kukuImage.style.display = 'block';
    }
}
