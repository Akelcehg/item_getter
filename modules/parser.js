var httpModule = MODULE('http');
var cheerio = require('cheerio');

exports.install = function (options) {
};

exports.uninstall = function (options) {
};

exports.parse = function () {
    console.log("=>Parsing");
    var driver = require('node-phantom-simple');

    var link = 'https://auto.ria.com/search/#countpage=10&power_name=1&s_yers[0]=0&po_yers[0]=0&currency=1&engineVolumeFrom=&engineVolumeTo=';

    //Раз в n минут перехапрашивать код страницы что бы уменьшить кол-во запросов
    /*    var settings = {
     loadImages: false,
     operation: "get",
     encoding: "utf8",
     headers: {
     "Content-Type": "application/json",
     'accept': '*!/!*',
     'accept-encoding': 'gzip, deflate, sdch',
     'accept-language': 'en-US,en;q=0.8,ru;q=0.6',
     'cache-control': 'max-age=0',
     'referer': 'https://auto.ria.com/search/'
     }
     };*/

    getPageFile(function (pageContent) {
        parsePageContent(pageContent);
    });

    /*driver.create({path: require('phantomjs').path}, function (err, browser) {
     return browser.createPage(function (err, page) {

     return page.open(link, function (err, status) {

     console.log(status);
     setTimeout(function () {
     page.evaluate(function () {
     window.scrollTo(0, document.body.scrollHeight);
     });
     setTimeout(function () {
     //page.set('viewportSize', {width: 1024, height: 768});
     //page.render('capture.png');

     page.get('content', function (err, html) {

     savePageToFile(html);
     parsePageContent(html);
     browser.exit();
     });
     }, 5000);

     }, 5000);

     });

     });
     });*/


    /*    httpModule.getPage(link, function (error, pageContent) {
     fs = require('fs');
     fs.writeFile('helloworld2.txt', pageContent, function (err) {
     if (err) return console.log(err);
     console.log('Hello World > helloworld.txt');
     });
     parsePageContent(pageContent);
     });*/
};

function parsePageContent(pageContent) {
    console.log('Parse block');
    var $ = cheerio.load(pageContent, {
        normalizeWhitespace: true
        //decodeEntities: true
    });
    /*    $('div.ticket-item.paid').each(function (i, elem) {
     console.log($(this)
     .children('div.m_head-ticket')
     .children('div.box-head')
     .children('div.item.head-ticket')
     .children('div.ticket-title')
     .children('a.address')
     .attr('title'));
     console.log("--------------------------------");
     });*/

}

function savePageToFile(webPage) {
    var fs = require('fs');
    fs.writeFile('pagesaved.html', webPage, function (err) {
        if (err) return console.log(err);
        console.log('Page saved');
    });

}

function getPageFile(cb) {
    fs = require('fs')
    fs.readFile('pagesaved.html', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        cb(data);
    });
}