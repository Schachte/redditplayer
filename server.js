
var request 	= require('request');
var reddit 		= require('redwrap');
var Song 		= require('./app/models/song');
var express 	= require('express');
var app     	= express();
var mongoose 	= require('mongoose');
var bodyParser   = require('body-parser');

mongoose.connect('mongodb://localhost:27017/redditplayer');

app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());

//Parser functions gets rid of having to repeat the long array structure
var parse = function (dataArray){
	startArray = [];
	for(var i = 0; i < 12; i++){
		if (dataArray['data']['children'][i]['data']['domain'] !== 'self.listentothis'){
			split_reddit_name(dataArray['data']['children'][i]['data']['title']);
			var tempPost = {
				title: split_reddit_name(dataArray['data']['children'][i]['data']['title'])[1],
				score: dataArray['data']['children'][i]['data']['score'],
				url: dataArray['data']['children'][i]['data']['url'],
				artist: split_reddit_name(dataArray['data']['children'][i]['data']['title'])[0]

			};

			startArray.push(tempPost);
		}; //End check for self post (if)
	}; //End For Loop
	return startArray;
}

var split_reddit_name = function(postName) {
	var string = postName,
    arr = string.split('-'),
    result = arr.splice(0,1);
	result.push(arr.join(' '));

	result[1] = result[1].replace(/ *\([^)]*\) */g, "");
	result[1] = result[1].replace(/ *\[[^\]]*]/, '');
	return result;

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
	

app.post('/player', function (req, res){
//score title url

	var song = new Song();

	song.score = req.body.score;
	song.title = req.body.title;
	song.artist = req.body.artist;
	song.url = req.body.url;
	song.plays = 0;

	song.save(function (err){
		if (err) res.send (err)
	});

	res.send('success');

});


app.listen(5000);
console.log("RedditPlayer Server Running - 5000");