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
router.post('/updateStreamGraph', function (req, res, next) {
    console.log(req.body);
    streamModel.sumStreamingWords().then(function (data) { return res.json(data); });
});
module.exports = router;
