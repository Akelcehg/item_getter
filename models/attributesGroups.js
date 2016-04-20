var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var attributesGroupsSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

exports.schema = mongoose.model('attributesGroups', attributesGroupsSchema);
exports.name = 'attributesGroups';
