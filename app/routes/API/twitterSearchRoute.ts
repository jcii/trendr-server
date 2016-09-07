import {Request, Response} from "express";
const express = require('express');
const router = express.Router();

const TwitClass = require('../../Models/twitter/twitterSearchModel')
const twitterSearchClass = new TwitClass



router.get('/', function(req: Request, res: Response, next: Function) {
    twitterSearchClass.twitterSearch().then(data => res.send(data))
})

module.exports = router;