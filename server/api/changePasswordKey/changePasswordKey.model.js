'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChangePasswordKeySchema = new Schema({
  userID: String,
  key: String,
  createdAt: {type: Date, expires: 3600}
});

module.exports = mongoose.model('ChangePasswordKey', ChangePasswordKeySchema);
