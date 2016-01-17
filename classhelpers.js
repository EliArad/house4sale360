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
                for (var i = 1; i < rows.length; i++) {
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
        basicCSV.readCSV('./cities/allcities_sorted.txt', function (error, rows) {

            if (error)
            {
                callback(error,null);
                return;
            }
            var c = [];
            for (var i = 0; i < rows.length; i++) {
                var res = rows[i][0].split("\t");
                c.push({
                        area: res[3],
                        city: res[0],
                        code: res[1],
                        napa: res[2]
                });
            }
            callback(error,c);
        });
    }

    return {
        basic: basic,
        getStreets:getStreets,
        getSchonot:getSchonot
    };
}();

module.exports.siteHelper = Sitehelper;