/**
 * Created by Devon on 4/17/2015.
 */
'use strict';
angular.module('snabbtApp')
.factory('userBadge', ["$http", function($http){
    var sendBadgesNum = 0;
    var receiveBadgesNum = 0;
    return {
      setSendBadges: function(sendBadges) {
        sendBadgesNum = sendBadges;
      },
      getSendBadges: function() {
        return sendBadgesNum;
      },
      updateSendBadges: function(numBadges, id) {
        var userID = id;
        sendBadgesNum = numBadges;
        $http.put('/api/users/' + userID + '/sendBadgeUpdate', {"sendingBadgeCount": numBadges});
      },
      setReceiveBadges: function(receiveBadges) {
        receiveBadgesNum = receiveBadges;
      },
      getReceiveBadges: function() {
        return receiveBadgesNum;
      },
      updateReceiveBadges: function(numBadges, id) {
        var userID = id;
        receiveBadgesNum = numBadges;
        $http.put('/api/users/' + userID + '/receiveBadgeUpdate', {"receivingBadgeCount": numBadges});
      }
    };
}])

.factory('friendBadge', ["$http", function($http){
    var sendBadgesNum = 0;
    var receiveBadgesNum = 0;
    return {
      getBadgesDB: function(friendID) {
        $http.get("/api/users/" + friendID + "/getBadgesCount").success(function(res){
          sendBadgesNum = res[0];
          receiveBadgesNum = res[1];
        });
      },
      addOneReceivingBadge: function(friendID) {
        var friendReceiveBadges = 0;
        $http.get("/api/users/" + friendID + "/getBadgesCount").success(function(res){
          friendReceiveBadges = res[1];
          friendReceiveBadges++;
          $http.put('/api/users/' + friendID + '/receiveBadgeUpdate', {"receivingBadgeCount": friendReceiveBadges}).success(function(){
            console.log("Receive Badge Updated to: " + friendReceiveBadges);
          });
        });
      },
      addOneSendingBadge: function(friendID) {
        var friendSendBadges = 0;
        $http.get("/api/users/" + friendID + "/getBadgesCount").success(function(res){
          friendSendBadges = res[0];
          friendSendBadges++;
          $http.put('/api/users/' + friendID + '/sendBadgeUpdate', {"sendingBadgeCount": friendSendBadges}).success(function(){
            console.log("Send Badge Updated to: " + friendSendBadges);
          });
        });
      }
    };
}]);
