"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel');
var realtimeStocks = new realtimeStocksClass;
/* GET home page. */
router.get('/', function (req, res, next) {
    request("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX", function (error, response, body) {
        (!error && response.statusCode == 200) ? res.json(body) : res.send('Not found');
    });
});
module.exports = router;
