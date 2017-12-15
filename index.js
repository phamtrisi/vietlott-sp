const CronJob = require('cron').CronJob;
const vietlott = require('./utils');
const backfill645Results = require('./utils/logic/backfill645Results');

function scrape() {
    console.log('Init cronjob');
    // backfill645Results(new Date('2017-11-01'), new Date('2017-12-17'));
    try {
        var job = new CronJob({
            cronTime: '0 0 0 * * *', // Runs every day
            start: true,
            onTick: function() {
                console.log('Scraping data', new Date());
                vietlott.runScrapers();
            }
        });
    } catch (e) {
        console.log('Cron pattern not valid');
    }
}

scrape();
