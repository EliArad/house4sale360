var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    //password: '',
    password: 'Elianat4414123',
    database: 'yad2vr',
    debug: false
});


var dbServer = function () {

};

var connum = 0;

dbServer.prototype = function () {

    release = function(con)
    {
        con.release();
        connum--;
    },

    get = function (callback) {

        pool.getConnection(function (err, connection) {

            connum++;
            callback(err,connection);
            connection.on('error', function (err) {
                console.log('connum:' + connum);
                callback(err,null);
            });
        });
    }
    return {
        get: get,
        release:release
    };
}();



module.exports.server = dbServer;
