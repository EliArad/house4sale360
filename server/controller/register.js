'use strict';

var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;
var mypasswordhash = require('../modules/password')();
var guid = require('guid');
var request = require('request');

module.exports = function (sqlserver) {


    function contains(str, findString) {

        var s = str.toString();
        var x = s.indexOf(findString) > -1;

    }

    return {


        all: function (req, res) {
            //console.log("get all registrators");
            res.send("error, not implemented");
        },

        deleteAll: function (req, res) {
            //console.log("delete all registrators");
            res.send("error, not implemented");
        },

        show: function (req, res) {
            //console.log("Show one registrator");
            res.json({
                user: req.reguser
            });
        },

        destroy: function (req, res) {

        },

        /**
         * Create a member
         */

        create: function (req, res, next) {


            request({
                url: 'https://www.google.com/recaptcha/api/siteverify',
                qs: {secret:'6Lf-zBcTAAAAAEMLlVNjBUKaIgjVfz_akFJ0JMLd',  response:req.body.response}, //Query string data
                method: 'POST',
                body: ''
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    res.status(500);
                    res.end('שגיאה באישור מול מוודא הרובוט');
                } else {
                    var s = JSON.parse(body);
                    if (s.success == false) {
                        console.log(error);
                        res.status(500);
                        res.end('שגיאה באישור מול מוודא הרובוט');
                    } else {
                        //console.log('no robot');
                        sqlserver.get(function (err, con) {
                            if (!err) {
                                mypasswordhash.encrypt(req.body.password, function (err, hash) {

                                    if (!err) {
                                        req.body.password = hash;
                                        var randomGuid;
                                        randomGuid = guid.create();
                                        req.body.userguid = randomGuid;
                                        req.body.host = "http://" + req.get('host');
                                        delete req.body.confirmPassword;
                                        delete req.body.response;
                                        req.body.verified = 0;

                                        var date = new Date();
                                        req.body.dated = date.toISOString().split('T')[0];
                                        var query = con.query('INSERT INTO users SET ?', req.body, function (err, result) {
                                            sqlserver.release(con);
                                            if (err) {
                                                //console.log(err);
                                                if ((contains(err, 'Duplicate entry') && (contains(err, 'email')))) {
                                                    err = 'duplicate email';
                                                }
                                                res.send(500, {error: err});
                                            } else {
                                                var payload = {
                                                    iss: req.hostname,
                                                    sub: result.insertId,
                                                    userguid:randomGuid
                                                }

                                                var token = jwt.sign(payload, secret, {
                                                    expiresIn: '2 days'
                                                });
                                                res.json({
                                                    token: token
                                                });
                                            }
                                        });
                                    } else {
                                        //console.log(err);
                                        res.sendStatus(500);
                                    }
                                });
                            } else {
                                //console.log(err);
                                res.sendStatus(500);
                            }
                        });
                    }
                }
            });
        }
    };
}
