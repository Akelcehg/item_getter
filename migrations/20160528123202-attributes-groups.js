'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db,cb) {

    fs.readFile(__dirname + '/attributes_groups.json', 'utf8', function(err, dataObj) {       
        if (err) console.log(err);
        else {
            var parsedObj = JSON.parse(dataObj);
            parsedObj.forEach(function(item, i, arr) {
                db.insert('attributes_groups', item, function(err, result) {
                    if (err) console.log(err);
                });
            });
            cb();
        }
    });
};

exports.down = function(db,cb) {
    db.dropTable('attributes_groups',cb);    
};
