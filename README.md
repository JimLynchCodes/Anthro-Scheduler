# Anthro-Scheduler
Schedules node-cron tasks in human-like intervals. 😉

# Motivation
The initial usage for this was for a Twitter bot. Throughtout the day the bot was supposed to tweet at a specified interval. In order to make the scheduler seem human-like it could not be perfectly exact intervals. This scheduler allows you to set a minimum and maximum amount of minutes and seconds added for each interval, and the scheduler adds a random amount of time picked uniformly from the valid interval. The goal for this moduel was to decouple it from the Twitter tweet program, making it a human-interval shceduler that can run any arbitary shell command!

# Usage

1. Clone and navigate into this project
```
git clone git@github.com:JimLynchCodes/Anthro-Scheduler.git
cd Anthro-Scheduler
```

2. Use node `v12.14.0`
```
nvm use
```

3. Install dependencies
```
npm i
```

4. Edit the `constants.js` file:

```
const constants = {
    INTERVAL_MIN_SECONDS: 0,  // min number of seconds added each interval
    INTERVAL_MAX_SECONDS: 55, // max number of seconds added each interval

    INTERVAL_MAX_MINUTES: 2,  // max number of minutes added each interval
    INTERVAL_MIN_MINUTES: 0,  // min number of minutes added each interval

    EARLIEST_TWEET_CUTOFF_HOUR: 8,  // earliest hour of the day a job will be scheduled
    LATEST_TWEET_CUTOFF_HOUR: 21,   // latest hour of the day a job will be scheduled
    
    COMMAND_TO_EXEUTE: 'cd /Users/jim/Git-Projects/Random-Tweeter && npm test',  // the shell command to be run each time the job is executed
}

module.exports = constants
```

5. Run the scheduler:
```
npm start
```

Then just leave the process running all day and allow the shell commands to execute at the times defined by the scheduler!


6. Run tests:
```
npm test
```

Different kinds of tests...

The `*.monte-carlo.test.js` files just use the params in set in the constants file and check that after 1,000 calls to the AddRandomTimeWithBounds function that it always stays within the bounds. These tests are a relatively easy to write and understand, but they are pretty inefficient to execute. These can in a way be thought of as the "integration tests" for this project.

The `*.unit.test.js` files mock out dependencies and varying dependencies such as `Math.random()`.

---

Example Output: