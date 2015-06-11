'use strict';

angular.module('snabbtApp')
  .controller('ChangePasswordCtrl', ["$scope", "$http", "$stateParams", "$location", "Redirect", "$timeout", function ($scope, $http, $stateParams, $location, Redirect, $timeout) {

    $scope.newConfirmMatch = function(){
      return $scope.newPassword === $scope.confirmPassword;
    };

    $scope.changePassword = function(){
      var userID = Redirect.getUserID();
      $scope.changePasswordSuccess = true;
      $timeout(function(){
        $location.path('/login');
      }, 1500);
      $http.put('/api/users/' + userID + '/changepassword', {"newPassword": $scope.newPassword});
      $http.delete('/api/changePasswordKeys/' + userID + '/clearKeys');
    };
}]);
