import {Request, Response} from "express";
const express = require('express');
const router = express.Router();
const request = require('request')
const Twit = require('twit')


// const TwitterSearchClass = require('../../Models/Twitter/hashTagSearch')
// const _twitterSearchClass = new TwitterSearchClass

 const client: any = new Twit({
  consumer_key:         'YxFKenEd6yyHQ4xnGiZc1QTqN',
  consumer_secret:      'XDId696qRMFPnVyCVNhxCAs2Tsz9hrJ9gGTHGV903BxIkoaf6V',
  access_token:         '46499008-H9zNdNv9mpoj6R3OCKdHBWKqVgEumZxH1irqWT0vo',
  access_token_secret:  'vrks3LHksxejJWgSWiTlJinPc3fJ0Knsf2Q4xoUlkMswG'
 })



// router.get('/', function(req: Request, res: Response, next: Function) {
//     _twitterSearchClass.twitterSearch().then(data => {
//         console.log(data);
//         res.json(data)
//     })
// });


router.get('/', function(req: Request, res: Response, next: Function) {
   client.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  res.json(data)
    })
})

module.exports = router;