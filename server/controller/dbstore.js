'use strict';

var secret = require('../common/config').secret;
var fs = require("fs");

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
        getAgentNotes: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    console.log(req.query.id);
                    con.query('SELECT * FROM notes WHERE notetableid = ' + con.escape(req.query.id), function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            console.log('select error: ' + err);
                            res.status(500);
                            res.end('error');
                        } else {
                            res.send(rows[0].note);
                        }
                    });
                }
            });
        },

        SaveNotes: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    con.query('SELECT * FROM notes WHERE notetableid = ' + con.escape(req.body.id), function (err, rows) {
                        if (err)
                        {
                            sqlserver.release(con);
                            console.log( 'select error: ' + err);
                            res.status(500);
                            res.end('error');
                        } else {
                            if (rows.length == 0)
                            {
                                con.query('INSERT INTO notes SET ?' , [{note:req.body.notes, notetableid:req.body.id}], function (err, result) {
                                    sqlserver.release(con);
                                    if (err)
                                    {
                                        console.log(err);
                                        res.status(500);
                                        res.end('error');
                                    } else {
                                        res.send('ok');
                                    }
                                });
                            } else {
                                con.query('UPDATE notes SET ? WHERE notetableid = ' + con.escape(req.body.id), [{note:req.body.notes}], function (err, result) {
                                    sqlserver.release(con);
                                    if (err)
                                    {
                                        console.log(err);
                                        res.status(500);
                                        res.end('error');
                                    } else {
                                        res.send('ok');
                                    }
                                });
                            }
                        }
                    });
                }
            });
        },

        MarkReloadToThoseSearchResults: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var query = con.query('UPDATE sellhousedetails SET ? WHERE id = ' + con.escape(req.body.id),
                        [{reload:req.body.reload}], function (err, result) {
                        console.log(err);
                        sqlserver.release(con);
                        if (err)
                        {
                            res.status(500);
                            res.end('error in query');
                        } else {
                            res.send('ok');
                        }
                    });
                } else {
                    res.status(500);
                    res.end('error get sql connection');
                }
            });
        },

        SaveUserAuthCode: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err)
                {
                    var query = con.query('DELETE FROM visitoraccess WHERE  guid = ' + con.escape(req.body.data.guid), function (err, rows) {
                        if (err)
                        {
                            console.log(err);
                            sqlserver.release(con);
                            res.status(500);
                            res.end('error in query');
                        } else {
                            var query = con.query('INSERT INTO visitoraccess SET ?', req.body.data, function (err, result) {
                                console.log(err);
                                sqlserver.release(con);
                                if (err)
                                {
                                    res.status(500);
                                    res.end('error in query');
                                } else {
                                    res.send('ok');
                                }
                            });
                        }
                    });
                } else {
                    res.status(500);
                    res.end('error get sql connection');
                }
            });
        },

        DeletePicture: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var condition = 'filename = ' + con.escape(req.body.filename) + ' AND isvideo = ' + con.escape(req.body.isvideo) +  ' AND is360video = ' + con.escape(req.body.is360video) + ' AND is360image = ' + con.escape(req.body.is360image);
                    console.log(condition);
                    var query = con.query('SELECT id FROM ' + req.body.tablename + ' WHERE ' + condition, function (err, rows) {
                        if (err || rows.length == 0) {
                            sqlserver.release(con);
                            res.sendStatus(500);
                        } else {
                            var sql = 'DELETE FROM yad2vr.salehouseblobs WHERE id = ' + con.escape(rows[0].id);
                            con.query(sql, function (err, rows) {
                                sqlserver.release(con);
                                if (err)
                                {
                                    res.sendStatus(500);
                                } else {
                                    //console.log(req.body.filePath);
                                    fs.unlink(req.body.filePath, function(err) {
                                        if (err) {
                                            return console.error(err);
                                        }
                                        console.log("File deleted successfully!");
                                    });

                                    res.send('ok');
                                }
                            });
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        updateVideo360Name: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var data = {
                        description: req.body.description
                    };
                    var condition = 'filename = ' + con.escape(req.body.filename) + ' AND isvideo = 1 AND is360video = 1';
                    var query = con.query('UPDATE ' + req.body.tablename + '  SET ? WHERE ' + condition, [data], function (err, result) {
                        sqlserver.release(con);
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.send('ok');
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        updateVideoName: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var data = {
                        description: req.body.description
                    };
                    var condition = 'filename = ' + con.escape(req.body.filename) + ' AND isvideo = 1 AND is360video = 0';
                    var query = con.query('UPDATE ' + req.body.tablename + '  SET ? WHERE ' + condition, [data], function (err, result) {
                        sqlserver.release(con);
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.send('ok');
                        }
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        },

        updateImage360Name: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var data = {
                        description: req.body.description
                    };
                    var condition = 'filename = ' + con.escape(req.body.filename) + '  AND is360Image = 1 AND isvideo = 0 AND is360video = 0';
                    var query = con.query('UPDATE ' + req.body.tablename + '  SET ? WHERE ' + condition,
                        [data], function (err, result) {
                            console.log(err);
                            sqlserver.release(con);
                            if (err) {

                                res.sendStatus(500);
                            } else {
                                res.send('ok');
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
                    try {
                        delete req.body.data.privateHouse;
                        delete req.body.data.showwaitcircle;
                        delete req.body.data.showwaitcirclevideo360;
                        delete req.body.data.Image360Name;
                        delete req.body.data.videoName;
                        delete req.body.data.video360Name;
                        delete req.body.data.config;
                        delete req.body.data.angleToRotate;
                        delete req.body.data.currentImage360Status;

                    }
                    catch (e)
                    {

                    }
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
                            //console.log(err);
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
                    req.body.data.suspend = 0;
                    delete req.body.data.privateHouse;
                    var query = con.query('INSERT INTO sellhousedetails SET ?', req.body.data, function (err, result) {
                        sqlserver.release(con);
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.json({result:result , userid:req.idFromToken});
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
            //console.log('getHouseDetails');
            res.send('ok');
        },
        getRentDetails: function (req, res, next) {
            //console.log('getRentDetails');
            res.send('ok');
        },
        suspendMessage: function (req, res, next) {

            sqlserver.get(function (err, con) {
                if (!err) {
                    //console.log(req.body);
                    if (req.body.tablename == 'sale') {
                        con.query('UPDATE sellhousedetails SET ? WHERE ?', [{suspend: req.body.suspend}, {id: req.body.id}], function (err, result) {
                            sqlserver.release(con);
                            if (err) {
                                //console.log(err);
                                return res.status(500).send(err);
                            } else {
                                //console.log(result);
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

            var id = req.body.id;
                sqlserver.get(function (err, con) {

                    var sql = 'SELECT salehouseblobs.id\
                       FROM sellhousedetails\
                       LEFT JOIN salehouseblobs\
                       ON salehouseblobs.tableid  = sellhousedetails.id\
                       WHERE sellhousedetails.id = ' + con.escape(id);

                    var query = con.query(sql, function (err, rows) {
                    if (err) {
                        sqlserver.release(con);
                        res.sendStatus(500);
                    } else {
                        for (var i = 0; i < rows.length; i++)
                        {
                            if (rows[i].filefullpath != null) {
                                fs.unlink(rows[i].filefullpath, function (err) {

                                });
                            }
                            sql = 'DELETE FROM salehouseblobs where id = ' + con.escape(rows[i].id);
                            con.query(sql, function (err, rows1) {});
                        }
                        sql = 'DELETE FROM sellhousedetails where id = ' + con.escape(id);
                        con.query(sql, function (err, rows1) {
                            sqlserver.release(con);
                            if (err)
                            {
                                res.sendStatus(500);
                            } else {
                                res.send('ok');
                            }
                        });
                    }
                });
            });
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

        SavePrivacyCode: function (req, res, next) {


            var tablename = req.body.data.tablename;
            delete req.body.data.tablename;
            //console.log(req.body.data);
            sqlserver.get(function (err, con) {
                var condition = {'id': req.body.data.id};
                var query = con.query('UPDATE ' + tablename + ' SET ? WHERE ?', [req.body.data, condition], function (err, result) {
                    //console.log(err);
                    sqlserver.release(con);
                    if (err) {
                        res.sendStatus(500);
                    } else
                        res.send('ok');
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
