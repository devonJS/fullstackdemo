'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuickuserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: { type: String, lowercase: true },
  pictureID: String,
  description: String
});

module.exports = mongoose.model('Quickuser', QuickuserSchema);
