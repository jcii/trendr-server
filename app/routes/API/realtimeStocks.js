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
        console.log('MOTHERFUCKERMOTHERFUCKERMOTHERFUCKERMOTHERFUCKER');
        console.log('MOTHERFUCKERMOTHERFUCKERMOTHERFUCKERMOTHERFUCKER');
        console.log('MOTHERFUCKERMOTHERFUCKERMOTHERFUCKERMOTHERFUCKER');
        realtimeStocks.getDatabaseResults().then(function (data) {
            res.send(data);
        });
    });
});
module.exports = router;
