
var player;
var playersPlayingTmp = [];

function loadTour()
{
    var errorFunction = function()
    {
        var preloadError = document.getElementById('preloadError');
        preloadError.style.visibility = 'visible';
        if(preloadError)
            preloadError.innerHTML += '<div style="text-align:left; color:#000; "><DIV STYLE="text-align:center;"><SPAN STYLE="letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;"><SPAN STYLE="color:#666666;">If you can\'t see this virtual tour, click</SPAN> <SPAN STYLE="color:#0000ff;"><A TARGET="_blank" HREF="http://www.3dvista.com/error.htm" STYLE="text-decoration:none; color:inherit;"><SPAN STYLE="color:#999999;"><U>here</U></SPAN></A></SPAN></SPAN></DIV><DIV STYLE="text-align:center;"><SPAN STYLE="letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;"><SPAN STYLE="color:#666666;">Si no puede ver esta visita virtual, pulse</SPAN> <SPAN STYLE="color:#0000ff;"><A TARGET="_blank" HREF="http://www.3dvista.com/error.htm" STYLE="text-decoration:none; color:inherit;"><SPAN STYLE="color:#999999;"><U>aquí</U></SPAN></A></SPAN></SPAN></DIV></div>';
    };

    var timeoutID = setTimeout(errorFunction, 20000);

    var beginFunc = function(event){
        if(event.name == 'begin')
        {
            var camera = event.data.source.get('camera');
            if(camera && camera.get('initialSequence') && camera.get('initialSequence').get('movements').length > 0)
                return;
        }

        clearTimeout(timeoutID);
        player.unbindOnObjectsOf('PanoramaPlayListItem', 'begin', beginFunc, player, true);
        player.unbind('stateChange', beginFunc, player, true);
        window.parent.postMessage("tourLoaded", '*');

        disposePreloader();
    };

    var settings = new TDV.PlayerSettings();
    settings.set(TDV.PlayerSettings.CONTAINER, document.getElementById('viewer'));
    settings.set(TDV.PlayerSettings.SCRIPT_URL, '/virtualtours/57/114/script.js');
    settings.set(TDV.PlayerSettings.FLASH_EXPRESS_INSTALLER_URL, '/client/js/lib/expressInstall.swf');
    settings.set(TDV.PlayerSettings.FLASH_AUDIO_PLAYER_URL, '/client/js/lib/AudioPlayer.swf');
    settings.set(TDV.PlayerSettings.FLASH_PANORAMA_PLAYER_URL, '/client/js/lib/PanoramaRenderer.swf');
    settings.set(TDV.PlayerSettings.THREE_JS_WEBGL_URL, '/client/js/lib/ThreeWebGL.js');
    window.tdvplayer = player = TDV.PlayerAPI.create(settings);
    player.bind('stateChange', beginFunc, player, true);
    player.bindOnObjectsOf('PanoramaPlayListItem', 'begin', beginFunc, player, true);

    /* Listen messages */
    window.addEventListener('message', function (e) {
        //Listen to messages for make actions to player in the format function:param1,param2
        var action = e.data;
        if (action == 'pauseTour' || action == 'resumeTour') {
            this[action].apply(this);
        }
    });
}

function pauseTour()
{
    var playLists = player.getByClassName('PlayList');
    for(var i = 0, count = playLists.length; i<count; i++)
    {
        var playList = playLists[i];
        var index = playList.get('selectedIndex');
        if(index != -1)
        {
            var item = playList.get('items')[index];
            var itemPlayer = item.get('player');
            if(itemPlayer && itemPlayer.pause)
            {
                playersPlayingTmp.push(itemPlayer);
                itemPlayer.pause();
            }
        }
    }

    player.getById('pauseGlobalAudios')();
}

function resumeTour()
{
    while(playersPlayingTmp.length)
    {
        var viewer = playersPlayingTmp.pop();
        viewer.play();
    }

    player.getById('resumeGlobalAudios')();
}

function showPreloader()
{
    var preloadContainer = document.getElementById('preloadContainer');
    preloadContainer.style.opacity = 1;
}

function disposePreloader()
{
    var transitionEnd = transitionEndEventName();
    var preloadContainer = document.getElementById('preloadContainer');
    var preloadError = document.getElementById('preloadError');



    var transitionEndName = transitionEndEventName();
    if(transitionEndName)
    {
        preloadContainer.addEventListener(transitionEnd, hide, false);

        preloadError.style.opacity = 0;
        preloadContainer.style.opacity = 0;
    }
    else
    {
        hide();
    }

    function hide()
    {
        preloadError.style.visibility = 'hidden';
        preloadContainer.style.visibility = 'hidden';
        preloadError.style.display = 'none';
        preloadContainer.style.display = 'none';
    }

    function transitionEndEventName () {
        var i,
            undefined,
            el = document.createElement('div'),
            transitions = {
                'transition':'transitionend',
                'OTransition':'otransitionend',
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }

        return undefined;
    }
}
