'use strict'
const stockHistorydb = require('../../config/db/knex/knexConfig')
const stockHistoryRequest = require('request')


module.exports = class StockHistoryClass {
    constructor() {}
    getStockHistory(obj) {
        let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":${obj.NumberOfDays},"DataPeriod":"${obj.DataPeriod}","Elements":[{"Symbol":"${obj.Symbol}","Type":"price","Params":["c"]}]}`
        return new Promise((resolve: any, reject: any) => {
            stockHistoryRequest(url, (error: any, response: any, body: any) => {
                if (!error && response.statusCode == 200) {
                    stockHistorydb.knex.raw(`delete from stock_history`).then(() => {
                        let data = JSON.parse(body)
                        let datesArray = data.Dates.map(date => new Date(date.substring(0, 10)).getTime()/1000)
                        let pricesArray = data.Elements[0].DataSeries.close.values
                        let databaseArray: any[] = []
                        for (let i = 0; i < datesArray.length; i++) {
                            databaseArray.push(
                                stockHistorydb.knex.raw(`insert into stock_history values (default, 1, 'netflix', '${data.Elements[0].Symbol}', ${pricesArray[i]}, '${obj.DataPeriod}', ${datesArray[i]})`).then((data) => {
                                    return data
                                })
                            )
                        }
                        Promise.all(databaseArray).then((promiseData) => {
                            return stockHistorydb.knex.raw(`select * from stock_history`).then(finalData => resolve(finalData.rows))
                        })
                    })
                } else {
                    reject(error)
                }
            })
        })
    }

}