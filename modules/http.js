var request = require('request');

exports.getPage = function (pageUrl, cb) {
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
};