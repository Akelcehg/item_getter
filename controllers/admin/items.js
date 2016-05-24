exports.install = function() {
    F.route('/admin/items', view_items);
    F.route('/admin/items/test/{itemId}', test_item_page);
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

    //var itemsList = new MODEL('items_list').schema();
    MODEL('items_list').schema.findOne(function(err, item) {
        if (!err) self.view('/admin/item_test',{'item':item});
    });
}
