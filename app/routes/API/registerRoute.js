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
    userModel.createUser(req.body).then(function (user) { return res.sendStatus(200); });
});
router.route('/userCheck')
    .post(function (req, res, next) {
    userModel.getUser(req.body).then(function (user) { return res.json(user); });
});
module.exports = router;
