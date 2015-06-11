'use strict';

angular.module('snabbtApp')
  .controller('FriendsCtrl', ["$scope", "$http", "$window", "$modal", "$log", "userBadge", "friendBadge", function ($scope, $http, $window, $modal, $log, userBadge, friendBadge){
    var currentUser = {};
    var userID = "";
    $scope.friendsList = [];
    $scope.userList = [];

    //Obtain information of the user and friends list on page load
    $http.get('/api/users/me').success(function(user){
      currentUser = user;
      userID = user._id;
      $http.get('/api/users/' + userID + '/getFriendsList').success(function(friendsList){
        $scope.friendsList = friendsList;

        //Obtain user list before modal load
        $http.get('/api/quickusers/').success(function(userList){
          $scope.userList = userList;

          //Update friends list with any new information of their friends or new accounts were made
          for(var k = 0; k < $scope.friendsList.length; k++){
            for(var l = 0; l < $scope.userList.length; l++){
              if($scope.friendsList[k].email === $scope.userList[l].email){
                $scope.friendsList[k] = $scope.userList[l];
              }
            }
          }
        });
      });
    });


    $scope.snabbtVersion="";
    $scope.hasChromeExtension = true;

    //For Snabbt App in testing
    //chrome.runtime.sendMessage("aaaidfagmkmolpncfjdondjioijeacac", { message: "version" },

    //For live Snabbt App on Chrome Store
    //Checks to see if user has the extension installed or running
    chrome.runtime.sendMessage("kabdmmcmcicfhaciekfakjkdbafidjfn", { message: "version" },
      function (reply){
        if (reply){
          if (reply.version){
            //responds with a non-number version i.e. '0.1.1'
            $scope.snabbtVersion = reply.version;
            $scope.hasChromeExtension = true;
          }
        }
        else{
          $scope.hasChromeExtension = false;
        }
    });

    var sendBadgeCount = 0;
    //On "transfer file" click, sends request email to friend to connect through Mandrill
    $scope.sendConnectRequestEmail = function(friend){
      $http.post('/api/mandrill/sendconnectrequestemail', {"senderFirstName": currentUser.firstName, "receiverFirstName": friend.firstName, "receiverEmail": friend.email})
    };

    $scope.findFriendResults = {};

    //Finds friend by given parameters
    $scope.findFriend = function(findFriendInfo){
      $http.post('/api/users/findfriend', {"firstName": findFriendInfo.firstName, "lastName": findFriendInfo.lastName, "email": findFriendInfo.email, "userName": findFriendInfo.userName}).success(function(findResults){
        $scope.findFriendResults = findResults;
      });
    };

    $scope.initializeTransfer = function(friend){
      var dateOfInitialization = new Date();
      var friendID = friend._id;
      $http.post('/api/transfers/', {"transferSender": userID, "transferReceiver": friend._id, "transferStatus": {"status": "Initialized", "date": dateOfInitialization}, "transferHistory": [{"status": "Initialized", "date": dateOfInitialization}], "removedBy": {"sender": false, "receiver": false}}).success(function(){
        sendBadgeCount = userBadge.getSendBadges();
        sendBadgeCount++;
        userBadge.updateSendBadges(sendBadgeCount, userID);
        //friendBadge.getBadgesDB(friendID);
        friendBadge.addOneReceivingBadge(friendID);
      });
    };

    $scope.openChromeExtensionTab = function(){
      $window.open("https://chrome.google.com/webstore/detail/snabbt/kabdmmcmcicfhaciekfakjkdbafidjfn", "_blank");
    };

    $scope.openFriendsModal = function (){
      var modalInstance = $modal.open({
        templateUrl: 'app/friends/addFriendModal.html',
        controller: 'friendsModalCtrl',
        backdrop: 'static',
        resolve: {
          currentUser: function(){
            return currentUser;
          }
        }
      });

      modalInstance.result.then(function(addedFriends) {
        for(var i = 0; i < addedFriends.length; i++){
          var dateOfInitialization = new Date();
          var hasFriendAlready = false;
          for(var j = 0; j < $scope.friendsList.length; j++){
            if(addedFriends[i].email === $scope.friendsList[j].email){
              hasFriendAlready = true;

              //Checks if the user is registered, initializes transfer with the friend's ID.
              if($scope.friendsList[j]._id){
                $http.post('/api/transfers/', {"transferSender": userID, "transferReceiver": $scope.friendsList[j]._id, "transferStatus": {"status": "Initialized", "date": dateOfInitialization}, "transferHistory": [{"status": "Initialized", "date": dateOfInitialization}], "removedBy": {"sender": false, "receiver": false}});
                sendBadgeCount = userBadge.getSendBadges();
                sendBadgeCount++;
                userBadge.setSendBadges(sendBadgeCount);
                userBadge.updateSendBadges(sendBadgeCount, userID);
              }

              //If not registered, adds email in place of the receiver, until the person makes an account and has a unique ID
              else{
                $http.post('/api/transfers/', {"transferSender": userID, "transferReceiver": $scope.friendsList[j].email, "transferStatus": {"status": "Initialized", "date": dateOfInitialization}, "transferHistory": [{"status": "Initialized", "date": dateOfInitialization}], "removedBy": {"sender": false, "receiver": false}});
                sendBadgeCount = userBadge.getSendBadges();
                sendBadgeCount++;
                userBadge.setSendBadges(sendBadgeCount);
                userBadge.updateSendBadges(sendBadgeCount, userID);
              }
            }
          }
          if(hasFriendAlready === false){
            var userListCheck = false;
            for(var k = 0; k < $scope.userList.length; k++){
              if(addedFriends[i].email === $scope.userList[k].email){
                $scope.friendsList.push($scope.userList[k]);
                userListCheck = true;
                $http.post('/api/transfers/', {"transferSender": userID, "transferReceiver": $scope.userList[k]._id, "transferStatus": {"status": "Initialized", "date": dateOfInitialization}, "transferHistory": [{"status": "Initialized", "date": dateOfInitialization}], "removedBy": {"sender": false, "receiver": false}});
              }
            }
            if(userListCheck === false){
              $scope.friendsList.push(addedFriends[i]);
              $http.post('/api/transfers/', {"transferSender": userID, "transferReceiver": addedFriends[i].email, "transferStatus": {"status": "Initialized", "date": dateOfInitialization}, "transferHistory": [{"status": "Initialized", "date": dateOfInitialization}], "removedBy": {"sender": false, "receiver": false}});
            }
          }
          if(i === addedFriends.length - 1){
            $http.put('/api/users/' + userID + '/updateFriendsList', $scope.friendsList);
          }
        }
      }, function(){
        $log.info("Modal dismissed at: " + new Date());
      });
    };

    $scope.isFileChosen = function(){
      return $scope.fileChosen;
    };

    $scope.restartFileChosen = function(){
      $scope.fileChosen = null;
    };
}]);

