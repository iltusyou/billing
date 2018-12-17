# 記帳網站
使用技術：reactjs, node.js

可以進行的功能有對帳目的新增、修改、刪除、查詢，登入有作jwt驗證的機制
DEMO: https://iltusyou-billing-web.herokuapp.com/

可以用測試帳密登入
account: test@example.com
password: test123

# line-bot

### 說明
* 請將config.js的設定修改成自己需要的
```
module.exports={
    channelId:'linebot channelId',
    channelSecret:'linebot channelSecret',
    channelAccessToken:'linebot channelAccessToken',
    //db connection
    dbURL:'db connectionString'
}
```
### 加入好友測試QRCode
[<img src="https://qr-official.line.me/M/l_rtVQN-II.png">](https://qr-official.line.me/M/l_rtVQN-II.png)

### 功能
* 紀錄支出，修改支出類別
* 統計今日花費

### 參考網站
* https://www.npmjs.com/package/linebot
node.js的line bot模組

* https://www.heroku.com/
可以架設https的網站

* https://admin-official.line.me/

