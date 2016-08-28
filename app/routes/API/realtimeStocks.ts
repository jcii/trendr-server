import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const request = require('request')

const realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel')
const realtimeStocks = new realtimeStocksClass


router.get('/', function(req: Request, res: Response, next: Function) {
    realtimeStocks.getRealtimeStockPrice().then(data => {
        res.json(JSON.parse(data))
    })
});

router.post('/updateDatabase', function(req: Request, res: Response, next: Function) {
    realtimeStocks.updateDatabase(req.body).then(() => {
        realtimeStocks.getDatabaseResults().then((data: any) => {
            res.send(data.rows)
        })
    })
});

module.exports = router;
