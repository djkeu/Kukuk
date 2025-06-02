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