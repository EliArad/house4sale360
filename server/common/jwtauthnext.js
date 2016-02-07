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
            //console.log(decoded);
            req.idFromToken = decoded.sub;
            req.userguidFromToken = decoded.userguid;
            //console.log('req.idFromToken: ' + req.idFromToken);

            return next();

        } catch (err) {
            return next();
        }
    } else {
        return next();
    }
};
