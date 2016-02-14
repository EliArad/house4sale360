'use strict';

app.controller('virtualTourController', ['$scope', '$state', 'authToken','general',
    function ($scope, $state, authToken,general)
    {

        var pagename = 'virtualTour';
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

        function reloadFunction()
        {
            window.location.reload(true);
        }

        var settings = new TDV.PlayerSettings();
        settings.set(TDV.PlayerSettings.CONTAINER, document.getElementById('viewer'));
        settings.set(TDV.PlayerSettings.SCRIPT_URL, '/virtualtours/home/script.js');
        settings.set(TDV.PlayerSettings.FLASH_EXPRESS_INSTALLER_URL, '/client/js/lib/expressInstall.swf');
        settings.set(TDV.PlayerSettings.FLASH_AUDIO_PLAYER_URL, '/client/js/lib/AudioPlayer.swf');
        settings.set(TDV.PlayerSettings.FLASH_PANORAMA_PLAYER_URL, '/client/js/lib/PanoramaRenderer.swf');
        settings.set(TDV.PlayerSettings.THREE_JS_WEBGL_URL, '/client/js/lib/ThreeWebGL.js');

        showPreloader();
        loadTour(settings);
    }
]);


