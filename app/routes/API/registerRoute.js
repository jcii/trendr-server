"use strict";
var express = require('express');
var router = express.Router();
var userModelClass = require('../../Models/userModels/userModel');
var userModel = new userModelClass;
router.route('/')
    .get(function (req, res, next) {
    userModel.getUsers().then(function (users) { return res.json(users); });
})
    .post(function (req, res, next) {
    res.json(req.body);
});
module.exports = router;
