exports.install = function () {
    framework.route('/login/', json_login, ['xhr', 'post']);
    framework.route('/logoff/', json_logoff, ['authorize']);
};


// Login process
// POST, [xhr, unlogged]
function json_login() {
    var self = this;
    var auth = MODULE('auth');

    // read user information from database
    // this is an example
        var user = {id: '1', alias: 'Peter Sirka'};

    // create cookie
    // save to session
    auth.login(self, user.id, user);

    self.json({r: true});
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