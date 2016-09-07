import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const request = require('request')

const TrendModelClass = require('../../Models/trends/trendModel')
const trendModel = new TrendModelClass



router.get('/', function(req: Request, res: Response, next: Function) {
    trendModel.sayHello().then(data => res.send(data))
});

module.exports = router;