exports.install = function () {
    F.route('/', view_index);
    // or
    // F.route('/');
};

function view_index() {
    var self = this;
    /*var Users = MODEL('users').schema;
    var page = (self.query.page || '1').parseInt();
    var perpage = 2;
    var skip = perpage * (page-1);
    Users.find().skip(skip).limit(perpage).exec(function (err, users) {
        console.log (users);
        // total items in db + page + items per page
        var pagination = new Builders.Pagination(3, page, perpage, '?page={0}');


    });*/
    self.view('index');
}