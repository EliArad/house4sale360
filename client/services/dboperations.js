'use_strict'

app.factory('dboperations', ['$http', 'myConfig',
    function ($http, myConfig) {
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

        function getRentHouseDetails(id) {
            var membersAPI = myConfig.url + "/api/dbstore/getRentHouseDetails";
            return $http.post(membersAPI, {id: id});
        }

        function getSaleHouseDetails(id) {
            var membersAPI = myConfig.url + "/api/dbstore/getSaleHouseDetails";
            return $http.post(membersAPI, {id: id});
        }

        function getSaleHousePictureList(id, i, needauth) {
            var membersAPI = myConfig.url + "/api/dbstore/getSaleHousePictureList";
            return $http.post(membersAPI, {id: id, index: i, auth: needauth});
        }


        function SaveUserAuthCode(data) {
            var membersAPI = myConfig.url + "/api/dbstore/SaveUserAuthCode";
            return $http.post(membersAPI, {data: data});
        }

        function MarkReloadToThoseSearchResults(idarray, reload) {
            var membersAPI = myConfig.url + "/api/dbstore/MarkReloadToThoseSearchResults";
            return $http.post(membersAPI, {idarray:idarray, reload: reload});
        }


        function SaveNotes(notes, id)
        {
            var membersAPI = myConfig.url + "/api/dbstore/SaveNotes";
            return $http.post(membersAPI, {notes:notes, id:id});
        }

        function getAgentNotes(id)
        {
            var membersAPI = myConfig.url + "/api/dbstore/getAgentNotes";
            return $http({
                url: membersAPI,
                method: "GET",
                params: {id: id}
            });
        }

        function getMessageUserInformation(id, type) {

            var membersAPI = myConfig.url + "/api/dbstore/getMessageUserInformation";
            return $http({
                url: membersAPI,
                method: "GET",
                params: {id: id, type: type}
            });
        }

        function getRentHousePictureList(id, i, needauth) {
            var membersAPI = myConfig.url + "/api/dbstore/getRentHousePictureList";
            return $http.post(membersAPI, {id: id, index: i, auth: needauth});
        }


        function getSaleHouseVideoList(id, index, needauth) {
            var membersAPI = myConfig.url + "/api/dbstore/getSaleHouseVideoList";
            return $http.post(membersAPI, {id: id, index: index, auth: needauth});
        }

        function getRentHouseVideoList(id, index, needauth) {
            var membersAPI = myConfig.url + "/api/dbstore/getRentHouseVideoList";
            return $http.post(membersAPI, {id: id, index: index, auth: needauth});
        }

        function getRentHouseVideo360List(id) {
            var membersAPI = myConfig.url + "/api/dbstore/getRentHouseVideo360List";
            return $http.post(membersAPI, {id: id});
        }

        function getSaleHouseVideo360List(id) {
            var membersAPI = myConfig.url + "/api/dbstore/getSaleHouseVideo360List";
            return $http.post(membersAPI, {id: id});
        }

        function updateVideo360Name(filename, description, tablename) {
            var membersAPI = myConfig.url + "/api/dbstore/updateVideo360Name";
            return $http.post(membersAPI, {filename: filename ,description:description, tablename:tablename});
        }

        function updateVideoName(filename, description, tablename) {
            var membersAPI = myConfig.url + "/api/dbstore/updateVideoName";
            return $http.post(membersAPI, {filename: filename ,description:description, tablename:tablename});
        }

        function DeletePicture(filename, is360image , isvideo , is360video, filePath, tablename) {
            var membersAPI = myConfig.url + "/api/dbstore/DeletePicture";
            return $http.post(membersAPI, {filename: filename ,
                                           is360image:is360image,
                                           isvideo:isvideo,
                                           is360video:is360video,
                                           filePath:filePath,
                                           tablename:tablename});
        }

        function updateImage360Name(filename, description, tablename) {
            var membersAPI = myConfig.url + "/api/dbstore/updateImage360Name";
            return $http.post(membersAPI, {filename: filename ,description:description, tablename:tablename});
        }

        function getSaleHouse360PictureList(id, i, needauth) {
            var membersAPI = myConfig.url + "/api/dbstore/getSaleHouse360PictureList";
            return $http.post(membersAPI, {id: id, index: i, auth: needauth});
        }

        function getRentHouse360PictureList(id, i, needauth) {
            var membersAPI = myConfig.url + "/api/dbstore/getRentHouse360PictureList";
            return $http.post(membersAPI, {id: id, index: i, auth: needauth});
        }

        function GetHouseQueryResults(query, needauth, type,vguid) {
            console.log(vguid);
            var membersAPI = myConfig.url + "/api/salequery/GetHouseQueryResults";
            return $http.post(membersAPI, {query: query, auth: needauth, type: type , vguid:vguid});
        }

        function GetAllMyResults(userguid, msgid, type) {
            var membersAPI = myConfig.url + "/api/salequery/GetAllMyResults";
            return $http.post(membersAPI , {userguid:userguid, msgid:msgid, type:type});
        }

        function suspendMessage(id, tablename, suspend) {
            var membersAPI = myConfig.url + "/api/dbstore/suspendMessage";
            return $http.post(membersAPI, {id: id, 'tablename': tablename, suspend: suspend});
        }

        function deleteMessage(id, tablename) {
            var membersAPI = myConfig.url + "/api/dbstore/deleteMessage";
            return $http.post(membersAPI, {id: id, 'tablename': tablename});
        }

        function SavePrivacyCode(data) {
            var membersAPI = myConfig.url + "/api/dbstore/SavePrivacyCode";
            return $http.post(membersAPI, {data: data});
        }

        function GetSearchResultByMessageId(id,vguid) {
            var membersAPI = myConfig.url + "/api/salequery/GetSearchResultByMessageId";
            return $http({
                url: membersAPI,
                method: "GET",
                params: {id: id, vguid:vguid}
            });
        }


        return {
            getSaleHousePictureList: getSaleHousePictureList,
            getRentHousePictureList: getRentHousePictureList,
            saveHouseDetails: saveHouseDetails,
            getHouseDetails: getHouseDetails,
            saveRentDetails: saveRentDetails,
            getRentDetails: getRentDetails,
            getAllSellHouseOfMine: getAllSellHouseOfMine,
            getAllRentHouseOfMine: getAllRentHouseOfMine,
            updateSaleHouseDetails: updateSaleHouseDetails,
            updateRentHouseDetails: updateRentHouseDetails,
            getSaleHouseDetails: getSaleHouseDetails,
            getSaleHouse360PictureList: getSaleHouse360PictureList,
            getSaleHouseVideoList: getSaleHouseVideoList,
            getRentHouseVideoList: getRentHouseVideoList,
            getSaleHouseVideo360List: getSaleHouseVideo360List,
            GetHouseQueryResults: GetHouseQueryResults,
            getRentHouse360PictureList: getRentHouse360PictureList,
            suspendMessage: suspendMessage,
            deleteMessage: deleteMessage,
            getRentHouseVideo360List: getRentHouseVideo360List,
            getRentHouseDetails: getRentHouseDetails,
            getMessageUserInformation: getMessageUserInformation,
            GetAllMyResults: GetAllMyResults,
            SavePrivacyCode: SavePrivacyCode,
            updateImage360Name:updateImage360Name,
            updateVideoName:updateVideoName,
            updateVideo360Name:updateVideo360Name,
            DeletePicture:DeletePicture,
            GetSearchResultByMessageId:GetSearchResultByMessageId,
            SaveUserAuthCode:SaveUserAuthCode,
            MarkReloadToThoseSearchResults:MarkReloadToThoseSearchResults,
            SaveNotes:SaveNotes,
            getAgentNotes:getAgentNotes
        };
    }

]);