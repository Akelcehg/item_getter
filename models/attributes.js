var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var attributesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groupId: {
        type: Number,
        required: true
    }
});

exports.schema = mongoose.model('attributes', attributesSchema);
exports.name = 'attributes';
