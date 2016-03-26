exports.install = function () {
    F.route('/signup', view_login);
};

function view_login() {
    var self = this;
    self.view('signup');
}