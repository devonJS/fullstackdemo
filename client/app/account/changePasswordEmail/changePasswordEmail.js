'use strict';

angular.module('snabbtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('changePasswordEmail', {
        url: '/changepasswordemail/:key',
        templateUrl: 'app/account/changePasswordEmail/changePasswordEmail.html',
        controller: 'ChangePasswordEmailCtrl'
      });
  });
