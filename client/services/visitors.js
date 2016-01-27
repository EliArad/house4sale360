app.factory("visitors", function ($cookies, $http, myConfig) {

    function createGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    function getAllVisitors()
    {
        return $http.get(myConfig.url + "/api/general/getallvisitors");
    }

    function determineVisit() {

        var vguid = $cookies.get('apt360visitorguid');
        var userguid;
        if (vguid == undefined) {
            userguid = createGuid();
            var now = new Date();
            var exp1 = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
            $cookies.put('apt360visitorguid', userguid, {expires: exp1});
        } else {
            userguid = $cookies.get('apt360visitorguid');
        }
        $cookies.remove("apt360visitor");
        var d = $cookies.get('apt360visitor');
        if (d == undefined) {

            var now = new Date();
            var exp = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            console.log(exp);

            var data = {
                guid: userguid,
                dated: new Date()
            };
            var s = JSON.stringify(data);
            $cookies.put('apt360visitor', s, {expires: exp});

            return $http.post(myConfig.url + "/api/general/setvisitor", data).
                then(function (result) {

                }).
                catch(function (result) {

                });

        } else {
            console.log(' not a new user');
        }
    }

    function initLocation() {


    }

    return {
        initLocation: initLocation,
        determineVisit: determineVisit,
        getAllVisitors:getAllVisitors
    }

});


