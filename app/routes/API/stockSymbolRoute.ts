import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const request = require('request')

const SymbolLookupClass = require('../../Models/stocks/symbolLookupModel')
const symbolLookupFun = new SymbolLookupClass



router.post('/', function(req: Request, res: Response, next: Function) {
    symbolLookupFun.getCompany(req.body.searchString).then(data => {
        res.json(data.rows)
        
    })
});

module.exports = router;


