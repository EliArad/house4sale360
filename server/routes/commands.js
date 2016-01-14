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

var cities = [];

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



  app.post('/api/getcitieschunk', function (req, res, next) {


     var a = [];
     for (var i = req.body.index; i < (req.body.index + req.body.chunk); i++) {
        a.push(cities[i]);
     }
     console.log(req.body.index + ' ' + req.body.chunk);
     //console.log('a:');
     //console.log(a);
     res.json({ a:a, size:req.body.size});
  });


  app.get('/api/getcities', function (req, res, next) {

    cityLoader.basic(function (err,data) {
      if (err)
      {
        console.log(err);
        return res.status(500).send({ error:err});
      } else {
        var  s = data.length;
        for (var i = 0 ; i < data.length; i++)
        {
            cities.push(data[i]);
        }
        //console.log(cities);
        res.send(s.toString());
      }
    });
  });


  return {
    routes: routes
  };
}

module.exports = routes;
