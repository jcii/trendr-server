'use strict'
import { Request, Response } from 'express'
const trendDb = require('../../config/db/knex/knexConfig')
const trendService = require('./services/trendServices')

// bookshelf definitions
const User = trendDb.bookshelf.Model.extend({
    tableName: 'users',
    trends: function() {
        return this.hasMany(Trend)
    }
})
const Trend = trendDb.bookshelf.Model.extend({
    tableName: 'trends',
    symbols: function(){
        return this.hasMany(Symbol)
    },
    keywords: function(){
        return this.hasMany(Keyword)
    }

})
const Symbol = trendDb.bookshelf.Model.extend({
    tableName: 'trend_tickers',
    trends: function(){
        return this.belongsToMany(Trend)
    }

})
const Keyword = trendDb.bookshelf.Model.extend({
    tableName: 'twitter_keywords',
    trends: function(){
        return this.belongsToMany(Trend)
    }
})

module.exports = class TrendClass {
    constructor() { }
    sayHello() {
        return new Promise((resolve, reject) => {
            resolve('hello from trend model')
        })
    }
    getTrendsForUser(id){
        return User.forge({id}).fetch({withRelated:['trends.symbols', 'trends.keywords']})
    }
    getTrendById(id){
        return trendDb.knex('trends').where({id}).first()
    }
    createTrend(obj) {
        return new Promise((resolve, reject) => {
            return trendDb.knex.raw(`insert into trends values (default, 1, '${obj.trend_title}', false, '${ obj.trend_description }')`).then((data) => {
                return trendDb.knex.raw(`select id from trends where id = (select max(id) from trends)`).then(id => {
                    let symbolArr: any[] = trendService.createSymbolArr(obj.trend_symbols, id.rows[0].id)                    
                    Promise.all(symbolArr).then(() => {
                        let keywordArr: any[] = trendService.createKeywordArr(obj.trend_keywords, id.rows[0].id)
                        Promise.all(keywordArr).then(() => {
                            resolve('success')
                        })
                    })
                })
            }).catch(error => console.log(error))
        })
    }


    getStockHistories(user_id) {
        return new Promise((resolve, reject) => {
            return trendDb.knex('trends').where('user_id', user_id).pluck('id').then(trend_ids => {
                return trendDb.knex('trend_tickers').whereIn('trend_id', trend_ids).select('trend_id', 'ticker').then(tickers => {
                    let tickerArr: any[] = trendService.createTickerArr(tickers)
                    Promise.all(tickerArr).then(trendStocks => {
                        resolve(trendStocks)
                    })
                })
            })
        })
    }
}