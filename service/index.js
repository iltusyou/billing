var express = require('express');


var mailService = require('./mailService')
var userApi = require('./api/userApi')

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//user api
userApi.api(app);



//以下測試用
app.get('/helloworld',function(req,res){
    res.send('hello world');    
});

app.get('./mail',function(req,res){
    
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log(`listening on ${port}`);
  });