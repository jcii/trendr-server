"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var StockHistoryClass = require('../../Models/stocks/stockHistoryModel');
var stockHistory = new StockHistoryClass;
router.post('/groupBy', function (req, res, next) {
    stockHistory.groupStockHistory(req.body.grouping).then(function (data) {
        res.json(data.rows);
    });
});
router.post('/', function (req, res, next) {
    stockHistory.getStockHistory(req.body).then(function (data) {
        res.json(data);
    });
});
module.exports = router;
