import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const request = require('request')

const UserProfileClass = require('../../Models/userModels/userProfileModel')
const user = new UserProfileClass



router.post('/', function(req: Request, res: Response, next: Function) {
    user.getStats(req.body.username).then(data => res.json(data))
});

module.exports = router;