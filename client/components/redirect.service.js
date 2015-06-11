/**
 * Created by Devon on 4/23/2015.
 */
'use strict';

angular.module('snabbtApp')
  .factory('Redirect', ["$http", function($http) {
    var validKey = false;
    var triedChangePassword = false;
    var userKey = "";
    var userID = "";
    var ranKeyCheck = false;

      return{
        checkKey: function(key) {
          triedChangePassword = true;
          userKey = key;
          $http.get('/api/changePasswordKeys/' + key + "/checkKey")
            .success(function(keyData){
              if(keyData){
                validKey = true;
                ranKeyCheck = true;
                userID = keyData.userID;
              }
            })
            .error(function(){
              validKey = false;
            });
        },
        isValidKey: function(){
          return validKey;
        },
        triedToChangePassword: function(){
          return triedChangePassword;
        },
        resetChangePassword: function(){
          triedChangePassword = false;
        },
        getUserID: function(){
          return userID;
        },
        ranKeyCheck: function(){
          return ranKeyCheck;
        }
      };
  }]);
