'use strict';

app.controller('usersviewController', ['$scope', '$state', 'authToken','admin','myhttphelper','visitors',
    function ($scope, $state, authToken,admin,myhttphelper,visitors)
    {

        var vm = this;


        myhttphelper.doGet('/api/isadmin').
        then(sendResponseData).
        catch(sendResponseError);

        function sendResponseData(response) {
            if (response != "88792832321") {
                $state.go('login', {}, {
                    reload: true
                });
            } else {
                admin.getUsers().then(function(result){
                    if (vm.users != undefined) {
                        vm.users = result.data;
                    } else {
                        alert('error');
                    }
                }).catch(function(result){
                    alert('error');
                })
            }
        }
        function sendResponseError()
        {
            $state.go('login', {}, {reload: true});
        }


    }

]);
