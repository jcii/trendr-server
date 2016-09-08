"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var TrendModelClass = require('../../Models/trends/trendModel');
var trendModel = new TrendModelClass;
router.get('/', function (req, res, next) {
    trendModel.sayHello().then(function (data) { return res.send(data); });
});
router.post('/', function (req, res, next) {
    trendModel.createTrend(req.body).then(function (data) { return res.json('success!'); });
});
router.route('/userTrends')
    .get(function (req, res) {
    trendModel.getTrendsForUser(1)
        .then(function (trend) { return res.json(trend); })
        .catch(function (e) { return console.log(e); });
});
module.exports = router;
