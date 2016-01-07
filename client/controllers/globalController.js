'use strict';

app.controller('GlobalController', ['$scope', '$state', 'authToken', 'API', 'PassServiceParams',
    'appCookieStore', '$rootScope',
    'SessionStorageService', 'socketioservice', 'citiesservice',
    function ($scope, $state, authToken, API, PassServiceParams,
              appCookieStore, $rootScope, SessionStorageService, socketioservice, citiesservice) {

        var m_vm = this;
        citiesservice.getcities(function (err, result) {


        });

    }
]);