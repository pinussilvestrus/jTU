angular.module("associationDirective", [])
    .directive('association', function umlClassFactory(Drawer, $timeout, $rootScope) {
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

          var _random = function(min, max) {
            return Math.random() * (max - min) + min;
          };

          var _randomMargin = function() {
            var associationElement = $("#" + scope.model.endId);
            var _randomRight = _random(0, 20);
            var _randomLeft = _random(0, 20);
            var _randomTop = _random(0, 20);
            var _randomBottom = _random(0, 20);

            if ($rootScope.newClassIsLeft) {
              associationElement.css('margin-left', _randomLeft);
            }
            else {
              associationElement.css('margin-right', _randomRight);
            }

            $rootScope.newClassIsLeft = !$rootScope.newClassIsLeft;

            associationElement.css('margin-top', _randomTop);
            associationElement.css('margin-bottom', _randomBottom);
          };

          var _drawLine = function() {

            _randomMargin();

            Drawer.connectElements(
              $("#" + scope.model.associationId),
              $("#" + scope.model.pathId),
              $("#" + scope.model.startId),
              $("#" + scope.model.endId),
              $("#svgContainer"),
              $("#" + scope.model.captionId),
              $("#" + scope.model.multiplicity.upperId),
              $("#" + scope.model.multiplicity.lowerId),
              scope.model.multiplicity.type);
          };

          $timeout(function(){
            _drawLine();
          });

        }
      };
    });
