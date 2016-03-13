'use_strict'

app.factory("visitors", ['$cookies', '$http', 'myConfig',
    function ($cookies, $http, myConfig) {

        function createGuid() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        }


        function getContactusMessages() {
            return $http.get(myConfig.url + "/api/general/getContactusMessages");
        }

        function getAllVisitors() {
            return $http.get(myConfig.url + "/api/general/getallvisitors");
        }


        function mysqlDate(date){
            //date = date || new Date();
            //var d = date.toISOString().split('T')[0];
            var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
            console.log('visitor: ' + d);
            return d;
        }
        function determineVisit(ip) {

            var vguid = $cookies.get('apt360visitorguid');
            var userguid;
            if (vguid == undefined) {
                userguid = createGuid();
                var now = new Date();
                var exp1 = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
                $cookies.put('apt360visitorguid', userguid, {expires: exp1});
            } else {
                userguid = $cookies.get('apt360visitorguid');
                //console.log(userguid);
            }
            //$cookies.remove("apt360visitor");
            var d = $cookies.get('apt360visitor');
            if (d == undefined) {

                var now = new Date();
                var exp = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                //console.log(exp);

                var date = mysqlDate();

                var data = {
                    guid: userguid,
                    dated: date,
                    ip: ip
                };
                var s = JSON.stringify(data);
                $cookies.put('apt360visitor', s, {expires: exp});

                return $http.post(myConfig.url + "/api/general/setvisitor", data).then(function (result) {

                }).catch(function (result) {

                });
            } else {
                // console.log(' not a new user');
                // update entry:
                var date = mysqlDate();
                var data = {
                    guid: userguid,
                    dated: date,
                    ip: ip
                };

                return $http.post(myConfig.url + "/api/general/updatevisitor", data).then(function (result) {

                }).catch(function (result) {

                });
            }
        }

        function initLocation() {


        }

        function saveVisitorSearch(search) {
            var url = myConfig.url + "/api/general/saveVisitorSearch";
            return $http.post(url, search);
        }

        return {
            initLocation: initLocation,
            determineVisit: determineVisit,
            getAllVisitors: getAllVisitors,
            saveVisitorSearch: saveVisitorSearch,
            getContactusMessages: getContactusMessages
        }
    }
]);


