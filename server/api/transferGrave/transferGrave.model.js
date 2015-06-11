'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransferGraveSchema = new Schema({
  //Array of objects of statuses and dates, statuses: Initializing, Accepted, Transferring, Completed
  transferSender: String,
  transferReceiver: String,
  transferStatus: {},
  transferHistory: Array,
  removedBy: {}
});

module.exports = mongoose.model('TransferGrave', TransferGraveSchema);
