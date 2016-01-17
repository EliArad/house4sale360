'use strict';

app.controller('welcomeController', ['$scope', '$state', 'authToken','versionReloader',
    function ($scope, $state, authToken,versionReloader)
    {
        var vm = this;

            /*
        var settings = new TDV.PlayerSettings();
        settings.set(TDV.PlayerSettings.CONTAINER, document.getElementById('viewer'));
        settings.set(TDV.PlayerSettings.SCRIPT_URL, '/virtualtours/57/114/script.js');
        settings.set(TDV.PlayerSettings.FLASH_EXPRESS_INSTALLER_URL, '/client/js/lib/expressInstall.swf');
        settings.set(TDV.PlayerSettings.FLASH_AUDIO_PLAYER_URL, '/client/js/lib/AudioPlayer.swf');
        settings.set(TDV.PlayerSettings.FLASH_PANORAMA_PLAYER_URL, '/client/js/lib/PanoramaRenderer.swf');
        settings.set(TDV.PlayerSettings.THREE_JS_WEBGL_URL, '/client/js/lib/ThreeWebGL.js');
        */
        //showPreloader();
      //  loadTour(settings);


        versionReloader.addPage(reloadFunction);
        function reloadFunction()
        {
            window.location.reload(true);
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

        //load360Video();
        loadPhotoScphere('welcome360imageid', '400px', './uploadimages/welcome360.jpg');

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
