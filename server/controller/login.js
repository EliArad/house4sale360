var jwt = require('jsonwebtoken');
var secret = require('../common/config').secret;
var sqlServer;
exports.setsqlServer = function (s) {
    sqlServer = s;
};


var mypass = require('../modules/password')();

exports.login = function (req, res) {

    var email = req.body.email || '';

    sqlServer.get(function (err, con) {
        if (err) {
            res.send(500, { error:err });
        } else {

            var sql = 'SELECT * FROM users WHERE email = ' + con.escape(email);
            con.query( sql, function(err, rows) {
                con.release();
                if (err) {
                    return res.status(500).send({ error:'user not found'});
                }
                var userRule = 0;
                var password = req.body.password || '';
                if (email == '' || password == '') {
                    return res.status(401).send({ error:'email or password are empty'});
                }
                if (rows.length == 0)
                {
                    return res.status(401).send({ error:'email or password incorrent'});
                }
                mypass.comparePassword(password,rows[0].password, function(err, match){
                    if (match) {

                        var  userRule = 0;
                        if (email == 'easp13@gmail.com' || email == 'easwdev@gmail.com')
                        {
                            userRule = 1;
                        }
                        var payload = {
                            iss: req.hostname,
                            sub: rows[0].id
                        };
                        var userfrommail = email.match(/^([^@]*)@/)[1];


                        var token = jwt.sign(payload, secret, {
                            expiresInMinutes: 60 * 5
                        });
                        res.json({
                            id:rows[0].id,
                            token: token,
                            rule:userRule,
                            username:userfrommail,
                            agent:rows[0].agent
                        });
                    } else {
                        return res.status(403).send({ error:'email or password are not valid'});
                    }
                })
            });
        }
    });
};
