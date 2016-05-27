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
            self.item_page,
            field_config['bind_node'],
            field_config['bind_node_attribute'],
            field_config['expected_value']
        );        
        var itemFieldObject = {
            'name': field_config['name'],
            'value': fieldHandler.getFieldValue()
        };
        //self.item_fields.push(fieldHandler.getFieldValue());
        self.item_fields.push(itemFieldObject);               
    });
}

ItemHandler.prototype.returnItemAttributes = function(){
	var self = this;
	return self.item_fields;
}

module.exports = ItemHandler;
