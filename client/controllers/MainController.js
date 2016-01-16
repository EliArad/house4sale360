'use strict';


app.controller('MainController', ['$scope', '$state', 'authToken', 'myhttphelper', 'myutils',
    'appCookieStore', 'socketioservice', 'Idle', '$rootScope',
    'SessionStorageService', 'API', 'myConfig', '$http', '$window', '$timeout', '$msgbox',
    'dboperations', 'citiesservice', 'general', '$cookies', '$msgboxok', '$sce','versionReloader',
    function ($scope, $state, authToken, myhttphelper, myutils,
              appCookieStore, socketioservice, Idle, $rootScope, SessionStorageService,
              API, myConfig, $http, $window, $timeout, $msgbox, dboperations,
              citiesservice, general, $cookies, $msgboxok, $sce,versionReloader) {


        var vm = this;
        var video360height = '500px';
        vm.search = {};
        var cssUpdateTimer;
        vm.userMessageId = -1;
        $scope.aptstatus = false;
        vm.numberfloors = [];
        $scope.showmessagetype = true;
        vm.balconies = ['לא משנה לי', 1, 2, 3, 'יותר משלוש'];
        vm.numberOfRooms = ['הכל', 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 'יותר מעשרה'];
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

        versionReloader.addPage(reloadFunction);

        function reloadFunction()
        {
            window.location.reload(true);
        }


        $scope.removeSchonaFromList = function (index) {
            vm.schonotSelected.splice(index, 1);
        }
        $scope.removeCityFromList = function (index) {

            vm.citiesSelected.splice(index, 1);
        }

        function setDefaultSearch() {
            if (vm.search.agent == undefined) {
                vm.search.agent = 'פרטי';
            }

            if (vm.search.messagetype == undefined)
            {
                vm.search.messagetype = 'מכירה';
            }

            if (vm.search.balcony == undefined) {
                vm.search.balcony = 'לא משנה לי';
            }
            if (vm.search.parking == undefined) {
                vm.search.parking = 'לא משנה לי';
            }
            if (vm.search.parkingtype == undefined) {
                vm.search.parkingtype = 'לא משנה לי';
            }
            if (vm.search.parkingtype2 == undefined) {
                vm.search.parkingtype2 = 'לא משנה לי';
            }
            if (vm.search.warehouse == undefined) {
                vm.search.warehouse = 'לא משנה לי';
            }
            if (vm.search.elevator == undefined) {
                vm.search.elevator = 'לא משנה לי';
            }
            if (vm.search.mamad == undefined) {
                vm.search.mamad = 'לא משנה לי';
            }
            if (vm.search.aircond == undefined) {
                vm.search.aircond = 'לא משנה לי';
            }
            if (vm.search.numberofrooms == undefined) {
                vm.search.numberofrooms = 'הכל';
            }
        }

        $(document).ready(function () {
            try {

                citiesservice.getcities(function (err, result) {

                    if (err != null) {
                        console.log(err);
                        authToken.RemoveToken();
                        $state.go('login', {}, {
                            reload: true
                        });
                        $rootScope.$broadcast("updateHeader", authToken.getToken());
                        return;
                    } else {
                        console.log('cities loaded ok');
                    }
                    vm.cities = result;
                    try {

                        var ressearch = $cookies.get('sellhousesearch');
                        if (ressearch != undefined)
                            vm.search = JSON.parse(ressearch);

                        ressearch = $cookies.get('citiesSelected');

                        if (ressearch != undefined)
                            vm.citiesSelected = JSON.parse(ressearch);


                        ressearch = $cookies.get('schonotSelected');
                        if (ressearch != undefined)
                            vm.schonotSelected = JSON.parse(ressearch);

                        ressearch = $cookies.get('aptstatus');
                        if (ressearch != undefined)
                            vm.aptstatus = JSON.parse(ressearch);


                        $('#selectPropertyType').multiselect('select', vm.search.propertyType);
                        $('#selectrenovated').multiselect('select', vm.search.renovated);

                        setDefaultSearch();

                        $scope.getparking(vm.search.parking);
                        $scope.onAptStatus();

                        $scope.UpdateMessageType();

                    }
                    catch (e) {

                    }

                    ShowResults();
                });
            }
            catch (e) {

            }
        });

        $scope.getschona = function (selectedItem) {

            vm.schonotSelected.push({name: vm.search.neighborhood.name});
        }

        $('#sendMessageModal').on('hidden.bs.modal', function () {

            vm.userMessageId = -1;
        });

        $('#myModal').on('hidden.bs.modal', function () {
            var s = JSON.stringify(vm.search);
            $cookies.put('sellhousesearch', s);

            s = JSON.stringify(vm.citiesSelected);
            $cookies.put('citiesSelected', s);

            s = JSON.stringify(vm.schonotSelected);
            $cookies.put('schonotSelected', s);

            s = JSON.stringify(vm.aptstatus);
            $cookies.put('aptstatus', s);

            ShowResults();


        })

        $scope.onAptStatus = function () {

            if ($scope.aptstatus == false) {
                $scope.showaptselect = true;
            } else {
                $scope.showaptselect = false;
            }
        }

        $scope.getcity = function (selectedItem) {

            vm.search.napa = selectedItem.napa;
            vm.search.code = selectedItem.code;
            vm.search.city = selectedItem.city;
            vm.citiesSelected.push({name: vm.search.city});

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

        $scope.sendEmailToUser = function (id) {

            if (vm.userMessageId != -1) {
                general.SendEmailToUser(vm.userMessageId, $scope.messagebody).then(function (result) {

                    var buttonid = 'sendButton' + id;

                    document.getElementById(buttonid).className = "btn btn-info pull-left animated tada";
                    document.getElementById(buttonid).style.color = 'lightgreen';
                    document.getElementById(buttonid).innerHTML = 'הודעה נשלחה';

                    cssUpdateTimer = $timeout(function () {
                        $('#sendMessageModal').modal('hide');
                        document.getElementById(buttonid).innerHTML = 'שלח הודעה';
                        document.getElementById(buttonid).style.color = 'white';
                        document.getElementById(buttonid).className = "btn btn-info pull-left";
                    }, 1900);
                }).catch(function (result) {

                    $msgboxok.show('קרתה שגיאה בשליחת ההודעה')
                        .then(function () {

                        });
                })
            }
        }

        $scope.SendUserMessage = function (item) {
            vm.userMessageId = item.id;
            $('#sendMessageModal').modal('show');
        }
        $scope.ShowUserDetails = function (item) {
            console.log(item);
        }

        $scope.ShowContent = function (item) {
            alert(item.id);
        }

        $scope.ShowHideHeader = function (item) {

            item.hideheader = true;
        }

        function Dictionary(values) {
            this.values = values || {};

            var forEachIn = function (object, action) {
                for (var property in object) {
                    if (Object.prototype.hasOwnProperty.call(object, property))
                        action(property, object[property]);
                }
            };

            Dictionary.prototype.containsKey = function (key) {
                return Object.prototype.hasOwnProperty.call(this.values, key) &&
                    Object.prototype.propertyIsEnumerable.call(this.values, key);
            };

            Dictionary.prototype.forEach = function (action) {
                forEachIn(this.values, action);
            };

            Dictionary.prototype.lookup = function (key) {
                return this.values[key];
            };

            Dictionary.prototype.add = function (key, value) {
                this.values[key] = value;
            };
        };
        $scope.getparking = function (s) {

            switch (s) {
                case 'לא משנה לי':
                    $scope.shoparkingoptions = false;
                    break;
                case 'לפחות אחת':
                case 'לפחות שתיים':
                case 'לפחות שלוש':
                    $scope.shoparkingoptions = true;
                    break;
            }

            switch (s) {
                case 'לא משנה לי':
                case 'לפחות אחת':
                    $scope.shoparkingoptions2 = false;
                    break;
                case 'לפחות שתיים':
                case 'לפחות שלוש':
                    $scope.shoparkingoptions2 = true;
                    break;
            }

        }


        function ShowResults() {
            if (vm.citiesSelected.length == 0) {
                $msgboxok.show('בחר לפחות עיר אחת בבקשה')
                    .then(function () {
                        return;
                    });
                return;
            }
            var search = angular.copy(vm.search);
            search.city = vm.citiesSelected;
            search.propertyType = vm.search.propertyType;
            search.renovated = vm.search.renovated;
            search.toprice = vm.search.toprice;

            if (vm.search.agent == undefined) {
                search.agent = 'private';
            } else {
                switch(vm.search.agent)
                {
                    case 'פרטי':
                        search.agent = 'private';
                    break;
                    case 'קבלן':
                        search.agent = 'kablan';
                    break;
                    case 'מתווך':
                        search.agent = 'agent';
                    break;

                }
            }

            if (vm.search.floor == 'קרקע') {
                search.floor = 0;
            }
            if (vm.search.fromfloor == 'קרקע') {
                search.fromfloor = 0;
            }
            if (vm.search.numberofrooms == 'הכל') {
                search.numberofrooms = undefined;
            }
            if (vm.search.aircond == 'לא משנה לי') {
                search.aircond = undefined;
            } else {
                search.aircond = 'אין';
            }

            if (vm.search.parking == 'לא משנה לי') {
                search.parking = undefined;
            } else {
                switch (search.parking) {
                    case 'לפחות אחת':
                        search.parking = 1;
                        break;
                    case 'לפחות שתיים':
                        search.parking = 2;
                        break;
                    case 'לפחות שלוש':
                        search.parking = 3;
                        break;
                }
            }

            if (vm.search.parkingtype == 'לא משנה לי') {
                search.parkingtype = undefined;
            }
            if (vm.search.parkingtype2 == 'לא משנה לי') {
                search.parkingtype2 = undefined;
            }

            switch (vm.search.elevator) {
                case 'לא משנה לי':
                    search.elevator = undefined;
                    break;
                case 'לפחות אחת':
                    search.elevator = 1;
                    break;
                case 'לפחות שתיים':
                    search.elevator = 2;
                    break;
                case 'לפחות שלוש':
                    search.elevator = 3;
                    break;
                case 'לפחות ארבע':
                    search.elevator = 4;
                    break;
            }

            switch (vm.search.warehouse) {
                case 'לא משנה לי':
                    search.warehouse = undefined;
                    break;
                case 'לפחות אחד':
                    search.warehouse = 1;
                    break;
                case 'לפחות שניים':
                    search.warehouse = 2;
                    break;

            }

            switch (vm.search.mamad) {
                case 'לא משנה לי':
                    search.mamad = undefined;
                    break;
                case 'כן':
                    search.mamad = 1;
                    break
                case 'לא':
                    search.mamad = 0;
                    break
            }


            switch (vm.search.balcony) {
                case 'לא משנה לי':
                    search.balcony = undefined;
                    break;
                case '1':
                    search.balcony = 1;
                    break;
                case '2':
                    search.balcony = 2;
                    break;
                case '3':
                    search.balcony = 3;
                    break;
                case 'יותר משלוש':
                    search.balcony = 4;
                    break;


            }

            dboperations.GetSaleHouseQueryResults(search, false).then(function (result) {

                $scope.showerrorenable = false;
                if (result.data.length == 0) {
                    $scope.showNoResultsMessage = true;
                } else {
                    $scope.showNoResultsMessage = false;
                }

                vm.cards1 = result.data;
                var dic = new Dictionary();

                //http://stackoverflow.com/questions/17787754/creating-a-net-like-dictionary-object-in-javascript

                for (var i = 0; i < vm.cards1.length; i++) {
                    var c = dic.containsKey(vm.cards1[i].id);
                    if (c) {
                        var x = dic.lookup(vm.cards1[i].id);
                        x.push(vm.cards1[i]);
                        dic.add(vm.cards1[i].id, x);
                    } else {
                        var x = [];
                        x.push(vm.cards1[i]);
                        dic.add(vm.cards1[i].id, x);
                    }
                }

                vm.cards = [];
                i = 0;
                dic.forEach(function (key, value) {

                    //console.log(vm.cards[i].id);
                    var card = {};
                    //console.log(value);
                    card = value[0];
                    card.id = key;
                    card.sphere360 = [];
                    card.showPictures = 0;
                    card.image360Exists = false;
                    card.imageExists = false;
                    card.video360Exists = false;
                    card.videosourceurl = [];
                    card.videoExists = false;
                    card.showVideo = 0;
                    card.showregularvideo = false;
                    card.videoExists = false;
                    card.slides = [];
                    card.hideheader = false;
                    card.sphere360index = 0;
                    var city = card.city;
                    var area = card.area;
                    var napa = card.napa;
                    var code = card.code;

                    if (card.numberofrooms == 1) {
                        card.numberofrooms = 'חדר אחד';
                    } else {
                        card.numberofrooms = card.numberofrooms + 'חדרים';
                    }


                    var x = {
                        'city': city,
                        'area': area,
                        'napa': napa,
                        'code': code
                    };
                    card.city = x;

                    var streetName = card.street;
                    var x1 = {
                        'name': streetName
                    };
                    card.street = x1;

                    var neighborhood = card.neighborhood;
                    x1 = {
                        'name': neighborhood
                    };
                    card.neighborhood = x1;

                    card.numberofrooms = card.numberofrooms.toString();
                    card.floor = card.floor.toString();
                    card.fromfloor = card.fromfloor.toString();
                    card.balcony = card.balcony.toString();

                    for (var k = 0; k < value.length; k++) {
                        if (value[k].isvideo != null &&
                            value[k].tableid != null &&
                            value[k].filename != null &&
                            value[k].is360image != null &&
                            value[k].isvideo == 0 &&
                            value[k].is360image == 0) {

                            //console.log(value[k]);
                            var imgsrc;
                            if (k == 0) {
                                card.showPictures++;
                                card.imageExists = true;
                            }
                            var userid = value[k].userid;
                            var imgsrc = './uploadimages/' + userid + '/salehouse/' + value[k].tableid + '/' + value[k].filename;
                            //console.log(imgsrc);
                            card.slides.push({
                                image: imgsrc,
                                text: 'rrrr'
                            });
                        }
                    }
                    var firsttime = 0;
                    for (var k = 0; k < value.length; k++) {
                        if (value[k].isvideo != null &&
                            value[k].tableid != null &&
                            value[k].filename != null &&
                            value[k].is360image != null &&
                            value[k].isvideo == 0 &&
                            value[k].is360image == 1) {

                            var imgsrc;
                            if (firsttime == 0) {
                                card.showPictures++;
                                card.image360Exists = true;
                                firsttime++;
                            }

                            var userid = value[k].userid;
                            var imgsrc = './uploadimages/' + userid + '/salehouse/' + value[k].tableid + '/' + value[k].filename;
                            card.sphere360.push(imgsrc);

                            if (card.sphere360index == 0) {
                                setTimeout(function () {
                                    var PSV = new PhotoSphereViewer({
                                        // Panorama, given in base 64
                                        panorama: imgsrc,

                                        // Container
                                        container: 'your-pano' + key,

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
                                }, 10, key);
                            }
                            card.sphere360index++;
                        }
                    }

                    var firsttimevid = 0;
                    for (var f = 0; f < value.length; f++) {
                        if (value[f].isvideo != null &&
                            value[f].tableid != null &&
                            value[f].filename != null &&
                            value[f].is360image != null &&
                            value[f].isvideo == 1 &&
                            value[f].is360video == 0 &&
                            value[f].is360image == 0) {
                            var userid1 = value[f].userid;
                            var tableid = value[f].tableid;
                            var videofilename = value[f].filename;
                            var videosrouceurl = './uploadvideo/' + userid1 + '/salehouse/' + tableid + '/' + videofilename;
                            card.videosourceurl.push(videosrouceurl);
                            card.showregularvideo = true;
                            card.videoexistlable = 'יש גם וידאו - הראה לי';
                            break;
                        }
                    }

                    vm.cards.push(card);
                    i++;
                });
            }).catch(function (result) {
                $scope.showerror = result.data;
                $scope.showerrorenable = true;
                $scope.showNoResultsMessage = true;
            })
        }

        $scope.ShowRegularVideo = function(item)
        {
            if (item.videoexistlable == 'הסתר וידאו')
            {
                document.getElementById('videodiv' + item.id).style.display = 'none';
                item.videoexistlable = 'יש גם וידאו - הראה לי';
            } else {
                document.getElementById('videodiv' + item.id).style.display = 'block';
                vm.changeSource(item.videosourceurl[0], item.id);
                item.videoexistlable = 'הסתר וידאו';
            }
        }

        vm.onError = function (event) {
            console.log("VIDEOGULAR ERROR EVENT");
            console.log(event);
        };

        vm.onCompleteVideo = function () {
            vm.isCompleted = true;
        };

        vm.onUpdateState = function (state) {
            vm.state = state;
        };

        vm.onUpdateTime = function (currentTime, totalTime) {
            vm.currentTime = currentTime;
            vm.totalTime = totalTime;
        };

        vm.onSeeking = function (currentTime, duration) {
            vm.seeking.currentTime = currentTime;
            vm.seeking.duration = duration;
        };

        vm.onSeeked = function (currentTime, duration) {
            vm.seeked.currentTime = currentTime;
            vm.seeked.duration = duration;
        };

        vm.onUpdateVolume = function (newVol) {
            vm.volume = newVol;
        };


        vm.onUpdatePlayback = function (newSpeed) {
            vm.API.playback = newSpeed;
        };
        vm.onPlayerReady = function (API) {
            vm.API = API;
        };


        vm.changeSource = function (result, id) {

            document.getElementById('videodiv' + id).style.display = 'block';
            console.log(result);

            vm.config = {
                sources: [
                    {src: $sce.trustAsResourceUrl(result), type: "video/mp4"}
                ],
                theme: "bower_components/videogular-themes-default/videogular.css",
                plugins: {
                    //poster: "http://www.videogular.com/assets/images/videogular.png"
                }
            };
            vm.config.tracks = undefined;
            vm.config.loop = false;
            vm.config.preload = true;
        };

        $scope.UpdateMessageType = function()
        {

            if (vm.search.agent == 'קבלן')
            {
                $scope.showmessagetype = false;
            } else {
                $scope.showmessagetype = true;
            }
        }

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
]).
    config(function (IdleProvider, KeepaliveProvider, myConfig) {
        // configure Idle settings
        IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
        IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
        KeepaliveProvider.interval(2); // in seconds
    })
    .run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
    });
