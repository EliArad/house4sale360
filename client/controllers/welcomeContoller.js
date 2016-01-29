'use strict';

app.controller('welcomeController', ['$scope', '$state', 'authToken',
               'versionReloader','citiesservice','$cookies','general','communication','visitors',
    function ($scope, $state, authToken,versionReloader,citiesservice,$cookies,general,communication,visitors)
    {
        var vm = this;
        vm.search = {};
        $('#selectPropertyType').multiselect('select', vm.search.propertyType);
        $scope.showmessagetype = true;
        $scope.iframeFullScreen = false;
        $scope.mobile = general.isMobile();


        vm.cities = citiesservice.getcities_all_ready();
        vm.citiesOnly = citiesservice.getcities_ready();
        vm.numberOfRooms = ['הכל', 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 'יותר מעשרה'];
        var cexp = general.getCookieExp();

        vm.citiesSelected = [];

        versionReloader.addPage(reloadFunction);
        function reloadFunction()
        {
            window.location.reload(true);
        }

        var ressearch = $cookies.get('apt360fastsearch');
        if (ressearch != undefined)
            vm.search = JSON.parse(ressearch);

        $('#selectPropertyType').multiselect('select', vm.search.propertyType);




        $scope.togleFullScreenTour = function()
        {
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



        $scope.AdvancedSearch = function()
        {
            communication.setFastSearch(false);
            communication.openAdvancedSearch(true);
            $state.go('main', {}, {
                reload: false
            });
        }

        $scope.onFastSearch = function()
        {
            var s = JSON.stringify(vm.search);
            $cookies.put('apt360fastsearch', s ,{expires: cexp});

            ressearch = $cookies.get('apt360fscsel');

            if (ressearch != undefined)
                vm.citiesSelected = JSON.parse(ressearch);

            var userguid = $cookies.get('apt360visitorguid');

            var pstr = '';
            var index = 0;
            vm.search.propertyType.forEach(function(t){
                if (index > 0)
                    pstr += ',';
                else {
                    pstr += t;
                }
                index++;
            });

            var  userSearch = {
                city: vm.search.city,
                type: vm.search.messagetype,
                propertytype: pstr,
                userguid: userguid,
                numofrooms: vm.search.numberofrooms,
            }

            visitors.saveVisitorSearch(userSearch).then(function(result){

            }).catch(function(result){

            })

            communication.saveSearch(vm.search);
            communication.setFastSearch(true);
            $state.go('main', {}, {
                reload: false
            });


        }
        function load360Video(fileName)
        {
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
        initcrousle();


        if ($scope.mobile == false)
            load360Video();
        loadPhotoScphere('welcome360imageid', '400px', './uploadimages/welcome360.jpg');




        $scope.slides = [];
        var welcomeImage = ['1.jpg','2.jpg','3.jpg','4.jpg'];
        for (var i = 0 ; i < welcomeImage.length; i++) {
            var imgsrc = './uploadimages/welcome/' + welcomeImage[i];
            $scope.slides.push({
                image: imgsrc,
                text: ''
            });
        }


        function loadPhotoScphere(divid, hight, filename)
        {

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
