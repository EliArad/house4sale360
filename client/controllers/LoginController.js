'use strict';


app.controller('LoginController', ['$scope', '$state', 'authToken', '$cookies',
                 '$http', '$rootScope', 'myhttphelper', 'PassServiceParams',
                 'socketioservice', 'SessionStorageService','$timeout',
    'myConfig','visitors','$stateParams','appCookieStore','general',
    function ($scope, $state, authToken, $cookies, $http, $rootScope,
              myhttphelper, PassServiceParams, socketioservice,
              SessionStorageService,$timeout,myConfig,visitors,$stateParams,appCookieStore,general)
    {




        /*
        var pagename = 'login';
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
        */
        function reloadFunction()
        {
            window.location.reload(true);
        }


        $scope.loginfailure = false;
        var cssUpdateTimer= null;
        $scope.vm = this;

        $scope.vm.login = login;

        $scope.vm.user = {
            password: "",
            email: ""
        };




        function reloadFunction()
        {
            window.location.reload(true);
        }

        $scope.ForgetPassword = function()
        {
            if ($scope.vm.user.email == null || $scope.vm.user.email == undefined)
            {
                $scope.notifyUserMsg = 'אנא הכנס מייל';
                return;
            }
            var email = $scope.vm.user.email;
            var url = myConfig.url + "/api/forgotPassword";
            $http.post(url , {email:email} ).then(function(result){
                $scope.errorToShow =  'מייל איפוס נשלח';
                $scope.loginfailure = true;

            }).catch(function(err){
                console.log(err);
            })
        }
        $scope.vm.clearError = function () {
            $scope.loginfailure = false;
        }
        $scope.SendAgainMailForConfirm = function()
        {

            alert('לא נתמך עדיין');
        }
        function showblizeError()
        {
            $scope.loginfailure = true;

            if (cssUpdateTimer != undefined && cssUpdateTimer != null) {
                $timeout.cancel(cssUpdateTimer);
                cssUpdateTimer = null;
            }
            var x = document.getElementById('loginfailureid');
            x.className = "animated bounce";

            cssUpdateTimer = $timeout(function () {
                var x = document.getElementById('loginfailureid');
                x.className = "";
            }, 1900);
        }

        function login() {

            authToken.RemoveToken();
            $scope.sendMailToVerify = false;
            $scope.errorToShow = '';

            $scope.vm.user.email = $scope.vm.user.email.toLowerCase();
            myhttphelper.doPost('/api/login', $scope.vm.user).
            then(sendResponseData).
            catch(sendResponseError);

            function sendResponseData(response) {


                if (response.verified == 0)
                {
                    $scope.errorToShow = 'עדיין לא אישרת את המייל שלך';
                    $scope.sendMailToVerify = true;
                    showblizeError();
                    return;
                }

                authToken.setToken(response.token);
                SessionStorageService.setSessionStorage('userid', response.id);

                //$.getJSON("http://jsonip.com?callback=?", function (data) {
                    //alert("Your ip: " + data.ip);
                    visitors.determineVisit('0.0.0.0');
                //})


                $rootScope.$broadcast("updatestatus", 'loggedin');
                SessionStorageService.setSessionStorage('username', response.username);
                $rootScope.$broadcast("updateHeader", authToken.getToken());
                $rootScope.$broadcast("updateAgent", response.agent);
                //socketioservice.connect();
                var rule = response.rule;
                $rootScope.$broadcast("userrule", rule);

                $state.go('mypage', {}, {
                    reload: true
                });
            }
            /*
            $scope.$on('IdleStart', function () {
                console.log('start');
            });

            $scope.$on('IdleEnd', function () {
                console.log('end');
            });

            $scope.$on('IdleTimeout', function () {
               // $state.go('/', {}, {reload: true});
            });
            */
            function sendResponseError(response)
            {

                $scope.errorToShow = 'כניסה שגויה';
                $scope.loginfailure = true;

                if (cssUpdateTimer != undefined && cssUpdateTimer != null) {
                    $timeout.cancel(cssUpdateTimer);
                    cssUpdateTimer = null;
                }
                var x = document.getElementById('loginfailureid');
                x.className = "animated bounce";

                cssUpdateTimer = $timeout(function () {
                    var x = document.getElementById('loginfailureid');
                    x.className = "";
                }, 1900);
            }
        }
    }
  ])
    /*.config(function (IdleProvider, KeepaliveProvider, myConfig) {
        // configure Idle settings
        IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
        IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
        KeepaliveProvider.interval(myConfig.keepAliveInterval); // in seconds
    })
    .run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
    });
    */
