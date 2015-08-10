var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('posts', ['posts']);
var bodyParser = require('body-parser');
// DB, [collection]
var request = require('request');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/testdb');
var Song = require('./app/models/song');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//Helper Functions

//Parser functions gets rid of having to repeat the long array structure
var parse = function (dataArray, startArray, num){
	num += 2; //Gives you true number of posts because of self posts
	for(var i = 0; i < num; i++){
		if (dataArray['data']['children'][i]['data']['domain'] !== 'self.listentothis'){
			var tempPost = {
				title: dataArray['data']['children'][i]['data']['title'],
				score: dataArray['data']['children'][i]['data']['score'],
				url: dataArray['data']['children'][i]['data']['url']
			};

			startArray.push(tempPost);
		}; //End check for self post (if)
	}; //End For Loop
	return startArray;
}


app.get('/player', function (req, res){
	var empty = [];
	request('http://www.reddit.com/r/listentothis.json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var data = JSON.parse(body); //Raw parsed data
	  	var numPostsWanted = 12; //How many posts you want returned
	  	var posts = parse(data, empty, numPostsWanted); //For loop inside here
	  	
	  	Song.find(function (err, songs){
		 	if(err) res.send(err);

		 	//return songs
		 	var obj = {
		 		posts: posts,
		 		songs: songs
		 	}
		 	console.log(obj.songs);
		 	res.json(obj);
		 })
	  	//res.json(posts);
	  } //End error checking (if)
	 //End request

	 //Getting songs from database

	}); //End Get Request
});


app.listen(5000);
console.log("RedditPlayer Server Running - 5000");