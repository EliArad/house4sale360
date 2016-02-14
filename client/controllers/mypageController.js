'use strict';


app.controller('mypageController', ['$scope', '$state', 'authToken', 'myhttphelper',
    'appCookieStore', 'socketioservice', 'Idle', '$rootScope',
    'SessionStorageService', 'myConfig', '$http', '$window', '$timeout',
    'dboperations', 'citiesservice', 'general', '$cookies', '$sce',
    'communication','visitors','$stateParams','messageToLink',
    function ($scope, $state, authToken, myhttphelper,
              appCookieStore, socketioservice, Idle, $rootScope, SessionStorageService,
              myConfig, $http, $window, $timeout, dboperations,
              citiesservice, general, $cookies, $sce,communication,
              visitors,$stateParams,messageToLink) {



        var vm = this;
        var video360height = '600px';
        $scope.mobile = true;
        $scope.virtualSearch = false;

        var token = authToken.getToken();
        if ($stateParams.g == undefined && token == undefined)
        {
            $state.go('/', {}, {
                reload: false
            });
            return;
        }

        $scope.largeScreens = true;
        vm.searchsummery = '';
        vm.search = {};
        var cexp = general.getCookieExp();
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


        document.getElementById('homelink').style.backgroundColor = null;
        document.getElementById('searchlink').style.backgroundColor = null;
        document.getElementById('vrlink').style.backgroundColor = null;

        $scope.mobile = general.isMobile();

        $scope.SetViewMode = function()
        {
            $scope.largeScreens = !$scope.largeScreens;
            console.log($scope.largeScreens);
            $cookies.put('largeScreens', $scope.largeScreens ,{expires: cexp});


            if ($stateParams.g != undefined) {
                general.isValidGuid($stateParams.g).then(function(result)
                {

                    PerformResults($stateParams.g, $stateParams.id, $stateParams.type);

                }).catch(function(result){
                    $state.go('/', {}, {
                        reload: false
                    });
                    return;
                })
            } else {
                PerformResults(undefined);
            }


        }
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


        $scope.onAptStatus = function () {

            if ($scope.aptstatus == false) {
                $scope.showaptselect = true;
            } else {
                $scope.showaptselect = false;
            }
        }


        function reloadFunction()
        {
            window.location.reload(true);
        }

        //$('#switch-change').on('switchChange.bootstrapSwitch', function (event, state) {
  //          $scope.virtualSearch = state;
//        });

        vm.cities = citiesservice.getcities_all_ready();
        vm.citiesOnly = citiesservice.getcities_ready();


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


            var l = $cookies.get('largeScreens');

            if (l == undefined)
                $scope.largeScreens = true;
            else {
                if (l == 'true')
                    $scope.largeScreens = true;
                else
                    $scope.largeScreens = false;
            }

            if ($stateParams.g != undefined) {
                general.isValidGuid($stateParams.g).then(function(result)
                {

                    PerformResults($stateParams.g, $stateParams.id, $stateParams.type);

                }).catch(function(result){
                    $state.go('/', {}, {
                        reload: false
                    });
                    return;
                })
            } else {
                PerformResults(undefined);
            }

        });

        $scope.SendToAFriendAllPosts = function()
        {

            $('#sendAllMessageModal').modal('show');
        }

        $scope.SendPageLinkToAFriend = function()
        {

            general.getuserguid().then(function(result){

                var userguid = result.data;
                var messagebody = '';
                messagebody += '<div style="direction: rtl;text-align: right">';
                messagebody = ' הי<br> ' +
                    $scope.personName + ' שלח לך לינק מאתר  apt360 לראות מודעה למכירה או קנייה של בית <br><br> www.apt360.co.il/mypage?g=' + userguid;

                messagebody += '<br><br><br>';
                messagebody += $scope.messagebody;

                messagebody += '</div>';
                general.SendEmailToPerson($scope.emailToperson, $scope.personName, messagebody).then(function (result) {


                    var buttonid = 'linktoafriendbtnid' + vm.userMessageId;

                    document.getElementById(buttonid).className = "btn btn-info animated tada";
                    document.getElementById(buttonid).style.color = 'lightgreen';
                    document.getElementById(buttonid).innerHTML = 'הודעה נשלחה';

                    cssUpdateTimer = $timeout(function () {
                        $('#sendAllMessageModal').modal('hide');
                        document.getElementById(buttonid).innerHTML = 'סגור ושלח';
                        document.getElementById(buttonid).style.color = 'black';
                        document.getElementById(buttonid).className = "btn btn-default";
                    }, 1900);


                }).catch(function (result) {
                    $('#sendAllMessageModal').modal('hide');
                    alert('קרתה שגיאה וההודעה לא נשלחה');
                })

            }).catch(function(result) {
                $('#sendAllMessageModal').modal('hide');
                alert('שגיאה בשליחת ההודעה');
                $state.go('login', {}, {
                    reload: false
                });
            });

        }

        $scope.SendLinkToAFriend = function()
        {
            general.getuserguid().then(function(result){

                var item = vm.cards[vm.userMessageIndex];
                var link = messageToLink.buildLink(result.data , item.id, item.messagetype);
                var messagebody = ' הי<br> ' +
                $scope.personName + ' שלח לך לינק מאתר  apt360 לראות מודעה למכירה או קנייה של בית <br><br>' + link;

                console.log(messagebody);

                general.SendEmailToPerson($scope.emailToperson, $scope.personName, messagebody).then(function (result) {


                    var buttonid = 'linktoafriendbtnid2' + vm.userMessageId;

                    document.getElementById(buttonid).className = "btn btn-info animated tada";
                    document.getElementById(buttonid).style.color = 'lightgreen';
                    document.getElementById(buttonid).innerHTML = 'הודעה נשלחה';

                    cssUpdateTimer = $timeout(function () {
                        $('#sendMessageModal').modal('hide');
                        document.getElementById(buttonid).innerHTML = 'סגור ושלח';
                        document.getElementById(buttonid).style.color = 'black';
                        document.getElementById(buttonid).className = "btn btn-default";
                    }, 1900);
                }).catch(function (result) {
                    $('#sendMessageModal').modal('hide');
                    alert('קרתה שגיאה וההודעה לא נשלחה');
                })
            }).catch(function(result) {
                $('#sendMessageModal').modal('hide');
                alert('שגיאה בשליחת ההודעה');
            });

        }
        $scope.SendToAFriend = function(item, index)
        {

            vm.userMessageIndex = index;
            vm.userMessageId = item.id;
            $('#sendMessageModal').modal('show');
        }

        function PerformResults(userguid, msgid, type)
        {
            try {

                //$("[name='my-checkbox']").bootstrapSwitch('state', false);
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
                $scope.onAptStatus();

                $scope.UpdateMessageType();

            }
            catch (e) {
                console.log(e);
                location.reload();
                return;
            }

            if (communication.isFastSearch() == true)
            {
                vm.search = communication.getSearch();
                console.log(vm.search);
                communication.setFastSearch(false);

            }
            if (communication.isAdvancedSearch() == true)
            {
                $('#myModal').modal('show');
                communication.openAdvancedSearch(false);
            } else {
                ShowResults(userguid, msgid, type);
            }
        }

        $scope.getschona = function (selectedItem) {

            vm.schonotSelected.push({name: vm.search.neighborhood.name});
        }

        $('#sendMessageModal').on('hidden.bs.modal', function () {

            vm.userMessageId = -1;
        });

        $('#myModal').on('hidden.bs.modal', function () {
            var s = JSON.stringify(vm.search);
            $cookies.put('sellhousesearch', s ,{expires: cexp});

            s = JSON.stringify(vm.citiesSelected);
            $cookies.put('citiesSelected', s ,{expires: cexp});

            s = JSON.stringify(vm.schonotSelected);
            $cookies.put('schonotSelected', s ,{expires: cexp});

            s = JSON.stringify(vm.aptstatus);
            $cookies.put('aptstatus', s ,{expires: cexp});

            ShowResults();

            var pstr = '';
            var index = 0;
            console.log(vm.search.propertyType);
            vm.search.propertyType.forEach(function(t){
                if (index > 0)
                    pstr += ',';
                else {
                    pstr += t;
                }
                index++;
            });


            var pstr1= '';
            index = 0;

            for (var i = 0 ; i < vm.citiesSelected.length; i++)
            {
                if (index > 0)
                    pstr1 += ',';
                pstr1+= vm.citiesSelected[i].name;
                index++;
            }


            var userguid = $cookies.get('apt360visitorguid');
            var  userSearch = {
                city: pstr1,
                type: vm.search.messagetype,
                propertytype: pstr,
                userguid: userguid,
                numofrooms: vm.search.numberofrooms,
            }

            visitors.saveVisitorSearch(userSearch).then(function(result){

            }).catch(function(result){

            })
        })



        function buildSearchSummery()
        {
            vm.searchsummery = '';
            vm.searchsummery +=  'מציג את כל המודעות שלך בלבד ';
        }

        function getCityObject(selectedItem)
        {
            for (var i = 0 ; i < vm.cities.length ;i++)
            {
                if (selectedItem == vm.cities[i].city)
                {
                    return vm.cities[i];
                }
            }
        }

        $scope.getcity = function (selectedItem) {


            //vm.search.napa = selectedItem.napa;
            //vm.search.code = selectedItem.code;

            vm.search.city = selectedItem;

            vm.citiesSelected.push({name: vm.search.city});

            var objectData = getCityObject(selectedItem);


            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != objectData.code) {
                console.log('selectedItem.code : ' + objectData.code);
                general.getSchonot(objectData.code).then(function (result) {
                    vm.search.neighborhood = '';
                    vm.neighborhoods = result.data;
                })
            }
            lastCity = objectData.code;

            if (objectData.area == 'merkaz') {
                vm.search.area = 'אזור המרכז';
            } else if (objectData.area == 'darom') {
                vm.search.area = 'אזור הדרום';
            } else if (objectData.area == 'jerusalem') {
                vm.search.area = 'אזור ירושלים';
            } else if (objectData.area == 'zafon') {
                vm.search.area = 'אזור הצפון';
            } else if (objectData.area == 'haifa') {
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
                    vm.msgboxcontent = 'קרתה שגיאה בשליחת ההודעה';
                     
                })
            }
        }

        $scope.ShowCommDetails = function (item) {
            vm.userMessageId = item.id;
            var type = vm.search.messagetype == 'מכירה'  ? 0 : 1;

            dboperations.getMessageUserInformation(item.id, type).then(function(result)
            {
                console.log(result.data);
                vm.contact = result.data;
                $('#showCommModal').modal('show');
            }).catch(function(result){

            });

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


        function ShowResults(userguid, msgid, type) {

            buildSearchSummery();

            var type;

            var directory = ['/salehouse/' , '/renthouse/'];
            var iterator = 0;

            dboperations.GetAllMyResults(userguid, msgid , type).then(function (result) {

                $scope.showerrorenable = false;
                if (result.data.length == 0) {
                    $scope.showNoResultsMessage = true;
                    vm.cards = [];
                    vm.cards1 = [];
                } else {
                    $scope.showNoResultsMessage = false;
                }
                //console.log(result.data);

                vm.cards1 = result.data.rows;
                vm.cards2 = result.data.rows1;
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

                for (var i = 0; i < vm.cards2.length; i++) {
                    var c = dic.containsKey(vm.cards2[i].id);
                    if (c) {
                        var x = dic.lookup(vm.cards2[i].id);
                        x.push(vm.cards2[i]);
                        dic.add(vm.cards2[i].id, x);
                    } else {
                        var x = [];
                        x.push(vm.cards2[i]);
                        dic.add(vm.cards2[i].id, x);
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
                    //card.imageMaxHeight = '400px';
                    card.sphere360 = [];
                    card.showPictures = 0;
                    card.image360Exists = false;
                    card.showleftrightfor360 = false;
                    card.currentvideoplayingStatus = '';
                    card.imageExists = false;
                    card.video360Exists = false;
                    card.current360ImageStatus = '';
                    card.currentVideoStatus = '';
                    card.videosourceurl = [];
                    card.video360sourceurl = [];
                    card.videoExists = false;
                    card.showVideo = 0;
                    card.regularvideoindex = 0;
                    card.showregularvideo = false;
                    card.show360video = false;
                    card.show3dtour = value[0].show;
                    if (card.show3dtour == undefined)
                        card.show3dtour = false;

                    card.videoExists = false;
                    card.slides = [];
                    card.hideheader = false;
                    card.sphere360index = 0;
                    card.videoRegularindex = 0;
                    vm.cards.push(card);
                    var city = card.city;
                    var area = card.area;
                    var napa = card.napa;
                    var code = card.code;

                    iterator = parseInt(card.messagetype);

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
                    var firsttime1 = 0;
                    for (var k = 0; k < value.length; k++) {
                        if (value[k].isvideo != null &&
                            value[k].tableid != null &&
                            value[k].filename != null &&
                            value[k].is360image != null &&
                            value[k].isvideo == 0 &&
                            value[k].is360image == 0) {

                            //console.log(value[k]);
                            var imgsrc;
                            if (firsttime1 == 0) {
                                card.showPictures++;
                                card.imageExists = true;
                                firsttime1 = 1;
                            }
                            var userid = value[k].userid;
                            var imgsrc = './uploadimages/' + userid + directory[iterator] + value[k].tableid + '/' + value[k].filename;
                            //console.log(imgsrc);
                            card.slides.push({
                                image: imgsrc,
                                text: ''
                            });
                        }
                    }
                    var firsttime = 0;
                    var count360image = 0;
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
                            if (value.length > 1) {
                                vm.cards[i].showleftrightfor360 = true;
                            }

                            var userid = value[k].userid;
                            var imgsrc = './uploadimages/' + userid + directory[iterator] + value[k].tableid + '/' + value[k].filename;
                            card.sphere360.push(imgsrc);

                            if (count360image == 0) {
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
                            count360image++;
                            vm.cards[i].current360ImageStatus = card.sphere360.length + ' / 1';
                        }
                    }

                    var firsttimevid = 0;
                    var countvideo = 0;
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
                            var videosrouceurl = './uploadvideo/' + userid1 + directory[iterator] + tableid + '/' + videofilename;
                            card.videosourceurl.push(videosrouceurl);
                            card.showregularvideo = true;
                            card.videoexistlable = 'יש גם וידאו - הראה לי';
                            if (countvideo == 0)
                                card.currentvideoplayingStatus = value[f].description;
                            countvideo++;
                            vm.cards[i].currentVideoStatus = card.videosourceurl.length + ' / 1';
                        }
                    }

                    for (var f = 0; f < value.length; f++) {
                        if (value[f].isvideo != null &&
                            value[f].tableid != null &&
                            value[f].filename != null &&
                            value[f].is360image != null &&
                            value[f].isvideo == 1 &&
                            value[f].is360video == 1 &&
                            value[f].is360image == 0) {
                            var userid1 = value[f].userid;
                            var tableid = value[f].tableid;
                            var videofilename = value[f].filename;
                            var videosrouceurl = './upload360video/' + userid1 + directory[iterator] + tableid + '/' + videofilename;
                            card.video360sourceurl.push(videosrouceurl);
                            card.show360video = true;
                            card.video360existlable = 'יש גם וידאו 360  - הראה לי';
                            break;
                        }
                    }
                    //vm.cards.push(card);
                    //console.log('card.show3dtour ' + card.show3dtour);
                    if (card.show3dtour == 1) {
                        setTimeout(function(index){
                            var _src = '/virtualtours/' + userid1 + '/' + tableid + '/tour3dvistaplayer.html';
                            console.log(_src);
                            document.getElementById('touriframeid' + index).src = _src;
                        }, 1000, i)
                    }
                    i++;
                });
            }).catch(function (result) {
                $scope.showerror = result.data;
                $scope.showerrorenable = true;
                $scope.showNoResultsMessage = true;
                $state.go('logout', {}, {
                    reload: true
                });
            })
        }


        $scope.Show3dTour = function(item, index)
        {

        }

        $scope.Show360Video = function(item, index)
        {
            if (item.video360existlable == 'הסתר וידאו')
            {
                item.video360existlable = 'יש גם וידאו 360  - הראה לי';
            } else {
                item.video360existlable = 'הסתר וידאו';
                $('#myModal360video').modal('show');
                var imgsrc = item.video360sourceurl[0];
                //console.log(imgsrc);
                vm.current360IdPlay = index;
                load360Video(imgsrc);
            }
        }


        $('#myModal360video').on('hidden.bs.modal', function () {

            vm.cards[vm.current360IdPlay].video360existlable = 'יש גם וידאו 360  - הראה לי';
        });


        function load360Video(fileName) {
            // initialize plugin, default options shown
            var options = {
                crossOrigin: 'anonymous',   // valid keywords: 'anonymous' or 'use-credentials'
                clickAndDrag: true,    // use click-and-drag camera controls
                flatProjection: false,  // map image to appear flat (often more distorted)
                fov: 35,                // initial field of view
                fovMin: 3,              // min field of view allowed
                fovMax: 100,                // max field of view allowed
                hideControls: false,    // hide player controls
                lon: 0,                 // initial lon for camera angle
                lat: 0,                 // initial lat for camera angle
                loop: "loop",           // video loops by default
                muted: true,            // video muted by default
                autoplay: true          // video autoplays by default
            }

            $('.valiant360video').Valiant360(options);
            $.fn['eeeeee']._video.src = fileName;
        }


        $scope.ShowRegularVideo = function(item, index)
        {
            if (item.videoexistlable == 'הסתר וידאו')
            {
                document.getElementById('videodiv' + item.id).style.display = 'none';
                item.videoexistlable = 'יש גם וידאו - הראה לי';
            } else {
                document.getElementById('videodiv' + item.id).style.display = 'block';
                vm.changeSource(item.videosourceurl[0], item.id , index);
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


        $scope.loadPrev360Image = function (item, index)
        {

            if (vm.cards[index].sphere360index > 0) {
                vm.cards[index].sphere360index--;
            } else {
                vm.cards[index].sphere360index = vm.cards[index].sphere360.length - 1;
            }

            vm.cards[index].current360ImageStatus =  (vm.cards[index].sphere360index + 1) + '/' +  vm.cards[index].sphere360.length;

            var PSV = new PhotoSphereViewer({
                // Panorama, given in base 64
                panorama: vm.cards[index].sphere360[vm.cards[index].sphere360index],

                // Container
                container: 'your-pano' + item.id,

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
        $scope.loadNext360Image = function (item, index) {
            var size = vm.cards[index].sphere360.length;
            vm.cards[index].sphere360index = (vm.cards[index].sphere360index + 1 ) % size;

            //vm.cards[index].Image360Name = vm.sphere360Description[vm.cards[index].sphere360index];

            var PSV = new PhotoSphereViewer({
                // Panorama, given in base 64
                panorama: vm.cards[index].sphere360[vm.cards[index].sphere360index],

                // Container
                container: 'your-pano' + item.id,

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


        vm.changeSource = function (videosrc, id, index) {

            document.getElementById('videodiv' + id).style.display = 'block';

            if (true) {

                vm.cards[index].config = {
                    sources: [
                        {src: $sce.trustAsResourceUrl(videosrc), type: "video/mp4"}
                    ],
                    theme: "bower_components/videogular-themes-default/videogular.css",
                    plugins: {
                        //poster: "http://www.videogular.com/assets/images/videogular.png"
                    }
                };
                vm.cards[index].config.tracks = undefined;
                vm.cards[index].config.loop = false;
                vm.cards[index].config.preload = 'none';
            } else {
                vm.cards[index].config.sources[0].src =  $sce.trustAsResourceUrl(videosrc);
            }
        };



        initcrousle();


        $scope.loadPrevVideo = function(item, index)
        {

            if (vm.cards[index].regularvideoindex > 0) {
                vm.cards[index].regularvideoindex--;
            } else {
                vm.cards[index].regularvideoindex = vm.cards[index].videosourceurl.length - 1;
            }

            var videosrc = vm.cards[index].videosourceurl[vm.cards[index].regularvideoindex];
            vm.changeSource(videosrc, item.id, index);
        }
        $scope.loadNextVideo = function(item, index)
        {
            var size =  vm.cards[index].videosourceurl.length;
            vm.cards[index].regularvideoindex = (vm.cards[index].regularvideoindex + 1 ) % size;

            var videosrc = vm.cards[index].videosourceurl[vm.cards[index].regularvideoindex];
            vm.changeSource(videosrc, item.id, index);
        }

        $scope.$on('IdleStart', function() {
            console.log('start');
        });

        $scope.$on('IdleEnd', function() {
            console.log('end');
        });

        $scope.$on('IdleTimeout', function() {
            window.location.reload(true);
        });


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
        KeepaliveProvider.interval(myConfig.keepAliveInterval); // in seconds
    })
    .run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
    });
