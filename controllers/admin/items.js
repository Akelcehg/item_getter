var parserModule = MODULE('parser');
exports.install = function() {
    F.route('/admin/items', view_items);
    F.route('/admin/items/test/{itemId}', test_item_page);
    //F.route('/admin/items/test_http', test_item_http, ['post']);
    F.route('/admin/items/test_http', test_item_http, ['post', 30000]);
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

function test_item_http(itemId) {

    var self = this;
    var parserModule = MODULE('parser');
    console.log('get http');
    MODEL('items_list').schema.findOne({ _id: self.body['itemId'] }, function(err, item) {
        if (!err && item) {
            parserModule.getPageContent('http://google.com.ua', function(err, page) {
                console.log('done');
                //console.log(err);
                /*if (!err) {
                    console.log("ok cb");*/
                return self.json({ 'status': 'ok' });
                /*} else {
                    console.log("fail cb");
                    return self.json({ 'status': 'fail' });
                }*/
            });
        } else return self.json({ 'status': 'fail' });
    });
}
