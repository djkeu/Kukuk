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
