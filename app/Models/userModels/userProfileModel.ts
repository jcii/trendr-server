'use strict'
import { Request, Response } from 'express'
const userDb = require('../../config/db/knex/knexConfig')

module.exports = class TrendClass {
    constructor() { }

    sayHello() {
        return new Promise((resolve, reject) => {
            resolve('hello from user profile model')
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