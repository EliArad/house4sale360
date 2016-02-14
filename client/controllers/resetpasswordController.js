'use strict';

app.controller('resetpasswordController', ['$scope', '$state', 'authToken','$stateParams',
    function ($scope, $state, authToken,$stateParams)
    {


        var pagename = 'resetpassword';
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

        function reloadFunction()
        {
            window.location.reload(true);
        }
        var vm = this;
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