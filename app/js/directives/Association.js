angular.module("associationDirective", [])
    .directive('association', function umlClassFactory(Drawer, $timeout) {
      'use strict';

      /**
      {
        associationId: String,
        pathId: String,
        startId: String,
        endId: String
      }
      **/

      return {
        restrict: 'E',
        templateUrl: '/app/js/directives/Association.html',
        scope: {
          model: '='
        },
        link: function(scope, element, attrs) {

          var _drawLine = function() {
            Drawer.connectElements(
              $("#" + scope.model.associationId),
              $("#" + scope.model.pathId),
              $("#" + scope.model.startId),
              $("#" + scope.model.endId),
              $("#svgContainer"));
          };

          $timeout(function(){
            _drawLine();
          });

        }
      };
    });
