var config = require('./config');

// 引用linebot SDK
var linebot = require('linebot');

var myLineBot = require('./myLineBot');

// 用於辨識Line Channel的資訊
var bot = linebot({
    channelId: config.channelId,
    channelSecret: config.channelSecret,
    channelAccessToken: config.channelAccessToken
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
    console.log('event:',event);
    var message = event.message.text;
    var lineUserId = event.source.userId;
  
    myLineBot.getReply(lineUserId,message)
    .then(function(replyMsg){
        event.reply(replyMsg);           
        console.log('reply success');
         
    }).catch(function (error) {
        event.reply(error);   
        console.log('reply error');      
    });
});

var server = bot.listen('/linewebhook', process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log(`listening on ${port}`);
});