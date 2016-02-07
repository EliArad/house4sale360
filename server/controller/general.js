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
            //console.log('contactus');
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
                } else {
                    res.sendStatus(500);
                }
            });
        },

        isverified: function (req, res, next) {
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
                } else {
                    res.sendStatus(500);
                }
            });
        },

        getContactusMessages: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM yad2vr.contactus';
                    var query = con.query(sql, function (err, rows) {
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
                            res.send(rows);
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },
        saveVisitorSearch: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    //console.log(req.body);
                    var sql = 'SELECT * FROM yad2vr.usersearch where userguid = ' + con.escape(req.body.userguid);
                    var query = con.query(sql, function (err, rows) {
                        if (err) {
                            //console.log(err);
                            sqlserver.release(con);
                            res.sendStatus(500);
                        } else {
                            //console.log(rows);
                            if (rows.length > 0) {
                                //console.log('upupupp');
                                con.query('UPDATE yad2vr.usersearch SET ? WHERE ?', [{
                                    city: req.body.city,
                                    numofrooms: req.body.numofrooms,
                                    type: req.body.type,
                                    propertytype: req.body.propertytype,
                                }, {userguid: req.body.userguid}], function (err, result) {
                                    if (err) {
                                        //console.log(err);
                                        sqlserver.release(con);
                                        res.sendStatus(500);
                                    } else {
                                        sqlserver.release(con);
                                        res.send('ok');
                                    }
                                });
                            } else {
                                var queryres = con.query('INSERT INTO yad2vr.usersearch SET ?', req.body, function (err, result) {
                                    if (err) {
                                        //console.log(err);
                                        sqlserver.release(con);
                                        res.sendStatus(500);
                                    } else {
                                        sqlserver.release(con);
                                        res.send('ok');
                                    }
                                });
                            }
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        updatevisitor: function (req, res, next) {

            //console.log('updatevisitor');
            sqlserver.get(function (err, con) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    //console.log(req.body.guid);
                    var sql = 'SELECT * FROM yad2vr.visitors where guid = ' + con.escape(req.body.guid);
                    var query = con.query(sql, function (err, rows) {
                        //console.log(rows.length + ' ' + err);
                        if (!err && rows.length > 0) {
                            var data = {
                                guid: req.body.guid,
                                dated: req.body.dated,
                                count: rows[0].count + 1,
                                userid: rows[0].userid,
                                ip: req.body.ip
                            }
                            var idFromToken = getId(req);
                            if (idFromToken != 0) {
                                data.userid = idFromToken;
                            }

                            con.query('UPDATE yad2vr.visitors SET ? WHERE ?', [data , {guid: req.body.guid}], function (err, result) {
                                sqlserver.release(con);
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                } else {
                                    console.log(rows);
                                    res.send('ok');
                                }
                            });
                        } else {
                            console.log('update but new user..');

                            var data = {
                                guid: req.body.guid,
                                dated: req.body.dated,
                                count: 0,
                                userid: 0,
                                ip: req.body.ip
                            }
                            var idFromToken = getId(req);
                            if (idFromToken != 0) {
                                data.userid = idFromToken;
                            }

                            var queryres = con.query('INSERT INTO yad2vr.visitors SET ?',
                                data, function (err, result) {
                                if (err) {
                                    //console.log(err);
                                    sqlserver.release(con);
                                    res.sendStatus(500);
                                } else {
                                    sqlserver.release(con);
                                    res.send('ok');
                                }
                            });
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
                        if (rows.length == 0) {

                            var data = {
                                guid: req.body.guid,
                                dated: req.body.dated,
                                count: 0,
                                userid: 0,
                                ip:req.body.ip
                            }
                            var idFromToken = getId(req);
                            if (idFromToken != 0) {
                                data.userid = idFromToken;
                            }
                            var queryres = con.query('INSERT INTO yad2vr.visitors SET ?', data, function (err, result) {
                                sqlserver.release(con);
                                if (err) {
                                    res.sendStatus(500);
                                } else {
                                    res.send('ok');
                                }
                            });
                        } else {

                            var data = {
                                guid: req.body.guid,
                                dated: req.body.dated,
                                count: 0,
                                userid: rows[0].userid,
                                ip:req.body.ip
                            }
                            var idFromToken = getId(req);
                            if (idFromToken != 0) {
                                data.userid = idFromToken;
                            }

                            //console.log('return user need to increase');
                            //console.log(rows);
                            var count = rows[0].count + 1;
                            //console.log(count);
                            con.query('UPDATE yad2vr.visitors SET ? WHERE ?', [{
                                count: count,
                                dated: req.body.dated,
                                userid: idFromToken,
                                ip:req.body.ip
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