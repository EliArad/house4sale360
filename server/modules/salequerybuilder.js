module.exports = function () {
    function build(con, opt) {

        var sql = 'SELECT sellhousedetails.* , salehouseblobs.filename, salehouseblobs.tableid , salehouseblobs.is360image , salehouseblobs.is360video , salehouseblobs.isvideo\
                    FROM sellhousedetails\
                    LEFT JOIN salehouseblobs\
                    ON salehouseblobs.tableid  = sellhousedetails.id ';

        var i = 0;
        sql = sql + '\n';
        sql = sql + 'WHERE (';
        for (i = 0; i < opt.city.length; i++) {
            if (i > 0)
            {
                sql = sql + 'OR '
            }
            sql = sql + ' sellhousedetails.city = ' + con.escape(opt.city[i].name) + ' ';
        }
        if (opt.city.length > 0)
            sql = sql + ') ';
        sql = sql + '\n';

        i = 0;
        for (i = 0; i < opt.propertyType.length; i++) {
            if (i == 0)
            {
                sql = sql + ' AND (';
            }
            if (i > 0)
            {
                sql = sql + 'OR '
            }
            sql = sql + ' sellhousedetails.propertyType = ' + con.escape(opt.propertyType[i]) + ' ';
        }
        if (opt.propertyType.length > 0)
            sql = sql + ') ';
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
            sql = sql + ' sellhousedetails.renovated = ' + con.escape(opt.renovated[i]) + ' ';
        }
        if (opt.renovated.length > 0)
            sql = sql + ') ';
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
        sql = sql + ' AND (';
        sql = sql + 'sellhousedetails.floor >= ' + opt.floor + ' AND sellhousedetails.floor <= ' + opt.fromfloor;
        sql = sql + ') ';


        if (opt.numberofrooms != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.numberofrooms = ' + opt.numberofrooms + ' ';
            sql = sql + ') ';
        }

        if (opt.yearsofproperty != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.yearsofproperty <= ' + opt.yearsofproperty + ' ';
            sql = sql + ') ';
        }

        if (opt.aircond != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.aircond = ' + con.escape(opt.aircond) + ' ';
            sql = sql + ') ';
        }

        if (opt.parking != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.parking >= ' + opt.parking + ' ';
            sql = sql + ') ';
        }
        if (opt.parkingtype != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.parkingtype = ' + opt.parkingtype + ' ';
            sql = sql + ') ';
        }

        if (opt.parkingtype2 != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.parkingtype2 = ' + opt.parkingtype2 + ' ';
            sql = sql + ') ';
        }
        if (opt.warehouse != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.warehouse >= ' + opt.warehouse + ' ';
            sql = sql + ') ';
        }
        if (opt.elevator != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.elevator >= ' + opt.elevator + ' ';
            sql = sql + ') ';
        }
        if (opt.mamad != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.mamad = ' + opt.mamad + ' ';
            sql = sql + ') ';
        }
        if (opt.balcony != undefined) {
            sql = sql + ' AND (';
            sql = sql + 'sellhousedetails.balcony >= ' + opt.balcony + ' ';
            sql = sql + ') ';
        }

        return sql;
    }

    return {
        build: build
    }

}