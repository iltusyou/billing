var mongoose = require('mongoose');
var config = require('./config.js')

mongoose.connect(config.dbURL, function (err) {
    if (err) { throw err; }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connect mongo success");
});

//users
var User = mongoose.model('users', {
    email: { type: String, unique: true },
    password: { type: String },
    userName: { type: String },
    registerDate: { type: String },
    verification: { type: String },
    status:{type:Boolean}
});
exports.User = User