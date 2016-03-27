exports.install = function () {
    F.route('/xhr/login/', json_login, ['unauthorize']);
    F.route('/xhr/logoff/', json_logoff, ['authorize']);
    F.route('/', view_authorize, ['authorize']);
};

function json_login() {

    var self = this;
    var auth = MODULE('auth');

    // read user information from database
    // this is an example
    var user = {id: '1', alias: 'Peter'};

    // create cookie
    // save to session
    // @controller {Controller}
    // @id {String}
    // @user {Object}
    auth.login(self, user.id, user);

    self.json({r: true});
}

function json_logoff() {

    var self = this;
    var auth = MODULE('auth');
    var user = self.user;

    // remove cookie
    // remove user session
    // @controller {Controller}
    // @id {String}
    auth.logoff(self, user.id);

    self.json({r: true});
}

function view_authorize() {
    var self = this;
    var user = self.user;

    // user.id
    // user.alias

    self.view('profile');
}