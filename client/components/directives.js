/**
 * Created by Devon on 4/17/2015.
 */
'use strict';
angular.module('snabbtApp')
  .directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    };
  }]);