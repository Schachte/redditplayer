var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

$scope.tracks = [];

var refresh = function(){
	$http.get('/player')
		.success(function (response){
			$scope.posts = response;
		});
	};

refresh();
$scope.update = refresh();

$scope.addToPlaylist = function(post){
	var temp = {
		name: post.title,
		artist: 'placeholder',
		plays: 0
	}
	$scope.tracks.push(temp);
	refresh();
}

$scope.playIncrement = function(track){
	track.plays += 1;
}

}]);