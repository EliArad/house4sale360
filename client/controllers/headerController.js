'use strict';


app.controller('HeaderController', ['$scope', '$state', 'authToken', 'API',
    'PassServiceParams', 'appCookieStore', 'socketioservice', '$rootScope', 'SessionStorageService',
    function ($scope, $state, authToken, API, PassServiceParams, appCookieStore, socketioservice, $rootScope, SessionStorageService) {

        $scope.isAuthenticated = authToken.isAuthenticated();

        var username = SessionStorageService.getSessionStorage('username');
        if (username != undefined) {
            $scope.hellousername = ' hello ' + username;
        }

        $scope.isAgent = false;

        $scope.partyDetail = function () {
            $state.go('main', {}, {
                reload: true
            });
        }

        $scope.$on("logoutnow", function (e, someInfoReceived) {

            logout();
        });

        function logout() {
            authToken.RemoveToken();
            $state.go('login', {}, {
                reload: true
            });
            $rootScope.$broadcast("updateHeader", authToken.getToken());
        }
        $scope.isAdmin = false;
        var scookie = SessionStorageService.getSessionStorage('apt360isadmin');
        if (scookie != undefined && scookie == 1)
        {
            $scope.isAdmin = 1;
        }

        $scope.$on("userrule", function (e, rule) {
            if (rule == 1) {
                SessionStorageService.setSessionStorage('apt360isadmin', 1);
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }
        });
        function _show(agent)
        {
            if (agent == 'agent')
            {
                $scope.isAgent = true;
            } else {
                $scope.isAgent = false;
            }

            if (agent == 'kablan') {
                $scope.showagentpages = true;
            } else {
                $scope.showagentpages = false;
            }
        }

        var agent = SessionStorageService.getSessionStorage('agentin360');
        _show(agent);
        $scope.$on("updateAgent", function (e, someInfoReceived) {

            var agent = someInfoReceived;
            _show(agent);
            SessionStorageService.setSessionStorage('agentin360', agent);
        });

        $scope.$on("updateHeader", function (e, someInfoReceived) {

            // do the necessary updates here
            $scope.isAuthenticated = authToken.isAuthenticated();
            if ($scope.isAuthenticated == true) {
                var username = SessionStorageService.getSessionStorage('username');
                $scope.hellousername = ' hello  ' + username;
            } else {
                $scope.hellousername = '';
            }
        });
    }
]);
