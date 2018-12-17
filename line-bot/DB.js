var mongoose = require('mongoose');
var config = require('./config.js');

mongoose.connect(config.dbURL, function (err) {
    if (err) { throw err; }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

var billingSchema = mongoose.Schema({
    lineUserId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    memo: {
        type: String
    },
    billingType: {
        incomeOrExpenses:{
            type: Number,
            required: true
        },
        value:{
            type: Number,
            required: true
        }
    },    
    updateTime: {
        type: Date,
        required: true,
        default: new Date()
    }
});
var Billing = mongoose.model('billing', billingSchema);
exports.Billing = Billing;