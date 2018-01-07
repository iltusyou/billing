var crypto = require('crypto');  //加载crypto库

//加密
var getHash = function(content){
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var hash = md5.digest('hex');     
    return hash;
}
exports.getHash = getHash;