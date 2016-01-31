'use strict';

app.controller('admincontactusController', ['$scope', '$state', 'authToken','admin','myhttphelper','visitors',
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
                visitors.getContactusMessages().then(function(result){
                    vm.contactusMessages = result.data;

                });
            }
        }
        function sendResponseError()
        {
            $state.go('login', {}, {reload: true});
        }

    }

]);
