"use strict";
var express = require('express');
var router = express.Router();
var TwitClass = require('../../Models/twitter/twitterSearchModel');
var twitterSearchClass = new TwitClass;
router.get('/', function (req, res, next) {
    twitterSearchClass.twitterSearch().then(function (data) { return res.send(data); });
});
module.exports = router;
