angular.module("mainController", [])
	.controller("mainController", function($http, $scope, $window, $sce, $rootScope, $location, Converter){
		$scope.initialize = function() {

		};

		$scope.jsonToUML = function(jsonString) {
			var json = JSON.parse(JSON.stringify(eval("(" + jsonString + ")")));
			console.log(Converter.jsonToUML(json));
		};

	});
