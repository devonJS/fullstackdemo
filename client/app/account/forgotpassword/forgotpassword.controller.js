'use strict';

angular.module('snabbtApp')
  .controller('ForgotpasswordCtrl', ["$scope", "$http", function ($scope, $http) {
    $scope.accountEmail = "";
    $scope.validOnce = false;

    $scope.sendPasswordChangeEmail = function(){
      $scope.validOnce = true;
      var generatedKey = "";
      var userID = "";
      var changePasswordDate = new Date();

      $http.get('/api/quickusers/' + $scope.accountEmail + '/getByEmail').success(function(user){
        if(user._id){
          userID = user._id;
          $scope.accountEmail = "";
          for(var i = 0; i < 16; i++){
            var numOrLetter = Math.floor((Math.random() * 2));
            if(numOrLetter === 0){
              generatedKey += Math.floor((Math.random() * 10));
            }
            else if(numOrLetter === 1){
              generatedKey += String.fromCharCode(Math.floor((Math.random() * 25)) + 65);
            }
            if(i === 15){
              $http.post('/api/changePasswordKeys/', {"createdAt": changePasswordDate, "userID": userID, "key": generatedKey});
              $http.post('/api/mandrill/sendChangePasswordEmail', {"firstName": user.firstName, "email": user.email, "key": generatedKey});
              }
            }
          }
      });
    };
}]);
