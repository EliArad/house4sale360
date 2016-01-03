'use strict';


app.controller('MainController', ['$scope', '$state', 'authToken', 'myhttphelper', 'myutils',
  'appCookieStore', 'socketioservice', 'Idle', '$rootScope',
  'SessionStorageService', 'API', 'myConfig', '$http', '$window', '$timeout','$msgbox',
  function ($scope, $state, authToken, myhttphelper, myutils,
            appCookieStore, socketioservice, Idle, $rootScope, SessionStorageService,
            API, myConfig, $http, $window, $timeout,$msgbox) {

    myhttphelper.doGet('/isauth').
      then(sendResponseData).
      catch(sendResponseError);


    $scope.text = 'גכלחגיכלגחכילגכ';

    function sendResponseData(response) {
      if (response != "OK") {
        $state.go('login', {}, {
          reload: true
        });
      } else {


      }
    }

    function sendResponseError(response) {
      $state.go('login', {}, {
        reload: true
      });
    }

    function UsersError(result) {

    }


    $(window).scroll(function () {
      if ($scope.allthumberspictures == false) {
        return;
      }
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {


      }
    });
  } // the controller closing
]).config(function (IdleProvider, KeepaliveProvider, myConfig) {
  // configure Idle settings
  IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
  IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
  KeepaliveProvider.interval(2); // in seconds
})
  .run(function (Idle) {
    // start watching when the app runs. also starts the Keepalive service by default.
    Idle.watch();
  });
