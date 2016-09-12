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





let exportObj = {
  startStream: function (keyword, trend_id) {
    Stream.track(keyword)
    globalTrendId = trend_id

    Stream.on('error', function (err) {
      console.log('Oh no')
    })
  },

  endStream: function (keyword) {
    Stream.untrack(keyword)
  }, 

  sumStreamingWords: function(trend_id, keyword) {
    return new Promise((resolve, reject) => {
      streamModelDb.knex.raw(`select text from keyword_tweets where trend_id = ${trend_id}`).then(finalData => {
        let wordArray = StreamWordSum.createWordArray(finalData)
        let finalCount = StreamWordSum.createFinalCount(wordArray, keyword)
        resolve(StreamWordSum.sortObj(finalCount, trend_id))
      })
    })
  }, 

  getActivekeyword: function(trend_id) {
    return new Promise((resolve, reject) => {
      return streamModelDb.knex.raw(`select keyword from twitter_keywords where trend_id = ${trend_id} and is_active = true`)
        .then(keyword => resolve(keyword.rows[0].keyword)).catch(e => console.log(e))
    })
  },

  getTweetCount: (trend_id) => {
    return new Promise((resolve, reject) => {
      return streamModelDb.knex.raw(`select count(*) from keyword_tweets where trend_id = ${trend_id}`).then(count => {
        resolve(count.rows[0].count)
      })
    })
  },

  clearTweets: (trend_id) => {
    return new Promise((resolve, reject) => {
      return streamModelDb.knex.raw(`delete from keyword_tweets where trend_id = ${trend_id}`).then(() => resolve())
    })
  }, 

  tweetsForDisplay: (trend_id, keyword, topWords, usedIds)  => {
    return new Promise((resolve, reject) => {
      return streamModelDb.knex('keyword_tweets').where('trend_id', trend_id)
        .andWhere('text', 'like', `%${keyword}%`)
        .andWhere('text', 'like', `%${topWords[0]}%`)
        .orWhere('text', 'like', `%${topWords[1]}%`)
        .orWhere('text', 'like', `%${topWords[2]}%`)
        .orWhere('text', 'like', `%${topWords[3]}%`)
        .orWhere('text', 'like', `%${topWords[4]}%`)
        .then(data => {
          data = data.filter(elem => !usedIds.includes(elem.id))
          console.log(data)
          resolve(data)
        }).catch(e => console.log(e))
    })
  }

}

let globalTrendId:number = 0
Stream.on('tweet', (tweet) => {
  streamService.uploadTweet(tweet, globalTrendId)
})


module.exports = exportObj


