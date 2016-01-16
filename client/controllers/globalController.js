'use strict';

app.controller('GlobalController', ['$scope', '$state', 'authToken', 'API', 'PassServiceParams',
    'appCookieStore', '$rootScope',
    'SessionStorageService', 'socketioservice', 'citiesservice','versionReloader',
    function ($scope, $state, authToken, API, PassServiceParams,
              appCookieStore, $rootScope, SessionStorageService, socketioservice, citiesservice,versionReloader) {

        var m_vm = this;
        console.log('global controller started');
        versionReloader.start();
        citiesservice.getcities(function (err, result) {


        });

    }
]);