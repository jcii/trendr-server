'use strict'
const Twit = require('twit')
const keywordsDb = require('../../config/db/knex/knexConfig')

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
        client.get('search/tweets', { q: 'banana', count: 100}, function(err, data, response) {
            if (err) {
                reject(err)
            } else {
                console.log(data.statuses[0].entities);
                let databaseArray = []
                data.statuses.forEach(tweet => {
                    let unix = new Date(tweet.created_at).getTime()
                    let fullDate = new Date(tweet.created_at).toDateString()
                    let hashtags = ''
                    tweet.entities.hashtags.forEach(elem => hashtags += `${elem.text} `)
                    let text = tweet.text.replace(/[^a-zA-Z0-9\s]/g, '')
                    databaseArray.push(
                        keywordsDb.knex.raw(`insert into current_keyword_mentions values (default, 1, '${text}', '${hashtags}', ${unix}, '${fullDate}')`)
                    )
                })
                Promise.all(databaseArray).then(() => {
                    return keywordsDb.knex.raw(`select text from current_keyword_mentions order by unix_timestamp`)
                    .then(finalData => {
                        let wordArray = []
                        finalData.rows.forEach(elem => {
                            elem.text.split(' ').forEach(word => wordArray.push(word))
                        })
                        let finalCount = wordArray.reduce((obj, elem) => {
                            if (elem.length >= 5 ) {
                                obj[elem.toLowerCase()] = obj[elem.toLowerCase()] + 1 || 1
                                return obj
                            } else {
                                return obj
                            }
                        }, {})
                        resolve(finalCount)
                    })
                }).catch(error => console.log(error))
            }
        })
    });  
  }


}


