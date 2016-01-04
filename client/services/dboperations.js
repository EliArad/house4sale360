'use_strict'
app.factory('dboperations', function ($http, myConfig) {
    function saveHouseDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/saveHouseDetails";
        return $http.post(membersAPI, {data: data});
    }

    function getHouseDetails() {
        var membersAPI = myConfig.url + "/api/dbstore/" + getHouseDetails;
        return $http.get(membersAPI);
    }

    function saveRentDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/saveRentDetails";
        return $http.post(membersAPI, {data: data});
    }

    function getRentDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/getRentDetails";
        return $http.get(membersAPI);
    }

    function getAllSellHouseOfMine() {
        var membersAPI = myConfig.url + "/api/dbstore/getAllSellHouseOfMine";
        return $http.get(membersAPI);
    }

    function getAllRentHouseOfMine() {
        var membersAPI = myConfig.url + "/api/dbstore/getAllRentHouseOfMine";
        return $http.get(membersAPI);
    }

    function updateSaleHouseDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/updateSaleHouseDetails";
        return $http.post(membersAPI, {data: data});
    }

    function updateRentHouseDetails(data) {
        var membersAPI = myConfig.url + "/api/dbstore/updateRentHouseDetails";
        return $http.post(membersAPI, {data: data});
    }

    function getSaleHouseDetails(id) {
        var membersAPI = myConfig.url + "/api/dbstore/getSaleHouseDetails";
        return $http.post(membersAPI, {id: id});
    }

    function getSaleHousePictureList(id) {
        var membersAPI = myConfig.url + "/api/dbstore/getSaleHousePictureList";
        return $http.post(membersAPI, {id: id});
    }

    return {
        getSaleHousePictureList:getSaleHousePictureList,
        saveHouseDetails: saveHouseDetails,
        getHouseDetails: getHouseDetails,
        saveRentDetails: saveRentDetails,
        getRentDetails: getRentDetails,
        getAllSellHouseOfMine: getAllSellHouseOfMine,
        getAllRentHouseOfMine: getAllRentHouseOfMine,
        updateSaleHouseDetails: updateSaleHouseDetails,
        updateRentHouseDetails: updateRentHouseDetails,
        getSaleHouseDetails:getSaleHouseDetails
    };


});