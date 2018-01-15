var config = require('./config');
var express = require('express');
var linebot = require('linebot');

var bot = linebot({
  channelId: config.channelId,
  channelSecret: config.channelSecret,
  channelAccessToken: config.channelAccessToken
});

const app = express();

const linebotParser = bot.parser();
app.post('/linebot', linebotParser);

//回復訊息
bot.on('message', function (event) {
  console.log(event);
  if (event.message.type = 'text') {
    var msg = event.message.text;
    event.reply(msg).then(function (data) {
      console.log(data);
      console.log(msg);

    }).catch(function (error) {
      console.log('error');
    });
  }
});

//service restart notice
setTimeout(function(){
  var userId = config.userId;
  var sendMsg = '伺服器重啟';
  bot.push(userId,sendMsg).then(function(data){
    console.log(data);
  });
  console.log(`userId: ${userId}, sendMsg: ${sendMsg}`);
},5000);

//發訊息
var pushMessage = function (userId, sendMsg) {
  bot.push(userId, sendMsg).then(function (data) {
    console.log(data);
  });
  console.log(`userId: ${userId}, sendMsg: ${sendMsg}`);
}

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log(`listening on ${port}`);
});