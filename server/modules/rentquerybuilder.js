module.exports = function () {
    function build(con, opt) {

        var sql = 'SELECT renthousedetails.* , renthouseblobs.filename, renthouseblobs.tableid , renthouseblobs.is360image , renthouseblobs.is360video , renthouseblobs.isvideo\
                    FROM renthousedetails\
                    INNER JOIN users\
                    ON users.id = renthousedetails.userid\
                    LEFT JOIN renthouseblobs\
                    ON renthouseblobs.tableid  = renthousedetails.id ';

        var i = 0;
        sql = sql + '\n';
        sql = sql + 'WHERE (';
        for (i = 0; i < opt.city.length; i++) {
            if (i > 0)
            {
                sql = sql + 'OR '
            }
            sql = sql + ' renthousedetails.city = ' + con.escape(opt.city[i].name) + ' ';
        }
        if (opt.city.length > 0)
            sql = sql + ') ';
        sql = sql + '\n';

        sql = sql + 'AND (users.agent = ' + con.escape(opt.agent) + ') ';
        sql = sql + '\n';

        i = 0;
        if (opt.propertyType != undefined)
        {
            for (i = 0; i < opt.propertyType.length; i++) {
                if (i == 0)
                {
                    sql = sql + ' AND (';
                }
                if (i > 0)
                {
                    sql = sql + 'OR '
                }
                sql = sql + ' renthousedetails.propertyType = ' + con.escape(opt.propertyType[i]) + ' ';
            }
            if (opt.propertyType.length > 0)
                sql = sql + ') ';
        }
        sql = sql + '\n';


        i = 0;

        if (opt.renovated != undefined)
        {
        for (i = 0; i < opt.renovated.length; i++) {

            if (i == 0)
            {
                sql = sql + ' AND (';
            }
            if (i > 0)
            {
                sql = sql + 'OR '
            }
            sql = sql + ' renthousedetails.renovated = ' + con.escape(opt.renovated[i]) + ' ';
        }
        if (opt.renovated.length > 0)
            sql = sql + ') ';
        sql = sql + '\n';
      }


        if (opt.fromprice != undefined) {

            sql = sql + ' AND (';
            if (opt.toprice == undefined) {
                sql = sql + 'renthousedetails.price >= ' + opt.fromprice + ' ';
            } else {
                sql = sql + 'renthousedetails.price >= ' + opt.fromprice + ' AND renthousedetails.price <= ' + opt.toprice;
            }
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.floor != undefined && opt.fromfloor != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.floor >= ' + opt.floor + ' AND renthousedetails.floor <= ' + opt.fromfloor;
            sql = sql + ') ';
        } else {
            if (opt.floor != undefined && opt.fromfloor == undefined) {
                sql = sql + ' AND (';
                sql = sql + 'renthousedetails.floor >= ' + opt.floor + ' ';
                sql = sql + ') ';
            }
        }
        sql = sql + ' AND ( renthousedetails.suspend = 0 ) ';
        sql = sql + '\n';
        if (opt.numberofrooms != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.numberofrooms = ' + opt.numberofrooms + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.yearsofproperty != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.yearsofproperty <= ' + opt.yearsofproperty + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.aircond != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.aircond != ' + con.escape(opt.aircond) + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.parking != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.parking >= ' + opt.parking + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.parkingtype != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.parkingtype = ' + opt.parkingtype + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        if (opt.parkingtype2 != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.parkingtype2 = ' + opt.parkingtype2 + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.warehouse != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.warehouse >= ' + opt.warehouse + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.elevator != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.elevator >= ' + opt.elevator + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.mamad != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.mamad = ' + opt.mamad + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }
        if (opt.balcony != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'renthousedetails.balcony >= ' + opt.balcony + ' ';
            sql = sql + ') ';
            sql = sql + '\n';
        }

        return sql;
    }

    return {
        build: build
    }

}
