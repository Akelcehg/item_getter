exports.install = function() {
    F.route('/admin/', view_index);    
};

function view_index() {
    var self = this;    

    self.layout('admin/layouts/layout');
    self.view('/admin/index');
}