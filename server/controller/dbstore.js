'use strict';

var secret = require('../common/config').secret;

module.exports = function (sqlserver) {

    return {

        updateSaleHouseDetails: function (req, res, next) {
            console.log('updateSaleHouseDetails');
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {id: req.body.data.id};
                    var query = con.query('UPDATE sellhoursedetails SET ? WHERE ?', [req.body.data, condition], function (err, result) {
                        con.release();
                        console.log(err);
                        if (err) {
                            res.sendStatus(500);
                        } else
                            res.send('ok');
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        updateRentHouseDetails: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {id: req.body.data.id};
                    var query = con.query('UPDATE renthoursedetails SET ? WHERE ?', [req.body.data, condition], function (err, result) {
                        con.release();
                        if (err)
                            res.sendStatus(500);
                        else
                            res.send(rows);
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        getSaleHouseDetails: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {

                    var sql = 'SELECT * FROM sellhoursedetails WHERE id = ' + con.escape(req.body.id);
                    var query = con.query(sql, function (err, rows) {
                        con.release();
                        if (err)
                            res.sendStatus(500);
                        else
                            res.send(rows);
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        getAllSellHouseOfMine: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM sellhoursedetails WHERE userid = ' + con.escape(req.idFromToken);
                    var query = con.query(sql, function (err, rows) {
                        con.release();
                        if (err)
                            res.sendStatus(500);
                        else
                            res.send(rows);
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },
        saveHouseDetails: function (req, res, next) {

            sqlserver.get(function (err, con) {
                if (!err) {
                    req.body.data.userid = req.idFromToken;
                    var query = con.query('INSERT INTO sellhoursedetails SET ?', req.body.data, function (err, result) {
                        con.release();
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.send(result);
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },
        getSaleHousePictureList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {'tableid': req.body.id};
                    var query = con.query('SELECT * FROM salehousepictures WHERE ?', [condition], function (err, rows) {
                        con.release();

                        if (err)
                            res.sendStatus(500);
                        else
                            res.json({
                                rows:rows,
                                userid: req.idFromToken
                            });
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