'use strict';

var secret = require('../common/config').secret;
var builder_sale = require('../modules/salequerybuilder')();
var builder_rent = require('../modules/rentquerybuilder')();
var fs = require('fs');
module.exports = function (sqlserver) {

    return {


        GetAllMyResults: function (req, res, next) {

            //console.log('GetAllMyResults');

            var userguid = undefined;
            sqlserver.get(function (err, con) {
                if (!err) {
                    if (req.body.userguid == undefined) {
                        userguid = req.userguidFromToken;
                        //console.log('111 ' + userguid);
                        if (userguid == undefined) {
                            return res.sendStatus(500);
                        }
                    } else {
                        userguid = req.body.userguid;
                    }
                    //console.log(' user guid that need: ' + userguid);

                    //console.log(req.body.msgid);
                    //console.log(req.body.type);

                    if (req.body.msgid == undefined || req.body.type == undefined) {

                        var sql = 'SELECT sellhousedetails.*, users.userguid, salehouseblobs.tableid,salehouseblobs.filename,salehouseblobs.is360image, salehouseblobs.is360video, salehouseblobs.isvideo,salehouseblobs.description, salehouseblobs.filesize FROM yad2vr.sellhousedetails\
                    inner join users\
                    on users.id = sellhousedetails.userid\
                    LEFT JOIN salehouseblobs\
                    ON salehouseblobs.tableid = sellhousedetails.id\
                    WHERE users.userguid = ' + con.escape(userguid);

                        fs.writeFile('./sqlmypage.txt', sql);


                        var query = con.query(sql, function (err, rows) {
                            if (err) {
                                sqlserver.release(con);
                                return res.sendStatus(500);
                            } else {
                                //console.log(' results: ' + rows.length);
                                for (var i = 0; i < rows.length; i++) {
                                    delete rows[i].email;
                                    delete rows[i].homephone;
                                    delete rows[i].secondarycellphone;
                                    delete rows[i].secondarycellphone;
                                    delete rows[i].officephone;
                                    delete rows[i].primarycellphone;
                                    delete rows[i].contactPerson;
                                }

                                sql = 'SELECT renthousedetails.*, users.userguid, renthouseblobs.tableid,renthouseblobs.filename,renthouseblobs.is360image, renthouseblobs.is360video, renthouseblobs.description, renthouseblobs.isvideo, renthouseblobs.description,  renthouseblobs.filesize FROM yad2vr.renthousedetails\
                            inner join users\
                            on users.id = renthousedetails.userid\
                            LEFT JOIN renthouseblobs\
                            ON renthouseblobs.tableid = renthousedetails.id\
                            WHERE users.userguid = ' + con.escape(userguid);
                                var query = con.query(sql, function (err, rows1) {
                                    if (err) {
                                        sqlserver.release(con);
                                        return res.sendStatus(500);
                                    } else {
                                        //console.log(' results: ' + rows.length);
                                        for (var i = 0; i < rows1.length; i++) {
                                            delete rows1[i].email;
                                            delete rows1[i].homephone;
                                            delete rows1[i].secondarycellphone;
                                            delete rows1[i].secondarycellphone;
                                            delete rows1[i].officephone;
                                            delete rows1[i].primarycellphone;
                                            delete rows1[i].contactPerson;
                                        }
                                    }

                                    sqlserver.release(con);
                                    return res.json({
                                        rows: rows,
                                        rows1: rows1
                                    });

                                });

                            }
                        });
                    } else {
                        if (req.body.type != undefined) {
                            var tabledet;
                            if (req.body.type == 0) {
                                if (req.body.msgid == undefined) {
                                    sql = 'SELECT sellhousedetails.*, users.userguid, salehouseblobs.tableid,salehouseblobs.filename,salehouseblobs.is360image, salehouseblobs.is360video, salehouseblobs.isvideo, salehouseblobs.description,salehouseblobs.filesize FROM yad2vr.sellhousedetails\
                                    inner join users\
                                    on users.id = sellhousedetails.userid\
                                    LEFT JOIN salehouseblobs\
                                    ON salehouseblobs.tableid = sellhousedetails.id\
                                    WHERE users.userguid = ' + con.escape(userguid);
                                } else {
                                    sql = 'SELECT sellhousedetails.*, users.userguid, salehouseblobs.tableid,salehouseblobs.filename,salehouseblobs.is360image, salehouseblobs.is360video, salehouseblobs.isvideo,salehouseblobs.description, salehouseblobs.filesize FROM yad2vr.sellhousedetails\
                                    inner join users\
                                    on users.id = sellhousedetails.userid\
                                    LEFT JOIN salehouseblobs\
                                    ON salehouseblobs.tableid = sellhousedetails.id\
                                    WHERE users.userguid = ' + con.escape(userguid) + ' AND sellhousedetails.id = ' + con.escape(req.body.msgid);

                                }
                            } else {
                                if (req.body.msgid == undefined) {

                                    sql = 'SELECT renthousedetails.*, users.userguid, renthouseblobs.tableid,renthouseblobs.filename,renthouseblobs.is360image, renthouseblobs.is360video,renthouseblobs.description, renthouseblobs.isvideo, renthouseblobs.filesize FROM yad2vr.renthousedetails\
                                    inner join users\
                                    on users.id = renthousedetails.userid\
                                    LEFT JOIN renthouseblobs\
                                    ON renthouseblobs.tableid = renthousedetails.id\
                                    WHERE users.userguid = ' + con.escape(userguid);
                                } else {
                                    sql = 'SELECT renthousedetails.*, users.userguid, renthouseblobs.tableid,renthouseblobs.filename,renthouseblobs.is360image, renthouseblobs.is360video, renthouseblobs.isvideo, renthouseblobs.description, renthouseblobs.filesize FROM yad2vr.renthousedetails\
                                    inner join users\
                                    on users.id = renthousedetails.userid\
                                    LEFT JOIN renthouseblobs\
                                    ON renthouseblobs.tableid = renthousedetails.id\
                                    WHERE users.userguid = ' + con.escape(userguid) + ' AND renthousedetails.id = ' + con.escape(req.body.msgid);

                                }
                            }

                            var query = con.query(sql, function (err, rows) {
                                if (err) {
                                    sqlserver.release(con);
                                    return res.sendStatus(500);
                                } else {
                                    //console.log(' results: ' + rows.length);
                                    for (var i = 0; i < rows.length; i++) {
                                        delete rows[i].email;
                                        delete rows[i].homephone;
                                        delete rows[i].secondarycellphone;
                                        delete rows[i].secondarycellphone;
                                        delete rows[i].officephone;
                                        delete rows[i].primarycellphone;
                                        delete rows[i].contactPerson;
                                    }
                                }

                                sqlserver.release(con);
                                if (req.body.type == 0) {
                                    return res.json({
                                        rows: rows,
                                        rows1: []
                                    });
                                } else {
                                    return res.json({
                                        rows: [],
                                        rows1: rows
                                    });
                                }
                            });
                        }
                    }
                } else {
                    return res.sendStatus(500);
                }
            });

        },

        GetHouseQueryResults: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql;
                    if (req.body.type == 0)
                        sql = builder_sale.build(con, req.body.query);
                    else if (req.body.type == 1)
                        sql = builder_rent.build(con, req.body.query);
	                fs.writeFile('./sql.txt', sql, function (err) {
                        if (err)
                            console.log(err);
                    });
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            return res.sendStatus(500);
                        } else {
                            for (var i = 0; i < rows.length; i++) {
                                delete rows[i].email;
                                delete rows[i].homephone;
                                delete rows[i].secondarycellphone;
                                delete rows[i].secondarycellphone;
                                delete rows[i].officephone;
                                delete rows[i].primarycellphone;
                                delete rows[i].contactPerson;
                            }
                            return res.send(rows);
                        }
                    });
                } else {
                    return res.sendStatus(500);
                }
            });
        },

        GetSearchResultByMessageId: function (req, res, next) {
            id = req.params.id;
            console.log(id);
            var sql = 'SELECT sellhousedetails.* , salehouseblobs.filename,\
            salehouseblobs.tableid ,\
            salehouseblobs.is360image ,\
            salehouseblobs.is360video ,\
            salehouseblobs.isvideo ,\
            tours3d.*\
            FROM sellhousedetails\
            INNER JOIN users\
            ON users.id = sellhousedetails.userid\
            LEFT JOIN salehouseblobs\
            ON salehouseblobs.tableid  = sellhousedetails.id\
            LEFT JOIN tours3d\
            ON sellhousedetails.id = tours3d.tableid3d\
            WHERE sellhousedetails.id = ' + con.escape(id) ;

            sqlserver.get(function (err, con) {
                if (!err) {
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            return res.sendStatus(500);
                        } else {
                            return res.send(rows);
                        }
                    });

                } else {
                    return res.sendStatus(500);
                }
            });
        }
    }

}