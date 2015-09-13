'use strict';

angular.module('iceupApp', ['ngRoute', 'ngResource']).config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/recipes', {
				templateUrl: 'partials/recipe-search.html',
			})
			.when('/recipes/:recipeId', {
				templateUrl: 'partials/recipe-id.html',
				controller: 'RecipeIdController'
			})
			.when('/about', {
				templateUrl: 'partials/about.html'
			})
			.otherwise({ redirectTo: '/recipes'
			});
}]);

