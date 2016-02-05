'use strict';
app.factory("appCookieStore", ['$cookies',
    function($cookies) {

        var set = function (page, value) {
            $cookies.put(page, value);
        }
        var get = function (page) {
            return $cookies.get(page);
        }
        var get_wd = function (page, d) {
            var c = $cookies.get(page);
            if (typeof c == "undefined") //no errors
                return d;
            return c;
        }
        var remove = function (page) {
            $cookies.remove(page);
        }

        return {
            set: set,
            get: get,
            remove: remove,
            get_wd: get_wd
        };
    }
]);
