const Promise = require('bluebird');
const _ = require('lodash');

class Scraper {
    constructor({
        scrapeFunc,
        dbLocationRef
    } = config) {
        this.dbLocationRef = dbLocationRef;
        this.scrapeFunc = scrapeFunc;
    }

    scrape() {
        return new Promise((resolve, reject) => {
            if (this.scrapeFunc) {
                this.scrapeFunc()
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
            else {
                return reject('No scrape function');
            }
        });
    }
}

module.exports = Scraper;
