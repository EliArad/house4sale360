
'use strict';

app.factory("apiutils", ['$http', 'myConfig',
    function ($http, myConfig) {

        function rotatePicture(pictureName, angle) {

            var membersAPI = myConfig.url + "/api/utils/rotatePicture";
            return $http.post(membersAPI, {name:pictureName, angle: angle});
        }

        return {
            rotatePicture: rotatePicture
        }
    }
]);


