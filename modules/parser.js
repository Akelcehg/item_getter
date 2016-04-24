var httpModule = MODULE('http');

exports.install = function (options) {
};

exports.uninstall = function (options) {
};

exports.parse = function () {
    console.log("Parsing");
    httpModule.getPage('http://google.com.ua', function (error, pageContent) {
        console.log (pageContent);
    });
};