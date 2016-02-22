module.exports = function () {
    function build(con, opt) {

        var sql = 'SELECT sellhousedetails.* , salehouseblobs.filename, \
                    salehouseblobs.tableid , salehouseblobs.is360image , \
                    salehouseblobs.description,\
                    visitoraccess.accesstoken,\
                    salehouseblobs.is360video , salehouseblobs.isvideo ,  tours3d.*\
                    FROM sellhousedetails\
                    INNER JOIN users\
                    ON users.id = sellhousedetails.userid\
                    LEFT JOIN salehouseblobs\
                    ON salehouseblobs.tableid  = sellhousedetails.id\
                    LEFT JOIN tours3d\
                    ON sellhousedetails.id = tours3d.tableid3d \
                    LEFT JOIN visitoraccess\
                    ON visitoraccess.tableid = sellhousedetails.id  AND sellhousedetails.messagetype = visitoraccess.type';

        var i = 0;
        sql = sql + '\n';
        sql = sql + 'WHERE (';
        for (i = 0; i < opt.city.length; i++) {
            if (i > 0) {
                sql = sql + 'OR '
            }
            sql = sql + ' sellhousedetails.city = ' + con.escape(opt.city[i].name) + ' ';
        }
        if (opt.city.length > 0)
            sql = sql + ') ';
        sql = sql + '\n';

        sql = sql + ' AND (users.suspend = 0) ';

        sql = sql + ' AND (users.agent = ' + con.escape(opt.agent) + ') ';
        sql = sql + '\n';

        i = 0;
        if (opt.propertyType != undefined) {
            for (i = 0; i < opt.propertyType.length; i++) {
                if (i == 0) {
                    sql = sql + ' AND (';
                }
                if (i > 0) {
                    sql = sql + 'OR '
                }
                sql = sql + ' sellhousedetails.propertyType = ' + con.escape(opt.propertyType[i]) + ' ';
            }
            if (opt.propertyType.length > 0)
                sql = sql + ') ';
        }
        sql = sql + '\n';


        i = 0;

        if (opt.renovated != undefined) {
            for (i = 0; i < opt.renovated.length; i++) {

                if (i == 0) {
                    sql = sql + ' AND (';
                }
                if (i > 0) {
                    sql = sql + 'OR '
                }
                sql = sql + ' sellhousedetails.renovated = ' + con.escape(opt.renovated[i]) + ' ';
            }
            if (opt.renovated.length > 0)
                sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.street.name != undefined &&opt.street.name != null && opt.street.name != '')
        {
            sql = sql + ' AND ( street = ' + con.escape(opt.street.name) + ')' ;
            sql = sql + '\n';
        }


        if (opt.neighborhood.name != undefined &&opt.neighborhood.name != null && opt.neighborhood.name != '')
        {
            sql = sql + ' AND ( neighborhood = ' + con.escape(opt.neighborhood.name) + ')' ;
            sql = sql + '\n';
        }

        if (opt.fromprice != undefined) {

            sql = sql + ' AND (';
            if (opt.toprice == undefined) {
                sql = sql + 'sellhousedetails.price >= ' + opt.fromprice + ' ';
            } else {
                sql = sql + 'sellhousedetails.price >= ' + opt.fromprice + ' AND sellhousedetails.price <= ' + opt.toprice;
            }
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.floor != undefined && opt.fromfloor != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.floor >= ' + opt.floor + ' AND sellhousedetails.floor <= ' + opt.fromfloor;
            sql = sql + ') ';
        } else {
            if (opt.floor != undefined && opt.fromfloor == undefined) {
                sql = sql + ' AND (';
                sql = sql + 'sellhousedetails.floor >= ' + opt.floor + ' ';
                sql = sql + ') ';
            }
        }
        sql = sql + ' AND ( sellhousedetails.suspend = 0 ) ';
        sql = sql + '\n';
        if (opt.numberofrooms != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.numberofrooms = ' + opt.numberofrooms + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.yearsofproperty != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.yearsofproperty <= ' + opt.yearsofproperty + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.aircond != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.aircond != ' + con.escape(opt.aircond) + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.parking != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.parking >= ' + opt.parking + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.parkingtype != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.parkingtype = ' + opt.parkingtype + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.parkingtype2 != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.parkingtype2 = ' + opt.parkingtype2 + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.warehouse != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.warehouse >= ' + opt.warehouse + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.elevator != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.elevator >= ' + opt.elevator + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.mamad != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.mamad = ' + opt.mamad + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.balcony != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.balcony >= ' + opt.balcony + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        return sql;
    }

    return {
        build: build
    }

}
