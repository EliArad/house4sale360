'use strict';

app.controller('usersviewController', ['$scope', '$state', 'authToken','admin','myhttphelper','visitors','general','appCookieStore',
    function ($scope, $state, authToken,admin,myhttphelper,visitors,general,appCookieStore)
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
                    vm.users = result.data;
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
