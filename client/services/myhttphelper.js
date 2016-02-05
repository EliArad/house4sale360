'use_strict'

app.factory("myhttphelper", ['$http', '$q','myConfig',
    function($http, $q,myConfig) {


        var doApiPost = function (command, params) {
            var url = myConfig.url + "/api/" + command;
            return $http.post(url, params).then(sendResponseData).catch(sendResponseError)

        }
        var doPost = function (command, params) {

            return $http.post(command, params).then(sendResponseData).catch(sendResponseError)

        }
        var doGet = function (command) {
            var url = myConfig.url + command;
            return $http.get(url).then(sendResponseData).catch(sendResponseError)
        }
        var doPut = function (command) {
            var url = myConfig.url + "/api/" + command;
            return $http.put(url).then(sendResponseData).catch(sendResponseError)
        }

        function sendResponseData(response) {
            //console.log(response);
            return response.data;
        }

        function sendResponseError(response) {
            //console.log("error from send " + response);
            return $q.reject("error from send " + response.status);
        }

        return {
            doApiPost: doApiPost,
            doPost: doPost,
            doGet: doGet
        };
    }
]);
