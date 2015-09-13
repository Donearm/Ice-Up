angular.module('iceupApp').factory('GetRecipe', ['$resource',
	function($resource) {
		return $resource('data/:recipeId.json', {}, {
			query: {method: 'GET', params: { recipeId: 'recipes'}, isArray: true}
		});
	}]);
