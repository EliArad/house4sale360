'use strict';

app.factory("admin", ['$http', '$q', 'myConfig',
    function ($http, $q, myConfig) {


        function logoutAllUsers() {
            console.log('logoutAllUsers');
            var membersAPI = myConfig.url + "/api/admin/logoutAllUsers";
            return $http.get(membersAPI).then(sendResponseData).catch(sendResponseError);

        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendResponseError(response) {
            //console.log("error from send " + response);
            return $q.reject("error from send " + response.status);
        }


        function getUsers() {
            var membersAPI = myConfig.url + "/api/admin/getUsers";
            return $http.get(membersAPI);
        }

        return {
            logoutAllUsers: logoutAllUsers,
            getUsers:getUsers
        }
    }
]);
