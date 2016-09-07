'use strict'
const Twit = require('twit')
const keywordsDb = require('../../config/db/knex/knexConfig')
const wordSum = require('./services/wordSum')

 const client: any = new Twit({
  consumer_key:         'YxFKenEd6yyHQ4xnGiZc1QTqN',
  consumer_secret:      'XDId696qRMFPnVyCVNhxCAs2Tsz9hrJ9gGTHGV903BxIkoaf6V',
  access_token:         '46499008-H9zNdNv9mpoj6R3OCKdHBWKqVgEumZxH1irqWT0vo',
  access_token_secret:  'vrks3LHksxejJWgSWiTlJinPc3fJ0Knsf2Q4xoUlkMswG'
 })



module.exports = class TwitterModel {
  constructor(){ }

  twitterSearch() {
    return new Promise((resolve: any, reject: any) => {
        client.get('search/tweets', { q: 'hillary', count: 100}, function(err, data, response) {
            if (err) {
                reject(err)
            } else {
                let databaseArray = wordSum.createDatabaseArray(data.statuses)
                Promise.all(databaseArray).then(() => {
                    return keywordsDb.knex.raw(`select text from current_keyword_mentions order by unix_timestamp`)
                    .then(finalData => {
                        let wordArray = wordSum.createWordArray(finalData)
                        let finalCount = wordSum.createFinalCount(wordArray)
                        resolve(wordSum.sortObj(finalCount))
                    })
                }).catch(error => console.log(error))
            }
        })
    });  
  }


}


