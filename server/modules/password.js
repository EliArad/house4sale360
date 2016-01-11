var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

module.exports = function () {

    return {
        comparePassword: function (userPassword,dbPassword, cb) {
            bcrypt.compare(userPassword, dbPassword,function (err, isMatch) {
                if (err)
                    return cb(err, false);
                else
                    cb(null, isMatch);
            });
        },

        encrypt: function (password, callback) {
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                //console.log('password: ' + password);
                bcrypt.hash(password, salt, function (err, hash) {
                    //console.log(hash);
                    callback(err,hash)
                });
            });
        }
    }
}

