exports.install = function () {
    F.route('/signup', view_signup);
    F.route('/signup', json_signup, ['post']);
};

function view_signup() {
    var self = this;

    /*Users.find(function(err, users) {
     console.log (err);
     console.log (users);
     });*/

    //console.log(self.body);

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
            return self.transfer("/");
        });
        //
    }

}