var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('posts', ['posts'])
// DB, [collection]


app.use(express.static(__dirname + '/public'));

app.get('/player', function (req, res){
	console.log('Received Get');

	 	// post1 = {
	  //   	title: 'Beat Fatigue -- Bearded Dragon [Electronic/Funk] (2014)',
	  //   	votes: '55',
	  //   	commentUrl: 'https://www.reddit.com/r/listentothis/comments/3frkkp/beat_fatigue_bearded_dragon_electronicfunk_2014/',
	  //   	url: 'https://www.youtube.com/watch?v=8MPAr4EC-LA'
	  //   };

	  //   post2 = {
	  //   	title: 'Brave Shores -- Never Come Down [Electropop] (2014)',
	  //   	votes: '546',
	  //   	commentUrl: 'https://www.reddit.com/r/listentothis/comments/3frkkp/beat_fatigue_bearded_dragon_electronicfunk_2014/',
	  //   	url: 'https://www.youtube.com/watch?v=GCaYB2N1adc'
	  //   };

	  //   post3 = {
	  //   	title: 'Wild Child -- Fools [Indie/Pop] (2015)',
	  //   	votes: '42',
	  //   	commentUrl: 'https://www.reddit.com/r/listentothis/comments/3frkkp/beat_fatigue_bearded_dragon_electronicfunk_2014/',
	  //   	url: 'http://wildchildsounds.bandcamp.com/track/fools'
	  //   };

	  //   track1 = {
	  //   	name: 'Bearded Dragon',
	  //   	artist: 'Beat Fatigue', 
	  //   	url: 'dummy',
	  //   	plays: '4'
	  //   };

	  //   track2 = {
	  //   	name: 'The Hills',
	  //   	artist: 'The Weeknd', 
	  //   	url: 'dummy',
	  //   	plays: '1009'
	  //   };

	  //   track3 = {
	  //   	name: 'Yellow',
	  //   	artist: 'Coldplay', 
	  //   	url: 'dummy',
	  //   	plays: '45'
	  //   };

		// var posts = [post1, post2, post3];
	 //    var tracks = [track1, track2, track3];

	 db.posts.find(function (error, docs){
	 	console.log(docs);
	 	res.json(docs);
	 });

	    // res.json({
	    // 	posts: posts, 
	    // 	tracks: tracks
	    // });
});


app.listen(5000);
console.log("Server Running - 3000");