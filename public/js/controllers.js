angular.module('iceupApp').controller('RecipeIdController', ['$scope', '$routeParams', 'GetRecipe',
	function($scope, $routeParams, GetRecipe) {
		console.log($routeParams.recipeId);
		console.log($routeParams);
		$scope.recipe = GetRecipe.query({recipeId: $routeParams.recipeId}, function(recipe) {
		});
		console.log($scope.recipe);
	}]);
