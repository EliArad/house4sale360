var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yad2vr',
    debug: false
});


var dbServer = function () {

};


dbServer.prototype = function () {

    get = function (callback) {

        pool.getConnection(function (err, connection) {

            callback(err,connection);
            connection.on('error', function (err) {
                callback(err,null);
            });
        });
    }
    return {
        get: get
    };
}();



module.exports.server = dbServer;
