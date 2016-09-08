'use strict'
import { Request, Response } from 'express'
const trendDb = require('../../config/db/knex/knexConfig')

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
                    let symbolArr = []
                    obj.trend_symbols.forEach(elem => {
                        symbolArr.push(trendDb.knex.raw(`insert into trend_tickers values (default, 1, ${id.rows[0].id}, '${elem}')`))
                    })
                    Promise.all(symbolArr).then(() => {
                        let keywordArr = []
                        console.log(id.rows[0].id);
                        obj.trend_keywords.forEach(elem => {
                            keywordArr.push(trendDb.knex.raw(`insert into twitter_keywords values (default, ${id.rows[0].id}, '${elem}')`))
                        })
                        Promise.all(keywordArr).then(() => {
                            resolve('success')
                        })
                    })
                })
            }).catch(error => console.log(error))
        })
    }
}