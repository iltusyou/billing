var express = require('express');
var mailService = require('./mailService')
var userApi = require('./api/userApi')
var billApi = require('./api/billApi')
var jwt = require('jsonwebtoken')
var config = require('./config')

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//垮網域
app.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//user api
userApi.api(app);

app.use(function (req, res, next) {
    //
    const token = req.body.token || req.query.token || req.headers.authorization;
    const channelSecret = req.body.channelSecret

    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (decoded)
                next()

            else {
                res.json({
                    result: false,
                    resultCode: 1001
                })
            }
        });
    }
    //line的驗證
    else if (channelSecret) {
        if (channelSecret == config.channelSecret)
            next()
        else
            res.json({
                result: false,
                resultCode: 1001
            });
    }
    else {
        res.json({
            result: false,
            resultCode: 1001
        });
    }
});

//以下需經過驗證
billApi.api(app);

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log(`listening on ${port}`);
});