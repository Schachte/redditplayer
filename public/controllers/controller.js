var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

$scope.tracks = [];

var refresh = function(){
	$http.get('/player')
		.success(function (posts){
			$scope.posts = posts;

		});
	};

var dbRefresh = function(){
	$http.get('/dbUpdate')
		.success(function (tracks){
			$scope.tracks = tracks;
		});
};


$scope.addToPlaylist = function(post){
	$http.post('/player', post)
		.success(function (){
			dbRefresh();
		});
};

dbRefresh();
refresh();

$scope.playIncrement = function(track){
	$http.post('/dbUpdate', track)
		.success(function (){
			dbRefresh();
		})

}

}]);