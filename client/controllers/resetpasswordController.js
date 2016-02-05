'use strict';

app.controller('resetpasswordController', ['$scope', '$state', 'authToken','$stateParams',
    function ($scope, $state, authToken,$stateParams)
    {

        var vm = this;
        console.log('eeeeeeeeee');
        $scope.id = $stateParams.id;
        console.log($scope.id);
        if ($scope.id == undefined)
        {
            $state.go('/', {}, {
                reload: false
            });
        }

        vm.user = {
            password : '',
        };

        $scope.onSubmit = function()
        {
            console.log(vm.user);
        }

    }
]);