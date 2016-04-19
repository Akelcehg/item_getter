var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Введите название роли']
    }
});

exports.schema = mongoose.model('roles', usersSchema);
exports.name = 'roles';
