'use strict';


var app = angular
    .module('app', [
    'ngAnimate',
    'ngAria',
    'ngPasswordStrength',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngFileUpload',
    'ui.bootstrap',

    //'angular-carousel',
    'swipe',
    'ui.router',

    'ngSanitize',
    'ngIdle',
    'ngTouch',

    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    'ui.select'



  ]).constant("myConfig", {
        //"url": "http://192.168.22.32:8000",
        //"url": "http://80.178.121.130",
        //"url": "http://80.178.121.130",
        "url": 'http://apt360.co.il',
        //"url": "http://apt360.co.il",
        //"url": "http://localhost:8000",
        //"url": "http://192.168.22.28:8000",
        //"url": "http://192.168.1.19:8000",
        'timeoutSeconds': 1200,
        'idletimeSeconds': 1100,
        "MaxPicturesForMember": 14
    })
