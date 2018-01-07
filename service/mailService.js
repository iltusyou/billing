var nodemailer = require('nodemailer');
var config = require('./config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  },
  tls: {
    rejectUnauthorized: false
  }
});

var sendMail = function (to, subject, text) {
  var mailOptions = {
    from: config.emailUser,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log('Email sent: ' + info.response);
      return true;
    }
  });
}
exports.sendMail = sendMail;

//註冊信template
// var sendRegisterMail=function(to, host, verification){
//   const subject = '註冊信';
//   const text = `驗證碼: ${verification}`
//   sendMail(to, subject, text);
// }
// exports.sendRegisterMail = sendRegisterMail;
