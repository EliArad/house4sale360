'use_strict'
app.factory("SchonotBackg", ['$http', 'myConfig', 'appCookieStore',
    function ($http, myConfig, appCookieStore) {

        var schonotCollections = [];

        var getCollection = function (code) {
            try {

                for (var i = 0; i < schonotCollections.length; i++) {
                    if (schonotCollections[i].code == code) {
                        return schonotCollections[i].data;
                    }
                }
            }
            catch (e) {

            }
        }

        var getStreets = function (code) {
            var url = myConfig.url + '/api/tasks/getSchonotbackground';
            $http.post(url, {code: code}).then(function (result) {

                var d = {
                    code: code,
                    data: result.data
                };
                schonotCollections.push(d);
                console.log('done getting collection : ' + code);
            })
        }

        return {
            getStreets: getStreets,
            getCollection: getCollection
        };
    }
]);

