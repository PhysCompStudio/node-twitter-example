var Twitter = require('twitter'); // for the Twitter API
var env = require('dotenv').config(); // for loading API credentials
var moment = require('moment'); // for displaying dates nicely
var exec = require('child_process').exec; // for executing command line commands from within Node

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// slices the arguments passed in via the command line. args[0] is the first argument after the file name.
var args = process.argv.slice(2);


// set up a stream
var streamer = client.stream('statuses/filter', {track: args[0]});


streamer.on('data', function(tweet) {

	var name = tweet.user.screen_name;
	var text = tweet.text;
	var date = moment(tweet.created_at, "ddd MMM DD HH:mm:ss Z YYYY");

	if (name != null) {

		// write the tweet to the console
		console.log(">    @" + name + " said: " + text + ", on " + date.format("YYYY-MM-DD") + " at " + date.format("h:mma"));

		// make the computer say it
		exec("say " + text);
	}

	

});
