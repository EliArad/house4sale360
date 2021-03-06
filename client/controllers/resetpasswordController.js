'use strict';

app.controller('resetpasswordController', ['$scope', '$state', 'authToken','$stateParams','myhttphelper',
    function ($scope, $state, authToken,$stateParams,myhttphelper)
    {

        $scope.showmsg = false;
        /*
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
        */
        function reloadFunction()
        {
            window.location.reload(true);
        }
        var vm = this;
        $scope.id = $stateParams.id;
        //console.log($scope.id);
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
            vm.user.guid = $scope.id;
            console.log(vm.user);
            myhttphelper.doPost('/api/updateuserpassword', {user: vm.user}).then(function(result)
            {
                $scope.showmsg = true;

                $scope.errormessagetouser = 'ססמא שונתה בהצלחה אתה מועבר כעט למסך כניסה';

                setTimeout(function() {
                    $state.go('login', {}, {
                        reload: false
                    });
                }, 2000);
            }).catch(function(result){
                $scope.showmsg = true;
                $scope.errormessagetouser = 'שגיאה קרתה בהחלפת ססמא';

                setTimeout(function() {
                    $scope.showmsg = false;
                }, 3000);

            })
        }

    }
]);