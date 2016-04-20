framework.on('module#auth', function (type, name) {
    MODULE('auth').onAuthorize = function (id, callback) {

        // this is cached
        // read user information from database
        // into callback insert the user object (this object is saved to session/cache)
        // this is an example

        //console.log ("auth");
        // Why "1"? Look into auth.login(controller, "ID", user);

        var Users = MODEL('users').schema;
        Users.findOne({
            id: id
        }, function (err, user) {
            if (err) {
                throw err;
            } else if (user) { //there was a result found, so the email address exists
                return callback(user);
            } else callback(null);
        });

        /*if (id === '1')
         return callback({ id: '1', alias: 'Peter Sirka' });*/

        //callback(null);
        // if user not exist then
        // callback(null);
    };

});