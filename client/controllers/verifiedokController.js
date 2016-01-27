'use strict';


app.controller('verifiedokController', ['$scope', '$state', 'authToken', '$http', 'myConfig',
    function ($scope, $state, authToken, $http, myConfig) {

        // check verified
        /*
        var membersAPI = myConfig.url + "/api/general/isverified";
        $http.get(membersAPI).
            then(function (result) {
                console.log(result.data);
            }).
            catch(function (retsult) {

            });
        */

        setTimeout(function(){
            $state.go('login', {}, {
                reload: true
            });
        }, 5000);
    }
])