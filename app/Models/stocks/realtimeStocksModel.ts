'use strict'
import { Request, Response } from 'express'
const db = require('../../config/db/knex/knexConfig')
const request = require('request')

module.exports = class realtimeStocks {
    constructor() { }
    getRealtimeStockPrice(symbol) {
        return new Promise((resolve: any, reject: any) => {
            request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${symbol}`, (error: any, response: any, body: any) => {
                return (!error && response.statusCode == 200) ? resolve(JSON.stringify(body)) : reject(error)
            })
        })
    }

    updateDatabase(obj: any) {
        let dbDate: number = Number(new Date(obj.Timestamp).getTime())
        return db.knex.raw(`insert into realtime_stocks values (default, '${obj.Name}', '${obj.Symbol}', ${obj.LastPrice}, ${obj.Volume}, ${dbDate})`)
    }

    getDatabaseResults(symbol) {
        return db.knex.raw(`select * from realtime_stocks where symbol = '${symbol}' order by timestamp desc limit 10`).then(results => {
            let deleteIds = results.rows.map(elem => elem.id)
            console.log(symbol)
            return db.knex('realtime_stocks').where('symbol', symbol).whereNotIn('id', deleteIds).del().then(() => {
                return results.rows
            })
        })
    }
}