var dbServer = function () {

};

dbServer.prototype = function () {

        connect = function (callback) {

            var config1 = {
                user: 'sqluser',
                password: 'sqluser1234',
                server: '127.0.0.1',
                database: 'LT-ELIA_X230\EliWatson'
            };

            var connection = new Connection(config1);

            connection.on('connect', function(err) {
                    // If no error, then good to go...
                    if(err) {
                        callback(err, connection);
                    }

                }
            );
        }

    return {
        connect: connect
    };
} ();

server = new dbServer();
server.connect(function(err , db){
    console.log(err);
});
module.exports.server = dbServer;

