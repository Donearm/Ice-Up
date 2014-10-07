var iceupApp = angular.module('iceupApp', ['ngRoute', 'ngResource']);

iceupApp.config(function ($routeProvider) {
	$routeProvider
		.when('/recipes', {
			templateUrl: 'partials/recipe-list.html',
			controller: 'RecipeListController'
		})
		.when('/recipes/:recipeId', {
			templateUrl: 'partials/recipe-id.html',
			controller: 'RecipeIdController'
		})
		.otherwise({ redirectTo: '/recipes' });
});

iceupApp.controller('RecipeListController', ['$scope', 'Recipe',
		function($scope, Recipe) {
			$scope.recipes = Recipe.query();
		}]);
iceupApp.controller('RecipeIdController', ['$scope', '$routeParams', 'Recipe',
		function($scope, $routeParams, Recipe) {
			$scope.recipe = Recipe.get({recipeId: $routeParams.recipeId}, function(recipe) {
			});
		}]);

iceupApp.factory('Recipe', ['$resource',
		function($resource) {
			return $resource('/data/:recipeId.json', {}, {
				query: {method: 'GET', params: { recipeId: '@id'}, isArray: true}
			});
		}]);
