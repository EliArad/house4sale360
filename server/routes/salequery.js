'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');


module.exports = function (app,salequeryController) {


    function init() {


        var router = express.Router();
        router.post('/GetSaleHouseQueryResults', salequeryController.GetSaleHouseQueryResults);

        app.use('/api/salequery', router);

    }

    return {
        init:init
    }

}

