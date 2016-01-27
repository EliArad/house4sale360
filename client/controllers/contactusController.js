'use strict';

app.controller('contactusController', ['$scope', '$state', 'authToken', '$http', 'appCookieStore','myConfig',
    function ($scope, $state, authToken, $http, appCookieStore,myConfig) {

        var vm = this;

        vm.contactForm = {
            freetext: '',
            email: '',
            phoneNumber: ''
        };
        $scope.showErrorMessage = false;

        $scope.updateText = function () {
            $scope.showErrorMessage = false;
        }
        $scope.submit = function (valid) {
            console.log(vm.contactForm);

            var membersAPI = myConfig.url + "/api/general/contactus/";

            var m = appCookieStore.get('lastContactusMessage');
            if (m == vm.contactForm.freetext) {
                $scope.errorMessage = "This message was already sent before";
                $scope.showErrorMessage = true;
                return;
            }

            $http.post(membersAPI, vm.contactForm).success(function (result) {
                $scope.changesuccess = true;

                appCookieStore.set('lastContactusMessage', vm.contactForm.freetext);
                var cssUpdateTimer = $timeout(function () {
                    $scope.changesuccess = false;
                    $state.go('main', {}, {reload: true});
                }, 2800);
            }).error(function (result) {
                $scope.errorMessage = result;
                $scope.showErrorMessage = true;
            });

        }

    }

]);
