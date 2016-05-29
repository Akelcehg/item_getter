var File = require('../../modules/file.js');
var parserModule = MODULE('parser');
var ItemConfig = require('../../modules/itemConfig.js');
var ItemHandler = require('../../modules/itemHandler.js');

exports.install = function() {
    F.route('/admin/items', view_items);
    F.route('/admin/items/test/{itemId}', test_item_page);
    F.route('/admin/items/parse', test_item_parse_page, ['get', 40000]);
    F.route('/admin/items/test_http', test_item_http, ['post', 40000]);
    F.route('/admin/items/test_links', test_item_links, ['post', 40000]);
    F.route('/admin/items/test_item_parse', test_item_parse, ['post', 40000]);
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

                var fff = new File();
                fff.saveFile('/','test.html',page,function(){console.log ('saved');});
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
        })(function(err) {
            if (err) {
                console.log(err);
                self.json({ 'status': 'fail' });
            }
        });
    });

}

function test_item_parse() {
    var self = this;

    MODEL('items_list').schema.findOne({ _id: self.body['itemId'] }, function(err, item) {
        async(function*() {
            var itemConfigFile = new ItemConfig(item['config_file']);
            var configFile = yield sync(itemConfigFile.getConfigFile)();

            parserModule.getPageContent(self.body['itemLink'], function(err, page) {

                if (err || !page) {
                    self.json({ 'status': 'fail' });
                } else {
                    var itemObject = new ItemHandler(configFile['item_fields'], page);
                    itemObject.getItemAttributes();
                    self.json({
                        'status': 'ok',
                        'item_json': itemObject.returnItemAttributes()
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


function test_item_parse_page() {
    var self = this;

    self.layout('admin/layouts/layout');
    MODEL('items_list').schema.find(function(err, itemsList) {

        if (self.get['link'] && self.get['config_file']) {

            async(function*() {
                var itemConfigFile = new ItemConfig(self.get['config_file']);
                var configFile = yield sync(itemConfigFile.getConfigFile)();
                var file = new File();

                if (self.get['delete_file']) yield sync(file.deleteFile)('./item_page_saved/' + self.get['config_file'] + '.html');

                file.getFile('./item_page_saved/' + self.get['config_file'] + '.html', function(err, pageFile) {
                    if (pageFile) {
                        var itemObject = new ItemHandler(configFile['item_fields'], pageFile);
                        itemObject.getItemAttributes();

                        self.view('/admin/item_parse', { 'items': itemsList, 'jsonObject': itemObject.returnItemAttributes() });
                    } else {
                        parserModule.getPageContent(self.get['link'], function(err, page) {

                            file.saveFile('./item_page_saved/', self.get['config_file'] + '.html', page, function() {

                                if (err || !page) {
                                    self.json({ 'status': 'fail' });
                                } else {
                                    var itemObject = new ItemHandler(configFile['item_fields'], page);
                                    itemObject.getItemAttributes();

                                    self.view('/admin/item_parse', { 'items': itemsList, 'jsonObject': itemObject.returnItemAttributes() });
                                }
                            });

                        });
                    }
                });
            })(function(err) {
                if (err) {
                    console.log(err);
                    self.json({ 'status': 'fail' });
                }
            });



        } else self.view('/admin/item_parse', { 'items': itemsList, 'jsonObject': {} });
    });
}
