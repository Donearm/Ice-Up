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

iceupApp.controller('RecipeListController', ['$scope', 'getRecipe',
		function($scope, getRecipe) {
			$scope.recipes = getRecipe.query();
		}]);
iceupApp.controller('RecipeIdController', ['$scope', '$routeParams', 'getRecipe',
		function($scope, $routeParams, getRecipe) {
			$scope.recipe = getRecipe.get({recipeId: $routeParams.recipeId}, function(recipe) {
			});
		}]);

iceupApp.factory('getRecipe', ['$resource',
		function($resource) {
			return $resource('/data/:recipeId.json', {}, {
				query: {method: 'GET', params: { recipeId: '@id'}, isArray: true}
			});
		}]);
