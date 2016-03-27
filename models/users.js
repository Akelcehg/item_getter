var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Введите почтовый адресс']
    },
    password: {
        type : String,
        minlength : [6,"Пароль слишком коротки"],
        required : [true,'Введите пароль для вашего аккаунта']
    }
});

exports.schema = mongoose.model('user', usersSchema);
exports.name = 'users';