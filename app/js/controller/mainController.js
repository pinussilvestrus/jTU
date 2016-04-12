angular.module("mainController", [])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, $timeout, Converter, Drawer){

		var _testDrawing = function() {
			var div1 = document.getElementById('jsonForm');
    	var div2 = document.getElementById('umlField');

			Drawer.drawLine(div1, div2, "#0F0", 1);
		};

		$scope.initialize = function() {
			$scope.jsonValid = true;
		};

		$scope.jsonToUML = function(jsonString) {
			$scope.processing = true;
			$scope.jsonValid = true;
			try {
				var json = JSON.parse(JSON.stringify(eval("(" + jsonString + ")")));
				$scope.processing = false;
				$scope.umlJsonObject = Converter.jsonToUML(json);
				$scope.umlJsonString = JSON.stringify($scope.umlJsonObject);
			} catch(err) {
				$scope.processing = false;
				$scope.jsonValid = false;
			}
		};

	});
