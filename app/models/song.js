// grab the packages that we need for the user model
var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var SongSchema = new Schema({
	title: String,
	artist: String,
	url: String
});


module.exports = mongoose.model('Song', SongSchema)