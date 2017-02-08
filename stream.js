var Twitter = require('twitter');
var env = require('node-env-file');

env(__dirname + '/.env');

var hashTag = process.argv.slice(2);

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


//set up a stream us
var stream01 = client.stream('statuses/filter', {track: hashTag});


stream01.on('data', function(tweet) {

    var userURL = tweet.user.profile_image_url;
    // console.log(userURL);
    // console.log(dlURL);
    var RID = '_' + randomstring.generat
    var FN = RID.toString();
    FN += '.jpg';

    download(userURL, tempDir + FN, function(){
          console.log(FN);
          src.move(FN, dest.path(FN));
        });


    if(tweet.entities.media != null){
        // console.log(tweet);
        var dlURL = tweet.entities.media[0].media_url;
        dlURL += ':small';


        // console.log(dlURL);
        var randomID = randomstring.generate();
        var fileName = randomID.toString();
        fileName += '.jpg';

        download(dlURL, tempDir + fileName, function(){
          console.log(fileName);
          src.move(fileName, dest.path(fileName));
        });



    }
});

stream01.on('error', function(error) {
    throw error;
});