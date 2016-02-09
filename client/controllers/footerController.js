'use strict';

app.controller('footerController', ['$scope', '$state', 'authToken','$rootScope',
    function ($scope, $state, authToken,$rootScope) {


        $scope.isAuth = false;

        var token = authToken.getToken();
        if (token != undefined)
        {
            $scope.isAuth = true;
        } else {
            $scope.isAuth = false;
        }

    }
]);