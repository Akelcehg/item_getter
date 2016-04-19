exports.install = function () {
    F.route('/', view_index);
    // or
    // F.route('/');
};

function view_index() {
    var self = this;
    /*var roles = new MODEL('roles').schema();

     roles.name = 'das';
     console.log (roles);
     roles.save();*/
    self.view('index');
}