'use strict';

angular.module('snabbtApp')
  .controller('SendingCtrl', ['$http', '$scope', 'friendBadge', function ($http, $scope, friendBadge) {
    var currentUser = {};
    var userID = "";
    $scope.sentTransfers = [];
    var usersList = [];
    var friendsList = [];
    $scope.noTransfers = false;

    //Load sent transfers of user on page load
    $http.get('/api/users/me').success(function(user) {
      currentUser = user;
      userID = user._id;
        $http.get('/api/transfers/' + userID + '/getSentTransfers').success(function (transfers) {
          $scope.transfers = transfers;

          $http.get('/api/users/' + userID + '/getFriendsList').success(function (friendList) {
            friendsList = friendList;
          });

          //Fix for when you add a non-user, still shows up in the sending section
          for (var k = 0; k < $scope.transfers.length; k++) {
            for (var l = 0; l < friendsList.length; l++) {
              if ($scope.transfers[k].transferReceiver === friendsList[l].email) {
                $scope.transfers[k].transferReceiverFirstName = friendsList[l].firstName;
                $scope.transfers[k].transferReceiverLastName = friendsList[l].lastName;
                $scope.transfers[k].transferReceiverEmail = friendsList[l].email;
                $scope.sentTransfers.push($scope.transfers[k]);
              }
            }
          }

          $http.get('/api/quickusers/').success(function (userList) {
            usersList = userList;
            for (var i = 0; i < $scope.transfers.length; i++) {
              for (var j = 0; j < usersList.length; j++) {
                if ($scope.transfers[i].transferReceiver === userList[j]._id && $scope.transfers[i].transferReceiver !== userID) {
                  $scope.transfers[i].transferReceiverFirstName = userList[j].firstName;
                  $scope.transfers[i].transferReceiverLastName = userList[j].lastName;
                  $scope.transfers[i].transferReceiverUserName = userList[j].userName;
                  $scope.transfers[i].transferReceiverEmail = userList[j].email;
                  $scope.transfers[i].pictureID = userList[j].pictureID;
                  $scope.sentTransfers.push($scope.transfers[i]);
                }
              }
            }
            if($scope.sentTransfers.length === 0){
              $scope.noTransfers = true;
            }
          });
        });
    });

    //Adds status of transferring after user clicks accept transfer
    $scope.acceptedRestartedTransfer = function(transfer){
      $scope.topLevelCount += 3;
      $scope.midLevelCount -= 3;
      var dateTransferring = new Date();
      transfer.transferHistory.push({"date": dateTransferring, "status": "Transferring"});
      transfer.transferStatus = {"date": dateTransferring, "status": "Transferring"};

      $http.put('api/transfers/' + transfer._id, transfer);

      friendBadge.addOneReceivingBadge(transfer.transferReceiver);
    };

    $scope.topLevelCount = 0;
    $scope.midLevelCount = 0;
    $scope.lowLevelCount = 0;

    //Checks current status of transfer, changes the view depending on status
    //True counts are multiplied by 3 because each section filters through all sent transfers
    $scope.transferStatusCheck = function(transfer){
      if(transfer.transferStatus.status === 'Initialized'){
        transfer.initialized = true;
        $scope.midLevelCount++;
      }
      else if(transfer.transferStatus.status === 'Transferring'){
        transfer.transferring = true;
        $scope.topLevelCount++;
      }
      else if((transfer.transferStatus.status.search(/^Cancelled/)) === 0){
        transfer.cancelled = true;
        $scope.lowLevelCount++;
      }
      else if((transfer.transferStatus.status === "Removed by Sender")){
        transfer.removedBySender = true;
        //Fix for if user only has removed transfers, should show no transfers view
        $scope.noTransfers = true;
      }
      else if((transfer.transferStatus.status === "Removed by Receiver")){
        transfer.removedByReceiver = true;
        $scope.lowLevelCount++;
      }
      else if((transfer.transferStatus.status.search(/^Restarted/)) === 0){
        transfer.restarted = true;
        $scope.midLevelCount++;
      }
      else if((transfer.transferStatus.status.search(/^Declined/)) === 0){
        transfer.declined = true;
        $scope.lowLevelCount++;
      }
      else{
        $scope.noTransfers = true;
      }
    };

    //Changes the ng-hide/ng-show status of X and trash can buttons on hover
    $scope.buttonHoverOver = function(){
      this.buttonMouseOver = true;
    };

    $scope.buttonHoverLeave = function(){
      this.buttonMouseOver = false;
    };

    //Functionality for cancelling transfer
    $scope.cancelTransfer = function(transfer) {
      var dateCancelled = new Date();
      transfer.transferring = false;
      transfer.cancelled = true;
      $scope.midLevelCount -= 3;
      $scope.lowLevelCount += 3;

      if (userID === transfer.transferSender) {
        transfer.transferHistory.push({"date": dateCancelled, "status": "Cancelled by Sender"});
        transfer.transferStatus = {"date": dateCancelled, "status": "Cancelled by Sender"};
        $http.put('api/transfers/' + transfer._id, transfer);
        friendBadge.addOneReceivingBadge(transfer.transferReceiver);
      }
    };

    //Functionality for cancelling top transfer
    $scope.cancelTopTransfer = function(transfer) {
      var dateCancelled = new Date();
      transfer.transferring = false;
      transfer.cancelled = true;
      $scope.topLevelCount -= 3;
      $scope.lowLevelCount += 3;

      if (userID === transfer.transferSender) {
        transfer.transferHistory.push({"date": dateCancelled, "status": "Cancelled by Sender"});
        transfer.transferStatus = {"date": dateCancelled, "status": "Cancelled by Sender"};
        $http.put('api/transfers/' + transfer._id, transfer);
        friendBadge.addOneReceivingBadge(transfer.transferReceiver);
      }
    };


    $scope.noTransfers = false;

    //Functionality for removing transfer
    //Creates a "transfer grave" when both the receiver and sender have removed the transfer
    $scope.removeTransfer = function(transfer) {
      var dateRemoved = new Date();
      transfer.removedBySender = true;
      transfer.cancelled = false;
      transfer.declined = false;
      $scope.lowLevelCount -= 3;

      //Watches for last transfer removal, if it was last transfer, will show no transfer view
      $scope.$watch($scope.lowLevelCount, function(){
        if($scope.lowLevelCount === 0 && $scope.topLevelCount === 0 && $scope.midLevelCount === 0){
          $scope.noTransfers = true;
        }
      });

      if (userID === transfer.transferSender) {
        transfer.transferHistory.push({"date": dateRemoved, "status": "Removed by Sender"});
        transfer.transferStatus = {"date": dateRemoved, "status": "Removed by Sender"};
        transfer.removedBy.sender = true;
        $http.put('api/transfers/' + transfer._id, transfer);

        if (transfer.removedBy.receiver) {
          $http.post('api/transferGrave/', transfer);
          $http.delete('api/transfers/' + transfer._id);
        }
        else {
          friendBadge.addOneReceivingBadge(transfer.transferReceiver);
        }
      }
    };


    //Functionality for restarting transfer on either receiver/sender ends
    //Restart moves the transfer from cancelled(inactive) to restarted(pending)
    $scope.restartTransfer = function(transfer) {
      var dateRestarted = new Date();
      transfer.restarted = true;
      transfer.cancelled = false;
      $scope.lowLevelCount -= 3;
      $scope.midLevelCount += 3;

      if (userID === transfer.transferSender) {
        transfer.transferHistory.push({"date": dateRestarted, "status": "Restarted by Sender"});
        transfer.transferStatus = {"date": dateRestarted, "status": "Restarted by Sender"};
        $http.put('api/transfers/' + transfer._id, transfer);
        friendBadge.addOneReceivingBadge(transfer.transferReceiver);
      }
    };

    //Checks if the transfer was restarted by user, if it is, then will get a different button
    $scope.restartedByUser = function(transfer) {
      if (transfer.transferStatus.status === "Restarted by Sender" && userID === transfer.transferSender) {
        return true;
      }
      else {
        return false;
      }
    };


  }]);
