'use strict';
var stockHistorydb = require('../../config/db/knex/knexConfig');
var stockHistoryRequest = require('request');
var dayLookup = require('./services/dayLookup');
var monthLookup = require('./services/monthLookup');
module.exports = (function () {
    function StockHistoryClass() {
    }
    StockHistoryClass.prototype.getStockHistory = function (obj) {
        var url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={\"Normalized\":false,\"NumberOfDays\":" + obj.NumberOfDays + ",\"DataPeriod\":\"" + obj.DataPeriod + "\",\"Elements\":[{\"Symbol\":\"" + obj.ticker + "\",\"Type\":\"price\",\"Params\":[\"c\"]}]}";
        return new Promise(function (resolve, reject) {
            stockHistoryRequest(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    stockHistorydb.knex.raw("delete from stock_history").then(function () {
                        var data = JSON.parse(body);
                        var datesArray = data.Dates.map(function (date) {
                            return {
                                unix: new Date(date.substring(0, 10)).getTime(),
                                fullDate: date.substring(0, 10),
                                year: new Date(date.substring(0, 10)).getFullYear(),
                                monthNumber: Number(new Date(date.substring(0, 10)).getMonth()),
                                month: monthLookup[Number(new Date(date.substring(0, 10)).getMonth())],
                                dayNumber: Number(new Date(date.substring(0, 10)).getDay()),
                                day: dayLookup[Number(new Date(date.substring(0, 10)).getDay())]
                            };
                        });
                        var pricesArray = data.Elements[0].DataSeries.close.values;
                        var databaseArray = [];
                        for (var i = 0; i < datesArray.length; i++) {
                            databaseArray.push(stockHistorydb.knex.raw("insert into stock_history values (default, 1, 'company name', '" + data.Elements[0].Symbol + "', " + pricesArray[i] + ", '" + obj.DataPeriod + "', " + datesArray[i].unix + ", '" + datesArray[i].fullDate + "', '" + datesArray[i].year + "', '" + datesArray[i].monthNumber + "', '" + datesArray[i].month + "', '" + datesArray[i].dayNumber + "', '" + datesArray[i].day + "')").then(function (data) { return data; }));
                        }
                        Promise.all(databaseArray).then(function (promiseData) {
                            return stockHistorydb.knex.raw("select * from stock_history order by unix_timestamp").then(function (finalData) { return resolve(finalData.rows); });
                        });
                    });
                }
                else {
                    reject(error);
                }
            });
        });
    };
    StockHistoryClass.prototype.groupStockHistory = function (grouping) {
        return stockHistorydb.knex.raw("select day, avg(price) as price\n        from stock_history\n        group by day, day_number\n        order by day_number");
    };
    return StockHistoryClass;
}());
