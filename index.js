const cron = require('node-cron');
const moment = require('moment');
const { exec } = require('child_process');

const constants = require('./constants')
const addRandomTimeWithinBounds = require('./add-random-time-within-bounds')

const minutes = 0;
const dayOfMonthToday = (new Date).getDay();
const thisMonth = (new Date).getMonth();
const thisYear = (new Date).getFullYear();
const hour = constants.EARLIEST_TWEET_CUTOFF_HOUR
const walkerAmOrPm = constants.EARLIEST_TWEET_CUTOFF_HOUR >= 12 ? 'PM' : 'AM'
const endTimeAmOrPm = constants.LATEST_TWEET_CUTOFF_HOUR >= 12 ? 'PM' : 'AM'
const startTimeString = `${thisMonth + 1}-${dayOfMonthToday}-${thisYear} ${hour}:${minutes} ${walkerAmOrPm}`
const endTime = moment(`${thisMonth + 1}-${dayOfMonthToday}-${thisYear} ${constants.LATEST_TWEET_CUTOFF_HOUR}:${0} ${endTimeAmOrPm}`, 'MM-DD-YYYY hh:mm:ss A')

let scheduleWalkerIntialTime = moment(startTimeString, 'MM-DD-YYYY hh:mm:ss A')

while (scheduleWalkerIntialTime < endTime) {

    scheduleWalkerIntialTime = addRandomTimeWithinBounds(scheduleWalkerIntialTime);

    const seconds = scheduleWalkerIntialTime.format('ss')
    const hours = scheduleWalkerIntialTime.format('HH')
    const minutes = scheduleWalkerIntialTime.format('mm')

    // Only scheduling for one day so we can put stars for "day of month, month, and day of week" 
    cron.schedule(`${seconds} ${minutes} ${hours} * * *`, () => {

        console.log('running the shell command! ', new Date().getUTCFullYear(), constants.COMMAND_TO_EXEUTE);

        exec(constants.COMMAND_TO_EXEUTE, (err, stdout, stderr) => {

            if (err) {
                console.error(err)
                throw new Error(err)
            } else {

                if (!stderr) {
                    console.log('Job successfully executed! 👍')
                } else {
                    console.log('stderr: ' + stderr)
                    throw new Error(stderr)
                }

            }
        });

    });

    console.log('Scheduled a cron job to run at: ', scheduleWalkerIntialTime.format('MM-DD-YYYY hh:mm:ss A'))
}

