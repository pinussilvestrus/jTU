angular.module("mainController", [])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, $timeout, Converter){
		$scope.initialize = function() {
			$scope.jsonValid = true;
		};

		$scope.jsonToUML = function(jsonString) {
			$scope.processing = true;
			$scope.jsonValid = true;
			try {
				var json = JSON.parse(JSON.stringify(eval("(" + jsonString + ")")));
				$timeout(function(){
					$scope.processing = false;
					$scope.umlJsonObject = Converter.jsonToUML(json);
					$scope.umlJsonString = JSON.stringify($scope.umlJsonObject);
				}, 2000);
			} catch(err) {
				$scope.processing = false;
				$scope.jsonValid = false;
			}
		};

	});
