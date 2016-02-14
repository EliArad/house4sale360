var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '',
    //password: 'Elianat4414123',
    database: 'yad2vr',
    debug: false,
    dateStrings: 'date'
});


var dbServer = function () {

};

var connum = 0;

dbServer.prototype = function () {

    release = function(con)
    {
        con.release();
        connum--;
        //console.log('released : '  + connum);
    },

    pool.on('connection', function (connection) {
        //connection.query('SET SESSION auto_increment_increment=1')
        console.log('new sql connection');
    });

    pool.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });

    pool.on('error', function (err) {
        console.log('connum:' + connum);
        callback(err,null);
    });

    get = function (callback) {

        pool.getConnection(function (err, connection) {

            connum++;
            callback(err,connection);

        });
    }
    return {
        get: get,
        release:release
    };
}();



module.exports.server = dbServer;
