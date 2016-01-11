'use strict';


app.controller('MainController', ['$scope', '$state', 'authToken', 'myhttphelper', 'myutils',
    'appCookieStore', 'socketioservice', 'Idle', '$rootScope',
    'SessionStorageService', 'API', 'myConfig', '$http', '$window', '$timeout', '$msgbox', 'dboperations','citiesservice','general','$cookieStore',
    function ($scope, $state, authToken, myhttphelper, myutils,
              appCookieStore, socketioservice, Idle, $rootScope, SessionStorageService,
              API, myConfig, $http, $window, $timeout, $msgbox, dboperations,citiesservice,general,$cookieStore) {


        var vm = this;
        var video360height = '500px';
        vm.search = {};
        vm.numberfloors = [];
        vm.balconies = ['לא משנה לי', 1, 2, 3, 'יותר משלוש'];
        vm.numberOfRooms = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 'יותר מעשרה'];
        vm.numberfloors.push('קרקע');
        for (var i = 1; i < 35; i++) {
            vm.numberfloors.push(i);
        }
        var lastCity = undefined;
        vm.citiesSelected = [
            //{name:'תל אביב'}
        ];

        vm.schonotSelected = [
            //{name:'תל אביב'}
        ];

        $scope.removeSchonaFromList = function(index)
        {
            vm.schonotSelected.splice(index,1);
        }
        $scope.removeCityFromList = function(index)
        {

            vm.citiesSelected.splice(index,1);
        }

        $(document).ready(function () {
            try {

                citiesservice.getcities(function (err,result) {

                    if (err != null) {
                        authToken.RemoveToken();
                        $state.go('login', {}, {
                            reload: true
                        });
                        $rootScope.$broadcast("updateHeader", authToken.getToken());
                        return;
                    }
                    vm.cities = result.data;
                });
            }
            catch (e) {

            }
        });

        $scope.getschona = function(selectedItem)
        {

            vm.schonotSelected.push({name : vm.search.neighborhood.name});
        }

        $('#myModal').on('hidden.bs.modal', function () {
            var s = JSON.stringify(vm.search);
            $cookieStore.put('sellhousesearch', s);

            s = JSON.stringify(vm.citiesSelected);
            $cookieStore.put('citiesSelected', s);

            s = JSON.stringify(vm.schonotSelected);
            $cookieStore.put('schonotSelected', s);


        })

        try {
            var ressearch = $cookieStore.get('sellhousesearch');
            if (ressearch != undefined)
                vm.search = JSON.parse(ressearch);


            ressearch = $cookieStore.get('citiesSelected');
            if (ressearch != undefined)
                vm.citiesSelected = JSON.parse(ressearch);

            ressearch = $cookieStore.get('schonotSelected');
            if (ressearch != undefined)
                vm.schonotSelected = JSON.parse(ressearch);



            $('#selectPropertyType').multiselect('select', vm.search.propertyType);
            $('#selectrenovated').multiselect();



        }
        catch (e)
        {

        }

        $scope.getcity = function (selectedItem) {

            vm.search.napa = selectedItem.napa;
            vm.search.code = selectedItem.code;
            vm.search.city = selectedItem.city;
            vm.citiesSelected.push({name : vm.search.city});

            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != selectedItem.code) {
                console.log('selectedItem.code : ' + selectedItem.code);
                general.getSchonot(selectedItem.code).then(function (result) {
                    vm.search.neighborhood = '';
                    vm.neighborhoods = result.data;
                })
            }
            lastCity = selectedItem.code;

            if (selectedItem.area == 'merkaz') {
                vm.search.area = 'אזור המרכז';
            } else if (selectedItem.area == 'darom') {
                vm.search.area = 'אזור הדרום';
            } else if (selectedItem.area == 'jerusalem') {
                vm.search.area = 'אזור ירושלים';
            } else if (selectedItem.area == 'zafon') {
                vm.search.area = 'אזור הצפון';
            } else if (selectedItem.area == 'haifa') {
                vm.search.area = 'אזור חיפה';
            }

        }



        $scope.ShowContent = function (item) {
            alert(item.id);
        }

        $scope.ShowHideHeader = function (item) {

            item.hideheader = true;
        }

        var query = {};
        dboperations.GetSaleHouseQueryResults(query, false).then(function (result) {

            vm.cards = result.data;
            console.log(vm.cards);

            for (var i = 0; i < vm.cards.length; i++) {
                //console.log(vm.cards[i].id);
                vm.cards[i].sphere360 = [];
                vm.cards[i].showPictures = 0;
                vm.cards[i].image360Exists = false;
                vm.cards[i].imageExists = false;
                vm.cards[i].slides = [];
                vm.cards[i].hideheader = false;
                vm.cards[i].sphere360index = 0;
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

                vm.cards[i].numberofrooms = vm.cards[i].numberofrooms.toString();
                vm.cards[i].floor = vm.cards[i].floor.toString();
                vm.cards[i].fromfloor = vm.cards[i].fromfloor.toString();
            }


            for (var i = 0; i < vm.cards.length; i++) {

                dboperations.getSaleHousePictureList(vm.cards[i].id, i, false).then(function (result) {

                    var index = result.data.index;
                    if (result.data.rows.length > 0) {
                        vm.cards[index].showPictures++;
                        vm.cards[index].imageExists = true;
                    }
                    var imgsrc;

                    for (var k = 0; k < result.data.rows.length; k++) {
                        var userid = result.data.rows[k].userid;
                        var imgsrc = './uploadimages/' + userid + '/salehouse/' + result.data.rows[k].tableid + '/' + result.data.rows[k].filename;
                        vm.cards[index].slides.push({
                            image: imgsrc,
                            text: 'rrrr'
                        });
                    }
                });
            }

            for (var i = 0; i < vm.cards.length; i++) {


                dboperations.getSaleHouse360PictureList(vm.cards[i].id, i, false).then(function (result) {

                    var imgsrc;
                    var index = result.data.index;
                    if (result.data.rows.length > 0) {
                        vm.cards[index].showPictures++;
                        vm.cards[index].image360Exists = true;
                    }

                    setTimeout(function () {
                        for (var k = 0; k < result.data.rows.length; k++) {
                            var userid = result.data.rows[k].userid;
                            var imgsrc = './uploadimages/' + userid + '/salehouse/' + result.data.rows[k].tableid + '/' + result.data.rows[k].filename;
                            vm.cards[index].sphere360.push(imgsrc);

                            if (vm.cards[index].sphere360index == 0) {

                                var PSV = new PhotoSphereViewer({
                                    // Panorama, given in base 64
                                    panorama: imgsrc,

                                    // Container
                                    container: 'your-pano' + vm.cards[index].id,

                                    // Deactivate the animation
                                    time_anim: false,

                                    // Display the navigation bar
                                    navbar: true,

                                    // Resize the panorama
                                    size: {
                                        width: '100%',
                                        height: video360height
                                    },

                                    // No XMP data
                                    usexmpdata: false
                                });
                            }
                            vm.cards[index].sphere360index++;
                        }
                    } , 300);
                });
            }


        });


        function initcrousle() {
            $scope.myInterval = 4000;
            $scope.noWrapSlides = false;
        }


        initcrousle();


        $(window).scroll(function () {
            if ($scope.allthumberspictures == false) {
                return;
            }
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {


            }
        });
    } // the controller closing
]).config(function (IdleProvider, KeepaliveProvider, myConfig) {
    // configure Idle settings
    IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
    IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
    KeepaliveProvider.interval(2); // in seconds
})
    .run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
    });
