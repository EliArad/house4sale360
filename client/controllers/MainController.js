'use strict';


app.controller('MainController', ['$scope', '$state', 'authToken', 'myhttphelper',
    'appCookieStore', 'socketioservice', 'Idle', '$rootScope',
    'SessionStorageService', 'myConfig', '$http', '$window', '$timeout',
    'dboperations', 'citiesservice', 'general', '$cookies', '$sce','communication','visitors','messageToLink','$q','$stateParams',
    function ($scope, $state, authToken, myhttphelper,
              appCookieStore, socketioservice, Idle, $rootScope, SessionStorageService,
              myConfig, $http, $window, $timeout, dboperations,
              citiesservice, general, $cookies, $sce,communication,
              visitors,messageToLink,$q,$stateParams) {


        var vm = this;
        var video360height = '500px';
        $scope.mobile = true;
        $scope.virtualSearch = false;
        $scope.largeScreens = true;
        vm.searchsummery = '';
        vm.search = {};
        vm.searchFromURL = {};
        var cexp = general.getCookieExp();
        var cssUpdateTimer;
        vm.userMessageId = -1;
        $scope.aptstatus = false;
        vm.userMessageIndex = 0;
        vm.userMessageId = 0;
        vm.numberfloors = [];
        vm.streets = [];
        $scope.showmessagetype = true;
        vm.balconies = ['לא משנה לי', 1, 2, 3, 'יותר משלוש'];
        vm.numberOfRooms = ['הכל', 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 'יותר מעשרה'];
        vm.numberfloors.push('קרקע');
        for (var i = 1; i < 35; i++) {
            vm.numberfloors.push(i);
        }
        var lastCity = undefined;
        var lastCity1 = undefined;

        vm.citiesSelected = [
            //{name:'תל אביב'}
        ];

        vm.schonotSelected = [
            //{name:'תל אביב'}
        ];

        function getallUrlParams()
        {

            try {
                var p = $stateParams.city.split(',');
                vm.searchFromURL.city = [];

                for (var i = 0; i < p.length; i++) {
                    var x = {
                        name: p[i]
                    }
                    vm.searchFromURL.city.push(x);
                }

                vm.searchFromURL.agent = $stateParams.agent;
                vm.searchFromURL.aircond = $stateParams.aircond;
                vm.searchFromURL.balcony = $stateParams.balcony;
                vm.searchFromURL.mamad = $stateParams.mamad;
                vm.searchFromURL.messagetype = $stateParams.messagetype;
                vm.searchFromURL.numberofrooms = $stateParams.numberofrooms;
                vm.searchFromURL.neighborhood = $stateParams.neighborhood;
                vm.searchFromURL.parking = $stateParams.parking;
                vm.searchFromURL.parkingtype = $stateParams.parkingtype;
                vm.searchFromURL.parkingtype2 = $stateParams.parkingtype2;

                vm.searchFromURL.warehouse = $stateParams.warehouse;
                vm.searchFromURL.elevator = $stateParams.elevator;
                vm.searchFromURL.floor = $stateParams.floor;
                vm.searchFromURL.fromfloor = $stateParams.fromfloor;
                vm.searchFromURL.price = $stateParams.price;

                if (vm.searchFromURL.agent != undefined && vm.searchFromURL.messagetype != undefined) {
                    return true;
                } else {
                    return false;
                }
            }
            catch (e)
            {
                return false;
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
                //console.log('selectedItem.code : ' + objectData.code);
                general.getSchonot(objectData.code).then(function (result) {
                    vm.search.neighborhood = '';
                    vm.neighborhoods = result.data;
                })

                general.getStreets(objectData.code).then(function (result) {
                    vm.streets = result.data;
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


        $scope.mobile = general.isMobile();


        function reloadFunction()
        {
            window.location.reload(true);
        }


        //$('#switch-change').on('switchChange.bootstrapSwitch', function (event, state) {
          //
        //});

        function citiesLoaderCallback(data, citiesOnly)
        {
            vm.cities = angular.copy(data);
            vm.citiesOnly = angular.copy(citiesOnly);
        }

        citiesservice.registerCitiesLoaded(citiesLoaderCallback);
        vm.cities = citiesservice.getcities_all_ready();
        vm.citiesOnly = citiesservice.getcities_ready();



        $scope.removeSchonaFromList = function (index) {
            vm.schonotSelected.splice(index, 1);
        }
        $scope.removeCityFromList = function (index) {

            vm.citiesSelected.splice(index, 1);
        }

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

                var l = $cookies.get('largeScreens');

                if (l == undefined)
                    $scope.largeScreens = true;
                else {
                    if (l == 'true')
                        $scope.largeScreens = true;
                    else
                        $scope.largeScreens = false;
                }


                initcrousle();
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
                console.log(e);
                location.reload(true);
                return;
            }

            if (communication.isFastSearch() == true)
            {
                vm.search = communication.getSearch();
                console.log('fast search');
                console.log(vm.search);
                communication.setFastSearch(false);
                ShowResults(1);
                return;
            }
            if (communication.isAdvancedSearch() == true)
            {
                $('#myModal').modal('show');
                communication.openAdvancedSearch(false);
            } else {

                if (getallUrlParams() == true)
                {
                    vm.search = angular.copy(vm.searchFromURL);
                    console.log(vm.search);
                    ShowResults(2);
                } else {
                    ShowResults(0);
                }
            }

        });

        $scope.getschona = function (selectedItem) {

            vm.schonotSelected.push({name: vm.search.neighborhood.name});
        }

        $('#sendMessageModal').on('hidden.bs.modal', function () {

            vm.userMessageId = -1;
        });

        $('#myModal').on('show.bs.modal', function () {


            if (vm.search.city == undefined )
                 return;
            var objectData = getCityObject(vm.search.city);
            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != objectData.code) {
                //console.log('selectedItem.code : ' + objectData.code);
                general.getSchonot(objectData.code).then(function (result) {
                    vm.search.neighborhood = '';
                    vm.neighborhoods = result.data;
                })
            }
            lastCity = objectData.code;

            if (lastCity1 == undefined || lastCity1 != objectData.code) {
                if (vm.citiesSelected.length == 1) {
                    general.getStreets(objectData.code).then(function (result) {
                        vm.streets = result.data;
                    })
                }
            }
            lastCity1 = objectData.code;
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

            ShowResults(0);

            var pstr = '';
            var index = 0;
            //console.log(vm.search.propertyType);
            if (vm.search.propertyType != undefined) {
                vm.search.propertyType.forEach(function (t) {
                    if (index > 0)
                        pstr += ',';
                    else {
                        pstr += t;
                    }
                    index++;
                });
            }

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
            vm.searchsummery +=  'מציג ';

            if (vm.search.agent == 'מתווך')
            {
                vm.searchTitle = 'מתיווך';
            } else {
                vm.searchTitle = vm.search.agent;
            }


            if (vm.search.propertyType == undefined || vm.search.propertyType.length == 0)
            {
                vm.searchsummery += 'כל סוגי הדירות' + '  ב ';
            } else {
                vm.searchsummery += vm.search.propertyType + ' ב';
            }


            vm.citiesSelected.forEach(function(en){
                vm.searchsummery += en.name + ',';
            })
            vm.searchsummery+= '  ';
            if (vm.search.numberofrooms == 'הכל') {
                vm.searchsummery += ' ללא הגבלת חדרים';
            } else {
                vm.searchsummery += vm.search.numberofrooms;
                vm.searchsummery += ' חדרים ';
            }
            if (vm.search.toprice != undefined) {
                vm.searchsummery += ' במחיר עד ';
                vm.searchsummery += vm.search.toprice;
            } else {
                vm.searchsummery += ' בכל מחיר';
            }



        }


        $scope.sendEmailToUser = function (id) {

            if (vm.userMessageId != -1) {
                general.SendEmailToUser(vm.userMessageId, $scope.messagebody).then(function (result) {

                    var buttonid = 'sendButton' + id;

                    document.getElementById(buttonid).className = "btn btn-info animated tada";
                    document.getElementById(buttonid).style.color = 'lightgreen';
                    document.getElementById(buttonid).innerHTML = 'הודעה נשלחה';

                    cssUpdateTimer = $timeout(function () {
                        $('#sendMessageModal').modal('hide');
                        document.getElementById(buttonid).innerHTML = 'שלח הודעה';
                        document.getElementById(buttonid).style.color = 'white';
                        document.getElementById(buttonid).className = "btn btn-info";
                    }, 1900);
                }).catch(function (result) {
                    vm.msgboxcontent = 'קרתה שגיאה בשליחת ההודעה';
                     
                })
            }
        }


        $scope.SendToAFriend = function(item, index)
        {

            vm.userMessageIndex = index;
            vm.userMessageId = item.id;
            $('#sendSingleMessageModal').modal('show');
        }

        $scope.SendToAFriendAllPosts = function()
        {

            $('#sendAllMessageModal').modal('show');
        }


        $scope.SendPageLinkToAFriend = function()
        {


            var link = messageToLink.BuildLinkFromSearch(vm.search, vm.citiesSelected);


            var messagebody = '';
            messagebody += '<div style="direction: rtl;text-align: right">';
            messagebody = ' הי<br> ' +
            $scope.personName + ' שלח לך לינק מאתר  apt360 לראות מודעה למכירה או קנייה של בית <br><br> ' + link;

            messagebody += '<br><br><br>';
            messagebody += $scope.messagebody;

            messagebody += '</div>';
            general.SendEmailToPerson($scope.emailToperson, $scope.personName, messagebody).then(function (result) {

                var buttonid = 'sendpagelinkbtnid1';
                document.getElementById(buttonid).className = "btn btn-info animated tada";
                document.getElementById(buttonid).style.color = 'lightgreen';
                document.getElementById(buttonid).innerHTML = 'הודעה נשלחה';

                cssUpdateTimer = $timeout(function () {
                    $('#sendAllMessageModal').modal('hide');
                    document.getElementById(buttonid).innerHTML = 'שלח הודעה';
                    document.getElementById(buttonid).style.color = 'white';
                    document.getElementById(buttonid).className = "btn btn-info";
                }, 1900);
            }).catch(function (result) {
                $('#sendAllMessageModal').modal('hide');
                alert('שגיאה בשליחת ההודעה');
            })
        }


        $scope.ShowCommDetails = function (item) {
            vm.userMessageId = item.id;
            var type = vm.search.messagetype == 'מכירה'  ? 0 : 1;

            dboperations.getMessageUserInformation(item.id, type).then(function(result)
            {
                //console.log(result.data);
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
            //console.log(item);
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


        function ShowResults(fast)
        {

            $scope.showNoResultsMessage = false;
            if (vm.citiesSelected.length == 0 && fast == 0) {
                vm.msgboxcontent = 'בחר עיר אחת לפחות';
                return;
            }
            if (vm.search.aircond == undefined)
            {
                vm.search.aircond = 'לא משנה לי';
            }
            if (vm.search.parking == undefined)
            {
                vm.search.parking = 'לא משנה לי';
            }
            if (vm.search.parkingtype == undefined)
            {
                vm.search.parkingtype = 'לא משנה לי';
            }
            if (vm.search.parkingtype2 == undefined)
            {
                vm.search.parkingtype2 = 'לא משנה לי';
            }
            if (vm.search.warehouse == undefined)
            {
                vm.search.warehouse = 'לא משנה לי';
            }
            if (vm.search.elevator == undefined)
            {
                vm.search.elevator = 'לא משנה לי';
            }
            if (vm.search.mamad == undefined)
            {
                vm.search.mamad = 'לא משנה לי';
            }
            if (vm.search.balcony == undefined)
            {
                vm.search.balcony = 'לא משנה לי';
            }
            if (vm.search.numberofrooms == undefined)
            {
                vm.search.numberofrooms = 'הכל';
            }

            //console.log(vm.search);
            var search = angular.copy(vm.search);
            switch (fast)
            {
                case 0:
                    search.city = vm.citiesSelected;
                break;
                case 1:
                search.city = [];
                var o = {
                    name:vm.search.city
                }
                search.city.push(o);
                break;
                case 2:
                    search.city = vm.search.city;
                break;
            }
            console.log(vm.search.city);
            console.log(search.city);
            search.propertyType = vm.search.propertyType;
            search.renovated = vm.search.renovated;
            search.toprice = vm.search.toprice;


            if (vm.search.agent == undefined) {
                search.agent = 'private';
            } else {
                switch (vm.search.agent) {
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
            buildSearchSummery();

            var type;

            var directory = vm.search.messagetype == 'מכירה'  ? '/salehouse/' : '/renthouse/';
            if (search.messagetype == 'השכרה')
            {
               type = 1;
            } else {
                type = 0;
            }
            dboperations.GetHouseQueryResults(search, false,type).then(function (result) {

                $scope.showerrorenable = false;
                if (result.data.length == 0) {
                    $scope.showNoResultsMessage = true;
                    vm.cards = [];
                    vm.cards1 = [];
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


                    if (card.privacyPassword ==  card.accesstoken)
                    {
                        card.privacyEnabled = 0;
                    } else {
                        card.privacyEnabled = 1;
                    }

                    //card.imageMaxHeight = '400px';
                    card.sphere360 = [];
                    card.showPictures = 0;
                    card.image360Exists = false;
                    card.imageExists = false;
                    card.video360Exists = false;
                    card.videosourceurl = [];
                    card.video360sourceurl = [];
                    card.videoExists = false;
                    card.showVideo = 0;
                    card.showregularvideo = false;
                    card.show360video = false;
                    card.show3dtour = value[0].show;
                    if (card.show3dtour == undefined)
                        card.show3dtour = false;
                    card.videoExists = false;
                    card.slides = [];
                    card.hideheader = false;
                    card.sphere360index = 0;
                    card.sphere360Description = [];
                    vm.cards.push(card);
                    var city = card.city;
                    var area = card.area;
                    var napa = card.napa;
                    var code = card.code;

                    if (card.numberofrooms == 1) {
                        card.numberofrooms = 'חדר אחד';
                    } else {
                        card.numberofrooms = card.numberofrooms + ' חדרים ';
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
                            var imgsrc = './uploadimages/' + userid + directory + value[k].tableid + '/' + value[k].filename;
                            //console.log(imgsrc);
                            card.slides.push({
                                image: imgsrc,
                                text: ''
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
                            var imgsrc = './uploadimages/' + userid + directory + value[k].tableid + '/' + value[k].filename;
                            card.sphere360.push(imgsrc);
                            card.sphere360Description.push(value[k].description);

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
                            var videosrouceurl = './uploadvideo/' + userid1 + directory + tableid + '/' + videofilename;
                            card.videosourceurl.push(videosrouceurl);
                            card.showregularvideo = true;
                            card.videoexistlable = 'יש גם וידאו - הראה לי';
                            break;
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
                            var videosrouceurl = './upload360video/' + userid1 + directory+ tableid + '/' + videofilename;
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
                            var _src = '/virtualtours/' + card.userid + '/' + card.id + '/tour3dvistaplayer.html';
                            //console.log(_src);
                            document.getElementById('touriframeid' + index).src = _src;
                        }, 1000, i, card)
                    }
                    i++;
                });
            }).catch(function (result) {
                $scope.showerror = result.data;
                $scope.showerrorenable = true;
                $scope.showNoResultsMessage = true;
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

        try {
            var bt = $("[name='my-checkbox']").bootstrapSwitch();
            $('#vrcheckboxid').on('switchChange.bootstrapSwitch', function (event, state) {
                $scope.virtualSearch = state;
            });
        }
        catch (e)
        {
            location.reload(true);
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
                vm.changeSource(item.videosourceurl[0], item.id, index);
                item.videoexistlable = 'הסתר וידאו';
            }
        }

        vm.onError = function (event) {
            //console.log("VIDEOGULAR ERROR EVENT");
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

        $scope.EnterUserAuthCode = function(item)
        {

            if (item.UserAuthorizationKey == item.privacyPassword)
            {


                var vguid = $cookies.get('apt360visitorguid');
                if (vguid != null)
                {

                    var data = {
                        guid:vguid,
                        tableid:item.id,
                        type:item.messagetype,
                        accesstoken:item.privacyPassword
                    }
                    dboperations.SaveUserAuthCode(data).then(function (result) {

                    });
                }
                item.privacyEnabled = 0;

                setTimeout(function () {
                    var PSV = new PhotoSphereViewer({
                        // Panorama, given in base 64
                        panorama: item.sphere360[0],
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
                }, 100);
            } else {
                item.privacyEnabled = 1;
            }
        }

        vm.changeSource = function (videosrc, id, index) {

            document.getElementById('videodiv' + id).style.display = 'block';
            //console.log(result);
            alert(index);
            alert(videosrc);

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

        $scope.loadPrev360Image = function (item, index)
        {
            if (vm.cards[index].sphere360index > 0) {
                vm.cards[index].sphere360index--;
            } else {
                vm.cards[index].sphere360index = vm.cards[index].sphere360.length - 1;
            }

            vm.cards[index].Image360Name = vm.cards[index].sphere360Description[vm.cards[index].sphere360index];

            load360ImageAsync(item.id, vm.cards[index].sphere360[vm.cards[index].sphere360index]);

        }
        $scope.loadNext360Image = function (item, index) {
            var size = vm.cards[index].sphere360.length;
            vm.cards[index].sphere360index = (vm.cards[index].sphere360index + 1 ) % size;
            vm.cards[index].Image360Name = vm.cards[index].sphere360Description[vm.cards[index].sphere360index];
            load360ImageAsync(item.id, vm.cards[index].sphere360[vm.cards[index].sphere360index]);
        }


        $scope.SetViewMode = function()
        {
            $scope.largeScreens = !$scope.largeScreens;
            console.log($scope.largeScreens);
            $cookies.put('largeScreens', $scope.largeScreens ,{expires: cexp});

            ShowResults(0);
        }

        function load360ImageAsync(id, src) {
            var defer = $q.defer()

            $timeout(function () {

                var PSV = new PhotoSphereViewer({
                    // Panorama, given in base 64
                    panorama: src,

                    // Container
                    container: 'your-pano' + id,

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

                defer.resolve('video 360 loaded');
            }, 1);
            return defer.promise;
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

