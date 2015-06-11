'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id/changepassword', controller.passwordChange);

router.post('/findfriend', auth.isAuthenticated(), controller.findFriend);
router.post('/:id/addfriend', auth.isAuthenticated(),controller.addFriend);
router.get('/:id/getfriendslist', auth.isAuthenticated(), controller.getFriendsList);
router.put('/:id/updateFriendsList', auth.isAuthenticated(), controller.updateFriendsList);
router.put('/:id/sendBadgeUpdate', auth.isAuthenticated(), controller.sendBadgeUpdate);
router.put('/:id/receiveBadgeUpdate', auth.isAuthenticated(), controller.receiveBadgeUpdate);
router.get('/:id/getBadgesCount', auth.isAuthenticated(), controller.getBadgesCount);
module.exports = router;
