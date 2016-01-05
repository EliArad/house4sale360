var jwt = require('jsonwebtoken');
var secret = require('./config').secret;

module.exports = function (req, res, next) {

    var bearerToken;
    var bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        //console.log(bearerToken);
        //console.log(req.body);
        req.body.token = bearerToken;
        req.foundToken = true;
        //console.log('found token:' +  req.body.token);
        try {
            var decoded = jwt.verify(req.body.token, secret);
            req.idFromToken = decoded.sub;
            //console.log('req.idFromToken: ' + req.idFromToken);

            //console.log('the user id from the token is: ' + decoded.sub);
            return next();
        } catch (err) {
            console.log('error 1 in jwtauth ' + err);
            return res.sendStatus(401);
            //return next();
        }
    } else {
        console.log('no bearerHeader is undefined');
        return res.sendStatus(401);
    }
};
