"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var StockHistoryClass = require('../../Models/stocks/stockHistoryModel');
var stockHistory = new StockHistoryClass;
var UserClass = require('../../Models/userModels/userProfileModel');
var user = new UserClass;
router.post('/groupBy', function (req, res, next) {
    stockHistory.groupStockHistory(req.body.grouping).then(function (data) {
        res.json(data.rows);
    });
});
router.post('/', function (req, res, next) {
    user.getUserId(req.body.user, req.body.trendId).then(function (data) {
        req.body.ticker = data.ticker;
        stockHistory.getStockHistory(req.body).then(function (data) {
            res.json(data);
        });
    });
});
module.exports = router;
