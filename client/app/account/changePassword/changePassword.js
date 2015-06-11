'use strict';

angular.module('snabbtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('changepassword', {
        url: '/changepassword/:key',
        templateUrl: 'app/account/changePassword/changePassword.html',
        controller: 'ChangePasswordCtrl'
      })
      .state('errorChangePassword',{
        url: '/errorchangepassword',
        templateUrl: 'app/account/changePassword/changePasswordError.html'
      });
  });
