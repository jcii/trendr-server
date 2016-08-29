"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var StockHistoryClass = require('../../Models/stocks/stockHistoryModel');
var stockHistory = new StockHistoryClass;
router.post('/', function (req, res, next) {
    console.log(req.body);
    stockHistory.getStockHistory(req.body).then(function (data) {
        res.json(data);
    });
});
module.exports = router;
