angular.module("umlClassDirective", [])
    .directive('umlClass', function umlClassFactory(Drawer, $timeout, $rootScope) {
      'use strict';

      return {
        restrict: 'E',
        templateUrl: '/app/js/directives/UMLClass.html',
        scope: {
          model: '='
        },
        link: function(scope, element, attrs) {

          scope.addAssociationLines = function() {

            for (var i = 0; i < scope.model.associations.length; i++) {

              var association = scope.model.associations[i];
              $rootScope.associations.push({
                associationId: scope.model.id + '-svg-' + association.object.id,
                pathId: scope.model.id + '-path-' + association.object.id,
                startId: scope.model.id,
                endId: association.object.id,
                caption: association.name
              });
            }
          };

          $timeout(function(){
            scope.addAssociationLines();
          });

          scope.$watch("model",function() { // update
              scope.addAssociationLines();
          });

        }
      };
    });
