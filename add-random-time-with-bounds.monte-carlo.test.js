const expect = require('chai').expect
const moment = require('moment');

const constants = require('./constants')
const addRandomTimeWithinBounds = require('./add-random-time-within-bounds')

describe('add-random-time-with-bounds', () => {



    it('should always stay within the bounds', () => {
        const initialDateStr = new Date()
        let initialMoment = moment(initialDateStr)

        const newMoment = addRandomTimeWithinBounds(initialMoment)

        initialMoment.add(50, 'seconds')
        const minAcceptableNewMoment = initialMoment
            .add(constants.INTERVAL_MIN_SECONDS, 'seconds')
            .add(constants.INTERVAL_MIN_MINUTES, 'minutes')
        let maxAcceptableNewMoment = initialMoment.add(20, 'seconds')
            .add(constants.INTERVAL_MAX_SECONDS, 'seconds')
            .add(constants.INTERVAL_MAX_MINUTES, 'minutes')

        console.log('initial ', initialMoment.format())
        console.log('new ', newMoment.format())
        console.log('new max ', maxAcceptableNewMoment.format())
        console.log('new min ', minAcceptableNewMoment.format())

        expect(newMoment < maxAcceptableNewMoment).to.equal(true);
        expect(newMoment > minAcceptableNewMoment).to.equal(true);


    })

})