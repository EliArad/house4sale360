'use strict';


module.exports = function (sqlserver, mailer) {


    return {

        getnumberofmails: function (req, res, next) {


        },

        SendEmailToPerson : function(req, res , next)
        {

            console.log(req.body);

            var subject = req.body.name  = " שלח לך לינק לאתר apt360.co.il לראות מודעות";
            mailer.sendEmailToUser(req.body.email ,
                                   subject,
                                   req.body.message,
                                   function(err, response) {
                if (err)
                    res.sendStatus(500);
                else {
                    res.send('ok');
                }
            });
        },

        SendEmail : function(req, res , next)
        {
          
            //console.log('/api/send');
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM users WHERE id = ' + con.escape(req.idFromToken);
                    con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            //var host = req.get('host');
                            //req.body.host = "http://" + host;
                            //console.log('sending mail..');
                            //console.log(rows);
                            mailer.sendEmail(req, rows[0].userguid, function (error, response) {
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
        },
        SendEmailToUser: function (req, res, next) {

            sqlserver.get(function (err, con) {
                if (!err) {

                    var sql = 'SELECT  sellhousedetails.userid , users.email\
                    FROM sellhousedetails\
                    INNER JOIN users\
                    ON users.id = sellhousedetails.userid\
                    WHERE sellhousedetails.id = ' +  con.escape(req.body.id);

                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);

                        if (err) {
                            res.sendStatus(500);
                        } else {
                            mailer.sendEmailToUser(rows[0].email, 'הודעה מאתר apt360' ,  req.body.message, function(err ,  result){
                                if (err)
                                    res.sendStatus(500);
                                else {
                                    return res.send('ok');
                                }
                            });
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            })
        }
    }
};