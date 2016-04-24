var httpModule = MODULE('http');
var cheerio = require('cheerio');

exports.install = function (options) {
};

exports.uninstall = function (options) {
};

exports.parse = function () {
    console.log("Parsing");
    httpModule.getPage('https://habrahabr.ru/interesting/', function (error, pageContent) {
        getPageContent(pageContent);
    });
};

function getPageContent(pageContent) {
    $ = cheerio.load(pageContent);
    console.log($('h2.title').text());
}