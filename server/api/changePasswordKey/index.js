'use strict';

var express = require('express');
var controller = require('./changePasswordKey.controller');
var ChangePasswordKey = require('./changePasswordKey.model');

var router = express.Router();

router.get('/:key/checkKey', controller.checkKey);
router.delete('/:id/clearKeys', controller.clearKeys);

module.exports = router;
