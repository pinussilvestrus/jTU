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
                associationId: scope.model.id + '_svg_' + association.object.id,
                pathId: scope.model.id + '_path_' + association.object.id,
                startId: scope.model.id,
                endId: association.object.id,
                caption: association.name,
                captionId: scope.model.id + '_caption_' + association.object.id,
                multiplicity: {
                  type: association.multiplicity,
                  upperId: scope.model.id + '_mUpper_' + association.object.id,
                  lowerId: scope.model.id + '_mLower_' + association.object.id
                }
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
