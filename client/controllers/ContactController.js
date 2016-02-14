'use strict';


app.controller('ContactController', ['$scope', '$state', 'authToken', '$http', 'myConfig',
    'appCookieStore', 'myhttphelper', '$timeout', 'general',
    function ($scope, $state, authToken, $http, myConfig, appCookieStore, myhttphelper, $timeout, general) {


        myhttphelper.doGet('/api/isauth').then(sendResponseData1).catch(sendResponseError1);


        function sendResponseData1(response) {
            if (response != "OK") {
                $state.go('login', {}, {reload: true});
            }
        }

        function sendResponseError1(response) {
            $state.go('login', {}, {reload: true});
        }

        $scope.$on('IdleStart', function () {
            console.log('start');
        });

        $scope.$on('IdleEnd', function () {
            console.log('end');
        });

        $scope.$on('IdleTimeout', function () {
            window.location.reload(true);
        });

        $scope.ContactForm = {};
        $scope.showErrorMessage = false;

        $scope.updateText = function () {
            $scope.showErrorMessage = false;
        }

        $scope.submit = function (form) {
            var membersAPI = myConfig.url + "/api/commands/contactus/";

            var m = appCookieStore.get('lastContactusMessage');
            if (m == $scope.ContactForm.freetext) {
                $scope.errorMessage = "This message was already sent before";
                $scope.showErrorMessage = true;
                return;
            }

            $http.post(membersAPI, $scope.ContactForm).success(function (result) {
                $scope.changesuccess = true;

                appCookieStore.set('lastContactusMessage', $scope.ContactForm.freetext);
                var cssUpdateTimer = $timeout(function () {
                    $scope.changesuccess = false;
                    $state.go('main', {}, {reload: true});
                }, 2800);
            }).error(function (result) {
                $scope.errorMessage = result;
                $scope.showErrorMessage = true;
            });
        };
    }
]).config(function (IdleProvider, KeepaliveProvider, myConfig) {
        // configure Idle settings
        IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
        IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
        KeepaliveProvider.interval(myConfig.keepAliveInterval); // in seconds
    })
    .run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
    });

