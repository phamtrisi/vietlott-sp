const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
const Scraper = require('./Scraper');
const _ = require('lodash');

const baseUrl = 'http://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/mega-6-45/winning-numbers/?p=';
const pages = _.range(1, 20);
const pageUrls = pages.map(pageNum => `${baseUrl}${pageNum}`);

function extractPricesFromRow($row) {
    const cleanUpRegEx = /[\r\n]/gi;
    const dateSelector = 'td:nth-of-type(1)';
    const lotteryResultsSelector = 'td:nth-of-type(2)';

    const date = $row.find(dateSelector).text();
    const results = $row.find(lotteryResultsSelector).text().trim().replace(cleanUpRegEx, '').replace(/\s{2,}/gi, ' ');
    const [day, month, year] = date.trim().split('/');

    let price = {
        date: `${year}${month}${day}`,
        [results]: true
    };

    return price;
}

function scrapeUrlFunc(url) {
    return new Promise((resolve, reject) => {
        const lotteryResults = [];

        request(url, (err, resp, body) => {
            if (!err) {
                const $ = cheerio.load(body);
                const $result = $('.result');
                const $resultRows = $result.find('table tbody tr');

                if ($resultRows.length) {
                    $resultRows.each((idx, el) => {
                        const $row = $(el);
                        const prices = extractPricesFromRow($row);
                        lotteryResults.push(prices);
                    });
                }

                resolve(lotteryResults);
            }
        });
    });
}

module.exports = new Scraper({
    name: 'vietlott-6-45',
    urls: pageUrls,
    scrapeUrlFunc: scrapeUrlFunc
});
