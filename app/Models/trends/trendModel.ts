'use strict'
import { Request, Response } from 'express'
const trendDb = require('../../config/db/knex/knexConfig')
const trendService = require('./services/trendServices')

module.exports = class TrendClass {
    constructor() { }

    sayHello() {
        return new Promise((resolve, reject) => {
            resolve('hello from trend model')
        })
    }
    createTrend(obj) {
        return new Promise((resolve, reject) => {
            return trendDb.knex.raw(`insert into trends values (default, 1, '${obj.trend_title}', 'hello there')`).then((data) => {
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
}