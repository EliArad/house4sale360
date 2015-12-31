'use_strict'

var express = require('express');
var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;
var myhelper = require('../modules/myhelpers');


var routes = function (registerController, regModel) {

    var Router = express.Router();

    // middleware for the register
    Router.use('/:registerId', function (req, res, next) {
            //console.log("register middleware " + req.params.registerId);
            var d = new Date();
            console.log(d);
            var decoded = jwt.verify(req.params.registerId, secret);

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