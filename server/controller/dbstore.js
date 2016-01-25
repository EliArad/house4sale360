'use strict';

var secret = require('../common/config').secret;

module.exports = function (sqlserver) {

    return {

        getRentHouseVideoList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql;
                    if (req.body.auth == true) {
                        sql = 'SELECT renthouseblobs.*,renthousedetails.userid\
                        FROM renthouseblobs\
                        INNER JOIN renthousedetails\
                        ON renthouseblobs.tableid = renthousedetails.id\
                        AND renthouseblobs.isvideo = true\
                        WHERE renthouseblobs.is360video = false AND renthouseblobs.tableid = ' + con.escape(req.body.id) + ' AND renthousedetails.userid = ' + req.idFromToken;
                    } else {
                        sql = 'SELECT renthouseblobs.*,renthousedetails.userid\
                        FROM renthouseblobs\
                        INNER JOIN renthousedetails\
                        ON renthouseblobs.tableid = renthousedetails.id\
                        AND salehouseblobs.isvideo = true\
                        WHERE renthouseblobs.is360video = false AND renthouseblobs.tableid = ' + con.escape(req.body.id);
                    }
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


        getSaleHouseVideoList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql;
                    if (req.body.auth == true) {
                        sql = 'SELECT salehouseblobs.*,sellhousedetails.userid\
                        FROM salehouseblobs\
                        INNER JOIN sellhousedetails\
                        ON salehouseblobs.tableid = sellhousedetails.id\
                        AND salehouseblobs.isvideo = true\
                        WHERE salehouseblobs.is360video = false AND salehouseblobs.tableid = ' + con.escape(req.body.id) + ' AND sellhousedetails.userid = ' + req.idFromToken;
                    } else {
                        sql = 'SELECT salehouseblobs.*,sellhousedetails.userid\
                        FROM salehouseblobs\
                        INNER JOIN sellhousedetails\
                        ON salehouseblobs.tableid = sellhousedetails.id\
                        AND salehouseblobs.isvideo = true\
                        WHERE salehouseblobs.is360video = false AND salehouseblobs.tableid = ' + con.escape(req.body.id);
                    }
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

        getRentHouseVideo360List: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM renthouseblobs WHERE tableid = ' + con.escape(req.body.id) + ' AND isvideo = true AND is360video = true';
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

        getSaleHouseVideo360List: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM salehouseblobs WHERE tableid = ' + con.escape(req.body.id) + ' AND isvideo = true AND is360video = true';
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
                        console.log(err);
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
                    var query = con.query('UPDATE renthousedetails SET ? WHERE ?', [req.body.data, condition], function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else
                            res.send(rows);
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        getRentHouseDetails: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM renthousedetails WHERE id = ' + con.escape(req.body.id);
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

        getAllRentHouseOfMine: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = 'SELECT * FROM renthousedetails WHERE userid = ' + con.escape(req.idFromToken);
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
                    var datesql = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    req.body.data.dateEnter = datesql;
                    req.body.data.suspend = 0;
                    var query = con.query('INSERT INTO sellhousedetails SET ?', req.body.data, function (err, result) {
                        sqlserver.release(con);
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.send(result);
                        }
                    });
                } else {
                    console.log(err);
                    res.sendStatus(500);
                }
            });
        },
        getSaleHousePictureList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {'tableid': req.body.id};

                    var sql;
                    if (req.body.auth == false) {
                        sql = 'SELECT salehouseblobs.*,sellhousedetails.userid\
                        FROM salehouseblobs\
                        INNER JOIN sellhousedetails\
                        ON salehouseblobs.tableid = sellhousedetails.id\
                        AND salehouseblobs.isvideo = false\
                        WHERE salehouseblobs.is360image = false AND salehouseblobs.tableid = ' + con.escape(req.body.id);
                    } else {
                        sql = 'SELECT salehouseblobs.*,sellhousedetails.userid\
                        FROM salehouseblobs\
                        INNER JOIN sellhousedetails\
                        ON salehouseblobs.tableid = sellhousedetails.id\
                        WHERE salehouseblobs.is360image = false\
                        AND salehouseblobs.isvideo = false\
                        AND salehouseblobs.tableid = ' + con.escape(req.body.id) + ' AND sellhousedetails.userid = ' + req.idFromToken;
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
        getRentHouse360PictureList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {'tableid': req.body.id};

                    var sql;
                    if (req.body.auth == false) {
                        sql = 'SELECT renthouseblobs.*,renthousedetails.userid\
                        FROM renthouseblobs\
                        INNER JOIN renthousedetails\
                        ON renthouseblobs.tableid = renthousedetails.id\
                        AND renthouseblobs.isvideo = false\
                        WHERE renthouseblobs.is360image = true AND renthouseblobs.tableid = ' + con.escape(req.body.id);
                    } else {
                        sql = 'SELECT renthouseblobs.*,renthousedetails.userid\
                        FROM renthouseblobs\
                        INNER JOIN renthousedetails\
                        ON renthouseblobs.tableid = renthousedetails.id\
                        AND renthouseblobs.isvideo = false\
                        WHERE renthouseblobs.is360image = true AND renthouseblobs.tableid = ' + con.escape(req.body.id) + ' AND renthousedetails.userid = ' + req.idFromToken;
                    }
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err)
                            res.sendStatus(500);
                        else {
                            res.json({
                                rows: rows,
                                index: req.body.index,
                                userid: req.idFromToken
                            });
                        }
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
                        sql = 'SELECT salehouseblobs.*,sellhousedetails.userid\
                        FROM salehouseblobs\
                        INNER JOIN sellhousedetails\
                        ON salehouseblobs.tableid = sellhousedetails.id\
                        AND salehouseblobs.isvideo = false\
                        WHERE salehouseblobs.is360image = true AND salehouseblobs.tableid = ' + con.escape(req.body.id);
                    } else {
                        sql = 'SELECT salehouseblobs.*,sellhousedetails.userid\
                        FROM salehouseblobs\
                        INNER JOIN sellhousedetails\
                        ON salehouseblobs.tableid = sellhousedetails.id\
                        AND salehouseblobs.isvideo = false\
                        WHERE salehouseblobs.is360image = true AND salehouseblobs.tableid = ' + con.escape(req.body.id) + ' AND sellhousedetails.userid = ' + req.idFromToken;
                    }
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err)
                            res.sendStatus(500);
                        else {
                            res.json({
                                rows: rows,
                                index: req.body.index,
                                userid: req.idFromToken
                            });
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },
        saveRentDetails: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    req.body.data.userid = req.idFromToken;
                    var datesql = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    req.body.data.dateEnter = datesql;
                    req.body.data.suspend = 0;
                    var query = con.query('INSERT INTO renthousedetails SET ?', req.body.data, function (err, result) {
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
        getHouseDetails: function (req, res, next) {
            console.log('getHouseDetails');
            res.send('ok');
        },
        getRentDetails: function (req, res, next) {
            console.log('getRentDetails');
            res.send('ok');
        },
        suspendMessage: function (req, res, next) {

            sqlserver.get(function (err, con) {
                if (!err) {
                    console.log(req.body);
                    if (req.body.tablename == 'sale') {
                        con.query('UPDATE sellhousedetails SET ? WHERE ?', [{suspend: req.body.suspend}, {id: req.body.id}], function (err, result) {
                            sqlserver.release(con);
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            } else {
                                console.log(result);
                                return res.send('ok');
                            }
                        });
                    } else {
                        if (req.body.tablename == 'rent') {
                            con.query('UPDATE renthousedetails SET ? WHERE ?', [{suspend: req.body.suspend}, {id: req.body.id}], function (err, result) {
                                sqlserver.release(con);
                                if (err) {
                                    return res.status(500).send(err);
                                } else {
                                    return res.send('ok');
                                }
                            });
                        } else {
                            sqlserver.release(con);
                            return res.status(500).send('error');
                        }
                    }
                }
            });
        },
        deleteMessage: function (req, res, next) {
            console.log('deleteMessage');
            res.send('ok');
        },
        getMessageUserInformation: function (req, res, next) {
            var sql;
            //console.log(req.query);
            sqlserver.get(function (err, con) {
                if (req.query.type == 0)
                    sql = 'SELECT * FROM sellhousedetails WHERE id = ' + con.escape(req.query.id);
                else if (req.query.type == 1)
                    sql = 'SELECT * FROM renthousedetails WHERE id = ' + con.escape(req.query.id);
                var query = con.query(sql, function (err, rows) {
                    sqlserver.release(con);
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        return res.send(rows[0]);
                    }
                });
            });
        },
        getRentHousePictureList: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = {'tableid': req.body.id};

                    var sql;
                    if (req.body.auth == false) {
                        sql = 'SELECT renthouseblobs.*,renthousedetails.userid\
                        FROM renthouseblobs\
                        INNER JOIN renthousedetails\
                        ON renthouseblobs.tableid = renthousedetails.id\
                        WHERE renthouseblobs.is360image = false AND renthouseblobs.tableid = ' + con.escape(req.body.id);
                    } else {
                        sql = 'SELECT renthouseblobs.*,renthousedetails.userid\
                        FROM renthouseblobs\
                        INNER JOIN renthousedetails\
                        ON renthouseblobs.tableid = renthousedetails.id\
                        WHERE renthouseblobs.is360image = false AND renthouseblobs.tableid = ' + con.escape(req.body.id) + ' AND renthousedetails.userid = ' + req.idFromToken;
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
        }
    }
};
