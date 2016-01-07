app.service('citiesservice', ['$http', function ($http)
{
    var citiesData = [];

    function getcities(callback)
    {
        if (citiesData.length == 0) {
            console.log('loading cities');
            var url = 'http://192.168.22.32:3000/api/getcities';
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

}]);
