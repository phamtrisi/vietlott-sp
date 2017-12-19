const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
const Scraper = require('./Scraper');
const vietlott655Logic = require('../logic/vietlott655');

function scrapeFunc() {
    return vietlott655Logic(new Date());
}

module.exports = new Scraper({
    scrapeFunc
});
