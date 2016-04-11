angular.module("umlClassDirective", [])
    .directive('umlClass', function umlClassFactory() {
      'use strict';

      return {
        restrict: 'E',
        templateUrl: '/app/js/directives/UMLClass.html',
        scope: {
          model: '='
        },
        link: function(scope) {
          console.log(scope.model);
        }
      };
    });
