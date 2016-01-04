'use strict';


app.controller('salehouseController', ['$scope', 'Members', 'general', 'appCookieStore', '$window',
    '$http', 'authToken', '$timeout', 'myConfig', '$state', 'myhttphelper', '$rootScope', 'API',
    'SessionStorageService', '$msgbox', '$cookieStore', 'dboperations',
    function ($scope, Members, general, appCookieStore, $window,
              $http, authToken, $timeout, myConfig,
              $state, myhttphelper, $rootScope, API, SessionStorageService, $msgbox, $cookieStore, dboperations) {


        var vm = this;
        vm.card = {};
        vm.cards = {};
        vm.lastObjId = -1;
        vm.accIsOpen = false;
        vm.currentCard = {};
        vm.city = {};
        var slides = $scope.slides = [];
        $scope.shownapa = false;
        $window.onbeforeunload = $scope.onExit;
        var lastCity = undefined;
        $scope.shoparkingoptions = false;
        $scope.shoprenovatedexp = false;
        $scope.showfurnatureexp = false;
        vm.cities = [];
        vm.numberOfRooms = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 'יותר מעשרה'];
        vm.numberfloors = [];
        vm.balconies = ['אין', 1, 2, 3, 'יותר משלוש'];
        vm.neighborhoods = [{name: 'NOT READY YET FIXME'}];

        vm.numberfloors.push('קרקע');
        for (var i = 1; i < 35; i++) {
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


        $scope.getstreet = function (selectedItem) {

        }

        $scope.accordionIsOpen = function (obj) {

            if (vm.lastObjId != obj.id)
            {
                vm.accIsOpen = false;
            }
            vm.lastObjId = obj.id;
            if (vm.accIsOpen == true)
            {
                vm.accIsOpen = false;
                return;
            }
            vm.accIsOpen = true;

            for (var i = 0 ; i < 10; i++)
            {
                slides = $scope.slides = [];
            }

            dboperations.getSaleHousePictureList(obj.id).then(function (result) {

                setTimeout(function(){
                    var imgsrc;
                    for (var i = 0; i < result.data.rows.length; i++) {
                        var imgsrc = './uploadimages/' + result.data.userid + '/salehouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                        //console.log(imgsrc);
                        addPictureToCrousleSlider(imgsrc, 'ttt');
                    }
                }, 1);

            })
        }

        $scope.removeSlide = function() {
            slides = $scope.slides = [];
        }

        function initcrousle() {
            $scope.myInterval = 4000;
            $scope.noWrapSlides = false;
        }

        function addPictureToCrousleSlider(imagesrc, text) {
            slides.push({
                image: imagesrc,
                text: text
            });
        }

        initcrousle();

        $(document).ready(function () {
            try {
                myConfig.getcities($http).then(function (result) {
                    vm.cities = result.data;

                    dboperations.getAllSellHouseOfMine().then(function (result) {
                        vm.cards = result.data;
                        for (var i = 0; i < vm.cards.length; i++) {

                            var city = vm.cards[i].city;
                            var area = vm.cards[i].area;
                            var napa = vm.cards[i].napa;
                            var code = vm.cards[i].code;

                            var x = {
                                'city': city,
                                'area': area,
                                'napa': napa,
                                'code': code
                            };
                            vm.cards[i].city = x;

                            var streetName = vm.cards[i].street;
                            var x1 = {
                                'name': streetName
                            };
                            vm.cards[i].street = x1;

                            var neighborhood = vm.cards[i].neighborhood;
                            x1 = {
                                'name': neighborhood
                            };
                            vm.cards[i].neighborhood = x1;

                            /*
                             if (vm.cards[i].parking != 'אין') {
                             $scope.shoparkingoptions = true;
                             } else {
                             $scope.shoparkingoptions = false;
                             }
                             */

                            if (vm.cards[i].city.code != undefined && vm.cards[i].area != undefined) {
                                _displayStreets(vm.cards[i].code, vm.cards[i].area);
                            }
                            vm.cards[i].numberofrooms = vm.cards[i].numberofrooms.toString();
                            vm.cards[i].floor = vm.cards[i].floor.toString();
                            vm.cards[i].fromfloor = vm.cards[i].fromfloor.toString();

                        }
                    }).catch(function (rsult) {

                    })
                });
            }
            catch (e) {

            }
        });


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


        $scope.getrenovated = function (selectedItem) {

            if (selectedItem == 'משהו אחר') {
                $scope.shoprenovatedexp = true;
            } else {
                $scope.shoprenovatedexp = false;
            }
        }

        $scope.getparking = function (selectedItem) {
            if (selectedItem != 'אין') {
                $scope.shoparkingoptions = true;
            } else {
                $scope.shoparkingoptions = false;
            }
        }

        $scope.saveChanges = function (item) {
            //formErrors(form);


            var card = angular.copy(item);
            card.city = item.city.city;
            card.napa = item.city.napa;
            card.code = item.city.code;
            card.area = item.city.area;
            card.neighborhood = item.neighborhood.name;
            card.street = item.street.name;

            console.log(card.warehouse);

            dboperations.updateSaleHouseDetails(card).then(function (result) {


                dboperations.getSaleHouseDetails(card.id).then(function (result) {
                    console.log(result.data[0]);
                })


            }).catch(function (result) {
                console.log(result.data);
            });

        }

        function formErrors(form) {
            var errors = [];
            for (var key in form.$error) {
                errors.push(key + "=" + form.$error);
            }
            if (errors.length > 0) {
                console.log("Form Has Errors");
                console.log(form.$error);
            }
        };

        function _displayStreets(code, area) {
            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != code) {
                general.getStreets(code).then(function (result) {
                    vm.streets = result.data;
                })
                general.getSchonot(code).then(function (result) {
                    vm.neighborhoods = result.data;
                })
            }
            lastCity = code;

            if (area == 'merkaz') {
                vm.card.area = 'אזור המרכז';
            } else if (area == 'darom') {
                vm.card.area = 'אזור הדרום';
            } else if (area == 'jerusalem') {
                vm.card.area = 'אזור ירושלים';
            } else if (area == 'zafon') {
                vm.card.area = 'אזור הצפון';
            } else if (area == 'haifa') {
                vm.card.area = 'אזור חיפה';
            }
        }

        $scope.getcity = function (selectedItem) {
            console.log(selectedItem);
            vm.city.napa = selectedItem.napa;
            vm.city.code = selectedItem.code;
            vm.city.city = selectedItem.city;
            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != selectedItem.code) {
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