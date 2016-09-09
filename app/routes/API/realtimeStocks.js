"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel');
var realtimeStocks = new realtimeStocksClass;
var UserClass = require('../../Models/userModels/userProfileModel');
var user = new UserClass;
router.post('/', function (req, res, next) {
    user.getUserId(req.body.user, req.body.trendId).then(function (data) {
        realtimeStocks.getRealtimeStockPrice(data.ticker).then(function (data) {
            res.json(JSON.parse(data));
        });
    });
});
router.post('/updateDatabase', function (req, res, next) {
    realtimeStocks.updateDatabase(req.body).then(function () {
        console.log(req.body);
        realtimeStocks.getDatabaseResults(req.body.Symbol).then(function (data) {
            res.send(data);
        });
    });
});
module.exports = router;
