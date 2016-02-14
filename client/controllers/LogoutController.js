'use strict';

app.controller('LogoutController', ['$scope', '$state', 'authToken', '$rootScope',
                'socketioservice','appCookieStore','general',
    function ($scope, $state, authToken, $rootScope, socketioservice,appCookieStore,general)
    {


        var pagename = 'logout';
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



        authToken.RemoveToken();
        $rootScope.$broadcast("updateHeader", authToken.getToken());
        $rootScope.$broadcast("updatestatus", 'loggedin');

        document.getElementById('fotdeletaccountid').style.display = 'none';
        document.getElementById('fotmymessagesid').style.display = 'none';
        document.getElementById('publishsale').style.display = 'none';
        document.getElementById('publishrent').style.display = 'none';

        $state.go('/', {}, {
            reload: true
        });
    }
  ]);

