var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usersSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return email.isEmail();
            },
            message: '{VALUE} не имейл'
        },
        required: [true, 'Введите почтовый адресс']
    },
    password: {
        type: String,
        minlength: [6, "Пароль слишком коротки"],
        required: [true, 'Введите пароль для вашего аккаунта']
    }
});

usersSchema.path('email').validate(function (value, respond) {

    MODEL('users').schema.findOne({email: value}, function (err, user) {
        if (err) {
            respond(false);
        } else if (user) { //there was a result found, so the email address exists
            respond(false);
        } else respond(true);
    });
}, 'Пользователь с таким имейлом уже есть');


usersSchema.methods.signupUser = function (cb) {
    var user = this;
    user.save(function (err) {
        cb(err);
    });
};

usersSchema.pre('save', function (next, done) {
    var user = this;


    /*    MODEL('users').schema.findOne({email: user.email}, function (err, results) {
     if (err) {
     done(err);
     } else if (results) { //there was a result found, so the email address exists
     user.invalidate("email", "email must be unique");
     //done(new Error("email must be unique"));
     done();
     } else {
     done();
     }
     });*/

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // override the cleartext password with the hashed one
    user.password = F.hash('md5', user.password);
    next();

});

usersSchema.methods.comparePassword = function (candidatePassword, cb) {
    var user = this;
    return candidatePassword === F.hash('md5', user.password);
    /*bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
     if (err) return cb(err);
     cb(null, isMatch);
     });*/
};


exports.schema = mongoose.model('user', usersSchema);
exports.name = 'users';
