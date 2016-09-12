const trendServicesDb = require('../../../config/db/knex/knexConfig')
const trendServiceRequest = require('request')


module.exports = {
    createSymbolArr: function(arr, id) {
        let symbolArr = []
        arr.forEach(elem => {
            symbolArr.push(trendServicesDb.knex.raw(`insert into trend_tickers values (default, 1, ${id}, '${elem}')`))
        })
        return symbolArr
    }, 

    createKeywordArr: function (arr, id) {
        let keywordArr = []
        arr.forEach(elem => {            
            keywordArr.push(trendServicesDb.knex.raw(`insert into twitter_keywords values (default, ${id}, '${ elem.keyword }', ${ elem.is_active })`))
        })
        return keywordArr
    },

    createTickerArr: (arr) => {
        let tickerArr = []
        arr.forEach(elem => {
            tickerArr.push(
                new Promise((resolve, reject) => {
                    let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":10,"DataPeriod":"DAY","Elements":[{"Symbol":"${elem.ticker}","Type":"price","Params":["c"]}]}`
                    trendServiceRequest(url, (error: any, response: any, body: any) => {
                        if (!error && response.statusCode == 200) {
                            resolve({
                                body, 
                                trend_id: elem.trend_id
                            })
                        } else {
                            reject(error)
                        }
                    })
                })
            )
        })
        return tickerArr
    }
}