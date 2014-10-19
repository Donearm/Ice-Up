'use strict';

var iceupApp = angular.module('iceupApp', ['ngRoute', 'ngResource']);

iceupApp.config(['$routeProvider',
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

iceupApp.controller('RecipeIdController', ['$scope', '$routeParams', 'GetRecipe',
		function($scope, $routeParams, GetRecipe) {
			$scope.recipe = GetRecipe.get({recipeId: $routeParams.recipeId}, function(recipe) {
			});
			console.log($scope.recipe);
		}]);

iceupApp.factory('GetRecipe', ['$resource',
		function($resource) {
			return $resource('data/:recipeId.json', {}, {
				query: {method: 'GET', params: { recipeId: '@id'}, isArray: false}
			});
		}]);
