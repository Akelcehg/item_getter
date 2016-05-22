// $ sudo npm install -g mongoose

var mongoose = require('mongoose');
mongoose.connect(CONFIG('database'));
var db = mongoose.connection;
db.on('error', function(error) {
    //console.error.bind(console, 'connection error:')
    console.log (error);
    setTimeout(function () {
    	console.log ("Retry connection to Database");
    	mongoose.connect(CONFIG('database'));
    }, 2000)
});
db.once('open', function() {
    console.log("Connected");    
});
