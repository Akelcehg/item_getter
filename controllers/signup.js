exports.install = function () {
    F.route('/signup', view_signup);
    F.route('/signup', json_signup, ['post']);
};

function view_signup() {
    var self = this;
    self.view('signup');
}

function json_signup() {
    var self = this;

    var Users = MODEL('users').schema;

    /* var userFormData = {
     'email': self.body.email,
     'password': self.body.password
     };*/

    var user = new Users(self.body);

    if (user.validateSync()) {
        self.json(user.validateSync());
    } else {
        user.signupUser(function (err) {
            if (err) {
                return self.json(err);
            }
            var auth = MODULE('auth');
            auth.login(self, user.id, user);
            return self.transfer("/");
        });
    }
}