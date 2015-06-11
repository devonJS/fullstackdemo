'use strict';

var express = require('express');
var controller = require('./transfer.controller');

var router = express.Router();

router.get('/:id/getSentTransfers', controller.getSentTransfers);
router.get('/:id/getReceivedTransfers', controller.getReceivedTransfers);
router.get('/:id/getTransfers', controller.getTransfers);
router.get('/:email/getTransfersByEmail', controller.getTransfersByEmail);
router.put('/:email/updateTransfersByEmail', controller.updateTransfersByEmail);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:id', controller.show);
router.post('/', controller.initializeTransfer);
router.patch('/:id', controller.update);


module.exports = router;
