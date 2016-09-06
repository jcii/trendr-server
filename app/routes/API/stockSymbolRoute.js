"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var SymbolLookupClass = require('../../Models/stocks/symbolLookupModel');
var symbolLookupFun = new SymbolLookupClass;
router.get('/:searchString', function (req, res, next) {
    symbolLookupFun.getCompany(req.params.searchString).then(function (data) {
        console.log(data.rows);
        res.json(data.rows);
    });
});
module.exports = router;
