const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
const Scraper = require('./Scraper');
const vietlott645Logic = require('../logic/vietlott645');

function scrapeFunc() {
    return vietlott645Logic(new Date());
}

module.exports = new Scraper({
    scrapeFunc
});
