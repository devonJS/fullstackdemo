'use strict';

angular.module('snabbtApp')
  .controller('ChangePasswordEmailCtrl', ['$scope', 'Redirect', '$stateParams', function ($scope, Redirect, $stateParams) {
    var setKeyBeforeRedirect = function(){
      Redirect.checkKey($stateParams.key);
    };
    setKeyBeforeRedirect();
  }]);
