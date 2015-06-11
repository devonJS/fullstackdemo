'use strict';

var _ = require('lodash');
var TransferGrave = require('./transferGrave.model');

// Creates a new transferGrave in the DB.
exports.create = function(req, res) {
  TransferGrave.create(req.body, function(err, transferGrave) {
    if(err) { return handleError(res, err); }
    return res.json(201, transferGrave);
  });
};

// Get list of transferGraves
exports.index = function(req, res) {
  TransferGrave.find(function (err, transferGraves) {
    if(err) { return handleError(res, err); }
    return res.json(200, transferGraves);
  });
};

// Get a single transferGrave
exports.show = function(req, res) {
  TransferGrave.findById(req.params.id, function (err, transferGrave) {
    if(err) { return handleError(res, err); }
    if(!transferGrave) { return res.send(404); }
    return res.json(transferGrave);
  });
};

// Updates an existing transferGrave in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TransferGrave.findById(req.params.id, function (err, transferGrave) {
    if (err) { return handleError(res, err); }
    if(!transferGrave) { return res.send(404); }
    var updated = _.merge(transferGrave, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, transferGrave);
    });
  });
};

// Deletes a transferGrave from the DB.
exports.destroy = function(req, res) {
  TransferGrave.findById(req.params.id, function (err, transferGrave) {
    if(err) { return handleError(res, err); }
    if(!transferGrave) { return res.send(404); }
    transferGrave.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
