import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const request = require('request')

const realtimeStocksClass = require('../../Models/stocks/realtimeStocksModel')
const realtimeStocks = new realtimeStocksClass

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: Function) {
    request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX`, (error: any, response: any, body: any) => {
        return (!error && response.statusCode == 200) ? res.json(JSON.parse(body)) : res.send('Not found')
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
