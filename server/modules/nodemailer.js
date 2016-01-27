var nodemailer = require("nodemailer");
var guid = require('guid');
var jwtauth = require('../common/jwtauth');
var  cred = require('./pwd');

// create reusable transporter object using SMTP transport
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: cred.gmailuser,
        pass: cred.gmailpwd
    }
});

function sendEmail(req, randomGuid, callback) {
    var mailOptions, host, link;

    console.log('sendEmail');
    host = req.get('host');
    //console.log("host " + host);
    link = "http://" + req.get('host') + "/verify?id=" + randomGuid;
    mailOptions = {
            to: req.body.to,
            from: 'aptvr360@gmail.com', // sender
            subject: "אנא אשר את המייל שלך",
            html: "Hello,<br> לחץ על הקישור הבא לאישור המייל שלך.<br><a href=" + link + ">לחץ כאן לאימות המייל</a>"
        }
        //console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (!error)
        {
            console.log('mail was sent to: ' + req.body.to);
        }
        console.log('sendEmail 2');
        callback(error, response);
    });
}

function sendEmailToUser(address, subject, message, callback) {
    var mailOptions;

    mailOptions = {
        to: address,
        from: 'aptvr360@gmail.com', // sender
        subject: subject,
        html: message
    }
    //console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        console.log(error + ' ' + response);
        callback(error, response);
    });
}



module.exports = function (app, sqlserver) {


    return{
        sendEmailToUser:sendEmailToUser,
        sendEmail:sendEmail
    }


};
