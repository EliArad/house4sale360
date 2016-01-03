'use strict';


app.controller('HeaderController', ['$scope', '$state', 'authToken', 'API',
                                    'PassServiceParams', 'appCookieStore','socketioservice','$rootScope','SessionStorageService',
    function ($scope, $state, authToken, API, PassServiceParams, appCookieStore,socketioservice,$rootScope,SessionStorageService)
    {

        $scope.isAuthenticated = authToken.isAuthenticated();

        var username = SessionStorageService.getSessionStorage('username');
        if (username != undefined) {
            $scope.hellousername = ' hello ' + username;
        }

        $scope.$on("logoutnow", function (e, someInfoReceived) {

            logout();
        });

        function logout()
        {

        }

        $scope.$on("userrule", function (e, rule) {
            if (rule == 1) {
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }
        });

        $scope.$on("updateHeader", function (e, someInfoReceived) {

            // do the necessary updates here
            $scope.isAuthenticated = authToken.isAuthenticated();
            var username = SessionStorageService.getSessionStorage('username');
            $scope.hellousername = ' hello  ' + username;
         });

    }
  ]);