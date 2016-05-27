var fs = require('fs');
var basePath = __dirname + '/../';

function File() {}

File.prototype.saveFile = function(path, name, content, cb) {
    var filePath = path + name;
    fs.writeFile(basePath + filePath, content, function(err) {
        cb(err);
    });

}

File.prototype.getFile = function(path, cb) {
    fs.readFile(path, 'utf8', function(err, data) {
        cb(err, data);
    });
}

File.prototype.deleteFile = function(path, cb) {
    fs.unlink(path, cb())
}

module.exports = File;
