var mongoose = require('mongoose');
var userstSchema = new mongoose.Schema({username: String, email: String});

exports.schema = mongoose.model('user', userstSchema);
exports.name = 'users';