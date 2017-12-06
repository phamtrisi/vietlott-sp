const request = require('request');
const cheerio = require('cheerio');
const Promise = require('bluebird');
const _ = require('lodash');
const scrapers = require('./scrapers');
const firebaseApp = require('./firebase')();

const vietlott = (() => {
    function runScrapers() {
        // Scrape ket qua max4D
        // scrapers.max4D
        //     .scrape()
        //     .then((data) => {
        //         // Process data
        //         const processedData = data.reduce((dict, cur) => {
        //             dict[cur.date] = cur;
        //             return dict;
        //         }, {});
        //         firebaseApp.database().ref('/max4D').set(processedData);
        //     });

        // Scrape ket qua 6-45
        scrapers.vietlott645
            .scrape()
            .then((data) => {
                firebaseApp.database().ref(`/vietlott645/${data.ds}`).set(data);
            });
    }

    return {
        runScrapers
    };
})();

module.exports = vietlott;
