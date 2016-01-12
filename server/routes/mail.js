'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');


module.exports = function (app,mailController) {


    function init() {


        var router = express.Router();
        router.get('/getnumberofmails', jwtauth, mailController.getnumberofmails);
        router.post('/SendEmailToUser', mailController.SendEmailToUser);

        app.use('/api/mail', router);

    }

    return {
        init:init
    }

}
