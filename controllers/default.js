var fs = require('fs');
exports.install = function() {
    F.route('/', view_index);
    // or
    // F.route('/');
};

function* view_index() {
    var self = this;
  /*  console.log("Test");
    var a = yield sync(fs.readFile)(self.path.root('pagename.html'));
    var c = yield sync(custom)(1, 2);
    var d = yield sync(getT)('pagename.html');
    console.log(a);
    console.log(c);
    console.log(d);
    console.log("Test2");*/

    
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
/*
function custom(a, b, callback) {
    // callback(error, result);
    callback(null, a + b);
};

function getT(name,cb) {
    fs.readFile(name, 'utf8', function(err, data) {
        cb(err, data.count);
    });
}*/
