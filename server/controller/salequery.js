'use strict';

var secret = require('../common/config').secret;
var builder_sale = require('../modules/salequerybuilder')();
var builder_rent = require('../modules/rentquerybuilder')();
var fs = require('fs');
module.exports = function (sqlserver) {

    return {

        GetHouseQueryResults: function (req, res, next) {
            sqlserver.get(function (err, con) {
                if (!err) {
                    var sql;
                    if (req.body.type == 0)
                        sql = builder_sale.build(con, req.body.query);
                    else if (req.body.type == 1)
                        sql = builder_rent.build(con, req.body.query);
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