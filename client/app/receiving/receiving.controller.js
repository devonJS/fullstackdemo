'use strict';

angular.module('snabbtApp')
  .controller('ReceivingCtrl', ['$http', '$scope', 'friendBadge', function ($http, $scope, friendBadge) {
    var currentUser = {};
    var userID = "";
    $scope.receivedTransfers = [];
    var usersList = [];
    $scope.noTransfers = false;

    //Load received transfers of user on page load
    $http.get('/api/users/me').success(function(user) {
      currentUser = user;
      userID = user._id;

      $http.get('/api/transfers/' + userID + '/getReceivedTransfers').success(function (transfers) {
        $scope.transfers = transfers;

        $http.get('/api/quickusers/').success(function (userList) {
          usersList = userList;
          for (var i = 0; i < $scope.transfers.length; i++) {
            for (var j = 0; j < usersList.length; j++) {
              if ($scope.transfers[i].transferSender === userList[j]._id && $scope.transfers[i].transferSender !== userID) {
                $scope.transfers[i].transferSenderFirstName = userList[j].firstName;
                $scope.transfers[i].transferSenderLastName = userList[j].lastName;
                $scope.transfers[i].transferSenderUserName = userList[j].userName;
                $scope.transfers[i].transferSenderEmail = userList[j].email;
                $scope.transfers[i].pictureID = userList[j].pictureID;
                $scope.receivedTransfers.push($scope.transfers[i]);
              }
            }
          }
          if($scope.receivedTransfers.length === 0){
            $scope.noTransfers = true;
          }
        });
      });
    });

    //Adds status of transferring after user clicks accept transfer
    $scope.acceptedTransfer = function(transfer){
      $scope.topLevelCount += 3;
      $scope.midLevelCount -= 3;
      var dateTransferring = new Date();
      transfer.transferHistory.push({"date": dateTransferring, "status": "Transferring"});
      transfer.transferStatus = {"date": dateTransferring, "status": "Transferring"};

      $http.put('api/transfers/' + transfer._id, transfer);

      friendBadge.addOneSendingBadge(transfer.transferSender);
    };

    //Functionality for declining transfer
    $scope.declinedTransfer = function(transfer){
      $scope.midLevelCount -= 3;
      $scope.lowLevelCount += 3;
      var dateDeclined = new Date();
      transfer.transferHistory.push({"date": dateDeclined, "status": "Declined by Receiver"});
      transfer.transferStatus = {"date": dateDeclined, "status": "Declined by Receiver"};

      $http.put('api/transfers/' + transfer._id, transfer);

      friendBadge.addOneSendingBadge(transfer.transferSender);
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
        $scope.lowLevelCount++;
      }
      else if((transfer.transferStatus.status === "Removed by Receiver")){
        transfer.removedByReceiver = true;
        //Fix for if user only has removed transfers, should show no transfers view
        $scope.noTransfers = true;
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

    //Functionality for cancelling transfer on receiver end
    $scope.cancelTransfer = function(transfer) {
      var dateCancelled = new Date();
      transfer.transferring = false;
      transfer.cancelled = true;
      $scope.midLevelCount -= 3;
      $scope.lowLevelCount += 3;

      if(userID === transfer.transferReceiver){
        transfer.transferHistory.push({"date": dateCancelled, "status": "Cancelled by Receiver"});
        transfer.transferStatus = {"date": dateCancelled, "status": "Cancelled by Receiver"};
        $http.put('api/transfers/' + transfer._id, transfer);
        friendBadge.addOneSendingBadge(transfer.transferSender);
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

    //Functionality for removing transfer on either receiver/sender ends
    //Creates a "transfer grave" when both the receiver and sender have removed the transfer
    $scope.removeTransfer = function(transfer) {
      var dateRemoved = new Date();
      transfer.cancelled = false;
      transfer.declined = false;
      transfer.removedByReceiver = true;
      $scope.lowLevelCount -= 3;

      //Watches for last transfer removal, if it was last transfer, will show no transfer view
      $scope.$watch($scope.lowLevelCount, function(){
        if($scope.lowLevelCount === 0 && $scope.topLevelCount === 0 && $scope.midLevelCount === 0){
          $scope.noTransfers = true;
        }
      });

      if(userID === transfer.transferReceiver){
        transfer.transferHistory.push({"date": dateRemoved, "status": "Removed by Receiver"});
        transfer.transferStatus = {"date": dateRemoved, "status": "Removed by Receiver"};
        transfer.removedBy.receiver = true;
        $http.put('api/transfers/' + transfer._id, transfer);

        if(transfer.removedBy.sender === true){
          $http.post('api/transferGrave/', transfer);
          $http.delete('api/transfers/' + transfer._id);
        }
        else{
          friendBadge.addOneSendingBadge(transfer.transferSender);
        }
      }
    };

    //Functionality for restarting transfer on either receiver/sender ends
    //Restart moves the transfer from cancelled(inactive) to restarted(pending)
    $scope.restartTransfer = function(transfer) {
      var dateRestarted = new Date();
      transfer.restarted = true;
      $scope.lowLevelCount -= 3;
      $scope.midLevelCount += 3;

      if(userID === transfer.transferReceiver){
        transfer.transferHistory.push({"date": dateRestarted, "status": "Restarted by Receiver"});
        transfer.transferStatus = {"date": dateRestarted, "status": "Restarted by Receiver"};
        $http.put('api/transfers/' + transfer._id, transfer);
        friendBadge.addOneSendingBadge(transfer.transferSender);
      }
    };

    //Checks if the transfer was restarted by user, if it is, then will get a different button
    $scope.restartedByUser = function(transfer){
      if(transfer.transferStatus.status === "Restarted by Receiver" && userID === transfer.transferReceiver){
        return true;
      }
      else{
        return false;
      }
    };
  }]);
