'use strict';

angular.module('snabbtApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, $http) {
    $scope.user = {};
    $scope.errors = {};
    var emailTransfers ="";
    var userID = "";
    var userEmail = "";

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          userName: $scope.user.userName,
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          email: $scope.user.email,
          password: $scope.user.password,
          sendingBadgeCount: 0,
          receivingBadgeCount: 0
        })
        .then( function() {
          $http.get('/api/users/me').success(function(user){
            userID = user._id;
            userEmail = user.email;
            $http.post('/api/quickusers/', {"_id": userID, "userName": $scope.user.userName, "firstName": $scope.user.firstName, "lastName": $scope.user.lastName, "email": $scope.user.email});

            $http.post('/api/mandrill/sendSignUpConfirmation', {"firstName": $scope.user.firstName,"email": $scope.user.email});

            //Overwrites user email with unique UserID, reposts back to Mongo
            $http.put('api/transfers/' + userEmail + '/updateTransfersByEmail', {"id": userID});

          });
            // Account created, redirect to home
            $location.path('/friends');
          })

        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
