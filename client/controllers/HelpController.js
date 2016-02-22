'use strict';

  app.controller('HelpController', ['$scope','$state', 'authToken','myhttphelper','general','appCookieStore',
      function($scope,$state, authToken,myhttphelper,general,appCookieStore)
      {

        /*
        var pagename = 'help';
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


        myhttphelper.doGet('/api/isauth').
          then(sendResponseData1).
          catch(sendResponseError1);


        function sendResponseData1(response)
        {
          if (response != "OK")
          {
            $state.go('login', {}, {reload: true});
          }

        }
        function sendResponseError1(response)
        {

          $state.go('login', {}, {reload: true});
        }

        /*
        $scope.$on('IdleStart', function() {
          console.log('start');
        });

        $scope.$on('IdleEnd', function() {
          console.log('end');
        });

        $scope.$on('IdleTimeout', function() {
          window.location.reload(true);
        });*/

      }

  ])/*.config(function (IdleProvider, KeepaliveProvider, myConfig) {
        // configure Idle settings
        IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
        IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
        KeepaliveProvider.interval(myConfig.keepAliveInterval); // in seconds
      })
      .run(function (Idle) {
        // start watching when the app runs. also starts the Keepalive service by default.
        Idle.watch();
      });*/


