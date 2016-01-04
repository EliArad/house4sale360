'use_strict'
app.factory('dboperations', function ($http, myConfig)
{
    function saveHouseDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/saveHouseDetails";
        return $http.post(membersAPI, {data:data});
    }
    function getHouseDetails() {
        var membersAPI = myConfig.url + "/api/dbstore/" + getHouseDetails;
        return $http.get(membersAPI);
    }

    function saveRentDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/saveRentDetails";
        return $http.post(membersAPI, {data:data});
    }

    function getRentDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/getRentDetails";
        return $http.get(membersAPI);
    }

    return{
        saveHouseDetails:saveHouseDetails,
        getHouseDetails:getHouseDetails,
        saveRentDetails:saveRentDetails,
        getRentDetails:getRentDetails
    };


});