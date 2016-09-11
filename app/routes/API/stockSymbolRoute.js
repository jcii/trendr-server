"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var SymbolLookupClass = require('../../Models/stocks/symbolLookupModel');
var symbolLookupFun = new SymbolLookupClass;
router.post('/', function (req, res, next) {
    symbolLookupFun.getCompany(req.body.searchString).then(function (data) {
        res.json(data.rows);
    });
});
module.exports = router;
