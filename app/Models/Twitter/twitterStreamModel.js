'use strict';
var Twitter = require('node-tweet-stream');
var streamService = require('./services/streamService');
var streamModelDb = require('../../config/db/knex/knexConfig');
var StreamWordSum = require('./services/wordSum');
var Stream = new Twitter({
    // consumer_key: process.env.twitter_consumer_key,
    // consumer_secret: process.env.twitter_consumer_secret,
    // token: process.env.twitter_access_token_key,
    // token_secret: process.env.twitter_access_token_secret
    consumer_key: 'YxFKenEd6yyHQ4xnGiZc1QTqN',
    consumer_secret: 'XDId696qRMFPnVyCVNhxCAs2Tsz9hrJ9gGTHGV903BxIkoaf6V',
    token: '46499008-H9zNdNv9mpoj6R3OCKdHBWKqVgEumZxH1irqWT0vo',
    token_secret: 'vrks3LHksxejJWgSWiTlJinPc3fJ0Knsf2Q4xoUlkMswG'
});
module.exports = {
    startStream: function () {
        Stream.track('pizza');
        Stream.on('tweet', function (tweet) {
            streamService.uploadTweet(tweet);
        });
        Stream.on('error', function (err) {
            console.log('Oh no');
        });
    },
    endStream: function () {
        Stream.untrack('pizza');
    },
    sumStreamingWords: function () {
        return new Promise(function (resolve, reject) {
            streamModelDb.knex.raw("select text from keyword_tweets where trend_id = 1").then(function (finalData) {
                var wordArray = StreamWordSum.createWordArray(finalData);
                var finalCount = StreamWordSum.createFinalCount(wordArray);
                resolve(StreamWordSum.sortObj(finalCount));
            });
        });
    }
};