'use strict';

app.controller('LogoutController', ['$scope', '$state', 'authToken', '$rootScope', 'socketioservice', 'API',
    function ($scope, $state, authToken, $rootScope, socketioservice, API)
    {

        authToken.RemoveToken();
        $state.go('welcome', {}, {
            reload: true
        });
        $rootScope.$broadcast("updateHeader", authToken.getToken());
    }
  ]);

