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

              var div1 = document.getElementById(scope.model.id);
              var div2 = document.getElementById(scope.model.associations[i].object.id);

              Drawer.drawLine(div1, div2, "#424242", 1);
            }
          };

          $timeout(function(){
            scope.drawAssociationLines();
          }, 50);

        }
      };
    });
