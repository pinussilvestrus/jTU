angular.module("umlClassDirective", [])
    .directive('umlClass', function umlClassFactory(Drawer, $timeout) {
      'use strict';

      return {
        restrict: 'E',
        templateUrl: '/app/js/directives/UMLClass.html',
        scope: {
          model: '='
        },
        link: function(scope, element, attrs) {

          scope.drawAssociationLines = function() {

            for (var i = 0; i < scope.model.associations.length; i++) {

              var association = scope.model.associations[i];

              Drawer.connectElements(
                $("#svg1"), //scope.model.id + '-path-' + association.object.id
                $("#path1"),   // + scope.model.id + '-svg-' + association.object.id
                $("#" + scope.model.id),
                $("#" + association.object.id),
                $("#" + scope.model.id + '-svgContainer-' + association.object.id));
            }
          };

          $timeout(function(){
            scope.drawAssociationLines();
          }); // crashes the UI :(

        }
      };
    });
