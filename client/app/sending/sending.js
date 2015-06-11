'use strict';

angular.module('snabbtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sending', {
        url: '/sending',
        templateUrl: 'app/sending/sending.html',
        controller: 'SendingCtrl'
      });
  });
