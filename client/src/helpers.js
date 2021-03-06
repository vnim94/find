export const getTimeElapsed = (timestamp) => {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let currentDate = Date.now();
    let date = new Date(timestamp);
    
    let timeElapsed = currentDate - date
    
    if (timeElapsed < minute) {
        return 'less than a minute ago';
    }

    if (timeElapsed >= minute && timeElapsed < hour) {
        timeElapsed = Math.round(timeElapsed / minute);
        return `${timeElapsed}m ago`;
    }

    if (timeElapsed >= hour && timeElapsed < day) {
        timeElapsed = Math.round(timeElapsed / hour);
        return `${timeElapsed}h ago`;
    }

    if (timeElapsed >= day && timeElapsed < month) {
        timeElapsed = Math.round(timeElapsed / day);
        return `${timeElapsed}d ago`;
    }
    
    return 'More than 30d ago';

}

export const formatNumber = (number) => {
    return number.toFixed(1);
}

export const formatPercent = (number) => {
    return Math.round(number * 100)
}