exports.install = function () {
    framework.route('/login/', json_login, ['post']);
    framework.route('/logoff/', json_logoff, ['authorize']);
};


// Login process
// POST, [xhr, unlogged]
function json_login() {
    var self = this;
    var auth = MODULE('auth');

    // read user information from database
    // this is an example
    var Users = MODEL('users').schema;
    Users.findOne({
        email: self.body.email,
        password: F.hash('md5', self.body.password)
    }, function (err, user) {
        if (err) {
            throw err;
        } else if (user) { //there was a result found, so the email address exists
            auth.login(self, user.id, user);
            return self.transfer("/");
        } else return self.json({r: false});
    });

    // create cookie
    // save to session
}

// Logoff process
// POST, [+xhr, logged]
function json_logoff() {
    var self = this;
    var auth = MODULE('auth');
    var user = self.user;

    // remove cookie
    // remove user session
    auth.logoff(self, user.id);

    self.redirect('/');
}