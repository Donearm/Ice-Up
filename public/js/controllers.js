angular.module('iceupApp').controller('RecipeIdController', ['$scope', '$routeParams', 'GetRecipe',
	function($scope, $routeParams, GetRecipe) {
		$scope.recipe = GetRecipe.get({recipeId: $routeParams.recipeId}, function(recipe) {
		});
	}]);
