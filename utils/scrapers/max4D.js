const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
const Scraper = require('./Scraper');
const _ = require('lodash');

const PRICE_LEVEL_1 = 1;
const PRICE_LEVEL_2 = 2;
const PRICE_LEVEL_3 = 3;
const PRICE_LEVEL_4 = 4;
const PRICE_LEVEL_5 = 5;

const baseUrl = 'http://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/max-4d/winning-numbers/?p=';
const pages = _.range(1, 5);
const pageUrls = pages.map(pageNum => `${baseUrl}${pageNum}`);

function extractPricesFromRow($row) {
    const cleanUpRegEx = /[\r\n\s]/gi;
    const dateSelector = 'td:nth-of-type(2) .info-result-game span:nth-of-type(1)';
    const resultsContainerSelector = 'td:nth-of-type(3) .result-max4d';
    const firstPriceSelector = 'li:nth-of-type(1) .box-result-max4d:nth-of-type(1) .num-result-max4d';
    const secondPriceSelector1 = 'li:nth-of-type(1) .box-result-max4d:nth-of-type(2) .num-result-max4d:nth-of-type(1)';
    const secondPriceSelector2 = 'li:nth-of-type(1) .box-result-max4d:nth-of-type(2) .num-result-max4d:nth-of-type(2)';
    const thirdPriceSelector1 = 'li:nth-of-type(2) .box-result-max4d .num-result-max4d:nth-of-type(1)';
    const thirdPriceSelector2 = 'li:nth-of-type(2) .box-result-max4d .num-result-max4d:nth-of-type(2)';
    const thirdPriceSelector3 = 'li:nth-of-type(2) .box-result-max4d .num-result-max4d:nth-of-type(3)';
    const fourthPriceSelector = 'li:nth-of-type(3) .box-result-max4d:nth-of-type(1) .num-result-max4d';
    const fifthPriceSelector = 'li:nth-of-type(3) .box-result-max4d:nth-of-type(2) .num-result-max4d';

    const date = $row.find(dateSelector).text();
    const [day, month, year] = date.trim().split('/');
    const $resultsContainer = $row.find(resultsContainerSelector);
    const firstPrice = $resultsContainer.find(firstPriceSelector).text().replace(cleanUpRegEx, '');
    const secondPrice1 = $resultsContainer.find(secondPriceSelector1).text().replace(cleanUpRegEx, '');
    const secondPrice2 = $resultsContainer.find(secondPriceSelector2).text().replace(cleanUpRegEx, '');
    const thirdPrice1 = $resultsContainer.find(thirdPriceSelector1).text().replace(cleanUpRegEx, '');
    const thirdPrice2 = $resultsContainer.find(thirdPriceSelector2).text().replace(cleanUpRegEx, '');
    const thirdPrice3 = $resultsContainer.find(thirdPriceSelector3).text().replace(cleanUpRegEx, '');
    const fourthPrice = $resultsContainer.find(fourthPriceSelector).text().replace(cleanUpRegEx, '');
    const fifthPrice = $resultsContainer.find(fifthPriceSelector).text().replace(cleanUpRegEx, '');

    let prices = {
        date: `${year}${month}${day}`,
        [PRICE_LEVEL_1]: {
            [firstPrice]: true
        },
        [PRICE_LEVEL_2]: {
            [secondPrice1]: true,
            [secondPrice2]: true
        },
        [PRICE_LEVEL_3]: {
            [thirdPrice1]: true,
            [thirdPrice2]: true,
            [thirdPrice3]: true
        },
        [PRICE_LEVEL_4]: {
            [fourthPrice]: true
        },
        [PRICE_LEVEL_5]: {
            [fifthPrice]: true
        }
    };

    return prices;
}

function makeScrapingPromise(url) {
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
    name: 'vietlott-max-4d',
    urls: pageUrls,
    scrapeUrlFunc: makeScrapingPromise
});
