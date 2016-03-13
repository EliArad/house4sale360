'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');


module.exports = function (app,registerController) {


    function init() {


        var router = express.Router();
        router.post('/create', registerController.create);
        router.post('/destroy', registerController.destroy);
        router.post('/show',  registerController.show);
        router.get('/all',  registerController.all);
        app.use('/api/register', router);

    }

    return {
        init:init
    }

}
