var request = require('request');
// Constructor
function Http(link) {

    this.link = link;

}

Http.prototype.getPageContent = function(cb) {

    var self = this;
    var driver = require('node-phantom-simple');
    driver.create({ path: require('phantomjs').path }, function(err, browser) {
        return browser.createPage(function(err, page) {

            return page.open(self.link, function(err, status) {
               
                setTimeout(function() {
                    page.evaluate(function() {
                        window.scrollTo(0, document.body.scrollHeight);
                    });
                    setTimeout(function() {
                        //page.set('viewportSize', {width: 1024, height: 768});
                        //page.render('capture.png');

                        page.get('content', function(err, html) {

                            //savePageToFile(html);
                            //parsePageContent(html);
                            cb(err,html);
                            browser.exit();
                        });
                    }, 5000);

                }, 5000);

            });

        });
    });
};

module.exports = Http;

/*exports.getPage = function (pageUrl, cb) {
    var options = {
        url: pageUrl,
        encoding: 'UTF8',
        headers: {
            //'User-Agent': 'request'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            return cb(null, body);
        } else {
            if (error) return cb(error, null);
            else {
                console.log("Couldn't get page. response.statusCode".response.statusCode);
                cb(null, null);
            }
        }
    }

    request(options, callback);
};*/
