var userService = require('../service/userService');
var DB = require('../DB')
var mailService = require('../mailService');
var helper = require('../helpers/helper')

var api = function (app) {
    app.post('/register', function (req, res) {

        var email = req.body.email;        
        var verification = getVerification();
        var password = helper.getHash(req.body.password);

        //資料庫新增使用者
        userService.createUser(email, password, req.body.userName, verification);

        //註冊信                
        const text = `${req.protocol}://${req.headers.host}/verify?email=${req.body.email}&verification=${verification}`;    
        mailService.sendMail(req.body.email, '註冊信', text);

        res.json({message: user});
        
    });

    //驗證
    app.get('/verify', function(req, res){
        var email = req.query.email;
        var verification = req.query.verification;
   
        DB.User.findOne({email:email},function(err, user){
            if(err)
                console.log(err);
            else{                
                if(user==null)    
                    res.json({resultCode:'1000'});

                else{                    
                    if(user.verification==verification){
                        //通過驗證
                        DB.User.findById(user._id, function (err, target) {
                            
                            if (err) console.log('err');
                            target.verification='';
                            target.status=true;
                            
                            target.save(function (err, updatedTank) {
                                if (err) console.log('err');
                              res.json({resultCode:'0000'});
                            });
                          });               
                    }
                        
                    else
                        res.json({resultCode:'1000'});
                } 
            }            
        });
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