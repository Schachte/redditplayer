var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('posts', ['posts']);
var bodyParser = require('body-parser');
// DB, [collection]
var request = require('request');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/player', function (req, res){
	var posts = [];
	request('http://www.reddit.com/r/listentothis.json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var result = JSON.parse(body);
	  	for(var i = 0; i < 12; i++){
	  		if (result['data']['children'][i]['data']['domain'] !== 'self.listentothis'){
	  			var tempPost = {
		  			title: result['data']['children'][i]['data']['title'],
		   			score: result['data']['children'][i]['data']['score'],
		   			url: result['data']['children'][i]['data']['url']
		   		}; 
	   			posts.push(tempPost);
	   		}; //End check for text posts
	
	  	};
	  	res.json(posts);
	  }
	});



	 // db.posts.find(function (error, docs){
	 // 	console.log(docs);
	 // 	res.json(docs);
	 // });

	    // res.json({
	    // 	posts: posts, 
	    // 	tracks: tracks
	    // });
});


app.listen(5000);
console.log("RedditPlayer Server Running - 3000");