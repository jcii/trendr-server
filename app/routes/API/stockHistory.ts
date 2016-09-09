import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const request = require('request')

const StockHistoryClass = require('../../Models/stocks/stockHistoryModel')
const stockHistory = new StockHistoryClass

const UserClass = require('../../Models/userModels/userProfileModel')
const user = new UserClass


router.post('/groupBy', function(req: Request, res: Response, next: Function) {
    stockHistory.groupStockHistory(req.body.grouping).then(data => {
        res.json(data.rows)
    })
});


router.post('/', function(req: Request, res: Response, next: Function) {
    user.getUserId(req.body.user, req.body.trendId).then(data => {
        req.body.ticker = data.ticker
        stockHistory.getStockHistory(req.body).then(data => {
            res.json(data)
        })  
    })
});






module.exports = router;