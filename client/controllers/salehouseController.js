'use strict';


app.controller('salehouseController', ['$scope', 'general', 'appCookieStore', '$window',
    '$http', 'authToken', '$timeout', 'myConfig', '$state', 'myhttphelper', '$rootScope',
    'SessionStorageService', '$cookieStore', 'dboperations', 'fileReader', '$sce', 'citiesservice',
    'SchonotBackg','$q','apiutils',
    function ($scope, general, appCookieStore, $window,
              $http, authToken, $timeout, myConfig,
              $state, myhttphelper, $rootScope, SessionStorageService,
              $cookieStore, dboperations, fileReader, $sce,
              citiesservice, SchonotBackg,$q,apiutils) {



        $scope.allowRotate = 1;
        /*
        var pagename = 'salehouse';
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
        function reloadFunction()
        {
            window.location.reload(true);
        }


        var vm = this;
        vm.sphere360 = [];
        vm.sphere360nameonly = [];
        vm.videoNameOnly = [];
        vm.video360NameOnly = [];
        vm.sphere360index = 0;
        vm.sphere360Description = [];
        vm.videoDescription = [];
        vm.current360VideoStatus = '';
        vm.video360Description = [];
        $scope.slides = [];
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


        function reloadFunction() {
            window.location.reload(true);
        }
        function mysqlDate(date){
            date = date || new Date();
            return date.toISOString().split('T')[0];
        }
        function mysqlDate1(date){
            var strDateTime = "Fri, 18 Oct 2013 11:38:23 GMT";
            var myDate = new Date(date);
            return myDate.toLocaleString();
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

            dboperations.suspendMessage(item.id, 'sale', item.suspend).then(function (result) {
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
            dboperations.deleteMessage(id, 'sale').then(function (result) {
                getMine();
            }).catch(function (result) {
                alert(result);
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
            var index = obj.getAttribute("data-index-type");

            var fileInputElement = document.getElementById("fileInputElementfirst" + id);
            $scope.uploadFile1(fileInputElement.files[0], id, index);
        }

        $scope.fileNameChanged2 = function () {

            var fileInputElement = document.getElementById("fileInputElementfirst2");
            $scope.uploadFile2(fileInputElement.files[0]);
        }

        var ajaxUpload = function (result, fileName, filesize, id , index) {

            var xid;
            if (id == null) {
                xid = vm.insertId;
            } else {
                xid = id;
            }
            var filefullpath = './uploadimages/' + vm.userid + '/salehouse/' + xid + '/' + fileName;

            var data = {
                "images": result,
                "filename": fileName,
                "tabletype": "salehouse",
                "insertId": xid,
                'is360image': false,
                'isvideo': false,
                filesize:filesize,
                filefullpath:filefullpath
            };


            vm.cards[index].showwaitcircle = true;


            myhttphelper.doPost('/api/upload', data).
                then(function (res) {
                    vm.cards[index].showwaitcircle = false;
                    if (res.error == 500)
                    {
                        $scope.MessageToUser = 'אין אפשרות להעלות תמונות יותר.חרגת מה 150 מגה לחשבון זה';
                        $('#apt360msgbox').modal('show');
                    } else {
                        addPictureToCrousleSlider(result, '');
                        vm.carousleNameOnly.push(fileName);
                        vm.carousleDescription.push(result);
                    }
                }).
                catch(function (res) {
                    vm.cards[index].showwaitcircle = false;
                    alert('קרתה שגיאה - הקובץ לא עלה \nאנא נסה שנית ');
                });
        }

        var ajaxUpload2 = function (result, file, id, index, callback) {


            if (id == -1) {
                callback("failed", "cannot attached to new message");
                return;
            }

            var filefullpath = './uploadimages/' + vm.userid + '/salehouse/' + id + '/' + file.name;

            var data = {
                "images": result,
                "filename": file.name,
                "tabletype": "salehouse",
                "insertId": id,
                'is360image': true,
                filesize:file.size,
                filefullpath:filefullpath
            };

            vm.cards[index].showwaitcircle360 = true;

            myhttphelper.doPost('/api/upload', data).
                then(function (res) {
                    vm.cards[index].showwaitcircle360 = false;
                    if (callback)
                        callback("ok", res);
                }).
                catch(function (res) {
                    vm.cards[index].showwaitcircle360 = false;
                    if (callback) {
                        callback("failed", res);
                    }
                });
        }

        $scope.uploadFile1 = function (file, id, index) {

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
                        ajaxUpload(result, file.name,file.size, id, index);
                    };
                    i.src = result;
                });
        };

        function getActiveFileName(item)
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


        $scope.DeleteCarouselPicture = function(item)
        {
            var res = getActiveFileName(item);
            console.log(res);
            var fileName = res[0];
            var active = res[1];

            console.log(fileName);
            console.log(active);

            if (fileName == -1)
                return;

            var filePath = './uploadimages/' + vm.userid + '/salehouse/' + item.id + '/' + fileName;



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
        }


        $scope.DeleteVideo360 = function(item)
        {
            var fileName = vm.video360NameOnly[vm.video360index];
            var filePath = vm.video360[vm.video360index];


            dboperations.DeletePicture(fileName , false , true, true, filePath, 'salehouseblobs').
            then(function(result){
                vm.video360NameOnly.splice(vm.video360index, 1);
                vm.video360.splice(vm.video360index, 1);
                vm.video360Description.splice(vm.video360index, 1);
                alert(result.data);
            }).catch(function(result){
                alert('שגיאה');
                $state.go('logout', {}, {
                    reload: true
                });
            });
        }

        $scope.DeleteVideo = function(item)
        {
            var fileName = vm.videoNameOnly[vm.regularvideoindex];
            var filePath = vm.regularvideo[vm.regularvideoindex];


            dboperations.DeletePicture(fileName , false , true, false, filePath, 'salehouseblobs').
            then(function(result){
                vm.videoNameOnly.splice(vm.regularvideoindex, 1);
                vm.regularvideo.splice(vm.regularvideoindex, 1);
                vm.videoDescription.splice(vm.regularvideoindex, 1);
                alert(result.data);
                location.reload();
            }).catch(function(result){
                alert('שגיאה');
                $state.go('logout', {}, {
                    reload: true
                });
            });
        }

        $scope.DeleteImage360Picture = function(item)
        {
            var fileName = vm.sphere360nameonly[vm.sphere360index];
            var filePath = vm.sphere360[vm.sphere360index];

            dboperations.DeletePicture(fileName , true , false, false, filePath, 'salehouseblobs').
            then(function(result){
                vm.sphere360nameonly.splice(vm.sphere360index, 1);
                vm.sphere360.splice(vm.sphere360index, 1);
                vm.sphere360Description.splice(vm.sphere360index, 1);
                alert(result.data);
                location.reload();
            }).catch(function(result){
                alert('שגיאה');
                $state.go('logout', {}, {
                    reload: true
                });
            });
        }

        $scope.SaveImage360Name = function(item)
        {
            if (item.Image360Name != undefined) {
                dboperations.updateImage360Name(vm.sphere360nameonly[vm.sphere360index], item.Image360Name, 'salehouseblobs').
                then(function(result){
                    vm.sphere360Description[vm.sphere360index] = item.Image360Name;
                    alert(result.data);
                }).catch(function(result){
                    alert(result.data + "\nמתנתק");
                    $state.go('logout', {}, {
                        reload: true
                    });
                });
            }
        }

        $scope.accordionIsOpen = function (obj, index) {


            if (vm.lastObjId != obj.id) {
                vm.accIsOpen = false;
            }
            $scope.slides = [];
            obj.angleToRotate = 0;
            vm.lastObjId = obj.id;
            if (vm.accIsOpen == true) {
                vm.accIsOpen = false;
                return;
            }
            vm.uuu[obj.id] = true;
            vm.accIsOpen = true;

            //console.log(obj);
            _displayStreets(obj.code, obj.napa, obj.area,index);


            $scope.getparking(obj.parking);


            dboperations.getSaleHousePictureList(obj.id).then(function (result) {

                vm.carousleNameOnly = [];
                vm.carousleDescription = [];

                setTimeout(function () {
                    var imgsrc;
                    for (var i = 0; i < result.data.rows.length; i++) {
                        var imgsrc = './uploadimages/' + result.data.userid + '/salehouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                        vm.carousleNameOnly[i] = result.data.rows[i].filename;
                        vm.carousleDescription[i] = result.data.rows[i].description;
                        addPictureToCrousleSlider(imgsrc, '');
                    }
                }, 1);

            })


            dboperations.getSaleHouse360PictureList(obj.id).then(function (result) {

                vm.sphere360 = [];
                vm.sphere360index = 0;
                vm.sphere360Description = [];
                var imgsrc;


                setTimeout(function () {
                    if (result.data.rows.length == 0) {
                        return;
                    }
                }, 300);

                for (var i = 0; i < result.data.rows.length; i++) {
                    vm.sphere360nameonly.push(result.data.rows[i].filename);
                    var imgsrc = './uploadimages/' + result.data.userid + '/salehouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                    vm.sphere360.push(imgsrc);
                    if (result.data.rows[i].description == null)
                    {
                        result.data.rows[i].description = '';
                    }
                    vm.sphere360Description.push(result.data.rows[i].description);
                    //console.log(vm.sphere360Description);

                    vm.cards[index].currentImage360Status = '1/' + vm.sphere360.length;

                    if (i == 0) {
                        console.log('Loading...');
                        vm.cards[index].Image360Name = result.data.rows[i].description;
                        setTimeout(function () {

                         load360ImageAsync(obj.id, imgsrc);

                        }, 300);
                    }
                    //vm.sphere360index++;
                }

            });

            dboperations.getSaleHouseVideoList(obj.id).then(function (result) {
                var imgsrc;
                vm.regularvideo = [];
                vm.regularvideoindex = 0;
                vm.videoDescription = [];

                setTimeout(function () {
                    if (result.data.rows.length == 0) {
                        document.getElementById('videodiv' + obj.id).style.display = 'none';
                        return;
                    } else {
                        document.getElementById('videodiv' + obj.id).style.display = 'block';
                    }
                    for (var i = 0; i < result.data.rows.length; i++) {
                        var imgsrc = './uploadvideo/' + result.data.userid + '/salehouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                        //console.log('3' + imgsrc);
                        vm.regularvideo.push(imgsrc);
                        vm.videoNameOnly.push(result.data.rows[i].filename);
                        vm.videoDescription.push(result.data.rows[i].description);
                        if (i == 0) {
                            vm.cards[index].videoName = result.data.rows[i].description;
                            vm.changeSource(imgsrc, obj.id, index);
                        }
                        vm.cards[index].currentVideoStatus =   '1/' + vm.regularvideo.length;
                        //vm.regularvideoindex++;
                    }
                }, 400);
            });

            dboperations.getSaleHouseVideo360List(obj.id).then(function (result) {
                var imgsrc;
                vm.video360 = [];
                vm.video360index = 0;
                vm.video360Description = [];

                if (result.data.rows.length > 0) {

                }

                for (var i = 0; i < result.data.rows.length; i++) {
                    var imgsrc = './upload360video/' + result.data.userid + '/salehouse/' + result.data.rows[i].tableid + '/' + result.data.rows[i].filename;
                    vm.video360NameOnly.push(result.data.rows[i].filename);
                    vm.video360.push(imgsrc);
                    vm.video360Description.push(result.data.rows[i].description);
                    if (i == 0)
                    {
                        vm.cards[index].video360Name = result.data.rows[i].description;
                    }
                    vm.current360VideoStatus = '1/' + vm.video360.length;
                }
            });
        }

        $scope.removeSlide = function () {
            $scope.slides = [];
        }

        function initcrousle() {
            $scope.myInterval = 4000;
            $scope.noWrapSlides = false;
        }

        function addPictureToCrousleSlider(imagesrc, text) {
            $scope.slides.push({
                image: imagesrc,
                text: text
            });
        }

        initcrousle();

        function citiesLoaderCallback(data, citiesOnly)
        {
            vm.cities = angular.copy(data);
            vm.citiesOnly = angular.copy(citiesOnly);
        }
        citiesservice.registerCitiesLoaded(citiesLoaderCallback);

        vm.cities = citiesservice.getcities_all_ready();
        vm.citiesOnly = citiesservice.getcities_ready();

        function getMine() {
            dboperations.getAllSellHouseOfMine().then(function (result) {

                vm.cards = result.data;
                for (var i = 0; i < vm.cards.length; i++) {


                    vm.cards[i].shownapa = true;
                    vm.cards[i].showwaitcircle = false;
                    vm.cards[i].showwaitcirclevideo360 = false;
                    vm.cards[i].Image360Name = '';
                    vm.cards[i].videoName = '';
                    vm.cards[i].video360Name = '';
                    vm.cards[i].config = {};
                    vm.cards[i].immidiate = vm.cards[i].immidiate == 0 ? false : true;
                    vm.cards[i].handycupt = vm.cards[i].handycupt == 0 ? false : true;
                    vm.cards[i].soragim = vm.cards[i].soragim == 0 ? false : true;

                    if (vm.cards[i].basement == undefined || vm.cards[i].basement == null) {
                        vm.cards[i].basement = 'לא';
                    }

                    vm.cards[i].privacyEnabled = vm.cards[i].privacyEnabled == 0 ? false : true;
                    vm.cards[i].privacyEnabled1 = vm.cards[i].privacyEnabled == 0 ? true : false;


                    //console.log(vm.cards[i].code);
                    vm.userid = vm.cards[i].userid;

                    var streetName = vm.cards[i].street;
                    var x1 = {
                        'name': streetName
                    };
                    vm.cards[i].street = x1;

                    updatePrivateHouseStatus(vm.cards[i]);

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

                    try {
                        vm.cards[i].numberofrooms = vm.cards[i].numberofrooms.toString();
                    }
                    catch (err) {
                        console.log(err)
                    }
                    try {
                        vm.cards[i].numoffloors = vm.cards[i].numoffloors.toString();
                    }
                    catch (err) {
                        console.log(err)
                    }
                    try {
                        vm.cards[i].floor = vm.cards[i].floor.toString();
                    }
                    catch (e) {
                        vm.cards[i].floor = 0;
                    }
                    try {
                        vm.cards[i].fromfloor = vm.cards[i].fromfloor.toString();
                    }
                    catch (e) {
                        vm.cards[i].fromfloor = 15;
                    }

                }
                setTimeout(function () {
                    for (var i = 0; i < vm.cards.length; i++) {
                        if (vm.cards[i].suspend == 1) {
                            document.getElementById('panellinkid' + vm.cards[i].id).disabled = true;
                            document.getElementById('panellinkid' + vm.cards[i].id).style.textDecoration = 'line-through';
                            document.getElementById('suspendLable' + vm.cards[i].id).innerHTML = 'החזר';
                        } else {
                            document.getElementById('panellinkid' + vm.cards[i].id).disabled = false;
                            document.getElementById('panellinkid' + vm.cards[i].id).style.textDecoration = 'none';
                            document.getElementById('suspendLable' + vm.cards[i].id).innerHTML = 'השעה';
                        }
                        if (vm.cards[i].enteraptdate != null)
                            document.getElementById('datepickid' + vm.cards[i].id).value =   vm.cards[i].enteraptdate;
                    }
                }, 100);
            });
        }

        getMine();
        $scope.onExit = function () {

        };

        $(function (j) {
            j(document).on('keyup', '#new_message', function () {
                if (this.value.length > 500) {
                    return false;
                }
                j("#cLeft").text("אותיות נשארו: " + (500 - this.value.length));
            });
        });

        $scope.video360LoaderInputChanged = function (obj) {
            var id = obj.getAttribute("data-itemid");
            var index = obj.getAttribute("data-index");
            var item = obj.getAttribute("data-item");
            var fileInputElement = document.getElementById("video360LoaderInput" + id);
            var size = fileInputElement.files[0].size / (1024 * 1024);
            if (size > 50) {
                alert('מקסימום גודל קובץ להעלות הוא 50 מגה');
                return;
            }

            upload360Video(fileInputElement.files[0], id, index, item);
        }
        function upload360Video(file, id, index,item) {
            console.log(index);
            vm.cards[index].showwaitcirclevideo360 = true;
            fileReader.readAsDataUrl(file, $scope)
                .then(function (result) {
                    ajaxUpload360Video(result, file,id, function (err, res) {
                        if (err != 'ok') {
                            vm.cards[index].showwaitcirclevideo360 = false;
                            alert(err + ' ' + res);
                        } else {
                            vm.cards[index].showwaitcirclevideo360 = false;
                            var imgsrc = './upload360video/' + vm.userid + '/salehouse/' +id + '/' + file.name;
                            vm.video360NameOnly.push(file.name);
                            vm.video360.push(imgsrc);
                            vm.video360Description.push('');
                            vm.current360VideoStatus = '1/' + vm.video360.length;
                            $scope.showvideo360single = true;
                            var imgsrc = './upload360video/' + item.userid + '/salehouse/' + id + '/' + file.name;
                            load360Video(imgsrc);
                        }
                    });
                });
        }

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
            console.log(fileName);
        }

        $scope.loadPrev360Video =function(item, index)
        {
            if (vm.video360index > 0) {
                vm.video360index--;
            } else {
                vm.video360index = vm.video360.length - 1;
            }
            vm.current360VideoStatus = (vm.video360index + 1) + '/' + vm.video360.length;
            //load360Video(vm.video360[vm.video360index]);
        }


        $scope.loadNext360Video = function(item, index)
        {

            var size = vm.video360.length;
            vm.video360index = (vm.video360index + 1 ) % size;
            vm.current360VideoStatus = (vm.video360index + 1) + '/' + vm.video360.length;
            //var videosrc = vm.video360[vm.video360index];
            //load360Video(vm.video360[vm.video360index]);
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

        vm.changeSource = function (videosrc, id, index) {

            document.getElementById('videodiv' + id).style.display = 'block';
            //vm.cards[index].videosrc =  videosrc;


            //vm.API.stop();

            //_.isEmpty(vm.cards[index].config)
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
            card.dateenter = mysqlDate();

            card.handycupt  = card.handycupt == false ? 0: 1;
            card.soragim  =   card.soragim == false ? 0: 1;

            card.privacyEnabled = card.privacyEnabled == false? 0 : 1;

            card.immidiate  =   card.immidiate == false ? 0: 1;
            if (card.immidiate == false) {
                card.enteraptdate = document.getElementById('datepickid' + card.id).value;
            }


            dboperations.updateSaleHouseDetails(card).then(function (result) {

                dboperations.getSaleHouseDetails(card.id).then(function (result) {
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

        $scope.SaveVideo360Name = function(item)
        {
            if (item.video360Name != undefined) {
                dboperations.updateVideo360Name(vm.video360NameOnly[vm.video360index],
                    item.video360Name,
                    'salehouseblobs').
                then(function(result){
                    vm.video360Description[vm.video360index] = item.video360Name;
                    alert(result.data);
                }).catch(function(result){
                    alert(result.data);
                    $state.go('logout', {}, {
                        reload: true
                    });
                });
            }
        }

        $scope.SaveVideoName = function(item)
        {
            if (item.videoName != undefined) {
                dboperations.updateVideoName(vm.videoNameOnly[vm.regularvideoindex],
                    item.videoName,
                    'salehouseblobs').
                then(function(result){
                    vm.videoDescription[vm.regularvideoindex] = item.videoName;
                    alert(result.data);
                }).catch(function(result){
                    alert(result.data);
                    $state.go('logout', {}, {
                        reload: true
                    });
                });
            }
        }

        $scope.loadPrevVideo = function(item, index)
        {

            if (vm.regularvideoindex > 0) {
                vm.regularvideoindex--;
            } else {
                vm.regularvideoindex = vm.regularvideo.length - 1;
            }
            var size = vm.regularvideo.length;
            vm.cards[index].currentVideoStatus =  (vm.regularvideoindex + 1) + '/' + size;
            vm.cards[index].videoName = vm.videoDescription[vm.regularvideoindex];
            var videosrc = vm.regularvideo[vm.regularvideoindex];
            vm.changeSource(videosrc, item.id, index);


        }
        $scope.loadNextVideo = function(item, index)
        {

            var size = vm.regularvideo.length;
            vm.regularvideoindex = (vm.regularvideoindex + 1 ) % size;
            vm.cards[index].currentVideoStatus =  (vm.regularvideoindex + 1) + '/' + size;
            vm.cards[index].videoName = vm.videoDescription[vm.regularvideoindex];

            var videosrc = vm.regularvideo[vm.regularvideoindex];
            vm.changeSource(videosrc, item.id, index);
        }

        $scope.loadPrev360Image = function (item, index)
        {
            if (vm.sphere360index > 0) {
                vm.sphere360index--;
            } else {
                vm.sphere360index = vm.sphere360.length - 1;
            }

            vm.cards[index].Image360Name = vm.sphere360Description[vm.sphere360index];

            load360ImageAsync(item.id, vm.sphere360[vm.sphere360index]);

        }
        $scope.loadNext360Image = function (item, index) {
            var size = vm.sphere360.length;
            vm.sphere360index = (vm.sphere360index + 1 ) % size;
            vm.cards[index].Image360Name = vm.sphere360Description[vm.sphere360index];
            load360ImageAsync(item.id, vm.sphere360[vm.sphere360index]);
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
            var index = obj.getAttribute("data-index");
            var item = obj.getAttribute("data-item");
            var fileInputElement = document.getElementById("videoregularloaderinput" + id);

            var size = fileInputElement.files[0].size / (1024 * 1024);
            if (size > 50) {
                alert('מקסימום גודל קובץ להעלות הוא 50 מגה');
                return;
            }
            item = JSON.parse(item);
            uploadVideo(fileInputElement.files[0], id, index, item);
        }

        function uploadVideo(file, id, index, item) {

            vm.cards[index].showwaitcirclevideo = true;
            fileReader.readAsDataUrl(file, $scope)
                .then(function (result) {
                    ajaxUploadVideo(result, file, id, function (err, res) {
                        if (res != 'ok')
                        {
                            vm.cards[index].showwaitcirclevideo = false;
                            if (res == 'exceed size')
                            {
                                $scope.MessageToUser = 'אין אפשרות להעלות תמונות יותר.חרגת מה 150 מגה לחשבון זה';
                                $('#apt360msgbox').modal('show');
                            }
                        } else {
                            vm.cards[index].showwaitcirclevideo = false;
                            $scope.showvideosingle = true;
                            var imgsrc = './uploadvideo/' + item.userid + '/salehouse/' + item.id + '/' + file.name;
                            vm.videoNameOnly.push(file.name);
                            vm.regularvideo.push(imgsrc);
                            vm.videoDescription.push('');
                            vm.changeSource(imgsrc, id, index);
                        }
                    });
                });
        }

        $scope.updateViewOnPropertyType = function(item)
        {
            updatePrivateHouseStatus(item);
        }
        function updatePrivateHouseStatus(item) {

            console.log(item);
            switch (item.propertyType) {
                case 'דו משפחתי':
                case 'בית פרטי':
                case 'דירת גן':
                case "קוט'ג טורי":
                    item.privateHouse = true;
                break;
                default:
                {
                    item.privateHouse = false;
                }
            }
        }

        function ajaxUploadVideo(result, file, id, callback) {


            var filefullpath = './uploadvideo/' + vm.userid + '/salehouse/' + id + '/' + file.name;
            var data = {
                "video": result,
                "filename": file.name,
                "tabletype": "salehouse",
                "insertId": id,
                'is360video': false,
                filesize:file.size,
                filefullpath:filefullpath
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

        $scope.Show360Video = function(id)
        {
            $('#myModal360video').modal('show');
            load360Video(vm.video360[vm.video360index]);
        }

        function ajaxUpload360Video(result, file, id, callback) {

            var filefullpath = './upload360video/' + vm.userid + '/salehouse/' + id + '/' + file.name;

            var data = {
                "video": result,
                "filename": file.name,
                "tabletype": "salehouse",
                "insertId": id,
                'is360video': true,
                filesize:file.size,
                filefullpath:filefullpath
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
            var index = obj.getAttribute("data-index-type");
            item = JSON.parse(item);
            var filename = obj.files[0].name;
            var file = obj.files[0];
            upload(item.id, file, index);
        }

        // Load a panorama stored on the user's computer
        function upload(id, file , index) {
            _upload(id, file, index);
        }

        function _upload(id, file , index) {

            var reader = new FileReader();

            reader.onload = function () {
                ajaxUpload2(reader.result, file, id, index, function (err, results) {

                    if (results.error == 500)
                    {
                        if (results.msg == 'exceed size') {
                            $scope.MessageToUser = 'אין אפשרות להעלות תמונות יותר.חרגת מה 150 מגה לחשבון זה';
                        } else {
                            $scope.MessageToUser = results.msg;
                        }
                        $('#apt360msgbox').modal('show');
                        return;
                    }
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

                        var imgsrc = './uploadimages/' + vm.userid + '/salehouse/' + id + '/' + file.name;
                        vm.sphere360nameonly.push(file.name);
                        vm.sphere360.push(imgsrc);
                        vm.sphere360Description.push('');

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
                    vm.neighborhoods = SchonotBackg.getCollection(code);
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

        $scope.SavePrivacyCode = function(item)
        {
            //console.log(item.privacyPassword);
            //console.log(item.privacyEnabled);

            var c = item.privacyEnabled1 == true? 0 : 1;
            console.log(c);
            var data = {
                tablename:'sellhousedetails',
                privacyPassword : item.privacyPassword,
                id: item.id,
                privacyEnabled : c

            }
            dboperations.SavePrivacyCode(data).then(function (result) {

            });
        }

        $scope.SavePrivacyCode1 = function(item)
        {

            var c = item.privacyEnabled1 == true ? 0 : 1;
            console.log(c);
            if (c == 0) {
                var data = {
                    tablename: 'sellhousedetails',
                    privacyPassword: item.privacyPassword,
                    id: item.id,
                    privacyEnabled: c

                }
                dboperations.SavePrivacyCode(data).then(function (result) {

                });
            }
        }


        $scope.RotatePicture = function(item)
        {
            var res= getActiveFileName(item);

            console.log(res);
            var fileName = res[0];
            var active = res[1];

            if (fileName == -1)
                return;

            var filePath = './uploadimages/' + vm.userid + '/salehouse/' + item.id + '/' + fileName;

            if ($scope.allowRotate == 0)
            {
                return;
            }
            var angle = item.angleToRotate += 90;
/*
            var srcid = '#img' + id;
            $(srcid).rotate(
            {
                angle : angle
            });
*/
            $scope.allowRotate = 0;
            apiutils.rotatePicture(filePath, angle).then(function(result){

                var desc = vm.carousleDescription[active];
                vm.carousleNameOnly.splice(active, 1);
                vm.carousleDescription.splice(active, 1);
                $scope.slides.splice(active, 1);

                var num = Math.floor((Math.random()*10000) + 1)
                var filePath = './uploadimages/' + vm.userid + '/salehouse/' + item.id + '/' + fileName;
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

        /*
        $scope.$on('IdleStart', function() {          
        });

        $scope.$on('IdleEnd', function() {           
        });

        $scope.$on('IdleTimeout', function() {
            window.location.reload(true);
        });
        */

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
        $scope.getcity = function (selectedItem, index) {

            var objectData = getCityObject(selectedItem);
            console.log(objectData);

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
    /*.config(function (IdleProvider, KeepaliveProvider, myConfig) {
        // configure Idle settings
        IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
        IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
        KeepaliveProvider.interval(myConfig.keepAliveInterval); // in seconds
    })
    .run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
    });*/

