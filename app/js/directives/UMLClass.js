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
                endId: association.object.id
              });
              /**Drawer.connectElements(
                $("#" + scope.model.id + '-svg-' + association.object.id),
                $("#" + scope.model.id + '-path-' + association.object.id),
                $("#" + scope.model.id),
                $("#" + association.object.id),
                $("#svgContainer" /*+ scope.model.id + '-svgContainer-' + association.object.id));**/
            }
          };

          $timeout(function(){
            scope.addAssociationLines();
          }); // crashes the UI :(

        }
      };
    });
