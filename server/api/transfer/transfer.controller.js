'use strict';

var _ = require('lodash');
var Transfer = require('./transfer.model');


exports.getSentTransfers = function(req, res){
  Transfer.find({"transferSender": req.params.id}, function (err, transfers){
    if(err){return handleError(res, err);}
    return res.json(200, transfers);
  });
};

exports.getReceivedTransfers = function(req, res){
  Transfer.find({"transferReceiver": req.params.id}, function(err, transfers){
    if(err){return handleError(res, err);}
    return res.json(200, transfers);
  });
};

//Gets list of transfers given userID sending and receiving
exports.getTransfers = function(req, res){
  Transfer.find({$or: [{"transferSender": req.params.id}, {"transferReceiver": req.params.id}]}, function(err, transfers){
    if(err){return handleError(res, err);}
    return res.json(200, transfers);
  });
};

//Gets list of transfers given the user's email when creating new account
exports.getTransfersByEmail = function(req, res){
  Transfer.find({"transferReceiver": req.params.email}, function(err, transfers){
    if(err){return handleError(res, err);}
    return res.json(200, transfers);
  });
};

exports.updateTransfersByEmail = function(req, res){
  Transfer.update({"transferReceiver": req.params.email}, {$set: {"transferReceiver": req.body.id}}, {multi: true}, function(err, numTransfers){
    if(err) { return handleError(res, err); }
    return res.send(200, numTransfers);
  });
};

// Updates an existing transfer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Transfer.findById(req.params.id, function (err, transfer) {
    if (err) { return handleError(res, err); }
    if(!transfer) { return res.send(404); }
    transfer.transferStatus= req.body.transferStatus;
    transfer.transferHistory = req.body.transferHistory;
    transfer.removedBy = req.body.removedBy;
    transfer.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, transfer);
    });
  });
};

// Deletes a transfer from the DB.
exports.destroy = function(req, res) {
  Transfer.findById(req.params.id, function (err, transfer) {
    if(err) { return handleError(res, err); }
    if(!transfer) { return res.send(404); }
    transfer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get a single transfer
exports.show = function(req, res) {
  Transfer.findById(req.params.id, function (err, transfer) {
    if(err) { return handleError(res, err); }
    if(!transfer) { return res.send(404); }
    return res.json(transfer);
  });
};

// Creates a new transfer in the DB.
exports.initializeTransfer = function(req, res) {
  Transfer.create(req.body,function(err, transfer) {
    if(err) { return handleError(res, err); }
    return res.json(200, transfer);
  });
};



function handleError(res, err) {
  return res.send(500, err);
}

