'use_strict'
app.factory("general", ['$http', '$q', 'myConfig', 'appCookieStore',
    function ($http, $q, myConfig, appCookieStore) {


        var getStreets = function (code) {
            var url = myConfig.url + '/api/getStreets';
            return $http.post(url, {code: code});
        }

        var getSchonot = function (code) {
            var url = myConfig.url + '/api/getSchonot';
            return $http.post(url, {code: code});
        }

        var checkIfNeedToReload = function (pageNameToCheck, storeVersion, needToReload) {
            var url = myConfig.url + '/api/getVersion';
            $http.post(url, {pageName:pageNameToCheck}).then(function (result) {
                var version = result.data;
                if (storeVersion == undefined) {
                    needToReload('ok',version, true);
                    return;
                } else if (storeVersion != version) {
                    needToReload('ok',version, true);
                    return;
                } else {
                    needToReload('ok',version, false);
                }
            }).catch(function(result){
                needToReload('fail',0, false);
            })
        }

        var SendEmailToPerson = function(email, name, message)
        {

            return $http.post(myConfig.url + "/api/mail/SendEmailToPerson",
                {email:email, message:message, name:name});
        }

        var isValidGuid = function (userguid) {
            return $http.post(myConfig.url + "/api/isValidGuid" , {userguid:userguid});
        }

        var getuserguid = function () {
            return $http.get(myConfig.url + "/api/getuserguid");
        }

        var sendMail = function (mailParams) {
            console.log('going to send mail : ' + myConfig.url + "/api/mail/SendEmail");
            return $http.post(myConfig.url + "/api/mail/SendEmail", mailParams).then(sendResponseData).catch(sendResponseError);
        }

        function sendResponseData(response) {

            return response.data;
        }

        function sendResponseError(response) {

            return $q.reject("error from send " + response.status);
        }

        function getCookieExp() {
            var now = new Date(),
            // this will set the expiration to 12 months
                exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
            return exp;
        }

        function isMobile() {

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
            /*
             if ($(window).width() < 768) {
             return true;
             }
             else if ($(window).width() >= 768 &&  $(window).width() <= 992) {
             return true;
             }
             else if ($(window).width() > 992 &&  $(window).width() <= 1200) {
             return false;
             }
             else  {
             return false;
             }
             return false;
             */
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
            checkIfNeedToReload: checkIfNeedToReload,
            getCookieExp: getCookieExp,
            isMobile: isMobile,
            getuserguid:getuserguid,
            isValidGuid:isValidGuid,
            SendEmailToPerson:SendEmailToPerson
        };
    }
]);
