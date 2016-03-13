'use strict';


app.controller('addnewsalehouseController', ['$scope', 'general', 'appCookieStore', '$window',
    '$http', 'authToken', '$timeout', 'myConfig', '$state', 'myhttphelper', '$rootScope',
    'SessionStorageService', '$cookies', 'dboperations', 'fileReader', '$sce','citiesservice','apiutils',
    function ($scope, general, appCookieStore, $window,
              $http, authToken, $timeout, myConfig,
              $state, myhttphelper, $rootScope, SessionStorageService,
              $cookies, dboperations, fileReader, $sce,citiesservice,apiutils) {


        var vm = this;
        var cexp = general.getCookieExp();
        vm.card = {};
        vm.insertId = -1;
        vm.currentCard = {};
        $scope.showstate2 = false;
        vm.city = {};
        vm.volume = 1;
        vm.isCompleted = false;
        vm.showwaitcircle = false;
        vm.showwaitcirclevideo= false;
        vm.showwaitcirclevideo360 = false;
        vm.carousleNameOnly = [];
        vm.carousleDescription = [];
        vm.angleToRotate = 0;
        vm.seeking = {
            currentTime: 0,
            duration: 0
        };
        vm.seeked = {
            currentTime: 0,
            duration: 0
        };
        $scope.clearselect = function(sel)
        {
            switch(sel)
            {
                case 0:
                    vm.card.neighborhood = '';
                break;
                case 1:
                    vm.card.street = '';
                break;
            }
        }
        function citiesLoaderCallback(data, citiesOnly)
        {
            vm.cities = angular.copy(data);
            vm.citiesOnly = angular.copy(citiesOnly);

            try {
                try {
                    var s = $cookies.get('sellhouseform');
                    vm.card = JSON.parse(s);

                    vm.card.neighborhood = '';
                    vm.card.street = '';

                    var s = $cookies.get('sellhousecurrentcard');
                    vm.currentCard = JSON.parse(s);

                    $scope.getcity(vm.card.city);


                    if (vm.card.immidiate == undefined)
                    {
                        vm.card.immidiate = true;
                    }
                }
                catch (e) {

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
            }
            catch (e) {

            }

        }
        citiesservice.registerCitiesLoaded(citiesLoaderCallback);

        vm.cities = citiesservice.getcities_all_ready();
        vm.citiesOnly = citiesservice.getcities_ready();


        var slides = $scope.slides = [];
        $scope.shownapa = false;
        $window.onbeforeunload = $scope.onExit;
        var lastCity = undefined;
        $scope.shoparkingoptions = false;
        $scope.shoprenovatedexp = false;
        $scope.showfurnatureexp = false;
        vm.numberOfRooms = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 'יותר מעשרה'];
        vm.numberfloors = [];
        vm.balconies = ['אין', 1, 2, 3, 'יותר משלוש'];
        vm.neighborhoods = [{name: 'NOT READY YET FIXME'}];
        var minWidth = 640;
        var minHeight = 480;
        var msg1 = 'התמונות צריכות להיות בגודל של ' + minWidth + 'x' + minHeight + ' לפחות';
        $scope.showvideosingle = false;
        $scope.showvideo360single = false;

        /*
        var pagename = 'addnewsalehouse';
        var storeVersion = appCookieStore.get(pagename);
        if (storeVersion == undefined)
        {
            appCookieStore.set(pagename, '0');
            reloadFunction();
        } else {
            var si = parseInt(storeVersion);
            general.checkIfNeedToReload(pagename,si, function(err, version, needToReload){
                if (err == 'ok' && needToReload == true)
                {
                    appCookieStore.set(pagename, version);
                    reloadFunction();
                }
            });
        }
        */
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
        function mysqlDate(date){
            date = date || new Date();
            return date.toISOString().split('T')[0];
        }


        function reloadFunction()
        {
            window.location.reload(true);
        }

        $scope.getcity = function (selectedItem) {


            var objectData = getCityObject(selectedItem);
            vm.card.napa = objectData.napa;
            vm.card.code = objectData.code;
            vm.card.city = selectedItem;
            $scope.NAPA = vm.card.napa;
            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != objectData.code) {
                general.getStreets(objectData.code).then(function (result) {
                    vm.card.street = '';
                    vm.streets = result.data;
                })
                general.getSchonot(objectData.code).then(function (result) {
                    vm.card.neighborhood = '';
                    vm.neighborhoods = result.data;
                })
            }
            lastCity = objectData.code;


            if (objectData.area == 'merkaz') {
                $scope.AREA = 'אזור המרכז';
            } else if (objectData.area == 'darom') {
                $scope.AREA = 'אזור הדרום';
            } else if (objectData.area == 'jerusalem') {
                $scope.AREA = 'אזור ירושלים';
            } else if (objectData.area == 'zafon') {
                $scope.AREA = 'אזור הצפון';
            } else if (objectData.area == 'haifa') {
                $scope.AREA = 'אזור חיפה';
            }
            _saveModel();
        }


        vm.numberfloors.push('קרקע');
        for (var i = 1; i < 35; i++) {
            vm.numberfloors.push(i);
        }
        myhttphelper.doGet('/api/isauth').
            then(sendResponseData).
            catch(sendResponseError);

        function sendResponseData(response) {
            if (response != "OK") {
                $state.go('login', {}, {
                    reload: true
                });
            } else {


            }
        }

        function sendResponseError(response) {
            $state.go('login', {}, {
                reload: true
            });
        }

        $scope.onOpen360File = function () {
            upload();
        }

        // Load a panorama stored on the user's computer
        function upload() {
            // Retrieve the chosen file and create the FileReader object
            var file = document.getElementById('pano').files[0];
            var reader = new FileReader();

            reader.onload = function () {
                ajaxUpload2(reader.result, file, function (err, results) {
                    if (err == "ok") {
                        var PSV = new PhotoSphereViewer({
                            // Panorama, given in base 64
                            panorama: reader.result,

                            // Container
                            container: 'your-pano',

                            // Deactivate the animation
                            time_anim: false,

                            // Display the navigation bar
                            navbar: true,

                            // Resize the panorama
                            size: {
                                width: '100%',
                                height: '500px'
                            },

                            // No XMP data
                            usexmpdata: false
                        });
                    } else {
                        if (results == 'error from send 401') {
                            authToken.RemoveToken();
                            $state.go('login', {}, {
                                reload: true
                            });
                            $rootScope.$broadcast("updateHeader", authToken.getToken());
                        } else {
                            alert(results);
                        }
                    }
                });
            };

            reader.readAsDataURL(file);
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

        var ajaxUpload = function (result, file , callback) {

            if (vm.insertId == -1) {
                vm.showwaitcircle = false;
                if (callback)
                    callback("failed", "cannot attached to new message");
                return;
            }

            var data = {
                "images": result,
                "filename": file.name,
                "tabletype": "salehouse",
                "insertId": vm.insertId,
                'is360image': false,
                filesize:file.size
            };


            myhttphelper.doPost('/api/upload', data).
                then(function (res) {
                    vm.showwaitcircle = false;
                    addPictureToCrousleSlider(result, '');
                    vm.carousleNameOnly.push(file.name);
                    vm.carousleDescription.push('');
                }).
                catch(function (res) {
                    vm.showwaitcircle = false;
                });
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


        $scope.video360LoaderInputChanged = function () {
            var fileInputElement = document.getElementById("video360LoaderInput");
            var size = fileInputElement.files[0].size / (1024 * 1024);
            if (size > 50) {
                alert('מקסימום גודל קובץ להעלות הוא 50 מגה');
                return;
            }
            upload360Video(fileInputElement.files[0]);
        }
        function load360Video(fileName)
        {
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
                autoplay: false          // video autoplays by default
            }
            $('.valiant360video').Valiant360(options);
            //console.log($.fn['eeeeee']);
            //console.log($.fn['eeeeee']._video.src);
            $.fn['eeeeee']._video.src = fileName;


        }

        $scope.videoregularloaderinputChanged = function (obj) {
            var fileInputElement = document.getElementById("videoregularloaderinput");
            var size = fileInputElement.files[0].size / (1024 * 1024);
            if (size > 50) {
                alert('מקסימום גודל קובץ להעלות הוא 50 מגה');
                return;
            }
            uploadVideo(fileInputElement.files[0]);
        }


        function uploadVideo(file) {
            vm.showwaitcirclevideo = true;
            fileReader.readAsDataUrl(file, $scope)
                .then(function (result) {
                    ajaxUploadVideo(result, file, function(err, res){
                        if (err != 'ok')
                        {
                            vm.showwaitcircle = false;
                            alert(err + ' ' + res);
                        } else {
                            vm.showwaitcircle = false;
                            $scope.showvideosingle = true;
                            vm.changeSource(result);
                        }
                    });
                });
        }

        function upload360Video(file) {
            fileReader.readAsDataUrl(file, $scope)
                .then(function (result) {
                    ajaxUpload360Video(result, file, function(err, res){
                        if (err != 'ok')
                        {
                            alert(err + ' ' + res);
                        } else {
                            $scope.showvideo360single = true;

                            load360Video(res.filename);
                        }
                    });
                });
        }

        function ajaxUploadVideo(result, file, callback) {

            if (vm.insertId == -1) {
                if (callback)
                    callback("failed", "cannot attached to new message");
                return;
            }

            var data = {
                "video": result,
                "filename": file.name,
                "tabletype": "salehouse",
                "insertId": vm.insertId,
                'is360video': false,
                filesize:file.size
            };

            myhttphelper.doPost('/api/uploadvideo', data).
                then(function (res) {
                    if (callback)
                        callback("ok", res);
                }).
                catch(function (res) {
                    if (callback)
                        callback("failed", res);
                });
        }

        function ajaxUpload360Video(result, file, callback) {


            if (vm.insertId == -1) {
                if (callback)
                    callback("failed", "cannot attached to new message");
                return;
            }

            var data = {
                "video": result,
                "filename": file.name,
                "tabletype": "salehouse",
                "insertId": vm.insertId,
                'is360video': true,
                filesize:file.size
            };

            myhttphelper.doPost('/api/uploadvideo', data).
                then(function (res) {
                    if (callback)
                        callback("ok", res);
                }).
                catch(function (res) {
                    if (callback)
                        callback("failed", res);
                });
        }

        vm.changeSource = function (result) {
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


        $scope.loadPrev360Image = function () {
            alert('prev');
        }
        $scope.loadNext360Image = function () {
            alert('next');
        }
        var ajaxUpload2 = function (result, file, callback) {

            if (vm.insertId == -1) {
                callback("failed", "cannot attached to new message");
                return;
            }

            var data = {
                "images": result,
                "filename": file.name,
                "tabletype": "salehouse",
                "insertId": vm.insertId,
                'is360image': true,
                filesize:file.size
            };


            myhttphelper.doPost('/api/upload', data).
                then(function (res) {
                    if (callback)
                        callback("ok", res);
                }).
                catch(function (res) {
                    if (callback) {
                        callback("failed", res);
                    }
                });
        }

        $scope.uploadFile1 = function (file, index) {

            $scope.progress = 0;
            fileReader.readAsDataUrl(file, $scope)
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
                        vm.showwaitcircle = true;
                        ajaxUpload(result, file);
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
                        ajaxUpload2(result, fileName.name, function (err, result) {
                            if (err != 'ok') {
                                if (res == 'error from send 401') {
                                    authToken.RemoveToken();
                                    $state.go('login', {}, {
                                        reload: true
                                    });
                                    $rootScope.$broadcast("updateHeader", authToken.getToken());
                                }
                            }
                        });
                    };
                    i.src = result;
                });
        };
        function _saveModel() {
            try {
                vm.card.neighborhood = vm.neighborhood.name;
            }
            catch (e) {

            }
            var s = JSON.stringify(vm.card);
            $cookies.put('sellhouseform', s ,{expires: cexp});
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
            if (selectedItem == 'אין') {
                $scope.shoparkingoptions = false;
                $scope.shoparkingoptions2 = false;
            } else {
                $scope.shoparkingoptions = true;
            }

            switch (selectedItem) {
                case '1':
                    $scope.shoparkingoptions2 = false;
                    break;
                case '2':
                case '3':
                    $scope.shoparkingoptions2 = true;
                    break;

            }
            _saveModel();
        }

        $scope.saveChanges = function (form) {
            formErrors(form);

            var card = angular.copy(vm.card);
            card.city = vm.card.city;
            var objdata = getCityObject(vm.card.city);
            //console.log(card.city);
            card.napa = objdata.napa;
            card.code = objdata.code;
            card.area = objdata.area;

            if (objdata.area == 'merkaz') {
                card.area = 'אזור המרכז';
            } else if (objdata.area == 'darom') {
                card.area = 'אזור הדרום';
            } else if (objdata.area == 'jerusalem') {
                card.area = 'אזור ירושלים';
            } else if (objdata.area == 'zafon') {
                card.area = 'אזור הצפון';
            } else if (objdata.area == 'haifa') {
                card.area = 'אזור חיפה';
            }

            try {
                card.neighborhood = vm.card.neighborhood.name;
            }
            catch (ex)
            {
                card.neighborhood = '';
            }
            card.street = vm.card.street.name;


            if (card.warehouse == 'אין')
            {
                card.warehouse = 0;
            }
            if (card.elevator == 'אין')
            {
                card.elevator = 0;
            }
            else if (card.elevator == 'יותר מחמש')
            {
                card.elevator = 5;
            }
            if (card.parking == 'אין')
            {
                card.parking = 0;
            }
            if (card.mamad == 'כן') {
                card.mamad = 1;
            } else {
                card.mamad = 0;
            }
            switch(card.balcony)
            {
                case 'אין':
                    card.balcony = 0;
                break;
                case '1':
                    card.balcony = 1;
                break;
                case '2':
                    card.balcony = 2;
                break;
                case '3':
                    card.balcony = 3;
                break;
                case 'יותר משלוש':
                    card.balcony = 4;
                break;
            }

            if (card.floor == 'קרקע')
            {
                card.floor = 0;
            }
            if (card.fromfloor == 'קרקע')
            {
                card.fromfloor = 0;
            }
            if (card.floor == undefined || card.floor == null)
            {
                card.floor = 0;
            }
            if (card.fromfloor == undefined || card.fromfloor == null)
            {
                card.fromfloor = 15;
            }

            if (angular.equals(vm.currentCard, card) == true) {
                alert("כבר קיים");
                return;
            }

            card.dateenter = mysqlDate();
            card.immidiate  = card.immidiate == false ? 0: 1;
            if (card.immidiate == false) {
                card.enteraptdate = document.getElementById('datepickid').value;
                console.log(card.enteraptdate);
            }

            dboperations.saveHouseDetails(card).then(function (result) {
                vm.insertId = result.data.result.insertId;
                vm.userid = result.data.userid;

                vm.currentCard = card;
                var s = JSON.stringify(vm.currentCard);
                $cookies.put('sellhousecurrentcard', s ,{expires: cexp});

                //var s = {};
                //$cookies.put('sellhouseform', s);

                $scope.showstate2 = true;

            }).catch(function (result) {
                alert(result.data);
                vm.showError = true;
                vm.errorToShow = result.data;
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

        $scope.SaveVideoName = function()
        {

        }
        $scope.DeleteCarouselPicture = function()
        {
            var res = getActiveFileName();
            var fileName = res[0];
            var active = res[1];



            if (fileName == -1)
                return;


            var url = myConfig.url + '/api/getuserid';
            $http.get(url).then(function(result){
                vm.userid = parseInt(result.data);
                var filePath = './uploadimages/' + vm.userid + '/salehouse/' + vm.insertId + '/' + fileName;

                dboperations.DeletePicture(fileName ,
                    false ,
                    false,
                    false,
                    filePath,
                    'salehouseblobs').
                then(function(result){
                    vm.carousleNameOnly.splice(active, 1);
                    vm.carousleDescription.splice(active, 1);
                    $scope.slides.splice(active, 1);
                }).catch(function(result){
                    alert('שגיאה');
                    //$state.go('logout', {}, {
                    //  reload: true
                    //});
                });

            }).catch(function(result){
                console.log(result);
            })
        }
        function getActiveFileName()
        {
            var active = -1;
            for (var i = 0 ; i < $scope.slides.length;i++) {
                if ($scope.slides[i].active == true) {
                    active = i;
                    break;
                }
            }
            if (active == -1)
                return;

            var fileName = vm.carousleNameOnly[active];
            return [fileName, active];
        }
        $scope.RotatePicture = function()
        {
            var res= getActiveFileName();

            console.log(res);
            var fileName = res[0];
            var active = res[1];

            if (fileName == -1)
                return;

            var filePath = './uploadimages/' + vm.userid + '/salehouse/' + vm.insertId + '/' + fileName;

            if ($scope.allowRotate == 0)
            {
                return;
            }
            var angle = vm.angleToRotate += 90;

            $scope.allowRotate = 0;
            apiutils.rotatePicture(filePath, angle).then(function(result){

                var desc = vm.carousleDescription[active];
                vm.carousleNameOnly.splice(active, 1);
                vm.carousleDescription.splice(active, 1);
                $scope.slides.splice(active, 1);

                var num = Math.floor((Math.random()*10000) + 1)
                var filePath = './uploadimages/' + vm.userid + '/salehouse/' + vm.insertId + '/' + fileName;
                var randomeImage = filePath + '?' + num;

                addPictureToCrousleSlider(randomeImage, '');
                vm.carousleNameOnly.push(fileName);
                vm.carousleDescription.push(desc);
                $scope.allowRotate = 1;
            }).catch(function(result){
                $scope.allowRotate = 1;
                alert(result);
            })
        }

        $scope.updateViewOnPropertyType = function()
        {
            updatePrivateHouseStatus();
        }
        function updatePrivateHouseStatus() {

            switch (vm.card.propertyType) {
                case 'דו משפחתי':
                case 'דירת גן':
                case 'בית פרטי':
                case "קוט'ג טורי":
                    vm.card.privateHouse = true;
                    break;
                default:
                {
                    vm.card.privateHouse = false;
                }
            }
        }
    }
])

