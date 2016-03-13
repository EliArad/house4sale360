module.exports = function (sqlserver) {
    function addToStorage(userid, size, con, callback) {

        var max_size = 150*1024*1024;

        var sql = 'SELECT * FROM users WHERE id = ' + con.escape(userid);
        var query = con.query(sql, function (err, rows) {

            if (err || rows.length == 0) {
                callback(err);
            } else {
                if (rows[0].email == 'easp13@gmail.com' || rows[0].email == 'aptvr360@gmail.com')
                {
                    max_size = 20 *1024*1024*1024;
                }
                else if (rows[0].agent == 'agent')
                {
                    max_size = 1 *1024*1024*1024;
                }
                sql = 'SELECT * FROM storage WHERE userid = ' + con.escape(userid);
                var query = con.query(sql, function (err, rows) {
                    if (err) {

                        callback(err);
                    } else {
                        if (rows.length == 0)
                        {
                            var data = {
                                userid:userid,
                                size:size
                            };

                            var query = con.query('INSERT INTO storage SET ?', data, function (err, result) {
                                console.log('2');
                                callback(err);
                            });
                        } else {
                            var newsize = rows[0].size + size;
                            if (newsize > max_size)
                            {
                                return callback('exceed size');
                            }
                            var query = con.query('UPDATE  storage SET ?  WHERE ?', [{size: newsize}, {userid: userid}], function (err, result) {

                                callback(err);
                            });
                        }
                    }
                });
            }
        });


    }

    function removeFromStorage(userid, size) {

    }

    function clearStorage(userid) {

    }

    return {
        addToStorage: addToStorage,
        removeFromStorage: removeFromStorage,
        clearStorage: clearStorage
    }
}