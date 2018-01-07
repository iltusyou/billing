//處理資料庫
var DB = require('../DB')
var Promise = require('bluebird');

//新增使用者
var createUser = function (email, password, userName, verification) {
    var user = new DB.User({
        email: email,
        password: password,
        userName: userName,
        registerDate: new Date().toString(),
        verification: verification,
        status: false
    });

    user.save(function (err, results) {
        if (err) {
            return false;
        }
        else {
            return true;
        }
    });
}
exports.createUser = createUser;

var findByEmail = function (email) {

    DB.User.find({email:email}).then(function(res, err){
        if(err){
            console.log('error');
            return null;
        }
        else{
            console.log('findByEmail')
            console.log(res);
            return res;
        }
    });
    

    //   DB.User.find({ email: email }, function (err, res) {
    //     if (err) {
    //         console.log('findByEmail error');
    //         return null;
    //     }
    //     else {
    //         if (res.length == 0)
    //             return null;
    //         else{
    //             console.log(res[0]);
    //             return res[0];
    //         }
                
    //     }
    // });
}
exports.findByEmail = findByEmail;