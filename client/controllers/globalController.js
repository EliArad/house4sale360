'use strict';

app.controller('GlobalController', ['$scope', '$state', 'authToken', 'API', 'PassServiceParams',
    'appCookieStore', '$rootScope',
    'SessionStorageService', 'socketioservice', 'citiesservice','versionReloader','SchonotBackg','visitors',
    function ($scope, $state, authToken, API, PassServiceParams,
              appCookieStore, $rootScope, SessionStorageService,
              socketioservice, citiesservice,versionReloader,SchonotBackg,visitors) {

        var m_vm = this;
        console.log('global controller started');
        versionReloader.start();
        SchonotBackg.getStreets(3000);

        citiesservice.getcities(function (err, result) {


        });
        visitors.initLocation();
        visitors.determineVisit();

    }
]);