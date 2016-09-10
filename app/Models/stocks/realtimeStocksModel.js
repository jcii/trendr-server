'use strict';
var db = require('../../config/db/knex/knexConfig');
var request = require('request');
module.exports = (function () {
    function realtimeStocks() {
    }
    realtimeStocks.prototype.getRealtimeStockPrice = function (symbol) {
        return new Promise(function (resolve, reject) {
            request("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + symbol, function (error, response, body) {
                return (!error && response.statusCode == 200) ? resolve(JSON.stringify(body)) : reject(error);
            });
        });
    };
    realtimeStocks.prototype.updateDatabase = function (obj) {
        var dbDate = Number(new Date(obj.Timestamp).getTime());
        return db.knex.raw("insert into realtime_stocks values (default, '" + obj.Name + "', '" + obj.Symbol + "', " + obj.LastPrice + ", " + obj.Volume + ", " + dbDate + ")");
    };
    realtimeStocks.prototype.getDatabaseResults = function (symbol) {
        return db.knex.raw("select * from realtime_stocks where symbol = '" + symbol + "' order by timestamp desc limit 10").then(function (results) {
            var deleteIds = results.rows.map(function (elem) { return elem.id; });
            console.log(symbol);
            return db.knex('realtime_stocks').where('symbol', symbol).whereNotIn('id', deleteIds).del().then(function () {
                return results.rows;
            });
        });
    };
    return realtimeStocks;
}());
