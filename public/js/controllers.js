angular.module('iceupApp').controller('RecipeListController', ['$scope', 'GetRecipe',
		function($scope, GetRecipe) {
			$scope.recipes = GetRecipe.query();
		}]);

angular.module('iceupApp').controller('RecipeIdController', ['$scope', '$routeParams', 'GetRecipe',
	function($scope, $routeParams, GetRecipe) {
		$scope.recipe = GetRecipe.get({recipeId: $routeParams.recipeId}, function(recipe) {
		});
	}]);
