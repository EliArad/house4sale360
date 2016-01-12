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


    'angular-carousel',
    'swipe',
    'ui.router',
    'jkuri.gallery',

    'ui.select',
    'ngSanitize',
    'ngIdle',
    'ngTouch',
    'ngVideo',
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",

    'luegg.directives',
    'irontec.simpleChat',
    'msgbox',
    'pretty-checkable'


  ]).constant("myConfig", {
        "url": "http://192.168.1.16:8080",
        'timeoutSeconds': 1200,
        'idletimeSeconds': 1100,
        "MaxPicturesForMember": 14
    })
