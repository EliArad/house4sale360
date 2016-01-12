app.factory("citiesservice", function($http, $q,myConfig)
{
    var citiesData = [];

    function getcities(callback)
    {
        if (citiesData.length == 0) {
            //console.log('loading cities');
            var url = myConfig.url + '/api/getcities';
            $http.get(url).then(function(result){
                citiesData = result;
                callback(null, result);
            }).catch(function(result){
                citiesData = [];
                callback('error', result);
            });
        } else {
            console.log('cities is already loaded');
            callback(null, citiesData);
        }
    }

    return {
        getcities:getcities
    }

  });
