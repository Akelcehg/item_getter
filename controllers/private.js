exports.install = function() {
    F.route('/private', view_index, ['authorize']);
};

function view_index() {
    var self = this;
    self.plain("das");
}
