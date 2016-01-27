'use strict';


app.controller('renthouseController', ['$scope', 'Members', 'general', 'appCookieStore', '$window',
    '$http', 'authToken', '$timeout', 'myConfig', '$state', 'myhttphelper', '$rootScope', 'API',
    'SessionStorageService', '$cookieStore', 'dboperations', 'fileReader', '$sce', 'citiesservice',
    'versionReloader','SchonotBackg',
    function ($scope, Members, general, appCookieStore, $window,
              $http, authToken, $timeout, myConfig,
              $state, myhttphelper, $rootScope, API, SessionStorageService,
              $cookieStore, dboperations, fileReader, $sce,
              citiesservice, versionReloader,SchonotBackg) {


        var vm = this;
        vm.sphere360 = [];
        vm.sphere360index = 0;
        vm.uuu = {};
        vm.card = {};
        vm.cards = {};
        vm.lastObjId = -1;
        vm.accIsOpen = false;
        vm.currentCard = {};
        var cssUpdateTimer;
        var minWidth = 640;
        var minHeight = 480;
        var video360height = '600px';
        var msg1 = 'התמונות צריכות להיות בגודל של ' + minWidth + 'x' + minHeight + ' לפחות';
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

        versionReloader.addPage(reloadFunction);
        function reloadFunction() {
            window.location.reload(true);
        }

        myhttphelper.doGet('/api/isauth').
            then(sendResponseData).
            catch(sendResponseError);

        function sendResponseData(response) {
            console.log(response);
            if (response != "OK") {
                $state.go('login', {}, {
                    reload: true
                });
            } else {


            }
        }

        $scope.SuspendMessage = function (item) {

            if (item.suspend == 1)
            {
                item.suspend = 0;
            } else {
                item.suspend = 1;
            }

            dboperations.suspendMessage(item.id, 'rent', item.suspend).then(function (result) {
                if (item.suspend == 1) {
                    document.getElementById('panellinkid' + item.id).style.textDecoration = 'line-through';
                    document.getElementById('panellinkid' + item.id).disabled = true;
                    document.getElementById('suspendLable' + item.id).innerHTML = 'החזר';
                } else {
                    document.getElementById('panellinkid' + item.id).style.textDecoration = 'none';
                    document.getElementById('panellinkid' + item.id).disabled = false;
                    document.getElementById('suspendLable' + item.id).innerHTML = 'השעה';
                }
            }).catch(function (result) {
                console.log('suspend failed ' + result);
            })
        }
        $scope.DeleteMessageComplete = function (id) {
            dboperations.deleteMessage(id, 'rent').then(function (result) {

            }).catch(function (result) {

            })
        }

        function sendResponseError(response) {

            $state.go('login', {}, {
                reload: true
            });
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


        $scope.mo = function () {
            $scope.myInterval = 0;
        }
        $scope.ml = function () {
            $scope.myInterval = 4000;
        }
        $scope.fileNameChanged1 = function (obj) {

            var id = obj.getAttribute("data-animal-type");

            var fileInputElement = document.getElementById("fileInputElementfirst" + id);
            $scope.uploadFile1(fileInputElement.files[0], id);
        }

        $scope.fileNameChanged2 = function () {

            var fileInputElement = document.getElementById("fileInputElementfirst2");
            $scope.uploadFile2(fileInputElement.files[0]);
        }

        var ajaxUpload = function (result, fileName, filesize, id) {

            var xid;
            if (id == null) {
                xid = vm.insertId;
            } else {
                xid = id;
            }
            var data = {
                "images": result,
                "filename": fileName,
                "tabletype": "renthouse",
                "insertId": xid,
                'is360image': false,
                'isvideo': false,
                filesize:filesize
            };

            myhttphelper.doPost('/api/upload', data).
                then(function (res) {
                    addPictureToCrousleSlider(result, 'eeeee');
                }).
                catch(function (res) {

                });
        }

        var ajaxUpload2 = function (result, fileName, id, callback) {

            if (id == -1) {
                callback("failed", "cannot attached to new message");
                return;
            }

            var data = {
                "images": result,
                "filename": fileName,
                "tabletype": "renthouse",
                "insertId": id,
                'is360image': true
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

        $scope.uploadFile1 = function (file, id) {

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
                        ajaxUpload(result, file.name,file.size, id);
                    };
                    i.src = result;
                });
        };

        $scope.accordionIsOpen = function (obj, index) {


            if (vm.lastObjId != obj.id) {
                vm.accIsOpen = false;
            }
            vm.lastObjId = obj.id;
            if (vm.accIsOpen == true) {
                vm.accIsOpen = false;
                return;
            }
            vm.uuu[obj.id] = true;
            vm.accIsOpen = true;

            for (var i = 0; i < 10; i++) {
                slides = $scope.slides = [];
            }
            console.log(obj);
            _displayStreets(obj.code, obj.napa, obj.area,index);


            $scope.getparking(obj.parking);


            dboperations.getRentHousePictureList(obj.id).then(function (result) {

                setTimeout(function () {
                    var imgsrc;
                    for (var i = 0; i < result.data.rows.length; i++) {
                        var imgsrc = './uploadimages/' + result.data.userid + '/renthouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                        addPictureToCrousleSlider(imgsrc, '');
                    }
                }, 1);

            })


            dboperations.getRentHouse360PictureList(obj.id).then(function (result) {

                vm.sphere360 = [];
                vm.sphere360index = 0;
                var imgsrc;


                setTimeout(function () {
                    if (result.data.rows.length == 0) {
                        document.getElementById('image360glyps' + obj.id).style.display = 'none';
                        return;
                    }
                }, 300);

                for (var i = 0; i < result.data.rows.length; i++) {
                    var imgsrc = './uploadimages/' + result.data.userid + '/renthouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                    vm.sphere360.push(imgsrc);

                    if (vm.sphere360index == 0) {
                        setTimeout(function () {

                            if (result.data.rows.length > 1)
                                document.getElementById('image360glyps' + obj.id).style.display = 'block';
                            var PSV = new PhotoSphereViewer({
                                // Panorama, given in base 64
                                panorama: imgsrc,

                                // Container
                                container: 'your-pano' + obj.id,

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
                        }, 300);
                    }
                    vm.sphere360index++;
                }

            });

            dboperations.getRentHouseVideoList(obj.id).then(function (result) {
                var imgsrc;
                vm.regularvideo = [];
                vm.regularvideoindex = 0;

                setTimeout(function () {
                    if (result.data.rows.length == 0) {
                        document.getElementById('videodiv' + obj.id).style.display = 'none';
                        return;
                    } else {
                        document.getElementById('videodiv' + obj.id).style.display = 'block';
                    }
                    for (var i = 0; i < result.data.rows.length; i++) {
                        var imgsrc = './uploadvideo/' + result.data.userid + '/renthouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                        //console.log('3' + imgsrc);
                        vm.regularvideo.push(imgsrc);
                        if (i == 0) {
                            vm.changeSource(imgsrc, obj.id);
                        }
                        vm.regularvideoindex++;
                    }
                }, 400);
            });


            dboperations.getRentHouseVideo360List(obj.id).then(function (result) {
                var imgsrc;
                vm.video360 = [];
                vm.video360index = 0;

                if (result.data.rows.length > 0) {

                }
                for (var i = 0; i < result.data.rows.length; i++) {
                    var imgsrc = './upload360video/' + result.data.userid + '/renthouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                    console.log(imgsrc);
                    if (i == 0)
                        load360Video(imgsrc);
                    vm.video360index++;
                }

            });
        }

        $scope.removeSlide = function () {
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

        vm.cities = citiesservice.getcities_all_ready();
        vm.citiesOnly = citiesservice.getcities_ready();

        dboperations.getAllRentHouseOfMine().then(function (result) {

            vm.cards = result.data;
            for (var i = 0; i < vm.cards.length; i++) {


                vm.cards[i].shownapa = true;
                console.log(vm.cards[i].code);

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

                if (vm.cards[i].elevator == 0) {
                    vm.cards[i].elevator = 'אין';
                } else if (vm.cards[i].elevator == 6) {
                    vm.cards[i].elevator = 'יותר מחמש';
                } else {
                    vm.cards[i].elevator = vm.cards[i].elevator.toString();
                }

                if (vm.cards[i].parking == 0) {
                    vm.cards[i].parking = 'אין';
                } else {
                    vm.cards[i].parking = vm.cards[i].parking.toString();
                }

                if (vm.cards[i].warehouse == 0) {
                    vm.cards[i].warehouse = 'אין';
                } else {
                    vm.cards[i].warehouse = vm.cards[i].warehouse.toString();
                }

                if (vm.cards[i].animals == 0) {
                    vm.cards[i].animals = 'לא';
                } else {
                    vm.cards[i].animals = 'כן';
                }

                if (vm.cards[i].romates == 0) {
                    vm.cards[i].romates = 'לא';
                } else {
                    vm.cards[i].romates = 'כן';
                }

                if (vm.cards[i].furnatures == 0) {
                    vm.cards[i].furnatures = 'לא';
                } else {
                    vm.cards[i].furnatures   = 'כן';
                }

                if (vm.cards[i].mamad.data[0] == 0) {
                    vm.cards[i].mamad = 'לא';
                } else {
                    vm.cards[i].mamad = 'כן';
                }


                switch (vm.cards[i].balcony) {
                    case 0:
                        vm.cards[i].balcony = 'אין';
                        break;
                    case 1:
                    case 2:
                    case 3:
                        vm.cards[i].balcony = vm.cards[i].balcony.toString();
                        break;
                    case 4:
                        vm.cards[i].balcony = 'יותר משלוש';
                        break;
                }

                vm.cards[i].numberofrooms = vm.cards[i].numberofrooms.toString();
                vm.cards[i].floor = vm.cards[i].floor.toString();
                vm.cards[i].fromfloor = vm.cards[i].fromfloor.toString();


            }
            for (var i = 0; i < vm.cards.length; i++) {
                setTimeout(function (i) {
                    if (vm.cards[i].suspend == 1) {
                        document.getElementById('panellinkid' + vm.cards[i].id).disabled = true;
                        document.getElementById('panellinkid' + vm.cards[i].id).style.textDecoration = 'line-through';
                        document.getElementById('suspendLable' + vm.cards[i].id).innerHTML = 'החזר';
                    } else {
                        document.getElementById('panellinkid' + vm.cards[i].id).disabled = false;
                        document.getElementById('panellinkid' + vm.cards[i].id).style.textDecoration = 'none';
                        document.getElementById('suspendLable' + vm.cards[i].id).innerHTML = 'השעה';
                    }
                }, 100,i);
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

        $scope.video360LoaderInputChanged = function (obj) {
            var id = obj.getAttribute("data-animal-type");
            var fileInputElement = document.getElementById("video360LoaderInput" + id);
            var size = fileInputElement.files[0].size / (1024 * 1024);
            if (size > 50) {
                alert('מקסימום גודל קובץ להעלות הוא 50 מגה');
                return;
            }
            vm.showwaitcircle = true;
            upload360Video(fileInputElement.files[0], id);
        }
        function upload360Video(file, id) {
            fileReader.readAsDataUrl(file, $scope)
                .then(function (result) {
                    ajaxUpload360Video(result, file, function (err, res) {
                        if (err != 'ok') {
                            vm.showwaitcircle = false;
                            alert(err + ' ' + res);
                        } else {
                            vm.showwaitcircle = false;
                            $scope.showvideo360single = true;
                            load360Video(res.filename, id);
                        }
                    });
                });
        }

        function load360Video(fileName, id) {
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

            var x = document.getElementById('video360div' + id);
            console.log(x);
            $.fn['eeee'] = new Plugin('video360div' + id, options);

            //$('.valiant360video' + id).Valiant360(options);
            $.fn['eeee' + id]._video.src = fileName;

        }

        $scope.getrenovated = function (selectedItem) {

            if (selectedItem == 'משהו אחר') {
                $scope.shoprenovatedexp = true;
            } else {
                $scope.shoprenovatedexp = false;
            }
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


        }

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
        $scope.saveChanges = function (item) {
            //formErrors(form);


            var card = angular.copy(item);
            card.city = item.city;

            var objdata = getCityObject(item.city);
            console.log(objdata);
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

            card.neighborhood = item.neighborhood.name;
            card.street = item.street.name;

            delete card.shownapa;
            if (card.warehouse == 'אין') {
                card.warehouse = 0;
            }
            if (card.elevator == 'אין') {
                card.elevator = 0;
            }
            else if (card.elevator == 'יותר מחמש') {
                card.elevator = 6;
            }
            if (card.parking == 'אין') {
                card.parking = 0;
            }
            if (card.mamad == 'כן') {
                card.mamad = 1;
            } else {
                card.mamad = 0;
            }
            switch (card.balcony) {
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


            if (card.animals == 'כן') {
                card.animals = 1;
            } else {
                card.animals = 0;
            }
            if (card.furnatures == 'כן') {
                card.furnatures = 1;
            } else {
                card.furnatures = 0;
            }
            if (card.romates == 'כן') {
                card.romates = 1;
            } else {
                card.romates = 0;
            }


            dboperations.updateRentHouseDetails(card).then(function (result) {


                dboperations.getRentHouseDetails(card.id).then(function (result) {
                    console.log(result.data[0]);
                })


                var buttonid = 'updatechangesbtnid' + item.id;

                document.getElementById(buttonid).className = "btn btn-primary animated tada";
                document.getElementById(buttonid).style.color = 'lightgreen';
                document.getElementById(buttonid).innerHTML = 'נתונים עודכנו';

                cssUpdateTimer = $timeout(function () {
                    document.getElementById(buttonid).innerHTML = 'עדכן נתונים';
                    document.getElementById(buttonid).style.color = 'white';
                    document.getElementById(buttonid).className = "btn btn-primary";
                }, 1900);


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

        $scope.loadPrev360Image = function (item) {
            if (vm.sphere360index > 0) {
                vm.sphere360index--;
            } else {
                vm.sphere360index = vm.sphere360.length - 1;
            }

            var PSV = new PhotoSphereViewer({
                // Panorama, given in base 64
                panorama: vm.sphere360[vm.sphere360index],

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
        $scope.loadNext360Image = function (item) {
            var size = vm.sphere360.length;
            vm.sphere360index = (vm.sphere360index + 1 ) % size;

            var PSV = new PhotoSphereViewer({
                // Panorama, given in base 64
                panorama: vm.sphere360[vm.sphere360index],

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


        $scope.videoregularloaderinputChanged = function (obj) {
            var id = obj.getAttribute("data-vidlm");
            var fileInputElement = document.getElementById("videoregularloaderinput" + id);

            var size = fileInputElement.files[0].size / (1024 * 1024);
            if (size > 50) {
                alert('מקסימום גודל קובץ להעלות הוא 50 מגה');
                return;
            }
            vm.showwaitcircle = true;
            uploadVideo(fileInputElement.files[0], id);
        }

        function uploadVideo(file, id) {

            fileReader.readAsDataUrl(file, $scope)
                .then(function (result) {
                    ajaxUploadVideo(result, file.name, id, function (err, res) {
                        if (err != 'ok') {
                            vm.showwaitcircle = false;
                            alert(err + ' ' + res);
                        } else {
                            vm.showwaitcircle = false;
                            $scope.showvideosingle = true;
                            vm.changeSource(res.filename, id);
                        }
                    });
                });
        }

        function ajaxUploadVideo(result, fileName, id, callback) {


            var data = {
                "video": result,
                "filename": fileName,
                "tabletype": "renthouse",
                "insertId": id,
                'is360video': false
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

        function ajaxUpload360Video(result, fileName, callback) {

            if (vm.insertId == -1) {
                if (callback)
                    callback("failed", "cannot attached to new message");
                return;
            }

            var data = {
                "video": result,
                "filename": fileName.name,
                "tabletype": "renthouse",
                "insertId": vm.insertId,
                'is360video': true
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


        $scope.onOpen360File = function (obj) {
            var item = obj.getAttribute("data-animal-type");
            item = JSON.parse(item);
            var filename = obj.files[0].name;
            var file = obj.files[0];
            upload(filename, item.id, file);
        }

// Load a panorama stored on the user's computer
        function upload(filename, id, file) {
            _upload(filename, id, file);
        }

        function _upload(filename, id, file) {

            var reader = new FileReader();

            reader.onload = function () {
                ajaxUpload2(reader.result, filename, id, function (err, results) {
                    if (err == "ok") {
                        var PSV = new PhotoSphereViewer({
                            // Panorama, given in base 64
                            panorama: reader.result,

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

                        dboperations.getRentHouse360PictureList(id).then(function (result) {

                            vm.sphere360 = [];
                            vm.sphere360index = 0;
                            var imgsrc;


                            for (var i = 0; i < result.data.rows.length; i++) {
                                var imgsrc = './uploadimages/' + result.data.userid + '/renthouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                                vm.sphere360.push(imgsrc);
                            }
                            if (result.data.rows.length > 1)
                                document.getElementById('image360glyps' + id).style.display = 'block';

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

        function _displayStreets(code, napa, area, index) {
            if (code == null) {
                alert('The code for this city is null\nCannot get street and schonot for it');
            }
            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != code) {
                if (code != null) {
                    general.getStreets(code).then(function (result) {
                        vm.streets = result.data;
                    })
                    console.log('eeeeeeeeeee ' + code);
                    vm.neighborhoods = SchonotBackg.getCollection(code);
                    console.log(vm.neighborhoods);
                    if (vm.neighborhoods == null) {
                        general.getSchonot(code).then(function (result) {
                            vm.neighborhoods = result.data;
                        })
                    }
                }
            }
            lastCity = code;

            $scope.AREA = area;
            $scope.NAPA = napa;

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

        $scope.getcity = function (selectedItem, index) {

            var objectData = getCityObject(selectedItem);

            $scope.NAPA = objectData.napa;
            console.log(objectData);
            vm.cities[index].code = objectData.code;
            vm.cities[index].city = selectedItem;

            $scope.shownapa = true;
            if (lastCity == undefined || lastCity != objectData.code) {
                general.getStreets(objectData.code).then(function (result) {
                    vm.card.street = '';
                    vm.streets = result.data;
                })
                vm.neighborhoods = SchonotBackg.getCollection(objectData.code);
                if (vm.neighborhoods == null) {
                    general.getSchonot(objectData.code).then(function (result) {
                        vm.neighborhoods = result.data;
                    })
                }
                vm.cards[index].neighborhood = '';
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

        }
    }
])
;
