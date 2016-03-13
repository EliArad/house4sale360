'use strict';


app.controller('deletecardController', ['$scope','$state','authToken','myhttphelper','vcRecaptchaService','general','appCookieStore',
    function($scope,$state,authToken,myhttphelper,vcRecaptchaService,general,appCookieStore)
    {

      /*
      var pagename = 'deletecard';
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

      $scope.capdata = {
         userselect : 0,
         response:''
      };

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

      $('#apt360msgbox').on('hidden.bs.modal', function () {

          $state.go('logout', {}, {reload: true});
      });
      /*
      $scope.$on('IdleStart', function() {
        console.log('start');
      });

      $scope.$on('IdleEnd', function() {
        console.log('end');
      });
      */
      $scope.$on('IdleTimeout', function() {
        $state.go('/', {}, {reload: true});
      });

      $scope.submit = function(isValid)
      {


        try {
          $scope.capdata.userselect = parseInt($scope.capdata.userselect);
          $scope.capdata.response = vcRecaptchaService.getResponse(); // returns the string response
          if ($scope.capdata.response == undefined || $scope.capdata.response == null || $scope.capdata.response == "") {
            alert('שגיאה');
            return;
          }

          myhttphelper.doPost('/api/deleteuser', {capdata: $scope.capdata}).then(function(result){

            switch ($scope.capdata.userselect) {
              case 0:
                $scope.MessageToUser = 'הכרטיס שלך הושעה.';
                $scope.MessageToUser += '\n';
                $scope.MessageToUser += '.כל ההודעות שלך לא יופיעו בחיפוש עד שתתחבר שוב';
                $scope.MessageToUser += '\n';
                $scope.MessageToUser += '.כניסה מחודשת לאתר מוציאה מהשעייה';
                $scope.MessageToUser += '\n';
                $scope.MessageToUser += '\n';
                $scope.MessageToUser += 'הנכם מועברים לעמוד הבית';

              break;
              case 1:
                $scope.MessageToUser = '.הכרטיס שלך נמחק כולל רישום המייל, הססמא, התמונות, וכל המידע';
                $scope.MessageToUser += '\n';
                $scope.MessageToUser += '.בשביל לפרסם שוב מודעות צריך לפתוח כרטיס חדש ';
                $scope.MessageToUser += 'הנכם מועברים לעמוד הבית';
              break;
            }
            $('#apt360msgbox').modal('show');


          }).catch(function(result){
            $scope.MessageToUser = '.קרתה שגיאה והפעולה לא הצליחה';
            $scope.MessageToUser += 'הנכם מועברים לעמוד הבית';
            $('#apt360msgbox').modal('show');
          });
        }
        catch (e)
        {
            location.reload();
        }
      }
    }

  ])
    /*.config(function (IdleProvider, KeepaliveProvider, myConfig) {
      // configure Idle settings
      IdleProvider.idle(myConfig.idletimeSeconds); // in seconds
      IdleProvider.timeout(myConfig.timeoutSeconds); // in seconds
      KeepaliveProvider.interval(myConfig.keepAliveInterval); // in seconds
    })
    .run(function (Idle) {
      // start watching when the app runs. also starts the Keepalive service by default.
      Idle.watch();
    });*/

