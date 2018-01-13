var express = require('express');
var mailService = require('./mailService')
var userApi = require('./api/userApi')
var billApi = require('./api/billApi')

var errorCode = require('./errorCode')

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
billApi.api(app);


//以下測試用
app.get('/helloworld',function(req,res){
    var message = errorCode[0000]
    res.send(message);    
});

app.get('./mail',function(req,res){
    
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log(`listening on ${port}`);
  });