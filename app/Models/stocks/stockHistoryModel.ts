'use strict'
const db = require('../../config/db/knex/knexConfig')
const request = require('request')


module.exports = class StockHistoryClass {
    constructor() {}
    getStockHistory(obj) {
        let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":${obj.NumberOfDays},"DataPeriod":"${obj.DataPeriod}","Elements":[{"Symbol":"${obj.Symbol}","Type":"price","Params":["c"]}]}`
        return new Promise((resolve: any, reject: any) => {
            request(url, (error: any, response: any, body: any) => {
                return (!error && response.statusCode == 200) ? resolve(body) : reject(error)
            })
        })
    }

}