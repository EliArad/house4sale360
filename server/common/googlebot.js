var querystring = require('querystring');
var fs = require('fs');

module.exports = function (app) {

    console.log('STARTED monitor google bot');

    app.use(function (req, res, next) {
        var fragment = req.query._escaped_fragment_;
        var path = req.url;
        var facebook = /facebookexternalhit/.test(req.headers['user-agent']);
        var google = /google\.com\/\+/.test(req.headers['user-agent']);

        //if not a search bot or social fetcher proceed to default
        if (typeof fragment === 'undefined' && !facebook && !google) {
            next();
            return;
        }

        //get actual path if fragment presented
        if (typeof fragment !== 'undefined') {
            path = req.url.replace(/(.*)(&|\?)_escaped_fragment_=(.*)/ig, function (match, p1, p2, p3) {
                console.log('replace here path ' + path);
                return p1 + (p3 && '#!' + querystring.unescape(p3));
            });
        }

        //retrieve snapshot from DB
        //if(err || !snapshot)
        //  return res.send(404);
        var link = path.substring(4);
        if (link == '') {
            var txt = 'GOOGLE BOOT IS HERE!! SNAPSHOT for path main' + "\n";
            console.log(txt);
            fs.appendFile("./tmp/googlebot.txt", txt, function (err) {
                return res.sendfile('./snapshots/main.html');
            });
        } else {
            var newlink = link;
            switch (link)
            {
                case 'erules':
                    newlink = 'siterules';
                break;
                case 'ertisehousesale':
                    newlink = 'advertisehousesale';
                break;
                case 'vacyinfo':
                    newlink = 'privacyinfo';
                break;
                case 'n':
                    newlink = 'main';
                    break;
                case 'tualrealityrpage':
                    newlink = 'virtualrealityrpage';
                break;
                case 'age':
                    newlink = 'mypage';
                 break;
                case 'p':
                    newlink = 'help';
                 break;
                case 'tactus':
                    newlink = 'contactus';
                break;
            }
            var txt = 'GOOGLE BOOT IS HERE!! SNAPSHOT for path:' + newlink + "\n";
            console.log(txt);
            fs.appendFile("./tmp/googlebot.txt", txt, function (err) {
                return res.sendfile('./snapshots/' + newlink + '.html');
            });
        }
    });
};
