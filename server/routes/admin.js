/*jshint node:true */
'use_strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;
var jwtauth = require('../common/jwtauth');

module.exports = function (app,adminController) {

  function init() {

    var router = express.Router();
    router.get('/logoutAllUsers', jwtauth, adminController.logoutAllUsers);
    router.get('/getUsers', jwtauth, adminController.getUsers);
    app.use('/api/admin', router);

  }

  return {
    init:init
  }

}
