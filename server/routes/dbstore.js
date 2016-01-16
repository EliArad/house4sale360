/*jshint node:true */
'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');

module.exports = function (app,dbstoreController) {


    function init() {

        app.get('/api/dbstore/getAllSellHouseOfMine', jwtauth, dbstoreController.getAllSellHouseOfMine);
        app.get('/api/dbstore/getAllRentHouseOfMine', jwtauth, dbstoreController.getAllRentHouseOfMine);

        app.post('/api/dbstore/saveHouseDetails', jwtauth, dbstoreController.saveHouseDetails);
        app.post('/api/dbstore/saveRentDetails', jwtauth, dbstoreController.saveRentDetails);
        app.get('/api/dbstore/getHouseDetails', jwtauth, dbstoreController.getHouseDetails);
        app.get('/api/dbstore/getRentDetails', jwtauth, dbstoreController.getRentDetails);
        app.post('/api/dbstore/updateSaleHouseDetails', jwtauth, dbstoreController.updateSaleHouseDetails);
        app.post('/api/dbstore/updateRentHouseDetails', jwtauth, dbstoreController.updateRentHouseDetails);
        app.post('/api/dbstore/getSaleHouseDetails', jwtauth, dbstoreController.getSaleHouseDetails);
        app.post('/api/dbstore/getSaleHousePictureList', jwtauth, dbstoreController.getSaleHousePictureList);
        app.post('/api/dbstore/getSaleHouse360PictureList', jwtauth, dbstoreController.getSaleHouse360PictureList);
        app.post('/api/dbstore/getSaleHouseVideoList', jwtauth, dbstoreController.getSaleHouseVideoList);
        app.post('/api/dbstore/getSaleHouseVideo360List', jwtauth, dbstoreController.getSaleHouseVideo360List);


        app.post('/api/dbstore/suspendMessage', jwtauth, dbstoreController.suspendMessage);
        app.post('/api/dbstore/deleteMessage', jwtauth, dbstoreController.deleteMessage);




        app.post('/api/dbstore/getRentHouseVideo360List', jwtauth, dbstoreController.getRentHouseVideo360List);
        app.post('/api/dbstore/getRentHousePictureList', jwtauth, dbstoreController.getRentHousePictureList);
        app.post('/api/dbstore/getRentHouse360PictureList', jwtauth, dbstoreController.getRentHouse360PictureList);
        app.post('/api/dbstore/getRentHouseVideoList', jwtauth, dbstoreController.getRentHouseVideoList);
        app.post('/api/dbstore/getRentHouseDetails', jwtauth, dbstoreController.getRentHouseDetails);


    }

    return {
      init:init
    };

}
