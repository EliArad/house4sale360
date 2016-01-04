'use strict';


var cities = [];

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
        "url": "http://192.168.22.32:3000",
        'timeoutSeconds': 1200,
        'idletimeSeconds': 1100,
        "MaxPicturesForMember": 14,
        getcities: function ($http) {
            if (!cities.length) {
                var url = 'http://192.168.22.32:3000/api/getcities';
                return $http.get(url);
            }
        }
    })
