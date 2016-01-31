'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');


module.exports = function (app,salequeryController) {


    function init() {


        var router = express.Router();
        router.post('/GetHouseQueryResults', salequeryController.GetHouseQueryResults);
        router.get('/GetAllMyResults', salequeryController.GetAllMyResults);
        app.use('/api/salequery', router);

    }

    return {
        init:init
    }

}

