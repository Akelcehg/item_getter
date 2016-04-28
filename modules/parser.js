var httpModule = MODULE('http');
var cheerio = require('cheerio');

exports.install = function (options) {
};

exports.uninstall = function (options) {
};

exports.parse = function () {
    console.log("=>Parsing");
    //var link = 'https://auto.ria.com/search/#countpage=10&power_name=1&s_yers[0]=0&po_yers[0]=0&currency=1&engineVolumeFrom=&engineVolumeTo=';
    var link = 'https://auto.ria.com/auto_volkswagen_polo_16439981.html';
    //var link = 'http://avtobazar.ua/poisk/avto/?country1=1911&show_only=only_used&per-page=10';
    var driver = require('node-phantom-simple');
    var settings = {
        loadImages: false,
        operation: "get",
        encoding: "utf8",
        headers: {
            "Content-Type": "application/json",
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, sdch',
            'accept-language': 'en-US,en;q=0.8,ru;q=0.6',
            'cache-control': 'max-age=0',
            //'cookie': '_ym_uid=1459012444790784864; _ym_isad=1; showNewFeatures=7; show_social_network=0; _ga=GA1.2.2134645019.1461838099; showNewFinalPage=1; __utmt=1; __utmt_b=1; __utma=79960839.13794731.1461836400.1461861917.1461866137.4; __utmb=79960839.16.7.1461866254220; __utmc=79960839; __utmz=79960839.1461836400.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _pk_id.3.46b0=79c8350839c79042.1461848688.3.1461867451.1461866137.; _pk_ses.3.46b0=*; _ym_visorc_91244=b',
            //'if-modified-since': 'Thu, 28 Apr 2016 17:54:57 GMT',
            //'if-none-match': "57224e71-175e",
            'referer': 'https://auto.ria.com/search/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
        }
    };
    driver.create({path: require('phantomjs').path}, function (err, browser) {
        return browser.createPage(function (err, page) {


            page.set('settings.userAgent', settings.headers, function () {

                page.set('settings.localToRemoteUrlAccessEnabled', true, function () {
                    page.set('settings.webSecurityEnabled', false, function () {


                        return page.open(link, function (err, status) {
                            console.log("opened site? ", status);

                            page.onError = function (msg, trace) {
                                console.log(msg);
                                console.log("err");
                            };

                            setTimeout(function () {

                                page.set('viewportSize', {width: 1024, height: 768});
                                page.set('loadImages', false);
                                page.render('capture.png');
                                page.get('content', function (err, html) {

                                    getPageContent(html);
                                    fs = require('fs');
                                    fs.writeFile('helloworld.txt', html, function (err) {
                                        if (err) return console.log(err);
                                        console.log('Hello World > helloworld.txt');
                                    });

                                    browser.exit();
                                });

                            }, 10000);

                        });

                    });
                });
            });
            
        });
    });

    /*    httpModule.getPage(link, function (error, pageContent) {
     fs = require('fs');
     fs.writeFile('helloworld2.txt', pageContent, function (err) {
     if (err) return console.log(err);
     console.log('Hello World > helloworld.txt');
     });
     getPageContent(pageContent);
     });*/
};

function getPageContent(pageContent) {
    console.log('Parse block');
    var $ = cheerio.load(pageContent, {
        normalizeWhitespace: true,
        decodeEntities: true
    });
    $('h1.head').each(function (i, elem) {
        console.log($(this).attr('title'));
    });

}
