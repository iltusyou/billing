var express = require('express');

const app = express();

app.get('/helloworld',function(req,res){
    res.send('hello world');
    
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log(`listening on ${port}`);
  });