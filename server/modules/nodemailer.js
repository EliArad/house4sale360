var nodemailer = require("nodemailer");
var guid = require('guid');
var jwtauth = require('../common/jwtauth');

// create reusable transporter object using SMTP transport
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'easwdev',
        pass: 'sheep3628290'
    }
});

function sendEmail(req, randomGuid, callback) {
    var mailOptions, host, link;

    host = req.get('host');
    //console.log("host " + host);
    link = "http://" + req.get('host') + "/verify?id=" + randomGuid;
    mailOptions = {
            to: req.body.to,
            from: 'easwdev@gmail.com', // sender
            subject: "Please confirm your Email account",
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
        }
        //console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (!error)
        {
            console.log('mail was sent to: ' + req.body.to);
        }
        callback(error, response);
    });
}

function sendEmailToUser(address, subject, message, callback) {
    var mailOptions;

    mailOptions = {
        to: address,
        from: 'easwdev@gmail.com', // sender
        subject: subject,
        html: message
    }
    //console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        callback(error, response);
    });
}



module.exports = function (app, sqlserver) {

    return{
        sendEmailToUser:sendEmailToUser
    }

    app.post('/api/send', jwtauth, function (req, res) {

        sqlserver.get(function (err, con) {
            if (!err) {
                var sql = 'SELECT * FROM users WHERE id = ' + con.escape(req.idFromToken);
                var query = con.query(sql, function (err, rows) {
                    sqlserver.release(con);
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        //var host = req.get('host');
                        //req.body.host = "http://" + host;
                        console.log('sending mail..');
                        console.log(rows);
                        sendEmail(req, rows[0].userguid, function (error, response) {
                            if (error) {
                                //console.log(error);
                                res.status(500);
                                res.end("error");
                            } else {
                                //console.log("Message sent: ");
                                res.status(201);
                                res.end("sent");
                            }
                        });
                    }
                });
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.get('/verify', function (req, res) {
        //console.log(req.query.id);
        registrationModel.findOne({
            'userguid': req.query.id
        }, 'email userguid verified host', function (err, member) {
            if (err)
                res.status(500).send("error here " + err);
            else if (member) {

                //console.log(req.protocol + ":/" + req.get('host'));
                //if ((req.protocol + "://" + req.get('host')) == ("http://" + member.host)) {
                var thisHost = req.protocol + "://" + req.get('host');
                //console.log("thisHost : " + thisHost);
                //console.log("member.host : " + member.host);
                if (thisHost == member.host) {
                    //console.log("Domain is matched. Information is from Authentic email");
                    if (req.query.id == member.userguid) {
                        //console.log("email is verified");
                        member.verified = true;
                        member.save();
                        createNew.createNewMember(member._id);
                        //res.end("<h1>Email " + member.email + " is been Successfully verified");
                        res.status(200);
                        res.redirect('/#/');
                    } else {
                        //console.log("email is not verified");
                        //res.end("<h1>Bad Request</h1>");
                        res.status(200);
                        res.redirect('/#/');
                    }
                } else {
                    //res.end("<h1>Request is from unknown source");
                    res.status(200);
                    res.redirect('/#/');
                }
            }
        });
    });
};
