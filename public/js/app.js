'use strict';

var iceupApp = angular.module('iceupApp', ['ngRoute', 'ngResource']);

iceupApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/recipes', {
				templateUrl: 'partials/recipe-list.html',
				controller: 'RecipeListController'
			})
			.when('/recipes/:recipeId', {
				templateUrl: 'partials/recipe-id.html',
				controller: 'RecipeIdController'
			})
			.otherwise({ redirectTo: '/recipes'
			});
}]);

iceupApp.controller('RecipeListController', ['$scope', 'GetRecipe',
		function($scope, GetRecipe) {
			$scope.recipes = GetRecipe.query();
		}]);
iceupApp.controller('RecipeIdController', ['$scope', '$routeParams', 'GetRecipe',
		function($scope, $routeParams, GetRecipe) {
			$scope.recipe = GetRecipe.get({recipeId: $routeParams.recipeId}, function(recipe) {
			});
		}]);

iceupApp.factory('GetRecipe', ['$resource',
		function($resource) {
			return $resource('data/:recipeId.json', {}, {
				query: {method: 'GET', params: { recipeId: '@id'}, isArray: false}
			});
		}]);
