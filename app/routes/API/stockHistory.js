"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel');
var realtimeStocks = new realtimeStocksClass;
router.get('/:stockId', function (req, res, next) {
    res.json("your stock id is " + req.params.stockId);
});
module.exports = router;
