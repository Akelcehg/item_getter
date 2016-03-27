exports.install = function() {
    F.route('/signup', view_signup);
    F.route('/signup', json_signup, ['post']);
};

function view_signup() {
    var self = this;
    var Users = MODEL('users').schema;

    Users.find(function(err, users) {
        console.log (err);
        console.log (users);
    });

    
    self.view('signup');
}

function json_signup() {
    var self = this;
    console.log(self.body);
    self.repository.isSuccess = true;
    self.view('signup', self.body);
}