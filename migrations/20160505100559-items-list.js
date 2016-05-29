'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
//node node_modules/db-migrate/bin/db-migrate create items_links
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db) {
    //db.createTable('items_list');
    /*db.insert('items_links',
        {a: 1},
        function (err, result) {
          if (err) console.log(err);
        });*/
    return null;
};

exports.down = function(db) {
    //db.dropTable('items_list');
    return null;
};
//https://www.npmjs.com/package/node-multi-sitemap
