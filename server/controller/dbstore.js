'use strict';

var secret = require('../common/config').secret;

module.exports = function (sqlserver) {

    return {

        saveHouseDetails: function (req, res, next) {

            sqlserver.get(function (err, con) {
                if (!err) {
                    req.body.data.userid = req.idFromToken;
                    var query = con.query('INSERT INTO sellhoursedetails SET ?', req.body.data, function (err, result) {
                        console.log(err);
                        con.release();
                        if (err)
                            res.sendStatus(500);
                        else
                            res.send('ok');
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },
        saveRentDetails: function (req, res, next) {
            console.log('saveRentDetails');
            res.send('ok');
        },
        getHouseDetails: function (req, res, next) {
            console.log('getHouseDetails');
            res.send('ok');
        },
        getRentDetails: function (req, res, next) {
            console.log('getRentDetails');
            res.send('ok');
        }
    }
};