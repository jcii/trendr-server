"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var UserProfileClass = require('../../Models/userModels/userProfileModel');
var user = new UserProfileClass;
router.get('/', function (req, res, next) {
    user.sayHello().then(function (data) { return res.send(data); });
});
module.exports = router;
