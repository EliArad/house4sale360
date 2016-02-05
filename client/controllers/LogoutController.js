'use strict';

app.controller('LogoutController', ['$scope', '$state', 'authToken', '$rootScope', 'socketioservice',
    function ($scope, $state, authToken, $rootScope, socketioservice)
    {

        authToken.RemoveToken();
        $state.go('/', {}, {
            reload: true
        });
        $rootScope.$broadcast("updateHeader", authToken.getToken());
    }
  ]);

