"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var UserProfileClass = require('../../Models/userModels/userProfileModel');
var user = new UserProfileClass;
router.post('/', function (req, res, next) {
    user.getStats(req.body.username).then(function (data) { return res.json(data); });
});
module.exports = router;
