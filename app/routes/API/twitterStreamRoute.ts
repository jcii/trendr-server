import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const streamModel = require('../../Models/twitter/twitterStreamModel')




router.get('/', function(req: Request, res: Response, next: Function) {
    res.send('hello')
})

router.get('/startStream', function(req: Request, res: Response, next: Function) {
    streamModel.startStream()
    res.send('stream started')
})

router.get('/endStream', function(req: Request, res: Response, next: Function) {
    streamModel.endStream()
    res.send('stream ended')
})

router.post('/updateStreamGraph', function(req: Request, res: Response, next: Function) {
    console.log(req.body);
    
    streamModel.sumStreamingWords().then(data => res.json(data))
})

module.exports = router;