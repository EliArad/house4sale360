'use strict';

var lwip = require('lwip');

module.exports = function () {


    return {

        rotatePicture: function (req, res, next) {


            var filename = req.body.name;
            console.log(req.body);
            console.log(filename);
            lwip.open(filename, function (err, image) {

                image.batch().rotate(req.body.angle, 'white').writeFile(filename, function (err) {
                    if (err) {
                        res.send('error');
                    } else {
                        res.send('ok');
                    }
                });
            });
        }

    }
};


