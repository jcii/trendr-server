'use strict';
var db = require('../../config/db/knex/knexConfig');
var request = require('request');
// const Date = require('datejs')
module.exports = (function () {
    function realtimeStocks() {
    }
    //   getRealtimeStockPrice() {
    //     request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=NFLX`, (error, response, body) => {
    //         return (!error && response.statusCode == 200) ? JSON.stringify(body) : 'Not found' 
    //     })
    //   }
    realtimeStocks.prototype.updateDatabase = function (obj) {
        var unixDate = obj.Timestamp.substring(8, 10) + "-" + obj.Timestamp.substring(4, 7) + "-" + obj.Timestamp.substring(30, 35) + " " + obj.Timestamp.substring(11, 19);
        var dbDate = Number(new Date(unixDate)) / 1000;
        return db.knex.raw("insert into realtime_stocks values (default, '" + obj.Name + "', '" + obj.Symbol + "', " + obj.LastPrice + ", " + obj.Volume + ", " + dbDate + ")");
    };
    realtimeStocks.prototype.getDatabaseResults = function () {
        return db.knex.raw("select * from realtime_stocks");
    };
    return realtimeStocks;
}());
