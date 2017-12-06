const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');

function extractPriceFromRow($row) {
    const imgSrc = $row.attr('src');

    if (!imgSrc || !imgSrc.length) return;

    const re = /(\d{2})\.png/i;
    const match = imgSrc.match(re);

    if (!match) return;
    return match[1];
}

function getLotteryResult(date) {
    const baseUrl = 'http://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/mega-6-45/?dayPrize=';
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const todayString = day + '/' + month + '/' + year;
    const url = `${baseUrl}${todayString}`;
    return new Promise((resolve, reject) => {
        const winningNumbers = [];
        console.log('doing request');
        request({
            url,
            headers: {
                'User-Agent': 'Chrome',
            }
        }, function(err, resp, body) {
            console.log('finished');
            if (!err) {
                const $ = cheerio.load(body);
                const $result = $('.box-result-detail .result-number');

                if (!$result.length) return;

                const $resultRows = $result.find('img');

                if ($resultRows.length) {
                    $resultRows.each((idx, el) => {
                        const $this = $(el);
                        winningNumbers.push(extractPriceFromRow($this));
                    });
                }

                resolve({
                    ds: `${year}${month}${day}`,
                    [winningNumbers.join(' ')]: true,
                });
            }
            else {
                reject(err);
            }
        });
    });
}

module.exports = getLotteryResult;
