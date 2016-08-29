'use strict';
var stockHistorydb = require('../../config/db/knex/knexConfig');
var stockHistoryRequest = require('request');
module.exports = (function () {
    function StockHistoryClass() {
    }
    StockHistoryClass.prototype.getStockHistory = function (obj) {
        var url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={\"Normalized\":false,\"NumberOfDays\":" + obj.NumberOfDays + ",\"DataPeriod\":\"" + obj.DataPeriod + "\",\"Elements\":[{\"Symbol\":\"" + obj.Symbol + "\",\"Type\":\"price\",\"Params\":[\"c\"]}]}";
        return new Promise(function (resolve, reject) {
            stockHistoryRequest(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    stockHistorydb.knex.raw("delete from stock_history").then(function () {
                        var data = JSON.parse(body);
                        var datesArray = data.Dates.map(function (date) { return new Date(date.substring(0, 10)).getTime() / 1000; });
                        var pricesArray = data.Elements[0].DataSeries.close.values;
                        var databaseArray = [];
                        for (var i = 0; i < datesArray.length; i++) {
                            databaseArray.push(stockHistorydb.knex.raw("insert into stock_history values (default, 1, 'netflix', '" + data.Elements[0].Symbol + "', " + pricesArray[i] + ", '" + obj.DataPeriod + "', " + datesArray[i] + ")").then(function (data) {
                                return data;
                            }));
                        }
                        Promise.all(databaseArray).then(function (promiseData) {
                            return stockHistorydb.knex.raw("select * from stock_history").then(function (finalData) { return resolve(finalData.rows); });
                        });
                    });
                }
                else {
                    reject(error);
                }
            });
        });
    };
    return StockHistoryClass;
}());
