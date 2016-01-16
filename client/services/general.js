app.factory("general", function ($http, $q, myConfig, appCookieStore) {


    var getStreets = function (code) {
        var url = myConfig.url + '/api/getStreets';
        return $http.post(url, {code: code});
    }

    var getSchonot = function (code) {
        var url = myConfig.url + '/api/getSchonot';
        return $http.post(url, {code: code});
    }

    var getVersion = function (needToReload) {
        var url = myConfig.url + '/api/getVersion';
        $http.get(url).then(function (result) {
            var version = result.data;
            var storeVersion = appCookieStore.get('apt360Version');
            appCookieStore.set('apt360Version', version);
            if (storeVersion == undefined) {
                needToReload(true);
                return;
            } else if (storeVersion != version) {
                needToReload(true);
                return;
            } else {
                needToReload(false);
            }
        });
    }


    var sendMail = function (mailParams) {
        console.log('going to send mail : ' + myConfig.url + "/api/mail/SendEmail");
        return $http.post(myConfig.url + "/api/mail/SendEmail", mailParams).
            then(sendResponseData).
            catch(sendResponseError);
    }

    function sendResponseData(response) {

        return response.data;
    }

    function sendResponseError(response) {

        return $q.reject("error from send " + response.status);
    }

    var SendEmailToUser = function (id, message) {
        var data = {
            'id': id,
            'message': message
        };
        return $http.post(myConfig.url + "/api/mail/SendEmailToUser", data);
    }

    return {
        sendMail: sendMail,
        getStreets: getStreets,
        getSchonot: getSchonot,
        SendEmailToUser: SendEmailToUser,
        getVersion:getVersion
    };
});
