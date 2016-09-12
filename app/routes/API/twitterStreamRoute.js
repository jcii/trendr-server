"use strict";
var express = require('express');
var router = express.Router();
var streamModel = require('../../Models/twitter/twitterStreamModel');
router.get('/', function (req, res, next) {
    res.send('hello');
});
router.post('/startStream', function (req, res, next) {
    streamModel.getActivekeyword(req.body.trend_id).then(function (keyword) {
        streamModel.startStream(keyword, req.body.trend_id);
        res.json('starting stream');
    });
});
router.post('/endStream', function (req, res, next) {
    streamModel.getActivekeyword(req.body.trend_id).then(function (keyword) {
        streamModel.endStream(keyword);
        res.json('ending stream');
    });
});
router.post('/updateStreamGraph', function (req, res, next) {
    streamModel.getActivekeyword(req.body.trend_id).then(function (keyword) {
        streamModel.sumStreamingWords(req.body.trend_id, keyword).then(function (data) { return res.json(data); });
    });
});
router.post('/tweetCount', function (req, res, next) {
    streamModel.getTweetCount(req.body.trend_id).then(function (count) { return res.json(count); });
});
router.post('/clearTweets', function (req, res, next) {
    streamModel.clearTweets(req.body.trend_id).then(function () { return res.json('Tweets cleared'); });
});
router.post('/tweetsForDisplay', function (req, res, next) {
    streamModel.getActivekeyword(req.body.trend_id).then(function (keyword) {
        streamModel.sumStreamingWords(req.body.trend_id, keyword).then(function (data) {
            streamModel.tweetsForDisplay(req.body.trend_id, keyword, data.axisLabels, req.body.usedTweetIds).then(function (data) { return res.json(data); });
        });
    });
});
module.exports = router;
