var httpModule = MODULE('http');
var cheerio = require('cheerio');

exports.install = function (options) {
};

exports.uninstall = function (options) {
};

exports.parse = function () {
    console.log("=>Parsing");
    httpModule.getPage('https://habrahabr.ru/interesting/', function (error, pageContent) {
        getPageContent(pageContent);
    });
};

function getPageContent(pageContent) {
    $ = cheerio.load(pageContent, {
        normalizeWhitespace: true,
        decodeEntities: true
    });
    $('h1.title').each(function (i, elem) {
        console.log($(this).text().trim());
    });

}
