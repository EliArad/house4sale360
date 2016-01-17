'use strict';

var cityLoaderobject = require('../../classhelpers').siteHelper;
var cityLoader = new cityLoaderobject();

module.exports = function (sqlserver) {



    return {

        getSchonotbackground: function (req, res, next)
        {
            cityLoader.getSchonot(req.body.code, function(err , data){

                if (err) {
                    res.send('okok').sendStatus(500);
                } else {
                    res.send(data);
                }
            })
        }
    }
};