"use strict";
var express = require('express');
var router = express.Router();
var streamModel = require('../../Models/twitter/twitterStreamModel');
router.get('/', function (req, res, next) {
    res.send('hello');
});
router.get('/startStream', function (req, res, next) {
    streamModel.startStream();
    res.send('stream started');
});
router.get('/endStream', function (req, res, next) {
    streamModel.endStream();
    res.send('stream ended');
});
router.get('/updateStreamGraph', function (req, res, next) {
    streamModel.sumStreamingWords().then(function (data) { return console.log(data); });
    res.send('summing Words');
});
module.exports = router;
