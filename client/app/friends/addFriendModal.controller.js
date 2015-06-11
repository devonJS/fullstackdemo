/**
 * Created by Devon on 4/14/2015.
 */

'use strict';

angular.module('snabbtApp')
  .controller("friendsModalCtrl", ["$scope", "$modalInstance", "$http", "currentUser", "$timeout", function($scope, $modalInstance, $http, currentUser, $timeout){
    $scope.friend = {};
    $scope.addedFriends = [];

    $scope.submittedForm = function (transferForm, friend){
      if(transferForm.$valid){
        if($scope.addedFriends){
          $scope.isSubmitted = true;
          friend.email = friend.email.toLowerCase();
          $scope.addedFriends.push(friend);

          $http.post('/api/mandrill/sendconnectrequestemail', {"senderFirstName": currentUser.firstName, "receiverFirstName": friend.firstName, "receiverEmail": friend.email.toLowerCase()}).success(function(response){
            console.log("Response: " + response);
          });
          $timeout(function(){
            $modalInstance.close($scope.addedFriends);
          }, 1250);

        }
        else{
          $modalInstance.dismiss("Submit");
        }
      }
    };
    $scope.cancel = function(){
      if($scope.addedFriends){
        $modalInstance.close($scope.addedFriends);
      }
      else{
        $modalInstance.dismiss("Cancel");
      }
    };

    $scope.formCheck = function(transferForm){
      if(transferForm.$invalid){
        $scope.submitted = false;
      }
    };

}]);
