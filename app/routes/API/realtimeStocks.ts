import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const request = require('request');

const realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel')
const realtimeStocks = new realtimeStocksClass

const UserClass = require('../../Models/userModels/userProfileModel')
const user = new UserClass


router.post('/', function(req: Request, res: Response, next: Function) {
    user.getUserId(req.body.user, req.body.trendId).then(data => {
        realtimeStocks.getRealtimeStockPrice(data.ticker).then(data => {
            res.json(JSON.parse(data))
        })
    })
});

router.post('/updateDatabase', function(req: Request, res: Response, next: Function) {
    realtimeStocks.updateDatabase(req.body).then(() => {
        realtimeStocks.getDatabaseResults(req.body.Symbol).then((data: any) => {
            res.send(data)
        })
    })
});

module.exports = router;
