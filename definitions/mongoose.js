// $ sudo npm install -g mongoose

var mongoose = require('mongoose');
mongoose.connect(CONFIG('database'));
var db = mongoose.connection;
db.on('error',
    console.error.bind(console, 'connection error:')
);
db.once('open', function () {
    console.log("Connected");
});