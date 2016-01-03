'use strict';


app.controller('salehouseController', ['$scope', 'Members', 'general', 'appCookieStore', '$window',
    '$http', 'authToken', '$timeout', 'myConfig', '$state', 'myhttphelper', '$rootScope', 'API',
    'SessionStorageService', '$msgbox','$cookieStore',
    function ($scope, Members, general, appCookieStore, $window,
              $http, authToken, $timeout, myConfig,
              $state, myhttphelper, $rootScope, API, SessionStorageService, $msgbox,$cookieStore) {


        var vm = this;
        $scope.shownapa = false;
        $window.onbeforeunload = $scope.onExit;
        var lastCity = undefined;

        vm.cities = [];
        vm.numberOfRooms = [1, 1.5, 2, 2.5];
        vm.numberfloors = [];

        vm.neighborhoods = [{name:'NOT READY YET FIXME'}];

        for (var i = 0 ; i < 35; i++)
        {
            vm.numberfloors.push(i);
        }

        vm.streets = [
            /*
            {
                'name': 'ee'
            },
            {
                'name': 'ee11'
            }*/];

        myConfig.getcities($http).then(function (result) {
            vm.cities = result.data;
        });

        $scope.getstreet = function (selectedItem)
        {

        }

        $scope.onExit = function () {

        };

        $scope.getcity = function (selectedItem) {
            vm.card.napa = selectedItem.napa;
            vm.card.code = selectedItem.code;
            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != selectedItem.code) {
                console.log('GET CITY AGAIN');
                general.getStreets(selectedItem.code).then(function (result) {
                    vm.card.street = '';
                    vm.streets = result.data;
                })
                general.getSchonot(selectedItem.code).then(function (result) {
                    vm.card.neighborhood = '';
                    vm.neighborhoods = result.data;
                })
            }
            lastCity = selectedItem.code;

            if (selectedItem.area == 'merkaz') {
                vm.card.area = 'אזור המרכז';
            } else if (selectedItem.area == 'darom') {
                vm.card.area = 'אזור הדרום';
            } else if (selectedItem.area == 'jerusalem') {
                vm.card.area = 'אזור ירושלים';
            } else if (selectedItem.area == 'zafon') {
                vm.card.area = 'אזור הצפון';
            } else if (selectedItem.area == 'haifa') {
                vm.card.area = 'אזור חיפה';
            }
        }
    }
]);