'use strict';

app.controller('virtualTourController', ['$scope', '$state', 'authToken',
    function ($scope, $state, authToken)
    {


        var settings = new TDV.PlayerSettings();
        settings.set(TDV.PlayerSettings.CONTAINER, document.getElementById('viewer'));
        settings.set(TDV.PlayerSettings.SCRIPT_URL, '/virtualtours/57/114/script.js');
        settings.set(TDV.PlayerSettings.FLASH_EXPRESS_INSTALLER_URL, '/client/js/lib/expressInstall.swf');
        settings.set(TDV.PlayerSettings.FLASH_AUDIO_PLAYER_URL, '/client/js/lib/AudioPlayer.swf');
        settings.set(TDV.PlayerSettings.FLASH_PANORAMA_PLAYER_URL, '/client/js/lib/PanoramaRenderer.swf');
        settings.set(TDV.PlayerSettings.THREE_JS_WEBGL_URL, '/client/js/lib/ThreeWebGL.js');

        showPreloader();
        loadTour(settings);
    }
]);


