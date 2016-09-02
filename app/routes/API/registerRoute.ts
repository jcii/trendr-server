import {Request, Response} from "express";
var express = require('express');
var router = express.Router();
const userModelClass = require('../../Models/userModels/userModel')
const userModel = new userModelClass

router.route('/')
  .get((req: Request, res: Response, next: Function) => {
    userModel.getUsers().then(users => res.json(users))
  })
  .post((req: Request, res: Response, next: Function) => {
    res.json(req.body)
  })

module.exports = router;
