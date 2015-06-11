'use strict';

var express = require('express');
var controller = require('./mandrill.controller');


var router = express.Router();

router.post('/sendconnectrequestemail', controller.sendConnectRequestEmail);
router.post('/sendChangePasswordEmail', controller.sendChangePasswordEmail);
router.post('/sendSignUpConfirmation', controller.sendSignUpConfirmation);


module.exports = router;
