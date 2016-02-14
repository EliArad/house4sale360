'use strict';

app.controller('admincontactusController', ['$scope', '$state', 'authToken','admin','myhttphelper','visitors','appCookieStore',
    function ($scope, $state, authToken,admin,myhttphelper,visitors,appCookieStore)
    {

        var vm = this;


        var pagename = 'admincontactus';
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

        myhttphelper.doGet('/api/isadmin').
        then(sendResponseData).
        catch(sendResponseError);

        function sendResponseData(response) {
            if (response != "88792832321") {
                $state.go('login', {}, {
                    reload: true
                });
            } else {
                visitors.getContactusMessages().then(function(result){
                    vm.contactusMessages = result.data;

                });
            }
        }
        function sendResponseError()
        {
            $state.go('login', {}, {reload: true});
        }

    }

]);
