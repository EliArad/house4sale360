'use strict';

app.controller('welcomeController', ['$scope', '$state', 'authToken',
    'versionReloader', 'citiesservice', '$cookies', 'general', 'communication', 'visitors', '$q', '$timeout',
    function ($scope, $state, authToken, versionReloader,
              citiesservice, $cookies, general, communication, visitors, $q, $timeout) {
        var vm = this;

        var start = new Date().getTime();

        vm.search = {};
        $scope.showmessagetype = true;
        $scope.iframeFullScreen = false;
        $scope.mobile = general.isMobile();


        vm.cities = citiesservice.getcities_all_ready();
        vm.citiesOnly = citiesservice.getcities_ready();
        vm.numberOfRooms = ['הכל', 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 'יותר מעשרה'];
        var cexp = general.getCookieExp();

        vm.citiesSelected = [];

        versionReloader.addPage(reloadFunction);
        function reloadFunction() {
            window.location.reload(true);
        }


        $scope.togleFullScreenTour = function () {
            if ($scope.iframeFullScreen == false) {
                $scope.iframeFullScreen = true;
                document.getElementById('Idiframetour3d').className = 'col-md-12';
                document.getElementById('linkFullScreen').innerHTML = 'הקטן מסך';
            } else {
                $scope.iframeFullScreen = false;
                document.getElementById('Idiframetour3d').className = 'col-md-8';
                document.getElementById('linkFullScreen').innerHTML = 'מסך מלא';
            }
        }


        $scope.AdvancedSearch = function () {
            communication.setFastSearch(false);
            communication.openAdvancedSearch(true);
            $state.go('main', {}, {
                reload: false
            });
        }

        $scope.onFastSearch = function () {

            if (vm.search.propertyType == undefined) {
                document.getElementById('protypeid').style.color = "red";
                document.getElementById('protypeid').className = 'animated pulse';
                document.getElementById('protypeid').innerHTML = "בחר סוג הנכס";
                setTimeout(function () {
                    document.getElementById('protypeid').className = '';
                    document.getElementById('protypeid').style.color = "black";
                    document.getElementById('protypeid').innerHTML = "סוג הנכס";
                }, 3000)
                return;
            }

            var s = JSON.stringify(vm.search);
            $cookies.put('apt360fastsearch', s, {expires: cexp});

            var ressearch = $cookies.get('apt360fscsel');

            if (ressearch != undefined)
                vm.citiesSelected = JSON.parse(ressearch);

            var userguid = $cookies.get('apt360visitorguid');

            var pstr = '';
            var index = 0;
            vm.search.propertyType.forEach(function (t) {
                if (index > 0)
                    pstr += ',';
                else {
                    pstr += t;
                }
                index++;
            });

            var userSearch = {
                city: vm.search.city,
                type: vm.search.messagetype,
                propertytype: pstr,
                userguid: userguid,
                numofrooms: vm.search.numberofrooms
            }

            visitors.saveVisitorSearch(userSearch).then(function (result) {

            }).catch(function (result) {

            })

            communication.saveSearch(vm.search);
            communication.setFastSearch(true);
            $state.go('main', {}, {
                reload: false
            });


        }
        function load360Video(fileName) {
            // initialize plugin, default options shown
            var options = {
                crossOrigin: 'anonymous',   // valid keywords: 'anonymous' or 'use-credentials'
                clickAndDrag: true,    // use click-and-drag camera controls
                flatProjection: false,  // map image to appear flat (often more distorted)
                fov: 35,                // initial field of view
                fovMin: 3,               // min field of view allowed
                fovMax: 100,                // max field of view allowed
                hideControls: true,    // hide player controls
                lon: 0,                 // initial lon for camera angle
                lat: 0,                 // initial lat for camera angle
                loop: "loop",           // video loops by default
                muted: true,            // video muted by default
                autoplay: true          // video autoplays by default
            }
            $('.valiant360video').Valiant360(options);
            $.fn['eeeeee']._video.src = './upload360video/welcome.mp4';

        }

        function initcrousle() {
            $scope.myInterval = 4000;
            $scope.noWrapSlides = false;
        }


        $(document).ready(function () {

            var ressearch = $cookies.get('apt360fastsearch');
            if (ressearch != undefined)
                vm.search = JSON.parse(ressearch);


            try {
                $('#selectPropertyType').multiselect('select', vm.search.propertyType);

                if ($scope.mobile == false) {
                    var promise1 = load360VideoAsync()
                        .then(function (string) {
                            console.log('then: ' + string);
                    });
                }

                var promise2 = loadPhotoSphereAsync()
                    .then(function (string) {
                        console.log('then: ' + string);
                });

                var promise3 = loadCarouselSlidesAsync()
                    .then(function (string) {
                        console.log('then: ' + string);
                    });


                var end = new Date().getTime();
                var time = end - start;
                console.log('Welcome execution time: ' + time);


            }
            catch (e) {
                console.log(e);
                //location.reload();
                return;
            }
        });

        function load360VideoAsync() {
            var defer = $q.defer()

            // simulated async function
            $timeout(function () {
                initcrousle();
                load360Video();
                defer.resolve('video 360 loaded');
            }, 1);
            return defer.promise;
        }

        function loadPhotoSphereAsync() {
            var defer = $q.defer();

            // simulated async function
            $timeout(function () {
                loadPhotoSphere('welcome360imageid', '400px', './uploadimages/welcome360.jpg');
                defer.resolve('Image 360 loaded');
            }, 1);
            return defer.promise;
        }


        function loadCarouselSlidesAsync() {

            var defer = $q.defer();

            $timeout(function () {

                $scope.slides = [];
                var welcomeImage = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
                for (var i = 0; i < welcomeImage.length; i++) {
                    var imgsrc = './uploadimages/welcome/' + welcomeImage[i];
                    $scope.slides.push({
                        image: imgsrc,
                        text: ''
                    });
                }
                defer.resolve('Slides were loaded');
            }, 1);
            return defer.promise;
        }


        function loadPhotoSphere(divid, hight, filename) {

            var PSV = new PhotoSphereViewer({
                // Panorama, given in base 64
                panorama: filename,

                // Container
                container: divid,

                // Deactivate the animation
                time_anim: false,

                // Display the navigation bar
                navbar: true,

                // Resize the panorama
                size: {
                    width: '100%',
                    height: hight
                },

                // No XMP data
                usexmpdata: false
            });
        }

    }

]);
