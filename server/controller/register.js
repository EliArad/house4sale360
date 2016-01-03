'use strict';

var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;
var mypasswordhash = require('../modules/password')();

module.exports = function (sqlserver) {

    return {


        all: function (req, res) {
            console.log("get all registrators");
            res.send("error, not implemented");
        },

        deleteAll: function (req, res) {
            console.log("delete all registrators");
            res.send("error, not implemented");
        },

        show: function (req, res) {
            console.log("Show one registrator");
            delete req.reguser.password;
            delete req.reguser.userguid;
            console.log(req.reguser)
            res.json({
                user: req.reguser
            });
        },

        destroy: function (req, res) {

        },

        /**
         * Create a member
         */
        create: function (req, res) {

            sqlserver.get(function (err, con) {
                if (!err) {
                    mypasswordhash.encrypt(req.body.password, function (err, hash) {
                        req.body.password = hash;
                        var query = con.query('INSERT INTO users SET ?', req.body, function (err, result) {
                            console.log(err);
                            con.release();
                            if (err)
                                res.sendStatus(500);
                            else
                                res.send('ok');
                        });
                    });
                } else {
                     res.sendStatus(500);
                }
            });


        }
    };
}
