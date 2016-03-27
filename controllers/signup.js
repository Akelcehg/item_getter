exports.install = function() {
    F.route('/signup', view_signup);
    F.route('/signup', json_signup, ['post']);
};

function view_signup() {
    var self = this;

    /*Users.find(function(err, users) {
        console.log (err);
        console.log (users);
    });*/

    console.log (self.body);

    self.view('signup');
}

function json_signup() {
    var self = this;
    var Users = MODEL('users').schema;
    var userFormData = {
        'email' : self.body.email,
        'password' : self.body.password
    };

    var userData = new Users(userFormData);

    if (userData.validateSync()){
        console.log ("Has errors");
        self.json(userData.validateSync());
    } else self.json({ r: true });

}