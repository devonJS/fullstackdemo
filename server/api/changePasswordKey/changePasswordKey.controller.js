'use strict';

var _ = require('lodash');
var ChangePasswordKey = require('./changePasswordKey.model');

exports.clearKeys = function (req,res){
  ChangePasswordKey.find({"userID": req.params.id}).remove(function(changePasswordKeys) {
    if(!changePasswordKeys) { return res.send(404); }
    res.write(changePasswordKeys);
  });
};

exports.checkKey = function(req, res) {
  ChangePasswordKey.findOne({"key": req.params.key}, function(err, passwordKey){
    if(err){res.send(404,err);}
    if(!passwordKey){return res.send(404)}
    res.json(passwordKey);
  });

};

function handleError(res, err) {
  return res.send(500, err);
}
