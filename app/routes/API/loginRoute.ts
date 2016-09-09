import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const request = require('request')

const UserProfileClass = require('../../Models/userModels/userProfileModel')
const user = new UserProfileClass

router.post('/', function(req: Request, res: Response, next: Function) {
  res.json(req.body)    
});

module.exports = router;