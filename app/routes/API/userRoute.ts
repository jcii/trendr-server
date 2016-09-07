import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const request = require('request')

const UserProfileClass = require('../../Models/userModels/userProfileModel')
const user = new UserProfileClass



router.get('/', function(req: Request, res: Response, next: Function) {
    user.sayHello().then(data => res.send(data))
});

module.exports = router;