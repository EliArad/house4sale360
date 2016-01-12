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

var routes = function (app) {



  app.post('/api/getStreets', jwtauth, function (req, res, next) {


    cityLoader.getStreets(req.body.code,function (err,data) {
      if (err)
      {
        return res.status(500).send({ error:err});
      } else {
        res.send(data);
      }
    });
  });

  app.post('/api/getSchonot', jwtauth, function (req, res, next) {

    cityLoader.getSchonot(req.body.code,function (err,data) {
      if (err)
      {
        //console.log(err);
        return res.status(500).send({ error:err});
      } else {
        res.send(data);
      }
    });
  });

  app.get('/api/getcities', function (req, res, next) {

    cityLoader.basic(function (err,data) {
      if (err)
      {
        console.log(err);
        return res.status(500).send({ error:err});
      } else {
        console.log(data.length);
        res.send(data);
      }
    });
  });


  return {
    routes: routes
  };
}

module.exports = routes;
