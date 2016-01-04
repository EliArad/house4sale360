/*jshint node:true */
'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');

module.exports = function (app,dbstoreController) {


    function init() {

        app.post('/api/dbstore/saveHouseDetails', jwtauth, dbstoreController.saveHouseDetails);
        app.post('/api/dbstore/saveRentDetails', jwtauth, dbstoreController.saveRentDetails);
        app.get('/api/dbstore/getHouseDetails', jwtauth, dbstoreController.getHouseDetails);
        app.get('/api/dbstore/getRentDetails', jwtauth, dbstoreController.getRentDetails);
    }

    return {
      init:init
    };

}
