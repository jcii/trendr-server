import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const streamModel = require('../../Models/twitter/twitterStreamModel')




router.get('/', function(req: Request, res: Response, next: Function) {
    res.send('hello')
})

router.post('/startStream', function(req: Request, res: Response, next: Function) {
    streamModel.getActivekeyword(req.body.trend_id).then(keyword => {
        streamModel.startStream(keyword, req.body.trend_id)
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
    streamModel.getActivekeyword(req.body.trend_id).then(keyword => {
        streamModel.sumStreamingWords(req.body.trend_id, keyword).then(data => res.json(data))  
    })
})

router.post('/tweetCount', function(req: Request, res: Response, next: Function) {
    streamModel.getTweetCount(req.body.trend_id).then(count => res.json(count))
})

module.exports = router;