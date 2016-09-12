'use strict'
import { Request, Response } from 'express'
const userDb = require('../../config/db/knex/knexConfig')

module.exports = class TrendClass {
    constructor() { }

    getStats(username) {
        console.log(username)
        return new Promise((resolve, reject) => {
            userDb.knex.raw(`select id from users where username = '${username}'`).then(id => {
                userDb.knex.raw(`select tweets_collected from tweets_collected where user_id = ${id.rows[0].id}`).then((totalTweets) => {
                    userDb.knex.raw(`select stock_prices_collected from stock_prices_collected where user_id = ${id.rows[0].id}`).then(stockPrices => {
                        userDb.knex.raw(`select count(*) from trends where user_id = ${id.rows[0].id}`).then(trends => {
                            resolve({
                                tweets: totalTweets.rows[0].tweets_collected,
                                stockPrices: stockPrices.rows[0].stock_prices_collected,
                                trends: trends.rows[0].count
                            })
                        })
                    })
                })
            })
        })
    }

    getUserId(username, trend_id) {
        return new Promise((resolve, reject) => {
            return userDb.knex('users').where('username', username).pluck('id').then(user_id => {
                this.getTickerSymbol(trend_id, user_id).then(ticker => resolve({user_id: user_id[0], ticker}))
            })
        })
    }

    getTickerSymbol(trend_id, user_id) {
        return new Promise((resolve, reject) => {
            return userDb.knex('trend_tickers').where({user_id: Number(user_id), trend_id: Number(trend_id)}).pluck('ticker').then((ticker) => resolve(ticker[0]))
        })
    }

    getActiveKeyword(trend_id) {

    }

}