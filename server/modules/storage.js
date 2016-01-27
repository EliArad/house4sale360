module.exports = function (sqlserver) {
    function addToStorage(userid, size, con, callback) {


        var sql = 'SELECT * FROM storage WHERE userid = ' + con.escape(userid);
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
                    if (newsize > 150*1024*1024)
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