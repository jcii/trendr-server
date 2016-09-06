"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var Twitter = require('twitter');
// const TwitterSearchClass = require('../../Models/Twitter/hashTagSearch')
// const _twitterSearchClass = new TwitterSearchClass
var client = new Twitter({
    consumer_key: 'guLTqobJ7kUJTqc0Ark6xh4OB',
    consumer_secret: 'nPSjlhymt9qEeBN6d7lXd0xD3CvvSm1dZF2G3vZpa56vVWafp1',
    access_token_key: '	773256285630234625-zjqkqJ4DnRXv6YkDAazDBFvuhztFTAE',
    access_token_secret: '	38u1CvTOoVRRLU5AqYWED7BPPQtfg5uGcy0kRmD2J3LEf'
});
// router.get('/', function(req: Request, res: Response, next: Function) {
//     _twitterSearchClass.twitterSearch().then(data => {
//         console.log(data);
//         res.json(data)
//     })
// });
router.get('/', function (req, res, next) {
    // console.log(process.env.twitter_access_token_secret)
    client.get('search/tweets', function (error, tweets, response) {
        return error ? res.send(error) : res.json({ tweets: tweets, response: response });
    });
});
module.exports = router;
