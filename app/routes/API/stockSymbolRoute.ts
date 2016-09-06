import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const request = require('request')

const SymbolLookupClass = require('../../Models/stocks/symbolLookupModel')
const symbolLookupFun = new SymbolLookupClass



router.get('/:searchString', function(req: Request, res: Response, next: Function) {
    symbolLookupFun.getCompany(req.params.searchString).then(data => {
        console.log(data.rows);
        res.json(data.rows)
        
    })
});

module.exports = router;


