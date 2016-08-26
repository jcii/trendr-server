'use strict';
var Twitter = require('node_tweet_stream');
var Stream = new Twitter({
    consumer_key: process.env.twitter_consumer_key,
    consumer_secret: process.env.twitter_consumer_secret,
    token: process.env.twitter_token,
    token_secret: process.env.token_secret
});
module.exports = (function () {
    function twitterModel() {
    }
    return twitterModel;
}());
