var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('/player')
		.success(function (response){
			console.log('Got the data from server');
			// $scope.tracks = response.tracks;
			$scope.posts = response;		});
		    
	

}]);