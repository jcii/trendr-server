import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const request = require('request')

const StockHistoryClass = require('../../Models/stocks/stockHistoryModel')
const stockHistory = new StockHistoryClass


router.post('/', function(req: Request, res: Response, next: Function) {
    stockHistory.getStockHistory(req.body).then(data => {
        res.json(data)
    })
});


module.exports = router;