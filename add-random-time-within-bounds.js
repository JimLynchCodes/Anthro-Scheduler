
var constants = require('./constants')

const addRandomTimeWithinBounds = (initialTime) => {

    const secondsInterval = constants.INTERVAL_MAX_SECONDS - constants.INTERVAL_MIN_SECONDS;
    const secondstoAdd = constants.INTERVAL_MIN_SECONDS + Math.floor(Math.random() * secondsInterval)

    const minutesInterval = constants.INTERVAL_MAX_MINUTES - constants.INTERVAL_MIN_MINUTES;
    const minutestoAdd = constants.INTERVAL_MIN_MINUTES + Math.floor(Math.random() * minutesInterval)

    console.log(`[Adding ${minutestoAdd} min and ${secondstoAdd} s]`);
    return initialTime.add(secondstoAdd, 'seconds').add(minutestoAdd, 'minutes')
}

module.exports = addRandomTimeWithinBounds;