'use strict';

var secret = require('../common/config').secret;
var builder = require('../modules/salequerybuilder')();
var fs = require('fs');
module.exports = function (sqlserver) {

    return {

        GetSaleHouseQueryResults: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql = builder.build(con, req.body.query);
                    fs.writeFile('./sql.txt', sql, function (err) {
                        if (err)
                            console.log(err);
                    });
                    var query = con.query(sql, function (err, rows) {
                        sqlserver.release(con);
                        if (err) {
                            return res.sendStatus(500);
                        } else {
                            for (var i = 0; i < rows.length; i++) {
                                delete rows[i].email;
                                delete rows[i].homephone;
                                delete rows[i].secondarycellphone;
                                delete rows[i].secondarycellphone;
                                delete rows[i].officephone;
                                delete rows[i].primarycellphone;
                                delete rows[i].contactPerson;
                            }
                            return res.send(rows);
                        }
                    });
                } else {
                    return res.sendStatus(500);
                }
            });
        }
    }

}