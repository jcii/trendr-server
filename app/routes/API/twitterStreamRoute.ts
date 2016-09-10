import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const streamModel = require('../../Models/twitter/twitterStreamModel')
const userModel = require('../../Models/twitter/twitterStreamModel')




router.get('/', function(req: Request, res: Response, next: Function) {
    res.send('hello')
})

router.post('/startStream', function(req: Request, res: Response, next: Function) {
    streamModel.getActivekeyword(req.body.trend_id).then(keyword => {
        streamModel.startStream(keyword)
        res.json('starting stream')
    })
})

router.post('/endStream', function(req: Request, res: Response, next: Function) {
    streamModel.getActivekeyword(req.body.trend_id).then(keyword => {
        streamModel.endStream(keyword)
        res.json('ending stream')
    })
})

router.post('/updateStreamGraph', function(req: Request, res: Response, next: Function) {
    console.log(req.body);
    streamModel.sumStreamingWords(req.body.trend_id).then(data => res.json(data))
})

module.exports = router;