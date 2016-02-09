'use strict';


app.controller('deletecardController', ['$scope','$state','authToken','myhttphelper','vcRecaptchaService',
    function($scope,$state,authToken,myhttphelper,vcRecaptchaService)
    {


      myhttphelper.doGet('/api/isauth').
        then(sendResponseData1).
        catch(sendResponseError1);

      $scope.capdata = {
         userselect : '??? ????? ?? ?????? ???',
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


      $scope.submit = function(isValid)
      {

        console.log($scope.capdata);
        if ($scope.capdata.userselect == '??? ????? ?? ?????? ???')
        {
           $scope.capdata.userselect = 0;
        }  else {
           $scope.capdata.userselect = 1;
        }
        $scope.capdata.response = vcRecaptchaService.getResponse(); // returns the string response
        if ($scope.capdata.response == undefined || $scope.capdata.response == null || $scope.capdata.response == "")
        {
           alert('?????');
           return;
        }

        myhttphelper.doPost('/api/deleteuser', {capdata : $scope.capdata}).
          then(sendResponseData1).
          catch(sendResponseError1);

        function sendResponseData1(response)
        {
          authToken.RemoveToken();
          console.log(response);
          $state.go('login', {}, {reload: true});
        }
        function sendResponseError1(response)
        {
          authToken.RemoveToken();
          console.log(response);
          $state.go('login', {}, {reload: true});
        }
      }
    }

  ]);
