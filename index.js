const CronJob = require('cron').CronJob;
const vietlott = require('./utils');

function scrape() {
    console.log('Init cronjob');
    try {
        var job = new CronJob({
            cronTime: '0 0 0 * * *', // Runs every day at 12am
            start: true,
            onTick: function() {
                console.log('Scraping data', new Date());
                vietlott.getData().then(vietlott.updateStorage);
            }
        });
    } catch (e) {
        console.log('Cron pattern not valid');
    }
}

scrape();
