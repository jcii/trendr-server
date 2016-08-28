'use strict'
const db = require('../../config/db/knex/knexConfig')
const request = require('request')

module.exports = class realtimeStocks {
  constructor() { }
//   getRealtimeStockPrice() {
//     request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX`, (error, response, body) => {
//         return (!error && response.statusCode == 200) ? JSON.stringify(body) : 'Not found' 
//     })
//   }

    updateDatabase(obj: any) {
        return db.knex.raw(`insert into realtime_stocks values (default, '${obj.Name}', '${obj.Symbol}', ${obj.LastPrice}, ${obj.Volume}, '${obj.Timestamp}')`)
    }

    getDatabaseResults() {
        return db.knex.raw(`select * from realtime_stocks`)
    }
}