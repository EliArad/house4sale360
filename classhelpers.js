var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var basicCSV = require("basic-csv");
var cityDataObject = [];

// constractor - revealing prototype pattern
var Sitehelper = function () {
    //console.log("Sitehelper constractor");
}

Sitehelper.prototype = function () {


    var getSchonot = function (code, callback) {

        var fileName = './cities/schonot/' + code + '.txt';


        basicCSV.readCSV(fileName, function (error, rows) {
            if (error) {
                callback(error, c);
                return;
            } else {
                var c = [];
                for (var i = 0; i < rows.length; i++) {
                    c.push({
                        name: rows[i][0]
                    });
                }
                callback(error, c);
            }
        });
    }

    var getStreets = function (code, callback) {
        var fileName = './cities/Streets/' + code + '.txt';

        basicCSV.readCSV(fileName, function (error, rows) {
            if (error) {
                callback(error, c);
            } else {
                var c = [];
                for (var i = 0; i < rows.length; i++) {
                    c.push({
                        name: rows[i][0]
                    });
                }
                callback(error, c);
            }
        });

    }

    var basic = function (callback) {
        var data = [];
        basicCSV.readCSV('./cities/_ezormerkaz.txt', function (error, rows) {

            if (error)
            {
                callback(error,null);
                return;
            }
            var c = [];
            for (var i = 0; i < rows.length; i++) {
                var res = rows[i][0].split("\t");
                c.push({
                        area: 'merkaz',
                        city: res[0],
                        code: res[1],
                        napa: res[2]
                });
            }

            basicCSV.readCSV('./cities/_telaviv.txt', function (error, rows) {
                if (error)
                {
                    callback(error,null);
                    return;
                }
                for (var i = 0; i < rows.length; i++) {
                    var res = rows[i][0].split("\t");
                    c.push({
                        area: 'telaviv',
                        city: res[0],
                        code: res[1],
                        napa: res[2]
                    });
                }


                basicCSV.readCSV('./cities/_haifa.txt', function (error, rows) {

                    for (var i = 0; i < rows.length; i++) {
                        var res = rows[i][0].split("\t");
                        c.push({
                            area: 'haifa',
                            city: res[0],
                            code: res[1],
                            napa: res[2]
                        });
                    }

                    if (error)
                    {
                        callback(error,null);
                        return;
                    }


                    basicCSV.readCSV('./cities/_darom.txt', function (error, rows) {

                        if (error)
                        {
                            callback(error,null);
                            return;
                        }

                        for (var i = 0; i < rows.length; i++) {
                            var res = rows[i][0].split("\t");
                            c.push({
                                area: 'darom',
                                city: res[0],
                                code: res[1],
                                napa: res[2]
                            });
                        }

                        basicCSV.readCSV('./cities/_zafon.txt', function (error, rows) {
                            if (error)
                            {
                                callback(error,null);
                                return;
                            }
                            for (var i = 0; i < rows.length; i++) {
                                var res = rows[i][0].split("\t");
                                c.push({
                                    area: 'zafon',
                                    city: res[0],
                                    code: res[1],
                                    napa: res[2]
                                });
                            }
                            basicCSV.readCSV('./cities/_jerusalem.txt', function (error, rows) {
                                if (error)
                                {
                                    callback(error,null);
                                    return;
                                }
                                for (var i = 0; i < rows.length; i++) {
                                    var res = rows[i][0].split("\t");
                                    c.push({
                                        area: 'jerusalem',
                                        city: res[0],
                                        code: res[1],
                                        napa: res[2]
                                    });
                                }
                                callback(error,c);
                            });
                        });
                    });
                });
            });
        });
    }

    return {
        basic: basic,
        getStreets:getStreets,
        getSchonot:getSchonot
    };
}();

module.exports.siteHelper = Sitehelper;