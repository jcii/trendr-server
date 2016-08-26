import {Request, Response} from "express";
var express = require('express');
var router = express.Router();

const coleTestModelClass = require('../../Models/coleModels/coleTestModel')
const coleTestModel = new coleTestModelClass



/* GET home page. */
router.get('/', function(req: Request, res: Response, next: Function) {
  coleTestModel.getTrends().then((trends: any) => res.json(trends))
});

module.exports = router;
