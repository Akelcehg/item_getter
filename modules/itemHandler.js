var FieldHandler = require('./fieldHandler.js');

function ItemHandler(item_fields, item_page) {
    //async(function*() {
    this.item_page = item_page;
    this.item_fields_config = item_fields;
    this.item_fields = [];
    //})();
}

ItemHandler.prototype.getItemAttributes = function() {
    var self = this;

    self.item_fields_config.forEach(function(field_config, i, arr) {
        var fieldHandler = new FieldHandler(
            field_config['field_node'],
            field_config['field_attribute'],
            self.item_page
        );
        console.log(fieldHandler.getFieldValue());
        /*console.log(self.item_page);
        console.log(field_config);*/
    });
}

module.exports = ItemHandler;
