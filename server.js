var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('posts', ['posts']);
var bodyParser = require('body-parser');
// DB, [collection]
var request = require('request');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//Helper Functions

//Parser functions gets rid of having to repeat the long array structure
var parser = function (array, count, node){
	return array['data']['children'][count]['data'][node];
}


app.get('/player', function (req, res){
	var posts = [];
	request('http://www.reddit.com/r/listentothis.json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var result = JSON.parse(body);
	  	for(var i = 0; i < 12; i++){
	  		if (parser(result, i, 'domain') !== 'self.listentothis'){
	  			var tempPost = {
		  			title: parser(result, i, 'title'),
		   			score: parser(result, i, 'score'),
		   			url: parser(result, i, 'url')
		   		}; 
	   			posts.push(tempPost);
	   		}; //End check for text posts
	
	  	};
	  	res.json(posts);
	  }//End if error
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
console.log("RedditPlayer Server Running - 5000");