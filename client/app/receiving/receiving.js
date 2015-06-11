'use strict';

angular.module('snabbtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('receiving', {
        url: '/receiving',
        templateUrl: 'app/receiving/receiving.html',
        controller: 'ReceivingCtrl'
      });
  });
