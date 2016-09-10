'use strict'
const Twitter = require('node-tweet-stream')
const streamService = require('./services/streamService')
const streamModelDb = require('../../config/db/knex/knexConfig')
const StreamWordSum = require('./services/wordSum')

const Stream = new Twitter({
    // consumer_key: process.env.twitter_consumer_key,
    // consumer_secret: process.env.twitter_consumer_secret,
    // token: process.env.twitter_access_token_key,
    // token_secret: process.env.twitter_access_token_secret
  consumer_key: 'YxFKenEd6yyHQ4xnGiZc1QTqN',
  consumer_secret: 'XDId696qRMFPnVyCVNhxCAs2Tsz9hrJ9gGTHGV903BxIkoaf6V',
  token: '46499008-H9zNdNv9mpoj6R3OCKdHBWKqVgEumZxH1irqWT0vo',
  token_secret: 'vrks3LHksxejJWgSWiTlJinPc3fJ0Knsf2Q4xoUlkMswG'
  })






module.exports = {
  startStream: function () {
    Stream.track('pizza')

    Stream.on('tweet', function (tweet) {
      streamService.uploadTweet(tweet)
    })

    Stream.on('error', function (err) {
      console.log('Oh no')
    })
  },

  endStream: function () {
    Stream.untrack('pizza')
  }, 

  sumStreamingWords: function(trend_id, user_id) {
    return new Promise((resolve, reject) => {
      streamModelDb.knex.raw(`select text from keyword_tweets where trend_id = 1`).then(finalData => {
        let wordArray = StreamWordSum.createWordArray(finalData)
        let finalCount = StreamWordSum.createFinalCount(wordArray)
        resolve(StreamWordSum.sortObj(finalCount))
      })
    })
  }
}


