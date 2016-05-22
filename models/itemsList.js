var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var itemsListSchema = new Schema({
    link: String,
    name: String

});
itemsListSchema.set('collection', 'items_list');

itemsListSchema.methods.getAllItems = function(cb) {
    MODEL('items_list').schema.find(function(err, items) {
        if (err) {
            console.log(err);
            cb(err,[]);
        } else cb(null,items);
    });
};

exports.schema = mongoose.model('items_list', itemsListSchema);
exports.name = 'items_list';
