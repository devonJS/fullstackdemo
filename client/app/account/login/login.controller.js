'use strict';

angular.module('snabbtApp')
  .controller('LoginCtrl', function ($timeout, $scope, Auth, $cookieStore, $location, $window, Redirect) {
    $scope.user = {};
    $scope.errors = {};

    $scope.changePasswordRedirect = function(){
      if(Redirect.isValidKey() && Redirect.triedToChangePassword()){
        Redirect.resetChangePassword();
        $timeout(function() {
          angular.element('#mySelector').triggerHandler('click');
        }, 0);
      }
      else if(!Redirect.isValidKey() && Redirect.triedToChangePassword()){
        Redirect.resetChangePassword();
        $timeout(function() {
          angular.element('#failMySelector').triggerHandler('click');
        }, 0);
      }
    };

    $scope.changePasswordRedirect();

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/friends');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
