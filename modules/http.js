var File = require('./file.js');
var driver = require('node-phantom-simple');

// Constructor
function Http(link) {
    //async(function*() {
    this.link = link;
    //})();
}

Http.prototype.getPageContent = function(cb) {
    var self = this;

    driver.create({ path: require('phantomjs').path }, function(err, browser) {

        return browser.createPage(function(err, page) {

            page.set('settings.loadImages', 'false', function() {

                return page.open(self.link, function(err, status) {

                    setTimeout(function() {

                        page.evaluate(function() {
                            window.scrollTo(0, document.body.scrollHeight);
                        });
                        setTimeout(function() {
                            page.set('viewportSize', { width: 1024, height: 768 });
                            page.render('capture.png');

                            page.get('content', function(err, html) {
                                var f = new File();

                                cb(err, html);
                                browser.exit();

                            });
                        }, 5000);

                    }, 5000);

                });
            });

        });
    });
};

module.exports = Http;
