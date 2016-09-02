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
    userModel.createUser(req.body).then(user => res.sendStatus(200))   
  })
router.route('/userCheck')
  .post((req: Request, res: Response, next: Function) => {
    userModel.getUser(req.body).then(user => res.json(user))
  })

module.exports = router;
