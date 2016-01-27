'use strict';
var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;


module.exports = function (sqlserver) {


    function getId(req) {
        var bearerToken;
        var bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ');
            var bearerToken = bearer[1];
            try {

                var decoded = jwt.verify(bearerToken, secret);
                var idFromToken = decoded.sub;
                return idFromToken;
            } catch (err) {
                return 0;
            }
        } else {
            return 0;
        }
    }

    return {

        contactus: function (req, res, next) {
            console.log('contactus');
            sqlserver.get(function (err, con) {
                if (!err) {
                    req.body.dated = new Date();
                    var query = con.query('INSERT INTO contactus SET ?', req.body, function (err, result) {
                        sqlserver.release(con);
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.send('verifiedok');
                        }
                    });
                }
            });
        },

        isverified: function (req, res, next) {
            console.log('isverified');
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT *  FROM users WHERE id = ' + con.escape(req.idFromToken);
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.send('verifiedok');
                        }
                    });
                }
            });
        },
        getallvisitors: function (req, res, next) {

            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT  visitors.* , users.email FROM yad2vr.visitors\
                    LEFT JOIN users\
                    ON users.id = visitors.userid';

                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            console.log(rows);
                            res.send(rows);
                        }
                    });
                }
            });
        },

        setvisitor: function (req, res, next) {

            sqlserver.get(function (err, con) {
                if (!err) {

                    var sql = 'SELECT * FROM yad2vr.visitors where guid = ' + con.escape(req.body.guid);
                    var query = con.query(sql, function (err, rows) {
                        var data = {
                            guid: req.body.guid,
                            dated: req.body.dated,
                            count: 0,
                            userid: 0
                        }
                        var idFromToken = getId(req);
                        if (idFromToken != 0) {
                            data.userid = idFromToken;
                        }
                        if (rows.length == 0) {
                            var queryres = con.query('INSERT INTO yad2vr.visitors SET ?', data, function (err, result) {
                                sqlserver.release(con);
                                if (err) {
                                    res.sendStatus(500);
                                } else {
                                    res.send('ok');
                                }
                            });
                        } else {
                            //console.log('return user need to increase');
                            //console.log(rows);
                            var count = rows[0].count + 1;
                            //console.log(count);
                            con.query('UPDATE yad2vr.visitors SET ? WHERE ?', [{
                                count: count,
                                dated: req.body.dated,
                                userid: idFromToken
                            }, {id: rows[0].id}], function (err, result) {
                                sqlserver.release(con);
                                if (err) {
                                    //console.log(err);
                                    res.sendStatus(500);
                                } else {
                                    //console.log(rows);
                                    res.send('ok');
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