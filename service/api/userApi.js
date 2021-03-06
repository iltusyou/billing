var DB = require('../DB')
var mailService = require('../mailService');
var helper = require('../helpers/helper')
var jwt = require('jsonwebtoken')
var config = require('../config')
var errorCode = require('../errorCode')

var api = function (app) {

    //註冊
    app.post('/register', function (req, res) {

        var email = req.body.email;
        var verification = getVerification();
        var password = helper.getHash(req.body.password);

        //資料庫新增使用者
        userService.createUser(email, password, req.body.userName, verification);

        //註冊信                
        const text = `請點選以下網址進行信箱驗證： ${req.protocol}://${req.headers.host}/verify?email=${req.body.email}&verification=${verification}`;
        mailService.sendMail(req.body.email, '註冊信', text);
        res.json({ message: 'success' });
    });

    //驗證
    app.get('/verify', function (req, res) {
        var email = req.query.email;
        var verification = req.query.verification;

        DB.User.findOne({ email: email }, function (err, user) {
            if (err)
                console.log(err);
            else {
                if (user == null)
                    res.json({ resultCode: '1000' });

                else {
                    if (user.verification == verification) {
                        //通過驗證
                        user.verification = '';
                        user.status = true;
                        user.save(function (err, updatedTank) {
                            if (err) console.log('err');
                            res.json({ resultCode: '0000' });
                        });
                    }

                    else
                        res.json({ resultCode: errorCode[0000] });
                }
            }
        });
    });

    //登入
    app.post('/login', function (req, res) {
        const email = req.body.email;
        const password = helper.getHash(req.body.password);

        DB.User.findOne({ email: email }).then(user => {
            if (user == null)
                res.json({
                    result: false,
                    message: 1000
                })
            else {
                if (user.password == password) {
                    const newUser = {
                        email: user.email,
                        _id: user._id
                    }
                    res.json({
                        result: true,
                        message: getToken(newUser)
                    })
                }
                else {
                    res.json({
                        result: false,
                        message: 1000
                    })
                }
            }

        }).catch(function (err) {
            console.log(err)
        })
    });

}
exports.api = api;

//生成6碼驗證碼
var getVerification = function () {
    var verification = '';
    for (var i = 0; i < 6; i++) {
        var r = Math.floor((Math.random() * 10));
        verification += r;
    }
    return verification;
}

function getToken(user) {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        user: user
    }, config.secret);
    //todo: 有效時間寫入config

    console.log(token)
    return token;
}