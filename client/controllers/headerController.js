'use strict';


app.controller('HeaderController', ['$scope', '$state', 'authToken',
    'PassServiceParams', 'appCookieStore', 'socketioservice', '$rootScope', 'SessionStorageService',
    function ($scope, $state, authToken, PassServiceParams, appCookieStore, socketioservice, $rootScope, SessionStorageService) {

        $scope.isAuthenticated = authToken.isAuthenticated();

        var username = SessionStorageService.getSessionStorage('username');
        if (username != undefined) {
            $scope.hellousername = ' hello ' + username;
        }

        $scope.isAgent = false;

        $scope.partyDetail = function () {
            document.getElementById('searchlink').style.backgroundColor = 'lightgray';
            document.getElementById('homelink').style.backgroundColor = null;
            document.getElementById('vrlink').style.backgroundColor = null;
            $state.go('main', {}, {
                reload: true
            });
        }

        $scope.$on("logoutnow", function (e, someInfoReceived) {

            logout();
        });


        $scope.paintback = function(id)
        {
            switch(id) {
                case 1:
                    document.getElementById('homelink').style.backgroundColor = 'lightgray';
                    document.getElementById('searchlink').style.backgroundColor = null;
                    document.getElementById('vrlink').style.backgroundColor = null;
                 break;
                case 2:
                    document.getElementById('homelink').style.backgroundColor = null;
                    document.getElementById('searchlink').style.backgroundColor = null;
                    document.getElementById('vrlink').style.backgroundColor = 'lightgray';
                 break;
                case 3:
                    document.getElementById('homelink').style.backgroundColor = null;
                    document.getElementById('searchlink').style.backgroundColor = null;
                    document.getElementById('vrlink').style.backgroundColor = null;
                 break;
            }
        }
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
                document.getElementById('fotdeletaccountid').style.display = 'block';
                document.getElementById('fotmymessagesid').style.display = 'block';
                document.getElementById('publishsale').style.display = 'block';
                document.getElementById('publishrent').style.display = 'block';
            } else {
                document.getElementById('fotdeletaccountid').style.display = 'none';
                document.getElementById('fotmymessagesid').style.display = 'none';
                document.getElementById('publishsale').style.display = 'none';
                document.getElementById('publishrent').style.display = 'none';
                $scope.hellousername = '';
            }
        });
    }
]);
