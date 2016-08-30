'use strict'
const stockHistorydb = require('../../config/db/knex/knexConfig')
const stockHistoryRequest = require('request')
const dayLookup = require('./services/dayLookup')
const monthLookup = require('./services/monthLookup')


module.exports = class StockHistoryClass {
    constructor() {}
    getStockHistory(obj) {
        let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":${obj.NumberOfDays},"DataPeriod":"${obj.DataPeriod}","Elements":[{"Symbol":"${obj.Symbol}","Type":"price","Params":["c"]}]}`
        return new Promise((resolve: any, reject: any) => {
            stockHistoryRequest(url, (error: any, response: any, body: any) => {
                if (!error && response.statusCode == 200) {
                    stockHistorydb.knex.raw(`delete from stock_history`).then(() => {
                        let data = JSON.parse(body)
                        let datesArray = data.Dates.map(date => {
                            return {
                                unix: new Date(date.substring(0, 10)).getTime(),
                                fullDate: date.substring(0, 10),
                                year: new Date(date.substring(0,10)).getFullYear(),
                                monthNumber: Number(new Date(date.substring(0, 10)).getMonth()),
                                month: monthLookup[Number(new Date(date.substring(0, 10)).getMonth())],
                                dayNumber: Number(new Date(date.substring(0, 10)).getDay()),
                                day: dayLookup[Number(new Date(date.substring(0, 10)).getDay())]
                            }
                        })
                        console.log('**********************');
                        console.log(datesArray[0]);
                        
                        let pricesArray = data.Elements[0].DataSeries.close.values
                        let databaseArray: any[] = []
                        for (let i = 0; i < datesArray.length; i++) {
                            databaseArray.push(
                                stockHistorydb.knex.raw(`insert into stock_history values (default, 1, 'netflix', '${data.Elements[0].Symbol}', ${pricesArray[i]}, '${obj.DataPeriod}', ${datesArray[i].unix}, '${datesArray[i].fullDate}', '${datesArray[i].year}', '${datesArray[i].monthNumber}', '${datesArray[i].month}', '${datesArray[i].dayNumber}', '${datesArray[i].day}')`).then(data => data)
                            )
                        }
                        Promise.all(databaseArray).then((promiseData) => {
                            return stockHistorydb.knex.raw(`select * from stock_history order by unix_timestamp`).then(finalData => resolve(finalData.rows))
                        })
                    })  
                } else {
                    reject(error)
                }
            })
        })
    }
}