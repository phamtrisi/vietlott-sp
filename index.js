const CronJob = require('cron').CronJob;
const vietlott = require('./utils');

function scrape() {
    console.log('Init cronjob');
    try {
        var job = new CronJob({
            cronTime: '*/15 * * * * *', // Runs every hour
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
