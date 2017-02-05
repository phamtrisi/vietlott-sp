const _ = require('lodash');

class Scraper {
    constructor({
        name,
        urls,
        scrapeUrlFunc,
        dbLocationRef
    } = config) {
        this.name = name;
        this.urls = urls;
        this.dbLocationRef = dbLocationRef;
        this.scrapeUrlFunc = scrapeUrlFunc;
    }

    scrape() {
        if (this.urls && this.urls.length  && this.scrapeUrlFunc) {
            const pagePromises = this.urls.map(this.scrapeUrlFunc);
            return Promise
                .all(pagePromises)
                .then((data) => {
                    return _.flatten(data);
                });
        }
        else {
            return Promise.resolve([]);
        }
    }
}

module.exports = Scraper;
