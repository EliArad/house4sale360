'use strict';

app.controller('welcomeController', ['$scope', '$state', 'authToken',
    function ($scope, $state, authToken)
    {
        var vm = this;


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
            $('.welcome360video').Valiant360(options);
            $.fn['eeeeee']._video.src = './upload360video/welcome.mp4';
        }

        load360Video();

    }

]);
