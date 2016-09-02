"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel');
var realtimeStocks = new realtimeStocksClass;
router.get('/', function (req, res, next) {
    realtimeStocks.getRealtimeStockPrice().then(function (data) {
        res.json(JSON.parse(data));
    });
});
router.post('/updateDatabase', function (req, res, next) {
    realtimeStocks.updateDatabase(req.body).then(function () {
        realtimeStocks.getDatabaseResults().then(function (data) {
            res.send(data);
        });
    });
});
module.exports = router;
