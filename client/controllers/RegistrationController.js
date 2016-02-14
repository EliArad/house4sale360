'use strict';

app.controller('RegistrationController', ['$scope', '$cookieStore', 'Registration', 'general', 'authToken','$state','vcRecaptchaService',
    function ($scope, $cookieStore, Registration, general, authToken,$state,vcRecaptchaService) {


        //http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx
        var vm = this;
        $scope.pageClass = 'page-home';

        vm.showwaitcircle = false;
        var currentUser = {};
        vm.message = '';
        vm.message1 = '';
        vm.message2 = '';
        vm.errormessage = '';
        $scope.showModal = true;
        $scope.showRegistration =true;
        $scope.showloginbtn = false;


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

        function mysqlDate(date){
            date = date || new Date();
            return date.toISOString().split('T')[0];
        }

        $scope.save = function (params) {

            switch (params.agent)
            {
                case 'קבלן':
                    params.agent = 'kablan';
                break;
                case 'מתווך':
                    params.agent = 'agent';
                break;
                case 'פרטי':
                    params.agent = 'private';
                break;
            }

            params.dated = mysqlDate();
            //delete params.confirmPassword;
            Registration.save(params,
                function (resp, headers) {
                    //success callback

                    $scope.showRegistration = false;

                    var email = vm.user.email.toLowerCase();

                    var mailParams = {
                        to: email
                    };
                    //general.sendMail(mailParams);

                    authToken.setToken(resp.token);
                    var token = authToken.getToken();
                    Registration.get({
                        registerId: resp.token
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
                    try {
                        if (err.data.error.code == 'ER_DUP_ENTRY') {
                            vm.showwaitcircle = false;
                            vm.errormessage = 'שגיאה - יש אמייל כבר רשום';
                            $('#myModal').modal('show');
                        } else {
                            vm.showwaitcircle = false;
                            alert(err);
                        }
                    }
                    catch (e)
                    {
                        vm.showwaitcircle = false;
                        $scope.showerrormessage = true;
                        $scope.messagetoshow = err.data;
                    }
                });
        };

        vm.submit = function (isValid) {

            if ($scope.passStrength < 1) {
                $scope.showerrormessage = true;
                $scope.messagetoshow = 'חוזק הססמא צריל להיות 80.';
                $scope.messagetoshow += 'השתמש באות גדולה אחת לפחות'
                $scope.messagetoshow += 'השתמש באחד מהסימנים !@#$%^&*';
                return;
            }

            vm.user.response = vcRecaptchaService.getResponse(); // returns the string response

            if (isValid) {
                vm.showwaitcircle = true;
                vm.user.email = vm.user.email.toLowerCase();
                $scope.save(vm.user);
            }
        }
        $scope.MoveToLoginPage = function()
        {
            $state.go('login', {}, {
                reload: false
            });
        }

        function sendResponseData(response) {
            authToken.RemoveToken();
            $scope.showRegistration = false;
            vm.showwaitcircle = false;
            //vm.message = 'Registration success - email has been sent to ' + vm.user.email + ' to validate';
            vm.message += 'ההרשמה הצליחה. ';
            vm.message1 += 'אמייל נשלח לכתובת ';
            vm.message2 += vm.user.email + ' לאישור';
            $scope.showloginbtn = true;
        }


        function sendResponseError(response) {
            authToken.RemoveToken();
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