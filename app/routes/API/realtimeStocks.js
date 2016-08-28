"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel');
var realtimeStocks = new realtimeStocksClass;
/* GET home page. */
router.get('/', function (req, res, next) {
    request("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX", function (error, response, body) {
        return (!error && response.statusCode == 200) ? res.json(JSON.parse(body)) : res.send('Not found');
    });
});
router.post('/updateDatabase', function (req, res, next) {
    // console.log(req);
    var obj = {
        name: 'netlfix',
        symbol: 'nflx',
        price: 97.5,
        volume: 10000,
        timestamp: 'yesterday'
    };
    realtimeStocks.updateDatabase(obj).then(function () {
        realtimeStocks.getDatabaseResults().then(function (data) {
            res.send(data.rows);
        });
    });
});
module.exports = router;
