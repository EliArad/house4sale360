'use strict';


module.exports = function (sqlserver, mailer) {


    return {

        getnumberofmails: function (req, res, next) {


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
                            mailer.sendEmailToUser(rows[0].email, 'מייל easwdev' ,  req.body.message, function(err , result){
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