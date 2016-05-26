var parserModule = MODULE('parser');
var ItemConfig = require('../../modules/itemConfig.js');
var ItemHandler = require('../../modules/itemHandler.js');
exports.install = function() {
    F.route('/admin/items', view_items);
    F.route('/admin/items/test/{itemId}', test_item_page);
    //F.route('/admin/items/test_http', test_item_http, ['post']);
    F.route('/admin/items/test_http', test_item_http, ['post', 30000]);
    F.route('/admin/items/test_links', test_item_links, ['post', 30000]);
    F.route('/admin/items/test_item_parse', test_item_parse, ['post', 30000]);
};

function view_items() {
    var self = this;
    self.layout('admin/layouts/layout');

    var itemsList = new MODEL('items_list').schema();

    itemsList.getAllItems(function(err, items) {
        if (!err) self.view('/admin/items_list', { 'items': items });

    });
}

function test_item_page(itemId) {
    var self = this;
    self.layout('admin/layouts/layout');

    MODEL('items_list').schema.findOne({ _id: itemId }, function(err, item) {

        if (err || !item) {
            self.view404(err);
        } else {
            self.view('/admin/item_test', { 'item': item });
        }
    });
}

function test_item_http() {

    var self = this;

    MODEL('items_list').schema.findOne({ _id: self.body['itemId'] }, function(err, item) {
        if (!err && item) {
            parserModule.getPageContent(item['link'], function(err, page) {
                self.json({ 'status': 'ok' });
            });
        } else self.json({ 'status': 'fail' });
    });
}


function test_item_links() {
    var self = this;

    MODEL('items_list').schema.findOne({ _id: self.body['itemId'] }, function(err, item) {

        async(function*() {
            if (!err && item) {
                var itemConfigFile = new ItemConfig(item['config_file']);
                var configFile = yield sync(itemConfigFile.getConfigFile)();

                parserModule.getPageContent(item['link'], function(err, page) {

                    if (err) {
                        self.json({ 'status': 'fail' });
                    } else self.json({ 'status': 'ok', 'links': parserModule.getItemLinks(page, configFile) });
                });


            } else {
                self.json({ 'status': 'fail' });
            }
        })();
    });

}

function test_item_parse() {
    var self = this;

    MODEL('items_list').schema.findOne({ _id: self.body['itemId'] }, function(err, item) {
        async(function*() {
            var itemConfigFile = new ItemConfig(item['config_file']);
            var configFile = yield sync(itemConfigFile.getConfigFile)();

            parserModule.getPageContent(self.body['itemLink'], function(err, page) {

                if (err) {
                    self.json({ 'status': 'fail' });
                } else {
                    var itemObject = new ItemHandler(configFile['item_fields'], page);
                    itemObject.getItemAttributes();
                    self.json({
                        'status': 'ok',
                        'item_json': {
                            "employees": [
                                { "firstName": "John", "lastName": "Doe" },
                                { "firstName": "Anna", "lastName": "Smith" },
                                { "firstName": "Peter", "lastName": "Jones" }
                            ]
                        }
                    });
                }
            });

        })(function(err) {
            if (err) {
                console.log(err);
                self.json({ 'status': 'fail' });
            }
        });
    });
}
