const moment = require('moment');
const vietlott655Logic = require('./vietlott655');
const firebaseApp = require('../firebase')();

function saveResultToDb(data) {
    console.log('got result',data);
    firebaseApp.database().ref(`/vietlott655/${data.ds}`).set(data);
}

function doBackfill(fromDate, toDate) {
    let cur = moment(fromDate);
    let end = moment(toDate);
    while (cur.isBefore(end)) {
        console.log('Backfilling 6-55 result', cur.toDate());
        vietlott655Logic(cur.toDate())
            .then(saveResultToDb);

        cur.add(1, 'day');
    }
}

module.exports = doBackfill;
