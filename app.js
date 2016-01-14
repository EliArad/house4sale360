'use_strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    moment = require('moment');
args = require('yargs').argv;
var util = require('util');

//var cors = require('./server/common/cors');


//var demofile = './uploads/' + '566408969e8d1b71d0982d20' + "/raw/5.jpg";
//var demofile1 = './uploads/' + '566408969e8d1b71d0982d20' + "/raw/6.jpg";
/*
 //https://www.npmjs.com/package/easyimage
 var easyimg = require('easyimage');
 easyimg.rotate({
 src: demofile,
 dst:demofile,
 degree :90
 }).then(
 function(image) {
 console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
 },
 function (err) {
 console.log(err);
 }
 );
 */


var path = require('path'),
    fs = require('fs');
const bearerToken = require('express-bearer-token');
var app = express();
var jwtauth = require('./server/common/jwtauth');

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

/*
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'PUT', 'GET', 'POST', 'DELETE', 'OPTIONS');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});
*/
app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});


var myhelper = require('./server/modules/myhelpers');

var mkdirp = require('mkdirp');
var jwt = require('jsonwebtoken');
var secret = require('./server/common/config').secret;
var mysqlserver = require('./server/common/mysql').server;
var sqlserver = new mysqlserver();


mkdirp('./uploads/', function (err) {

});

mkdirp('./uploadvideo/', function (err) {

});
//console.log(__dirname);


//var notifyServerModule = require('./server/modules/MailNotify');
//var notifyServer = new notifyServerModule(io, lastonlineModel, usersFunction, membersModel.membersModel);

//var membersControllerModule = require('./server/controller/members');
//var membersController = new membersControllerModule(membersModel.membersModel);

var registerController = require('./server/controller/register')(sqlserver);
var dbstoreController = require('./server/controller/dbstore')(sqlserver);


//var membersRouter = require('./server/routes/members')(membersController, membersModel.membersModel, registerController);
//var getmembersRouters = membersRouter.routes;


port = args.port || 8000;

app.use(bodyParser({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
var session = require('express-session');

var commandsRoutes = require('./server/routes/commands')(app);
var mailverify = require('./server/modules/nodemailer')(app, sqlserver);
var registerRoutes = require('./server/routes/register')(sqlserver, registerController);
var dbstoreRoutes = require('./server/routes/dbstore')(app, dbstoreController).init();


//var dbsearchRoutes = require('./server/routes/dbsearch');
//var adminRoutes = require('./server/routes/admin')(notifyServer);

var salequeryController = require('./server/controller/salequery')(sqlserver);
var mailController = require('./server/controller/mail')(sqlserver,mailverify);
var mailRoutes = require('./server/routes/mail')(app, mailController).init();
var salequeryRoutes = require('./server/routes/salequery')(app, salequeryController).init();
app.use('/api/register', registerRoutes.routes);

//app.use('/api/dbsearch', dbsearchRoutes);
//app.use('/api/admin', adminRoutes.router);
//app.use('/api/general', jwtauth, getGeneralRoutes);

//var createNewMember = require("./server/modules/createNewMember")(membersModel.membersModel);

app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname) //where your static content is located in your filesystem
);

var loginCtrl = require('./server/controller/login');
loginCtrl.setsqlServer(sqlserver);
app.post('/api/login', loginCtrl.login);


app.post('/api/upload', jwtauth, bodyParser({
    limit: '15mb'
}), function (req, res) {


    if (req.body.insertId == -1) {
        return res.sendStatus(500);
    }


    var x = util.inspect(req.body.images);

    try {

        var dirToCreateRaw = './uploadimages/' + req.idFromToken + '/' + req.body.tabletype + '/' + req.body.insertId + '/';
        mkdirp(dirToCreateRaw, function (err) {


            var r = x.search('data:image/jpeg;base64,');
            var x1;
            if (r != -1)
                x1 = x.replace('data:image/jpeg;base64,', '');
            else {
                r = x.search('data:image/png;base64,');
                if (r != -1)
                    x1 = x.replace('data:image/png;base64,', '');
            }

            var fileNameRaw = dirToCreateRaw + req.body.filename;
            var buff = new Buffer(x1, 'base64');

            //console.log("saving file: " + fileNameRaw);
            var status = 500;
            fs.writeFile(fileNameRaw, buff, function (err) {
                if (err) {
                    res.sendStatus(500);
                } else {

                    var datatoinsert = {
                        filename: req.body.filename,
                        tableid: req.body.insertId,
                        is360image: req.body.is360image,
                        isvideo: false,
                        is360video:false
                    };


                    // save the entry to database salehouseblobs
                    sqlserver.get(function (err, con) {
                        if (!err) {
                            var sql = 'SELECT * FROM salehouseblobs WHERE tableid = ' + con.escape(req.body.insertId) + ' AND filename = ' + con.escape(req.body.filename) + ' AND isvideo = false AND is360image = ' + con.escape(req.body.is360image);
                            var query = con.query(sql, function (err, rows) {
                                if (err) {
                                    sqlserver.release(con);
                                    return res.sendStatus(500);
                                } else {
                                    if (rows.length > 0) {
                                        console.log('there is already file in that name in this id');
                                        sqlserver.release(con);
                                        return res.send('ok');
                                    }
                                }

                                var query = con.query('INSERT INTO salehouseblobs SET ?', datatoinsert, function (err, result) {
                                    sqlserver.release(con);
                                    if (err) {
                                        res.sendStatus(500);
                                    } else {
                                        res.send(result);
                                    }
                                });
                            });
                        } else {
                            res.sendStatus(500);
                        }
                    });
                }
            });
        });
    } catch (e) {
        //console.log(e);
        res.status(404).send(e);
        return;
    }
});

app.get('/api/deleteVideo', jwtauth, function (req, res) {

    console.log('deleteVideo');
    var fileName = './uploadvideo/' + req.idFromToken + "/raw/1.mp4";
    fs.unlink(fileName, function (err) {

    });

});

app.post('/api/uploadvideo', jwtauth, bodyParser({
    limit: '50mb'
}), function (req, res) {


    var x = util.inspect(req.body.video);
    try {

        var dirToCreateRaw = './uploadvideo/' + req.idFromToken + '/' + req.body.tabletype + '/' + req.body.insertId + '/';
        mkdirp(dirToCreateRaw, function (err) {

            var r = x.search('data:video/mp4;base64,');
            var x1;
            if (r != -1)
                x1 = x.replace('data:video/mp4;base64,', '');
            else {
                res.sendStatus(500);
            }

            var fileNameRaw = dirToCreateRaw + req.body.filename;
            var buff = new Buffer(x1, 'base64');
            //console.log(fileNameRaw);

            var status = 500;
            fs.writeFile(fileNameRaw, buff, function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(status);
                } else {

                    var datatoinsert = {
                        filename: req.body.filename,
                        tableid: req.body.insertId,
                        is360video: req.body.is360video,
                        is360image:false,
                        isvideo:true
                    };
                    sqlserver.get(function (err, con) {
                        if (!err) {
                            var sql = 'SELECT * FROM salehouseblobs WHERE tableid = ' + con.escape(req.body.insertId) + ' AND isvideo = true  AND filename = ' + con.escape(req.body.filename) + ' AND is360video = ' + con.escape(req.body.is360video);
                            var query = con.query(sql, function (err, rows) {
                                if (err) {
                                    sqlserver.release(con);
                                    return res.sendStatus(500);
                                } else {
                                    if (rows.length > 0) {
                                        sqlserver.release(con);
                                        console.log('there is already file in that name in this id');
                                        return res.json({status: 'ok' , filename:fileNameRaw});
                                    }
                                }
                                var query = con.query('INSERT INTO salehouseblobs SET ?', datatoinsert, function (err, result) {
                                    sqlserver.release(con);
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                    } else {
                                        return res.json({status: 'ok' , filename:fileNameRaw});
                                    }
                                });
                            });
                        } else {
                            res.sendStatus(500);
                        }
                    });
                }
            });
        });
    } catch (e) {
        console.log(e);
        res.status(404).send(e);
        return;
    }
});


app.get('/isauth', jwtauth, function (req, res, next) {
    res.sendStatus(200); // must return a response!!!
});



app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.get('*', function (req, res) {
    res.status(500).send('error 4000');
});

app.post('*', function (req, res) {
    res.status(500).send('error 5000');
});
server.listen(port, '192.168.22.32');
//server.listen(port, '192.168.22.28'); // at work
//server.listen(port, '192.168.1.16');// at home
console.log("Running on port " + port);
