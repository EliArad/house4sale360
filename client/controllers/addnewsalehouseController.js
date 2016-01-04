'use strict';


app.controller('addnewsalehouseController', ['$scope', 'Members', 'general', 'appCookieStore', '$window',
    '$http', 'authToken', '$timeout', 'myConfig', '$state', 'myhttphelper', '$rootScope', 'API',
    'SessionStorageService', '$msgbox', '$cookieStore', 'dboperations','fileReader',
    function ($scope, Members, general, appCookieStore, $window,
              $http, authToken, $timeout, myConfig,
              $state, myhttphelper, $rootScope, API, SessionStorageService, $msgbox, $cookieStore, dboperations,fileReader) {


        var vm = this;
        vm.card = {};
        vm.insertId = -1;
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
        var minWidth = 640;
        var minHeight = 480;
        var msg1 = 'התמונות צריכות להיות בגודל של ' + minWidth + 'x' + minHeight + ' לפחות';


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
            _saveModel();
        }

        $scope.fileNameChanged1 = function () {

            var fileInputElement = document.getElementById("fileInputElementfirst");
            $scope.uploadFile1(fileInputElement.files[0]);
        }

        $scope.fileNameChanged2 = function () {

            var fileInputElement = document.getElementById("fileInputElementfirst2");
            $scope.uploadFile2(fileInputElement.files[0]);
        }

        var ajaxUpload = function (result,fileName) {
            var data = {
                "images": result,
                "filename":fileName,
                "tabletype" : "salehouse",
                "insertId" : vm.insertId
            };


            myhttphelper.doPost('/api/upload', data).
                then(function (res) {
                    addPictureToCrousleSlider(result, 'eeeee');
                }).
                catch(function (res) {

                });
        }

        var ajaxUpload2 = function (result,fileName) {
            var data = {
                "images": result,
                "filename":fileName,
                "tabletype" : "salehouse",
                "insertId" : vm.insertId
            };


            myhttphelper.doPost('/api/upload', data).
                then(function (res) {

                }).
                catch(function (res) {

                });
        }

        $scope.uploadFile1 = function (fileName, index) {

            $scope.progress = 0;
            fileReader.readAsDataUrl(fileName, $scope)
                .then(function (result) {
                    var i = new Image();
                    i.onload = function () {

                        if (i.width < minWidth || i.height < minHeight) {
                            var msg = msg1;
                            msg += '\n';
                            msg += 'התמונה היא בגודל ' + i.width + 'x' + i.height;
                            alert(msg);
                            return;
                        }
                        ajaxUpload(result,fileName.name);
                    };
                    i.src = result;
                });
        };

        $scope.uploadFile2 = function (fileName, index) {

            $scope.progress = 0;
            fileReader.readAsDataUrl(fileName, $scope)
                .then(function (result) {
                    var i = new Image();
                    i.onload = function () {

                        if (i.width < minWidth || i.height < minHeight) {
                            var msg = msg1;
                            msg += '\n';
                            msg += 'התמונה היא בגודל ' + i.width + 'x' + i.height;
                            alert(msg);
                            return;
                        }
                        ajaxUpload2(result,fileName.name);
                    };
                    i.src = result;
                });
        };

        $(document).ready(function () {
            try {


                myConfig.getcities($http).then(function (result) {
                    vm.cities = result.data;

                    try {
                        var s = $cookieStore.get('sellhouseform');
                        vm.card = JSON.parse(s);

                        var s = $cookieStore.get('sellhousecurrentcard');
                        vm.currentCard = JSON.parse(s);
                    }
                    catch (e)
                    {

                    }

                    if (vm.card.code != undefined && vm.card.area != undefined) {
                        _displayStreets(vm.card.code, vm.card.area);
                        vm.city.napa = vm.card.napa;
                    }

                    if (vm.card.parking != 'אין') {
                        $scope.shoparkingoptions = true;
                    } else {
                        $scope.shoparkingoptions = false;
                    }
                });
            }
            catch (e) {

            }
        });

        function _saveModel() {
            try {
                vm.card.neighborhood = vm.neighborhood.name;
            }
            catch (e) {

            }
            var s = JSON.stringify(vm.card);
            $cookieStore.put('sellhouseform', s);
        }

        $scope.saveModel = function () {
            _saveModel();
        }

        $scope.onExit = function () {


        };

        function initcrousle() {
            $scope.myInterval = 4000;
            $scope.noWrapSlides = false;
            /*
             $scope.addSlide = function() {
             var newWidth = 600 + slides.length + 1;
             slides.push({
             image: '//placekitten.com/' + newWidth + '/300',
             text: 'eli'
             });
             };
             for (var i=0; i<4; i++) {
             $scope.addSlide();
             }
             */
        }

        function addPictureToCrousleSlider(imagesrc, text) {
            slides.push({
                image: imagesrc,
                text: text
            });

        }

        initcrousle();


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
            _saveModel();
        }

        $scope.getparking = function (selectedItem) {
            if (selectedItem != 'אין') {
                $scope.shoparkingoptions = true;
            } else {
                $scope.shoparkingoptions = false;
            }
            _saveModel();
        }

        $scope.saveChanges = function (form) {
            formErrors(form);

            var card = angular.copy(vm.card);
            card.city = vm.card.city.city;
            card.napa = vm.card.city.napa;
            card.code = vm.card.city.code;
            card.area = vm.card.city.area;
            card.neighborhood = vm.card.neighborhood.name;
            card.street = vm.card.street.name;

            if (angular.equals(vm.currentCard, card) == true) {
                alert("כבר קיים");
                return;
            }

            dboperations.saveHouseDetails(card).then(function (result) {
                vm.insertId = result.data.insertId;

                vm.currentCard = card;
                var s = JSON.stringify(vm.currentCard);
                $cookieStore.put('sellhousecurrentcard', s);

                //var s = {};
                //$cookieStore.put('sellhouseform', s);

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
            _saveModel();
        }
    }
]);