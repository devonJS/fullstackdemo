'use strict';

angular.module('snabbtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('friends', {
        url: '/friends',
        templateUrl: 'app/friends/friends.html',
        controller: 'FriendsCtrl'
      });
  });
