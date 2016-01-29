'use_strict';

var express = require('express');
var jwtauth = require('../common/jwtauth');

module.exports = function (app,visitorController) {


    function init() {


        var router = express.Router();
        router.post('/setvisitor', visitorController.setvisitor);
        router.get('/getallvisitors', visitorController.getallvisitors);
        router.get('/isverified',  visitorController.isverified);
        router.post('/contactus', visitorController.contactus);
        router.post('/saveVisitorSearch', visitorController.saveVisitorSearch);



        app.use('/api/general', router);

    }

    return {
        init:init
    }

}
