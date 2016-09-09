"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var UserProfileClass = require('../../Models/userModels/userProfileModel');
var user = new UserProfileClass;
router.post('/', function (req, res, next) {
    res.json(req.body);
});
module.exports = router;
