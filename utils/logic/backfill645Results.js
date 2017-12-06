const moment = require('moment');
const vietlott645Logic = require('./vietlott645');
const firebaseApp = require('../firebase')();

function saveResultToDb(data) {
    console.log('got result',data);
    firebaseApp.database().ref(`/vietlott645/${data.ds}`).set(data);
}

function doBackfill(fromDate, toDate) {
    let cur = moment(fromDate);
    let end = moment(toDate);
    while (cur.isBefore(end)) {
        console.log('Backfilling result', cur.toDate());
        vietlott645Logic(cur.toDate())
            .then(saveResultToDb);

        cur.add(1, 'day');
    }
}

module.exports = doBackfill;
