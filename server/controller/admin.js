'use strict';


module.exports = function (sqlserver) {


    return {

        logoutAllUsers: function (req, res, next) {

            console.log('logoutAllUsers');
            res.send('ok');
        },

        getUsers : function(req, res , next)
        {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM users';
                    con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.send(rows);
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        }
    }
};