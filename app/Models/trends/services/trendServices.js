var trendServicesDb = require('../../../config/db/knex/knexConfig');
var trendServiceRequest = require('request');
module.exports = {
    createSymbolArr: function (arr, id) {
        var symbolArr = [];
        arr.forEach(function (elem) {
            symbolArr.push(trendServicesDb.knex.raw("insert into trend_tickers values (default, 1, " + id + ", '" + elem + "')"));
        });
        return symbolArr;
    },
    createKeywordArr: function (arr, id) {
        var keywordArr = [];
        arr.forEach(function (elem) {
            keywordArr.push(trendServicesDb.knex.raw("insert into twitter_keywords values (default, " + id + ", '" + elem.keyword + "', " + elem.is_active + ")"));
        });
        return keywordArr;
    },
    createTickerArr: function (arr) {
        var tickerArr = [];
        arr.forEach(function (elem) {
            tickerArr.push(new Promise(function (resolve, reject) {
                var url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={\"Normalized\":false,\"NumberOfDays\":10,\"DataPeriod\":\"DAY\",\"Elements\":[{\"Symbol\":\"" + elem.ticker + "\",\"Type\":\"price\",\"Params\":[\"c\"]}]}";
                trendServiceRequest(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolve({
                            body: body,
                            trend_id: elem.trend_id
                        });
                    }
                    else {
                        reject(error);
                    }
                });
            }));
        });
        return tickerArr;
    }
};
