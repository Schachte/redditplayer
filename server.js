var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var reddit = require('redwrap');



mongoose.connect('mongodb://localhost:27017/redditplayer');
var Song = require('./app/models/song');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//Helper Functions

//Parser functions gets rid of having to repeat the long array structure
var parse = function (dataArray){
	startArray = [];
	for(var i = 0; i < 12; i++){
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

app.get('/player', function (req, response){
	reddit.r('listentothis', function (err, data, res){
		var posts = parse(data);
		response.json(posts);
	});
});

app.get('/dbUpdate', function (req, res){
	Song.find(function (err, songs){
		 	if(err) res.send(err);
		 	res.json(songs);
		 });
});

app.post('/dbUpdate', function (req, res){
	console.log(req.body.plays);
	console.log(req.body._id);
	Song.findById(req.body._id, function (err, song){
		console.log('found');
		song.plays += 1;

		song.save(function(err) {
			if (err) res.send(err);
			// return a message
			res.json({ message: 'User updated!' });
		});
	});
});
	
// app.get('/player', function (req, res){
// 	var empty = [];
// 	request('http://www.reddit.com/r/listentothis.json', function (error, response, body) {
// 	  if (!error && response.statusCode == 200) {
// 	  	var data = JSON.parse(body); //Raw parsed data
// 	  	var numPostsWanted = 12; //How many posts you want returned
// 	  	var posts = parse(data, empty, numPostsWanted); //For loop inside here
	  	
// 	  	Song.find(function (err, songs){
// 		 	if(err) res.send(err);

// 		 	//return songs
// 		 	var obj = {
// 		 		posts: posts,
// 		 		songs: songs
// 		 	}
// 		 	console.log(obj.songs);
// 		 	res.json(obj);
// 		 })
// 	  	//res.json(posts);
// 	  } //End error checking (if)
// 	 //End request

// 	 //Getting songs from database

// 	}); //End Get Request
// });


app.post('/player', function (req, res){
//score title url

	var song = new Song();

	song.score = req.body.score;
	song.title = req.body.title;
	song.url = req.body.url;
	song.plays = 0;

	song.save(function (err){
		if (err) res.send (err)
	});

	res.send('success');


});


app.listen(5000);
console.log("RedditPlayer Server Running - 5000");