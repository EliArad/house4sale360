'use strict';

app.controller('GlobalController', ['$scope', '$state', 'authToken', 'PassServiceParams',
    'appCookieStore', '$rootScope',
    'SessionStorageService', 'socketioservice', 'citiesservice','versionReloader','SchonotBackg','visitors','myConfig',
    function ($scope, $state, authToken, PassServiceParams,
              appCookieStore, $rootScope, SessionStorageService,
              socketioservice, citiesservice,versionReloader,SchonotBackg,visitors,myConfig) {

        var m_vm = this;
        console.log('global controller started');
        versionReloader.start();
        SchonotBackg.getStreets(3000);


        //var socket = io.connect('80.178.121.130');

        citiesservice.getcitiesatonce(function (err, result) {

        });
        visitors.initLocation();

        //$.getJSON("http://jsonip.com?callback=?", function (data) {
            //alert("Your ip: " + data.ip);
            visitors.determineVisit('0.0.0.0');
        //})




    }
]);