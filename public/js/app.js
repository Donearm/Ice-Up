'use strict';

angular.module('iceupApp', ['ngRoute', 'ngResource', 'angularSmoothscroll']).config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/recipes', {
				templateUrl: 'partials/recipe-search.html',
				controller: 'RecipeListController'
			})
			.when('/recipes/:recipeId', {
				templateUrl: 'partials/recipe-id.html',
				controller: 'RecipeIdController'
			})
			.otherwise({ redirectTo: '/recipes'
			});
}]);
