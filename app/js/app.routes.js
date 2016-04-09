angular.module("app.routes", ["ngRoute"])

	.config(function($routeProvider, $locationProvider){

		$routeProvider
			.when("/", {
				templateUrl : "app/views/home.html",
				controller  : "mainController",
				controllerAs: "main",
			})
			.otherwise({
				templateUrl: "app/views/404.html"
			});

		$locationProvider.html5Mode(true);
	});
