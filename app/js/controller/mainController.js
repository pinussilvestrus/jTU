angular.module("mainController", [])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, $timeout, Converter, Drawer){

		var _testDrawing = function() {
			Drawer.connectElements($("#svg1"), $("#path1"), $("#testData"),  $("#umlField"));
		};

		$scope.initialize = function() {
			$scope.jsonValid = true;
			$rootScope.associations = [];
			$scope.umlJsonObject = undefined;
			//_testDrawing();
		};

		$scope.jsonToUML = function(jsonString) {
			$scope.initialize();
			$scope.processing = true;
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
