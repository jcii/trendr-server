import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const request = require('request')

const realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel')
const realtimeStocks = new realtimeStocksClass

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: Function) {
    request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX`, (error, response, body) => {
        (!error && response.statusCode == 200) ? res.json(body) : res.send('Not found')
    })
    
});

module.exports = router;
