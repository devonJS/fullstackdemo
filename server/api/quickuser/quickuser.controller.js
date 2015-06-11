'use strict';

var _ = require('lodash');
var Quickuser = require('./quickuser.model');

exports.getByEmail = function(req, res) {
  Quickuser.findOne({"email": req.params.email}, function (err,quickuser) {
    if(err) { return handleError(res, err); }
    if(!quickuser) { return res.send(404); }
    return res.json(200, quickuser);
  });
};

// Get list of quickusers
exports.index = function(req, res) {
  Quickuser.find(function (err, quickusers) {
    if(err) { return handleError(res, err); }
    return res.json(200, quickusers);
  });
};

// Get a single quickuser
exports.show = function(req, res) {
  Quickuser.findById(req.params.id, function (err, quickuser) {
    if(err) { return handleError(res, err); }
    if(!quickuser) { return res.send(404); }
    return res.json(quickuser);
  });
};

// Creates a new quickuser in the DB.
exports.create = function(req, res) {
  Quickuser.create(req.body, function(err, quickuser) {
    if(err) { return handleError(res, err); }
    return res.json(201, quickuser);
  });
};

// Updates an existing quickuser in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Quickuser.findById(req.params.id, function (err, quickuser) {
    if (err) { return handleError(res, err); }
    if(!quickuser) { return res.send(404); }
    var updated = _.merge(quickuser, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, quickuser);
    });
  });
};

// Deletes a quickuser from the DB.
exports.destroy = function(req, res) {
  Quickuser.findById(req.params.id, function (err, quickuser) {
    if(err) { return handleError(res, err); }
    if(!quickuser) { return res.send(404); }
    quickuser.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
