import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const request = require('request')

const realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel')
const realtimeStocks = new realtimeStocksClass


router.get('/:stockId', function(req: Request, res: Response, next: Function) {
    res.json(`your stock id is ${req.params.stockId}`)
});


module.exports = router;