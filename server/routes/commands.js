/*jshint node:true */
'use_strict';
var express = require('express');
var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;
var myhelper = require('../modules/myhelpers');
var jwtauth = require('../common/jwtauth');
var fs = require('fs');
var randomstring = require("randomstring");
var cityLoaderobject = require('../../classhelpers').siteHelper;
var cityLoader = new cityLoaderobject();
var cors = require('../common/cors');

var membersModelCount = 0;

var routes = function (app, notifyServer, usersFunction) {



  return {
    routes: routes
  };
}

module.exports = routes;
