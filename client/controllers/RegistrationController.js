'use strict';

//(function() {


app.controller('RegistrationController', ['$scope', '$cookieStore', 'Registration', 'general', 'authToken',
    function ($scope, $cookieStore, Registration, general, authToken) {


        //http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx
        var vm = this;
        $scope.pageClass = 'page-home';

        vm.showwaitcircle = true;
        var currentUser = {};
        vm.message = '';
        vm.message1 = '';
        vm.message2 = '';
        vm.errormessage = '';
        $scope.showModal = true;
        $scope.showRegistration =true;


        vm.user = {
            password: '',
            email: '',
            agent:'',
            confirmPassword: ''
        };

        $scope.logout = function () {
            $cookieStore.remove('token');
            currentUser = {};
        }

        $scope.save = function (params) {

            params.agent = false;
            delete params.confirmPassword;
            Registration.save(params,
                function (resp, headers) {
                    //success callback

                    $scope.showRegistration = false;


                    var mailParams = {
                        to: vm.user.email
                    };
                    //general.sendMail(mailParams);

                    authToken.setToken(resp.token);

                    var token = authToken.getToken();
                    console.log(token);
                    Registration.get({
                        registerId: token
                    }, function (currentUser) {
                        //console.log(currentUser.user);

                        var mailParams = {
                            to: currentUser.user.email
                        };
                               
                        general.sendMail(mailParams).
                        then(sendResponseData).
                        catch(sendResponseError);
                    });
                },
                function (err) {
                    if (err.data.error.code == 'ER_DUP_ENTRY') {
                        vm.showwaitcircle = false;
                        vm.errormessage = 'שגיאה - יש אמייל כבר רשום';
                        $('#myModal').modal('show');
                    } else {
                        vm.showwaitcircle = false;
                        alert(err);
                    }
                    
                });
        };

        vm.submit = function (isValid) {

            if ($scope.passStrength < 100) {
                // vm.message = 'password strength should be 100';
                //return;
            }

            if (isValid) {
                vm.showwaitcircle = true;
                $scope.save(vm.user);
            }
        }

        function sendResponseData(response) {
            $scope.showRegistration = false;
            vm.showwaitcircle = false;
            console.log('2');
            //vm.message = 'Registration success - email has been sent to ' + vm.user.email + ' to validate';
            vm.message += 'ההרשמה הצליחה. ';
            vm.message1 += 'אמייל נשלח לכתובת ';
            console.log('3');
            vm.message2 += vm.user.email + ' לאישור';
            console.log('4');

        }

        function sendResponseError(response) {
            vm.showwaitcircle = false;
            alert('שגיאה' + response);
        }
    }
]);

var compareTo = function () {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=compareTo'
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function () {
                ngModel.$validate();
            });
        }
    };
};
app.directive('compareTo', compareTo);

//}());