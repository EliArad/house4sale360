'use_strict'

var express = require('express');
var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;
var myhelper = require('../modules/myhelpers');


var routes = function (sqlserver, registerController) {

    var Router = express.Router();

    // middleware for the register
    Router.use('/:registerId', function (req, res, next) {
        console.log("register middleware " + req.params.registerId);
        var decoded = jwt.verify(req.params.registerId, secret);
        sqlserver.get(function (err, con) {
            if (!err) {
                var sql = 'SELECT * FROM users WHERE id = ' + con.escape(decoded.sub);
                var query = con.query(sql, function (err, rows) {
                    sqlserver.release(con);
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        var reguser = {};
                        console.log(rows);
                        console.log(rows[0]);
                        reguser.email = rows[0].email;
                        req.reguser = reguser;
                        next();
                    }
                });
            } else {
                res.sendStatus(500);
            }
        })
    }),

    Router.route('/').
        get(registerController.all).
        delete(registerController.deleteAll).
        post(registerController.create);

    Router.route('/:registerId').
        get(registerController.show).
        delete(registerController.destroy);


    return {
        routes: Router
    };
};

module.exports = routes;