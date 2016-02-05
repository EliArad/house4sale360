
var querystring = require('querystring');
var fs = require('fs');

module.exports = function (app) {

    console.log('STARTED monitor google bot');

    app.use(function(req,res,next) {
        var fragment = req.query._escaped_fragment_;
        var path = req.url;
        var facebook =  /facebookexternalhit/.test(req.headers['user-agent']);
        var google = /google\.com\/\+/.test(req.headers['user-agent']);

        //if not a search bot or social fetcher proceed to default
        if(typeof fragment === 'undefined' && !facebook && !google) {
            next();
            return;
        }

        //get actual path if fragment presented
        if(typeof fragment !== 'undefined'){
            path = req.url.replace(/(.*)(&|\?)_escaped_fragment_=(.*)/ig, function(match, p1, p2, p3) {
                console.log('replace here path ' + path);
                return p1 + (p3 && '#!' + querystring.unescape(p3));
            });
        }

        //retrieve snapshot from DB
            //if(err || !snapshot)
              //  return res.send(404);
        var link = path.substring(4);
        var txt = 'GOOGLE BOOT IS HERE!! SNAPSHOT for path:' + link + "\n";
        console.log(txt);

        fs.appendFile("./tmp/googlebot.txt", txt , function(err) {
            if(err) {
                return console.log(err);
            }
        });

        return res.sendfile('./snapshots/' + link + '.html');

    });
};
