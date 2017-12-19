const CronJob = require('cron').CronJob;
const vietlott = require('./utils');
const backfill645Results = require('./utils/logic/backfill645Results');
const backfill655Results = require('./utils/logic/backfill655Results');

function scrape() {
    console.log('Init cronjob');
    backfill655Results(new Date('2017-12-01'), new Date('2017-12-15'));

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
