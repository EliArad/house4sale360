/*jshint node:true */
'use_strict';
var express = require('express');
var jwt = require('jsonwebtoken');
var guid = require('guid')
var secret = require('../common/config').secret;
var myhelper = require('../modules/myhelpers');
var jwtauth = require('../common/jwtauth');
var fs = require('fs');
var randomstring = require("randomstring");
var cityLoaderobject = require('../../classhelpers').siteHelper;
var cityLoader = new cityLoaderobject();
var cors = require('../common/cors');
var request = require('request');
var mypasswordhash = require('../modules/password')();

var cities = [];

var membersModelCount = 0;

var routes = function (app, sqlserver,mailer) {


    app.post('/api/getStreets', function (req, res, next) {


        cityLoader.getStreets(req.body.code, function (err, data) {
            if (err) {
                return res.status(500).send({error: err});
            } else {
                res.send(data);
            }
        });
    });

    app.post('/api/getSchonot', function (req, res, next) {

        cityLoader.getSchonot(req.body.code, function (err, data) {
            if (err) {
                //console.log(err);
                return res.status(500).send({error: err});
            } else {
                res.send(data);
            }
        });
    });

    app.post('/api/getVersion', function (req, res, next) {

        var page = req.body.pageName;
        console.log(page);
        var version  = '1';
        switch (page)
        {
            case 'addnewsalehouse':
                version = '4';
            break;
            case 'newresnthouse':
                version = '2';
            break;
            case 'admin':
                version = '2';
            break;
            case 'main':
                version = '2';
            break;
            case 'mypage':
                version = '2';
            break;
            case 'help':
                version = '2';
            break;
            case 'welcome':
                version = '2';
            break;
            case 'deletecard':
                version = '2';
            break;
            case 'login':
                version = '2';
            break;
            case 'logout':
                version = '2';
                break;
            case 'salehouse':
                version = '2';
                break;
            case 'renthouse':
                version = '2';
            break;
            case 'contactus':
                version = '2';
            break;
            case 'virtualTour':
                version = '2';
            break;
            case 'resetpassword':
                version = '2';
            break;

        }
        return res.send(version);
    });

    app.post('/api/forgotPassword', function (req, res, next) {


        sqlserver.get(function (err, con) {
            if (!err) {
                var sql = 'SELECT * FROM yad2vr.users where email = ' + con.escape(req.body.email);
                var query = con.query(sql, function (err, rows) {
                    if (err || rows.length == 0)
                    {
                        //console.log(err);
                        sqlserver.release(con);
                        return res.sendStatus(403);
                    } else {
                        var randomGuid;
                        randomGuid = guid.create();
                        //console.log(req.body.email);
                        //console.log('mail is ok , we are sending him email');
                        // update in the iser  that it is not verifed and the guid again

                        var condition = {email: req.body.email};
                        var query = con.query('UPDATE users SET ? WHERE ?', [{userguid:randomGuid, verified:0}, condition], function (err, result) {
                            //console.log('update:  ' + err);
                            sqlserver.release(con);
                            if (err) {
                                res.sendStatus(500);
                            } else {

                                var host = req.get('host');
                                var link = "http://" + req.get('host') + "/#!/resetpassword?id=" + randomGuid;
                                var html =  "Hello,<br> לחץ על הקישור הבא לאישור המייל שלך.<br><a href=" + link + ">לחץ כאן לאימות המייל</a>"
                                console.log(mailer);
                                mailer.sendEmailToUser(req.body.email, 'איפוס ססמא מאתר apt360', html, function (error, response) {
                                    if (error) {
                                        res.status(500);
                                        res.end("error");
                                    } else {
                                        res.status(201);
                                        res.end("sent");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    app.post('/api/getcitieschunk', function (req, res, next) {

        var a = [];
        for (var i = req.body.index; i < (req.body.index + req.body.chunk); i++) {
            a.push(cities[i]);
            //fs.appendFile('./c.txt', cities[i].city + "\r\n");
        }
        //console.log(req.body.index + ' ' + (req.body.index + req.body.chunk));
        //console.log('a:');
        //console.log(a);
        res.json({a: a, size: req.body.size, index: req.body.index});
    });

    app.get('/api/isadmin', jwtauth, function (req, res, next) {

        var id = req.idFromToken;
        // get the email of the uder:
        sqlserver.get(function (err, con) {
            if (!err) {
                var sql = 'SELECT * FROM yad2vr.users where id = ' + con.escape(id);
                var query = con.query(sql, function (err, rows) {
                    sqlserver.release(con);
                    if (err || rows.length == 0)
                    {
                        res.send(403);
                    } else {
                        if (rows[0].email == 'easp13@gmail.com')
                        {
                            return res.send('88792832321');
                        } else {
                            res.send(403);
                        }
                    }
                });
            } else {
                res.send(403);
            }
        });
    });

    app.get('/api/getcities', function (req, res, next) {

        cityLoader.basic(function (err, data) {
            if (err) {
                //console.log(err);
                return res.status(500).send({error: err});
            } else {
                var s = data.length;
                for (var i = 0; i < data.length; i++) {
                    cities.push(data[i]);
                }
               
                res.send(s.toString());
            }
        });
    });

    app.post('/api/isValidGuid', function (req, res, next)
    {

        //console.log(req.body.userguid);
        // get the email of the uder:
        sqlserver.get(function (err, con) {
            if (!err) {
                var sql = 'SELECT * FROM yad2vr.users where userguid = ' + con.escape(req.body.userguid);
                var query = con.query(sql, function (err, rows) {
                    sqlserver.release(con);
                    //console.log(rows);
                    if (err || rows.length == 0)
                    {
                        res.send(403);
                    } else {
                        res.send(rows[0].userguid);
                    }
                });
            } else {
                res.send(500);
            }
        });
    });

    app.get('/api/getuserid', jwtauth, function (req, res, next) {

        console.log(req.idFromToken);
        return res.send(req.idFromToken.toString());
    });

    app.get('/api/getuserguid', jwtauth, function (req, res, next)
    {
        var id = req.idFromToken;
        // get the email of the uder:
        sqlserver.get(function (err, con) {
            if (!err) {
                var sql = 'SELECT * FROM yad2vr.users where id = ' + con.escape(id);
                var query = con.query(sql, function (err, rows) {
                    sqlserver.release(con);
                    if (err || rows.length == 0)
                    {
                        res.send(403);
                    } else {
                        res.send(rows[0].userguid);
                    }
                });
            } else {
                res.send(500);
            }
        });
    });

    app.post('/api/updateuserpassword', function (req, res, next) {



        sqlserver.get(function (err, con) {
            if (!err) {
                mypasswordhash.encrypt(req.body.user.password, function (err, hash) {
                    if (!err) {
                        var query = con.query('UPDATE users SET ? WHERE userguid = ' + con.escape(req.body.user.guid),
                                               [{password:hash, verified:1}],
                                               function (err, result) {
                            sqlserver.release(con);
                            if (err) {
                                console.log(err);
                                res.send(500, {error: err});
                            } else {
                                res.send('ok');
                            }
                        });
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(500);
            }
        });

    });

    app.post('/api/deleteuser',jwtauth,  function (req, res, next) {


        if (req.idFromToken == undefined)
        {
            res.status(500);
            res.end("לא מורשה!");
            return;
        }
        request({
            url: 'https://www.google.com/recaptcha/api/siteverify',
            qs: {secret:'6Lf-zBcTAAAAAEMLlVNjBUKaIgjVfz_akFJ0JMLd',  response:req.body.capdata.response}, //Query string data
            method: 'POST',
            //headers: {
              //  'Content-Type': 'MyContentType',
                //'Custom-Header': 'Custom Value'
            //},
            body: ''
        }, function(error, response, body){
            if(error) {
                console.log(error);
                res.send('not deleted');
            } else {
                var s = JSON.parse(body);

                if (s.success == false) {
                    res.status(500);
                    res.end("לא מורשה!");
                } else {
                    if (req.body.capdata.userselect == 0)
                    {
                        sqlserver.get(function (err, con) {
                            if (!err) {
                                con.query('UPDATE users SET ? WHERE ?', [{suspend: 1},{id: req.idFromToken}], function (err, result) {
                                    sqlserver.release(con);
                                    console.log(err);
                                    if (err)
                                    {
                                        res.send(403);
                                    } else {
                                       res.send('ok');
                                    }
                                });
                            } else {
                                res.send(500);
                            }
                        });
                    } else {
                        // erase
                        console.log('start to erase');

                        sqlserver.get(function (err, con) {
                            var sql = 'SELECT sellhousedetails.*, users.userguid, salehouseblobs.tableid,salehouseblobs.filename,salehouseblobs.is360image, salehouseblobs.is360video, salehouseblobs.filefullpath, salehouseblobs.isvideo,salehouseblobs.description, salehouseblobs.filesize FROM yad2vr.sellhousedetails\
                                    inner join users\
                                    on users.id = sellhousedetails.userid\
                                    LEFT JOIN salehouseblobs\
                                    ON salehouseblobs.tableid = sellhousedetails.id\
                                    WHERE users.id = ' + con.escape(req.idFromToken);
                            if (!err) {
                                con.query(sql,function (err, rows) {
                                    if (err)
                                    {
                                        return res.send(500);
                                    } else {
                                        for (var i = 0 ; i < rows.length; i++) {
                                            if (rows[i].filefullpath != undefined || rows[i].filefullpath != null) {
                                                try {
                                                    fs.unlink(rows[i].filefullpath, function(err){
                                                        if (!err)
                                                            console.log('erase: ' + rows[i].filefullpath);
                                                    });

                                                }
                                                catch (e)
                                                {
                                                    console.log('failed to delete file: ' + rows[i].filefullpath);
                                                }
                                            }
                                        }

                                        sql = 'SELECT salehouseblobs.id\
                                        FROM sellhousedetails\
                                        inner join users\
                                        on users.id = sellhousedetails.userid\
                                        LEFT JOIN salehouseblobs\
                                        ON salehouseblobs.tableid = sellhousedetails.id\
                                        WHERE users.id = ' + con.escape(req.idFromToken);

                                        con.query(sql,function (err, rows) {
                                            if (err){
                                                return res.send(500);
                                            } else {
                                                for (var i = 0 ; i < rows.length; i++) {
                                                    sql = 'DELETE FROM salehouseblobs WHERE id = ' + con.escape(rows[i].id);
                                                    con.query(sql,function (err, rows)
                                                    {

                                                    });
                                                }
                                                sql = 'SELECT sellhousedetails.id\
                                                FROM sellhousedetails\
                                                inner join users\
                                                on users.id = sellhousedetails.userid\
                                                WHERE users.id = ' + con.escape(req.idFromToken);
                                                con.query(sql,function (err, rows) {
                                                    if (err){
                                                        return res.send(500);
                                                    } else {
                                                        for (var i = 0 ; i < rows.length; i++) {
                                                            sql = 'DELETE FROM sellhousedetails WHERE id = ' + con.escape(rows[i].id);
                                                            con.query(sql,function (err, rows)
                                                            {

                                                            });
                                                        }
                                                        sql = 'DELETE FROM users WHERE id = ' + con.escape(req.idFromToken);
                                                        con.query(sql,function (err, rows) {
                                                            if (err){
                                                                return res.send(500);
                                                            } else {
                                                                console.log('erase done!');
                                                                return res.send('ok');
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            } else {
                                res.send(500);
                            }
                        });
                    }
                }
            }
        });
    });

    app.get('/api/getcitiesatonce', function (req, res, next) {

        cityLoader.basic(function (err, data) {
            if (err) {
                //console.log(err);
                return res.status(500).send({error: err});
            } else {
                res.send(data);
            }
        });
    });


    return {
        routes: routes
    };
}

module.exports = routes;
