'use strict';

app.controller('adminController', ['$scope', '$state', 'authToken', 'admin',
               'myhttphelper', 'visitors','general','appCookieStore',
    function ($scope, $state, authToken, admin, myhttphelper, visitors,general,appCookieStore) {

        var vm = this;

        var pagename = 'admin';
        var storeVersion = appCookieStore.get(pagename);
        if (storeVersion == undefined) {
            appCookieStore.set(pagename, '0');
            reloadFunction();
        } else {
            var si = parseInt(storeVersion);
            general.checkIfNeedToReload(pagename, si, function (err, version, needToReload) {
                if (err == 'ok' && needToReload == true) {
                    appCookieStore.set(pagename, version);
                    reloadFunction();
                }
            });
        }
        function reloadFunction() {
            window.location.reload(true);
        }


        myhttphelper.doGet('/api/isadmin').then(sendResponseData).catch(sendResponseError);

        function sendResponseData(response) {
            if (response != "88792832321") {
                $state.go('login', {}, {
                    reload: true
                });
            } else {
                visitors.getAllVisitors().then(function (result) {
                    vm.visitors = result.data;
                });
            }
        }

        function sendResponseError() {
            $state.go('login', {}, {reload: true});
        }

        $scope.logoutAllUsers = function () {
            admin.logoutAllUsers();
        }
    }

]);
