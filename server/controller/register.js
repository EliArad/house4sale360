'use strict';

var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;


module.exports = function (Model,usersFunction) {



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

        }
    };
}
