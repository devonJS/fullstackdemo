'use strict';

angular.module('snabbtApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $http, userBadge) {
    var currentUser = {};
    var userID = "";
    $scope.sendBadgeCount = userBadge.getSendBadges();
    $scope.receiveBadgeCount = userBadge.getReceiveBadges();
    var initialBadgeRequest = function() {
      $http.get('/api/users/me').success(function(user) {
        currentUser = user;
        userID = user._id;
        $http.get('/api/users/' + userID + '/getBadgesCount').success(function(res){
          //Responds with an array [sendBadges, receiveBadges]
          $scope.sendBadgeCount = res[0];
          $scope.receiveBadgeCount = res[1];
          userBadge.setSendBadges(res[0]);
          userBadge.setReceiveBadges(res[1]);
        });
      });
    };

    initialBadgeRequest();

    $http.get('/api/users/me').success(function(user) {
      currentUser = user;
      userID = user._id;
    });

    setInterval(function() {
      $scope.$apply(function(){
        $scope.sendBadgeCount = userBadge.getSendBadges();
        $scope.receiveBadgeCount = userBadge.getReceiveBadges();
      });
    }, 1000);

    $scope.clearSendBadges = function() {
      $scope.sendBadgeCount = 0;
      userBadge.updateSendBadges($scope.sendBadgeCount, userID);
    };

    $scope.clearReceiveBadges = function() {
      $scope.receiveBadgeCount = 0;
      userBadge.updateReceiveBadges($scope.receiveBadgeCount, userID);
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
