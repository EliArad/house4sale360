'use strict';


app.controller('renthouseController', ['$scope', 'Members', 'general', 'appCookieStore', '$window',
    '$http', 'authToken', '$timeout', 'myConfig', '$state', 'myhttphelper', '$rootScope', 'API',
    'SessionStorageService','$msgbox',
    function ($scope, Members, general, appCookieStore, $window,
              $http, authToken, $timeout, myConfig,
              $state, myhttphelper, $rootScope, API, SessionStorageService,$msgbox) {




        var vm = this;
        $scope.shownapa = false;
        $window.onbeforeunload = $scope.onExit;
        var lastCity = undefined;
        $scope.shoparkingoptions = false;
        $scope.shoprenovatedexp = false;
        $scope.showfurnatureexp = false;
        vm.cities = [];
        vm.numberOfRooms = [1, 1.5, 2, 2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,9,10,'יותר מעשרה'];
        vm.numberfloors = [];
        vm.blaconies = ['אין' ,1 , 2 , 3, 'יותר משלוש'];

        vm.neighborhoods = [{name:'NOT READY YET FIXME'}];

        vm.numberfloors.push('קרקע');
        for (var i = 1 ; i < 35; i++)
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

        $(function (j) {
            j(document).on('keyup', '#new_message', function () {
                console.log('eee');
                if (this.value.length > 500) {
                    return false;
                }
                j("#cLeft").text("אותיות נשארו: " + (500 - this.value.length));
            });
        });

        $scope.getfurnature = function (selectedItem)
        {
            if (selectedItem != 'לא'){
                $scope.showfurnatureexp = true;
            } else {
                $scope.showfurnatureexp = false;
            }
        }

        $scope.getrenovated = function (selectedItem)
        {

            if (selectedItem == 'משהו אחר'){
                $scope.shoprenovatedexp = true;
            } else {
                $scope.shoprenovatedexp = false;
            }
        }

        $scope.getparking = function (selectedItem)
        {
            if (selectedItem != 'אין'){
                $scope.shoparkingoptions = true;
            } else {
                $scope.shoparkingoptions = false;
            }
        }

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