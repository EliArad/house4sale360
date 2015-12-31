var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;

exports.setModel = function (regmodel, membermodel) {

};

exports.login = function (req, res) {

    //console.log('login');
    var email = req.body.email || '';
    var password = req.body.password || '';


    if (email == '' || password == '') {
        return res.sendStatus(401);
    }

};
