'use strict';


app.controller('LoginController', ['$scope', '$state', 'authToken', '$cookies',
                 '$http', '$rootScope', 'myhttphelper', 'PassServiceParams',
                 'socketioservice', 'SessionStorageService','$timeout','versionReloader',
    function ($scope, $state, authToken, $cookies, $http, $rootScope,
              myhttphelper, PassServiceParams, socketioservice,
              SessionStorageService,$timeout,versionReloader)
    {


        $scope.loginfailure = false;
        var cssUpdateTimer= null;
        $scope.vm = this;

        $scope.vm.login = login;

        $scope.vm.user = {
            password: "",
            email: ""
        };

        versionReloader.addPage(reloadFunction);

        function reloadFunction()
        {
            window.location.reload(true);
        }



        $scope.vm.clearError = function () {
            $scope.loginfailure = false;
        }

        //$scope.vm.user.email =$cookies.get('login_user_name');
        function login() {

            authToken.RemoveToken();

            myhttphelper.doPost('/api/login', $scope.vm.user).
            then(sendResponseData).
            catch(sendResponseError);

            function sendResponseData(response) {

                authToken.setToken(response.token);
                SessionStorageService.setSessionStorage('userid', response.id);


                SessionStorageService.setSessionStorage('username', response.username);
                $rootScope.$broadcast("updateHeader", authToken.getToken());
                $rootScope.$broadcast("updateAgent", response.agent);
                //socketioservice.connect();
                var rule = response.rule;
                $rootScope.$broadcast("userrule", rule);

                $state.go('main', {}, {
                    reload: true
                });
            }

            function sendResponseError(response) {
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

  ]);
