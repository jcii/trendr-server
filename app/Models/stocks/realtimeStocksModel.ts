'use strict'
const db = require('../../config/db/knex/knexConfig')
const request = require('request')

module.exports = class realtimeStocks {
  constructor() { }
  getRealtimeStockPrice() {
    request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX`, (error, response, body) => {
        return (!error && response.statusCode == 200) ? body : 'Not found' 
    })
  }
}