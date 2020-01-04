var cron = require('node-cron');
var moment = require('moment');
// moment().format();

var constants = require('./constants')
const { exec } = require('child_process');

var addRandomTimeWithinBounds = require('./add-random-time-within-bounds')

console.log('running...', constants.INTERVAL_MIN_SECONDS)




const now = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(now)
console.log("day of the week " + (new Date).getDate())
console.log("day of the month " + (new Date).getDay())
console.log("month " + (new Date).getMonth())
console.log("year " + (new Date).getFullYear())

// console.log(moment(now.toDate()).format('D'))
// moment().format('MMMM Do YYYY, h:mm:ss a');


const dayOfMonthToday = (new Date).getDay();
const thisMonth = (new Date).getMonth();
const thisYear = (new Date).getFullYear();
const everyDayOfWeek = '*'
const minutes = 0;
const seconds = 0;

const hour = constants.EARLIEST_TWEET_CUTOFF_HOUR
// let scheduleWalkerIntialTime = constants.EARLIEST_TWEET_CUTOFF_HOUR;

const walkerAmOrPm = constants.EARLIEST_TWEET_CUTOFF_HOUR >= 12 ? 'PM' : 'AM'
const endTimeAmOrPm = constants.LATEST_TWEET_CUTOFF_HOUR >= 12 ? 'PM' : 'AM'

// console.log('getting for: ',`${thisMonth + 1}-${dayOfMonthToday}-${thisYear}, ${hour}:${minutes}:${seconds} ${walkerAmOrPm}`)
// const newDate = new Date(`${thisMonth + 1}-${dayOfMonthToday}-${thisYear}, ${hour}:${minutes}:${seconds} ${walkerAmOrPm}`)

const startTimeString = `${thisMonth + 1}-${dayOfMonthToday}-${thisYear} ${hour}:${minutes} ${walkerAmOrPm}`

const startTime = moment(startTimeString, 'MM-DD-YYYY hh:mm:ss A')
const endTime = moment(`${thisMonth + 1}-${dayOfMonthToday}-${thisYear} ${constants.LATEST_TWEET_CUTOFF_HOUR}:${0} ${endTimeAmOrPm}`, 'MM-DD-YYYY hh:mm:ss A')

// console.log('next Time', nextTime.format('MM-DD-YYYY hh:mm:ss A'))


const nextTime2 = startTime.add(25, 'seconds').add(15, 'minutes')

console.log('next Time2', nextTime2.format('MM-DD-YYYY hh:mm:ss A'))
console.log('greater than end time?')

const cronsMap = []

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

            console.log('is there std out? ', stdout)

            if (err) {
                console.error(err)
                throw new Error(err)
            } else {
                // the *entire* stdout and stderr (buffered)

                if (!stderr) {
                    console.log('Job successfully executed! 👍')
                } else {
                    console.log('stderr: ' + stderr)
                    throw new Error(stderr)
                }

            }
        });

    });

    console.log('scheduled a cron job to run at: ', scheduleWalkerIntialTime.format('MM-DD-YYYY hh:mm:ss A'))
}

