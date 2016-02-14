
'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');


module.exports = function (app,utilsController) {


    function init() {


        var router = express.Router();
        router.post('/rotatePicture', jwtauth, utilsController.rotatePicture);
        app.use('/api/utils', router);

    }

    return {
        init:init
    }

}
