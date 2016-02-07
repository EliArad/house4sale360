'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');
var jwtauthnext = require('../common/jwtauthnext');

module.exports = function (app,salequeryController) {


    function init() {


        var router = express.Router();
        router.post('/GetHouseQueryResults', salequeryController.GetHouseQueryResults);
        router.post('/GetAllMyResults',jwtauthnext,  salequeryController.GetAllMyResults);
        app.use('/api/salequery', router);

    }

    return {
        init:init
    }

}

