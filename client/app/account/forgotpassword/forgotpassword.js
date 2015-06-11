'use strict';

angular.module('snabbtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forgotpassword', {
        url: '/forgotpassword',
        templateUrl: 'app/account/forgotpassword/forgotpassword.html',
        controller: 'ForgotpasswordCtrl'
      });
  });