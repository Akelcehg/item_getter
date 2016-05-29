var File = require('./file.js');
var driver = require('node-phantom-simple');

// Constructor
function Http(link) {
    //async(function*() {
    this.link = link;
    this.page_actions = [];
    //})();
}

Http.prototype.getPageContent = function(cb) {
    var self = this;

    driver.create({ path: require('phantomjs').path }, function(err, browser) {

        return browser.createPage(function(err, page) {

            page.set('settings.loadImages', 'false', function() {

                return page.open(self.link, function(err, status) {

                    if (status === 'fail') {
                        cb(status, null);
                        browser.exit();
                    } else {
                        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function(err) {
                            if (err) console.log(err);
                            page.evaluate(function(err) {
                                if (err) console.log(err);
                                $("ul.list-unstyled.phones-view span").click();
                            });

                            setTimeout(function() {

                                page.evaluate(function() {
                                    window.scrollTo(0, document.body.scrollHeight);

                                });

                                setTimeout(function() {
                                    page.evaluate(function() {
                                        window.scrollTo(0, document.body.scrollHeight);
                                    });

                                    page.set('viewportSize', { width: 1024, height: 768 });
                                    page.render('capture.png');

                                    page.get('content', function(err, html) {
                                        page.evaluate(function() {
                                            window.scrollTo(0, document.body.scrollHeight);
                                        });
                                        setTimeout(function() {

                                            cb(err, html);
                                            browser.exit();
                                        }, 5000);
                                    });

                                }, 10000);
                            }, 5000);

                        });
                    }
                });
            });

        });
    });
};

function executePageActions() {
    console.log ('actions');
}

module.exports = Http;
