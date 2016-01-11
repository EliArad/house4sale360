'use strict';

var secret = require('../common/config').secret;

module.exports = function (sqlserver) {

    return {
        getSaleHouseVideoList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {'tableid': req.body.id};
                    var sql = 'SELECT * FROM salehousevideos WHERE tableid = ' + con.escape(req.body.id) + ' AND is360video = false';
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);

                        if (err)
                            res.sendStatus(500);
                        else
                            res.json({
                                rows: rows,
                                userid: req.idFromToken
                            });
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },
        getSaleHouseVideo360List: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {'tableid': req.body.id};
                    var sql = 'SELECT * FROM salehousevideos WHERE tableid = ' + con.escape(req.body.id) + ' AND is360video = true';
                    var query = con.query(sql, function (err, rows) {
                        if (err) {
                            sqlserver.release(con);
                            res.sendStatus(500);
                        } else {
                            sqlserver.release(con);
                            res.json({
                                rows: rows,
                                userid: req.idFromToken
                            });
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        updateSaleHouseDetails: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {id: req.body.data.id};
                    var query = con.query('UPDATE sellhousedetails SET ? WHERE ?', [req.body.data, condition], function (err, result) {
                        sqlserver.release(con);
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
                        sqlserver.release(con);
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
                    var sql = 'SELECT * FROM sellhousedetails WHERE id = ' + con.escape(req.body.id);
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
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
                    var sql = 'SELECT * FROM sellhousedetails WHERE userid = ' + con.escape(req.idFromToken);
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
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
                    var query = con.query('INSERT INTO sellhousedetails SET ?', req.body.data, function (err, result) {
                        sqlserver.release(con);
                        if (err) {
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

                    var sql;
                    if (req.body.auth == false)
                    {
                        sql = 'SELECT salehousepictures.*,sellhousedetails.userid\
                        FROM salehousepictures\
                        INNER JOIN sellhousedetails\
                        ON salehousepictures.tableid = sellhousedetails.id\
                        WHERE salehousepictures.is360image = false AND salehousepictures.tableid = ' + con.escape(req.body.id);
                    } else {
                        //sql = 'SELECT * FROM salehousepictures WHERE tableid = ' + con.escape(req.body.id) + ' AND is360image = false';
                        sql = 'SELECT salehousepictures.*,sellhousedetails.userid\
                        FROM salehousepictures\
                        INNER JOIN sellhousedetails\
                        ON salehousepictures.tableid = sellhousedetails.id\
                        WHERE salehousepictures.is360image = false AND salehousepictures.tableid = ' + con.escape(req.body.id) + ' AND sellhousedetails.userid = ' + req.idFromToken;
                    }
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err)
                            res.sendStatus(500);
                        else
                            res.json({
                                rows: rows,
                                index: req.body.index,
                                userid: req.idFromToken
                            });
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        getSaleHouse360PictureList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {'tableid': req.body.id};

                    var sql;
                    if (req.body.auth == false) {
                        sql = 'SELECT salehousepictures.*,sellhousedetails.userid\
                        FROM salehousepictures\
                        INNER JOIN sellhousedetails\
                        ON salehousepictures.tableid = sellhousedetails.id\
                        WHERE salehousepictures.is360image = true AND salehousepictures.tableid = ' + con.escape(req.body.id);
                    } else {
                        sql = 'SELECT salehousepictures.*,sellhousedetails.userid\
                        FROM salehousepictures\
                        INNER JOIN sellhousedetails\
                        ON salehousepictures.tableid = sellhousedetails.id\
                        WHERE salehousepictures.is360image = true AND salehousepictures.tableid = ' + con.escape(req.body.id) + ' AND sellhousedetails.id = ' + req.idFromToken ;
                    }
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err)
                            res.sendStatus(500);
                        else {
                            res.json({
                                rows: rows,
                                index: req.body.index
                            });
                        }
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
        },
        GetSaleHouseQueryResults: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM sellhousedetails';
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            return res.sendStatus(500);
                        } else {
                            return res.send(rows);
                        }
                    });
                } else {
                    return res.sendStatus(500);
                }
            });
        }
    }
};