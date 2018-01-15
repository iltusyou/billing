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

var Bill = mongoose.model('bills',{
    owner:{type:String},
    date:{type:Date, default:getToday()},
    category:{type:Number},
    name:{type:String},
    amount:{type:Number},
    memo:{type:String}
});
exports.Bill = Bill

function getToday(){
    var today = new Date();
    var year = today.getFullYear()
    var month = today.getMonth()
    var day = today.getDate()        
    return new Date(year, month, day, 0, 0, 0, 0);   
}