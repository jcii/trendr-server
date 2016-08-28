"use strict";
var express = require('express');
var router = express.Router();
var coleTestModelClass = require('../../Models/coleModels/coleTestModel');
var coleTestModel = new coleTestModelClass;
/* GET home page. */
router.get('/', function (req, res, next) {
    // coleTestModel.getTrends().then((trends: any) => res.json(trends))
});
module.exports = router;
