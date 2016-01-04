'use_strict'
var express = require('express'),
  helpers = require('view-helpers'),
  bodyParser = require('body-parser'),
  moment = require('moment');
args = require('yargs').argv;
var util = require('util');

var cors = require('./server/common/cors');

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


var myhelper = require('./server/modules/myhelpers');

var mkdirp = require('mkdirp');
var jwt = require('jsonwebtoken');
var secret = require('./server/common/config').secret;
var mysqlserver = require('./server/common/mysql').server;
var sqlserver = new mysqlserver();


mkdirp('./uploads/', function (err) {

});

mkdirp('./uploadsvideo/', function (err) {

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


port = args.port || 3000;

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

var registerRoutes = require('./server/routes/register')(sqlserver,registerController);
var dbstoreRoutes = require('./server/routes/dbstore')(app,dbstoreController).init();

//var mailRoutes = require('./server/routes/mail');
//var dbsearchRoutes = require('./server/routes/dbsearch');
//var adminRoutes = require('./server/routes/admin')(notifyServer);

app.use('/api/register', registerRoutes.routes);
//app.use('/api/mail', mailRoutes);
//app.use('/api/dbsearch', dbsearchRoutes);
//app.use('/api/admin', adminRoutes.router);
//app.use('/api/general', jwtauth, getGeneralRoutes);

//var createNewMember = require("./server/modules/createNewMember")(membersModel.membersModel);

// we send the app to this module
//var mailverify = require('./server/modules/nodemailer')(app, regModel, createNewMember);


app.use(
  "/", //the URL throught which you want to access to you static content
  express.static(__dirname) //where your static content is located in your filesystem
);

var loginCtrl = require('./server/controller/login');
loginCtrl.setsqlServer(sqlserver);
app.post('/api/login', loginCtrl.login);



app.post('/api/upload', bodyParser({
  limit: '15mb'
}), function (req, res) {

  //console.log(req.body.images);
  var x = util.inspect(req.body.images);
  console.log(req.body.filenum);

  //var x1 = x.replace(/^data:image\/(png|gif|jpeg);base64,/,'');

  //console.log(req.body.token);

  try {
    var decoded = jwt.verify(req.body.token, secret);
    //console.log(decoded.sub);


    var dirToCreateRaw = './uploads/' + decoded.sub + "/raw/"
    mkdirp(dirToCreateRaw, function (err) {
      // path was created unless there was error

      if (req.body.filenum == 0) {
        var thumbfile = './uploads/' + decoded.sub + "/raw/0.jpg";
        //console.log(thumbfile);
        var buf1 = new Buffer(req.body.images, 'base64'); // decode
        fs.writeFile(thumbfile, buf1, function (err) {
          if (err) {
            //console.log("err", err);
            return res.sendStatus(500);
          } else {

            membersModel.membersModel.findOne({'registrationObjectId': decoded.sub}, function (err, member) {
              if (!err)
              {
                member.profilePicLoaded = true;
                member.numOfPicturesLoaded++;
                member.save();
                return res.json({
                  picnum: req.body.filenum,
                  err: "uploaded ok"
                });
              } else {
                 console.log('error #87');
                 res.sendStatus(500);
              }
            });
          }
        });
        return;
      }

      //  the image gallery size picture 150 on 150
      if (req.body.filenum == 100) {
        var thumbfile = './uploads/' + decoded.sub + "/raw/100.jpg";
        //console.log(thumbfile);
        var buf1 = new Buffer(req.body.images, 'base64'); // decode
        fs.writeFile(thumbfile, buf1, function (err) {
          if (err) {
            //console.log("err", err);
            return res.sendStatus(500);
          } else {
            return res.json({
              picnum: req.body.filenum,
              err: "uploaded ok"
            });
          }
        });
        return;
      }


      var r = x.search('data:image/jpeg;base64,');
      var x1;
      if (r != -1)
        x1 = x.replace('data:image/jpeg;base64,', '');
      else {
        r = x.search('data:image/png;base64,');
        if (r != -1)
          x1 = x.replace('data:image/png;base64,', '');
      }

      var fileNameRaw = dirToCreateRaw + req.body.filenum + ".jpg";
      var buff = new Buffer(x1, 'base64');


      //console.log("saving file: " + fileNameRaw);
      var status = 500;
      fs.writeFile(fileNameRaw, buff, function (err) {
        if (err) {
          //console.log(err);
          res.sendStatus(status);
          return;
        }
        res.json({
          picnum: req.body.filenum,
          err: "uploaded ok"
        });
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
  var fileName =  './uploadvideo/' + req.idFromToken + "/raw/1.mp4";
  fs.unlink(fileName, function (err){

    membersModel.membersModel.findOne({'registrationObjectId' : req.idFromToken}, function(err , member){
      if (err)
      {
        res.sendStatus(500);
      } else {
        member.videoloaded = false;
        res.send('ok');
      }
    });
  });

});

app.post('/api/uploadvideo', bodyParser({
  limit: '50mb'
}), function (req, res) {

  //console.log("upload video");
  var x = util.inspect(req.body.images);
  //console.log(req.body.filenum);

  //var x1 = x.replace(/^data:image\/(png|gif|jpeg);base64,/,'');

  //console.log(req.body.token);

  try {
    var decoded = jwt.verify(req.body.token, secret);
    //console.log(decoded.sub);
    var dirToCreateRaw = './uploadvideo/' + decoded.sub + "/raw/"
    mkdirp(dirToCreateRaw, function (err) {

      var r = x.search('data:video/mp4;base64,');
      var x1;
      if (r != -1)
        x1 = x.replace('data:video/mp4;base64,', '');
      else {
        res.sendStatus(500);
      }

      var fileNameRaw = dirToCreateRaw + req.body.filenum + ".mp4";
      var buff = new Buffer(x1, 'base64');

      var status = 500;
      fs.writeFile(fileNameRaw, buff, function (err) {
        if (err) {
          //console.log(err);
          res.sendStatus(status);
        } else {

          membersModel.membersModel.findOne({'registrationObjectId': decoded.sub}, function (err, member) {
            if (err) {
              res.sendStatus(500);
            } else {
              member.videoloaded = true;
              member.save(function (err) {
                res.send(err);
              });
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


app.get('/isauth', jwtauth, function (req, res, next) {
  res.sendStatus(200); // must return a response!!!
});


app.get('/eli', cors, function (req, res) {
  res.send("ok from this");
});


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.get('*', function (req, res) {
  res.send(500, 'error 4000');
});

app.post('*', function (req, res) {
  res.send(500, 'error 5000');
});

server.listen(port);
console.log("Running on port " + port);
