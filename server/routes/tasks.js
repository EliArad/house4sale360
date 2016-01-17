'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');


module.exports = function (app,tasksController) {




    function init() {

        var router = express.Router();
        router.post('/getSchonotbackground', tasksController.getSchonotbackground);
        app.use('/api/tasks', router);
    }

    return {
        init:init
    }

}
