'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var fs = require("fs");

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};


//Change user password when they do not know their old password
exports.passwordChange = function(req, res, next){
  var userID = req.params.id;
  var newPass = String(req.body.newPassword);
  User.findById(userID, function(err, user){
    user.password = newPass;
    user.save(function(err){
      if(err) return next(err);
      if(!user) return res.send(401);
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

//Friend functionality

exports.findFriend = function(req, res, next){
  User.find({"firstName": req.body.firstName, "lastName": req.body.lastName, "email": req.body.email, "userName": req.body.userName}, function(err, users){
    if(err) return next(err);
    if(!users) return res.json(401);
    res.json(200, users);
  })
};

exports.addFriend = function(req, res, next){
  User.findById(req.params.id, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    user.friendsList.push(req.body);
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  })
};

//Retrieve user friends list
exports.getFriendsList = function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    res.json(200, user.friendsList);
  })
};

//Update user friends list
exports.updateFriendsList = function(req, res, next){
  User.findById(req.params.id, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    user.friendsList = req.body;
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  })
};

//Update send badge count
exports.sendBadgeUpdate = function(req, res, next){
  User.findById(req.params.id, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    user.sendingBadgeCount = req.body.sendingBadgeCount;
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

//Update receive badge count
exports.receiveBadgeUpdate = function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    user.receivingBadgeCount = req.body.receivingBadgeCount;
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

//Obtain badges count
exports.getBadgesCount = function (req, res, next){
  User.findById(req.params.id, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    res.send(200, [user.sendingBadgeCount, user.receivingBadgeCount]);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

